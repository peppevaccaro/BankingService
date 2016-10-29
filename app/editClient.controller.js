/**
 * @author: Giuseppe Vaccaro
 * @file: editClient.controller.js
 * @description: Questo file contiene la definizione del controller che si occuperà di gestire le modifiche di un cliente già esistente.
 * 
 */


(function(){
angular.module('todoApp').controller('EditClientController', EditClientController);

EditClientController.$inject = ['todoItemService','$mdDialog','$location','dataToPass','items','storageService'];
function EditClientController(todoItemService,$mdDialog,$location,dataToPass,items,storageService) {

  var vm = this;
  vm.client = dataToPass;
  vm.master = angular.copy(vm.client);
  vm.items = items;
  vm.showConfirm = showConfirm;
  vm.showAlert = showAlert;
  vm.cancel = cancel;


  /** @description: Con tale metodo viene visualizzata una finestra di dialogo attraverso la quale si informa l'utente dell'avvenuta modifica. 
   *  @return{undefined} Non restituisce alcun valore
   */
   function showAlert(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Confirmation')
        .textContent('Change was successful')
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
        .targetEvent(ev)
    );
  };


  /** @description: Tale metodo apre una finestra di dialogo attraverso la quale l'utente può confermare o meno le modifiche effettutate al cliente.
   *                Se si conferma viene successivamente effettuato l'inserimento del cliente nella lista, altrimenti si chiude semplicemente la finestra di dialogo senza alcuna modifica. 
   *  @return{undefined} Non restituisce alcun valore
   */  
  function showConfirm(ev) {        
        var confirm = $mdDialog.confirm()
              .title('Would you like to apply changes?')
              .textContent('Through this registration you will change the information of client in our banking system.')
              .ariaLabel('Confirm Changes')
              .targetEvent(ev)
              .ok('Confirm')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
        var index = vm.items.indexOf(vm.client);
            if (index != -1) {
                vm.showAlert();
                 vm.items.splice(index, 1);
                 storageService.set(vm.items);
                vm.items.push({
                  id: vm.master.id,
                  name: vm.master.name,
                  type: vm.master.type,
                  taxCode :vm.master.taxCode,
                  email: vm.master.email, 
                  balance: vm.master.balance
                });
             storageService.set(vm.items);    
          } 
          $location.path( '/viewList' );
        }, function() {
          vm.status = 'You decided not to apply any modification';
        })
      };


    /** @description: Attraverso tale metodo viene chiusa la finestra di dialogo senza effettuare alcun operazione. 
    *  @return{undefined} Non restituisce alcun valore
    */  
    function cancel(){
      $mdDialog.cancel();
    }
  
};
})();