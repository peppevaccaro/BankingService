/**
 * @author: Giuseppe Vaccaro
 * @file: todo.controller.js
 * @description: Questo file contiene la definizione del controller principale che si occuperà della gestione delle funzionalità di base della web-app.
 * 
 */


(function() {

    angular.module('todoApp').controller('TodoController', TodoController);

    TodoController.$inject = ['storageService', '$mdDialog','$timeout','$mdSidenav','$log','$location'];
    function TodoController(storageService,$mdDialog,$timeout, $mdSidenav,$log,$location) {
         var vm = this;
        vm.selectedItem = null;
        vm.items = storageService.get() || [];
        vm.deleteItem= deleteItem;
        vm.deleteListItem = deleteListItem;
        vm.selected=[];
        vm.private = 'private';
        vm.company = 'company';
        vm.all = '';
        vm.showAdd = showAdd;
        vm.redirect= redirect;
        vm.showAlert = showAlert;
        vm.openSideNavPanel = openSideNavPanel;
        vm.showMobileMainHeader = true;

        /** @description: Effettua la cancellazione del cliente selezionato dalla lista.
         *  @param{Object} ev - Attraverso ev riusciamo ad avere accesso all' evento che sta accadendo.
         *  @return{undefined} - Non restituisce alcun valore
         * 
         */
        function deleteItem(ev) {
            if (vm.selectedItem != null) {
                var confirm = $mdDialog.confirm()
                    .textContent('The client "' + vm.selectedItem.name + '" will be deleted. Are you sure?')
                    .ariaLabel('Delete client')
                    .targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');
                $mdDialog.show(confirm).then(function(result) {
                    if (result) {
                        var index = vm.items.indexOf(vm.selectedItem);
                        if (index != -1) {
                            vm.items.splice(index, 1);
                            storageService.set(vm.items);
                            vm.selectedItem = null;
                        }
                    }
                });
            }
        };


         /** @description: Con tale metodo viene visualizzata una finestra di dialogo attraverso la quale si informa l'utente dell'avvenuta cancellazione dei clienti selezionati. 
          *  @return{undefined} Non restituisce alcun valore
          */
        function showAlert(ev) {
            $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Cancellation was successful')
                .textContent('The selected clients have been removed correctly')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
                .targetEvent(ev)
            );
        };


        /** @description: Con tale metodo viene effettuata la cancellazione dei clienti selezionati dall'utente attraverso le checkbox.
          *               Viene effettuata una ricerca dei clienti attraverso il loro id all'interno della lista e una volta trovati vengono cancellati.
          *  @return{undefined} Non restituisce alcun valore
          */
        function deleteListItem(ev) {
            if(vm.selected!=null){
                var confirm = $mdDialog.confirm()
                    .textContent('The clients will be deleted. Are you sure?')
                    .ariaLabel('Delete task')
                    .targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');
                $mdDialog.show(confirm).then(function(result) {
                    if (result) { 
                        for(i=0;i<vm.selected.length;i++){
                            for(j=0;j<vm.items.length;j++){
                                if(vm.items[j].id == vm.selected[i].id){
                                    var index = vm.items.indexOf(vm.items[j]);
                                        if (index != -1) {
                                            vm.items.splice(index, 1);
                                        }
                                }
                            }
                        }   
                        storageService.set(vm.items);
                        vm.showAlert();                       
                    }
                });
            }
    };

    
    /** @description: Questa funzione crea un ritardo nell’esecuzione di una funzione di callback.
     *  @param{Object} func - Rappresenta la funzione di callback che viene invocata sul secondo e sul terzo argomento.
     *  @param{Object} wait - Rappresenta il tempo in millisecondi in cui la funzione deve stare in fase di wait.
     *  @param{Object} context - Rappresenta il contesto della funzione di callback
     *  @return{debounced()} Restituisce una funzione che si occupa di gestire il ritardo. 
     */
  function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = vm,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    } ;


    /** @description: Con tale metodo viene visualizzata che contiene il form per la registrazione del cliente, sfruttando il meccanismo di routing.
     *                Viene inoltre definito il controllore che si occuperà della gestione della view, passandogli come argomento l'array dei clienti già registrati.
     *  @param{Object} ev - Attraverso ev riusciamo ad avere accesso all' evento che sta accadendo.
     *  @return{undefined} Non restituisce alcun valore
     */
    function showAdd(ev) {
        $mdDialog.show({
            locals:{
                items: vm.items
            },
            controller: 'RegisterClientController',
            controllerAs: 'regCtrl',
            bindToController: true,
            templateUrl: 'pages/newClient.template.html',
            targetEvent: ev,
        })
        .then(function(answer) {
        }, function() {
        vm.alert = 'You cancelled the dialog.';
        });
    };


  /**   
   *  @description: Con tale metodo sfruttiamo il servizio $location per reindirizzare la web-app alla pagina principale.   
   *  @return{undefined} Non restituisce alcun valore
   */  
  function redirect(){
       $location.path( '/' );
    };

           /**   
   *  @description: Con tale metodo apriamo la barra di navigazione laterale.   
   *  @return{undefined} Non restituisce alcun valore
   */  
    function openSideNavPanel() {
        $mdSidenav('left').open();
    };

}

})();