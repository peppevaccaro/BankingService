/**
 * @author: Giuseppe Vaccaro
 * @file: storageService.js
 * @description: Questo file contiene il servizio personalizzato che si occupa di salvare e caricare la lista dei clienti dalla session storage.
 * 
 */

(function() {
    angular
        .module('todoApp')
        .service('storageService', storageService);

    storageService.$inject = ['$window'];
    function storageService($window) {
        this.set = set;
        this.get = get;

        /** @description: Carica la lista dei clienti dalla session storageLoads value from the session storage
         *  @return{null} Restituisce null se la variabile json==null, cioè non vi è salvato nulla nella session storage.
         *  @return{angular.fromJson(json)} Restituisce l'oggetto json deserializzato, cioè l'array dei clienti.
         * 
         */

        function get() {
            var json = $window.localStorage.getItem("taskStorage");
            if (json != null) {
                return angular.fromJson(json);
            }
            return null;
        };

        /** @description: Salva la lista dei clienti nella session storage
         *  @param{array} value - Rappresenta l'array dei clienti da salvare.
         *  @return{undefined} - Non restituisce alcun valore
         * 
         */
        
        function set(value) {
            $window.localStorage.setItem("taskStorage", angular.toJson(value));
        };
    };
})();