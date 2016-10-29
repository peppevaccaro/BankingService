/**
 * @author: Giuseppe Vaccaro
 * @file: todoItem.service.js
 * @description: Questo file contiene la definizione di un servizio personalizzato,
 *               ed ha il compito di effettuare l'inserimento di ogni cliente all'interno di una lista,
 *               e salvarlo in maniera persistente.
 * 
 * 
 */


(function() {
  
    angular.module('todoApp').service('todoItemService', todoItemService);

    todoItemService.$inject = ['storageService'];
    function todoItemService(storageService) {

        var vm = this;
        vm.createItem = createItem;
        vm.getRandomId = getRandomId;

        /** @description:Crea un nuovo oggetto cliente con i parametri che ha in ingresso e lo aggiunge alla lista
         *  @param {array} items - L'array dei clienti già inseriti
         *  @param {string} name - Il nome del cliente.
         *  @param {string} type - Il tipo di cliente (azienda o privato)
         *  @param {string} taxCode - Il codice fiscale del cliente
         *  @param {string} email - L'email del cliente
         *  @param {string} balance - Il saldo del cliente
         *  @param {string} balance - Il codice identificativo del cliente
         * 
         *  @return {undefined} - Non ritorna nulla
         */ 
        function createItem(items,name,type,taxCode,email,balance) {
            vm.items = items;
            vm.items.push({
                id: getRandomId(),
                name: name ||'',
                type: type ||'-',
                taxCode : taxCode||'',
                email: email || '', 
                balance: balance || 0.0
            });
             storageService.set(vm.items);
        };


        /** @description: La funzione crea un id in maniera random che andrà ad identificare ogni cliente inserito nella lista.
         * 
         *  @return {id} - Restituisce l'id del cliente.
         */ 

        function getRandomId() {
            var id = Math.floor((Math.random()*6)+1);
            for(i=0;i<vm.items.lenght;i++){
                if(id==vm.items[i].id)
                    id = Math.floor((Math.random()*6)+1);
            }

            return id;
            };
    }
})();