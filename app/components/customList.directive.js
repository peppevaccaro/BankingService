/**
 * @author: Giuseppe Vaccaro
 * @file: customList.directive.js
 * @description: Questo file contiene la direttiva personalizzata che si occupa di manipolare e gestire l'elenco dei clienti nella pagina html.
 *               Nella funzione della direttiva, vengono passate le impostazioni della direttiva, tra le quali il templateUrl, ovvero il template di come verrà visualizzata la lista dei clienti,
 *               e il controllore che si occupera di gestire la view relativa alla lista dei clienti.
 * 
 */


(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('customList', customList);

    
    function customList() {
        return {
            scope: {},
            bindToController: {
                items: '=',
                selectedItem: '=',
                filterFunction: '=',
                selected:'=',
                search:'='
            },
            controller: customListController,
            controllerAs: 'customListCtrl',
            transclude: true,
            restrict: 'E',
            templateUrl: 'app/components/customList.template.html'
        };
    }

    customListController.$inject = ['storageService','$mdDialog','$timeout'];
    function customListController(storageService,$mdDialog,$timeout) {
        var vm = this;
        vm.toggleSelection = toggleSelection;
        vm.deleteItem = deleteItem;
        vm.toggle = toggle;
        vm.orderFilter = orderFilter;
        vm.ascFilter = ascFilter;
        vm.showEdit = showEdit;
        vm.type= null;
        vm.asc = null;

        
        /** @description: Effettua la cancellazione del cliente selezionato dalla lista.
         *  @param{Object} ev - Attraverso ev riusciamo ad avere accesso all' evento che sta accadendo.
         *  @param{Object} item - Rappresenta l'oggetto che andremo ad eliminare dalla lista dei clienti.
         *  @return{undefined} - Non restituisce alcun valore
         * 
         */
        function deleteItem(ev,item) {
                var confirm = $mdDialog.confirm()
                    .textContent('The client "' + item.name + '" will be deleted. Are you sure?')
                    .ariaLabel('Delete client')
                    .targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');
                $mdDialog.show(confirm).then(function(result) {
                    if (result) {
                        var index = vm.items.indexOf(item);
                        if (index != -1) {
                            vm.items.splice(index, 1);
                            storageService.set(vm.items);
                            vm.selectedItem = null;
                        }
                    }
                });
            };

    
       /** @description: Con tale metodo impostiamo il criterio di filtro da applicare alla lista dei clienti.Impostiamo la possibilità di ordinare l'elenco in base al nome o al saldo. 
        *  @return{$timeout} Usiamo $timeout per simulare una richiesta di 650ms
        */
       function orderFilter() {
            return $timeout(function() {
                vm.selectionFilter =  vm.selectionFilter  || [
                    { id: 1, name: 'name' },
                    { id: 2, name: 'balance' }
                ];
            }, 650);
        };


        /** @description: Con tale metodo impostiamo il criterio di filtro da applicare alla lista dei clienti.Impostiamo la possibilità di ordinare l'elenco in ordine crescente o decrescente. 
         *  @return{$timeout} Usiamo $timeout per simulare una richiesta di 650ms
         */
         function ascFilter() {
            return $timeout(function() {
                vm.ascFilterValue =  vm.ascFilterValue  || [
                    { value: false, name: 'ascending' },
                    { value: true, name: 'descending' }
                ];
            }, 650);
        };

        /** @description: Con tale metodo aggiungiamo o cancelliamo dalla lista dei clienti selezionati l'oggetto "item" in base alla spunta o meno della checkbox.
         *  @param{Object} item - Rappresenta il cliente a cui è stata spuntata la relativa checkbox. 
         *  @return{undefined} Non restituisce alcun valore
         */
        function toggle(item){
            var idx = vm.selected.indexOf(item);
            if(idx>-1){
            vm.selected.splice(idx,1);
            }

            else
            {
                vm.selected.push(item);
            }
        };


        /** @description: Con tale metodo effettuiamo la selezione o deselezione di "item".
         *  @param{Object} item - Rappresenta il cliente selezionato dalla lista. 
         *  @return{undefined} Non restituisce alcun valore
         */
        function toggleSelection(item) {
            if (vm.selectedItem == null || vm.selectedItem != item)
                vm.selectedItem = item;
            else
                vm.selectedItem = null;
        };

        /** @description: Con tale metodo viene caricata la view relativa alla modifica dei clienti e viene impostato il controllore che si occuperà della gestione di tale view.
         *  @param{Object} ev - Attraverso ev riusciamo ad avere accesso all' evento che sta accadendo.
         *  @param{Object} item - Rappresenta l'oggetto che andremo a modificare. 
         *  @return{undefined} Non restituisce alcun valore
         */
        function showEdit(ev,item) {
            $mdDialog.show({
                locals:{
                    dataToPass: item,
                    items: vm.items
                    
                    },
                controller: 'EditClientController',
                controllerAs: 'editClientCtrl',
                templateUrl: 'pages/editClient.template.html',
                targetEvent: ev,
            })
            .then(function(answer) {
            }, function() {
                vm.alert = 'You cancelled the dialog.';
            });
        };
    }
})();