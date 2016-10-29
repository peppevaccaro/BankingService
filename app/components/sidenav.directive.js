/**
 * @author: Giuseppe Vaccaro
 * @file: sidenav.directive.js
 * @description: Questo file contiene la direttiva personalizzata che si occupa di manipolare e gestire l'elenco dei clienti nella pagina html.
 *               Nella funzione della direttiva, vengono passate le impostazioni della direttiva, tra le quali il templateUrl, ovvero il template di come verrà visualizzata la lista dei clienti,
 *               e il controllore che si occupera di gestire la view relativa alla lista dei clienti.
 * 
 */


(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('sidenav', sidenav);

    
    function sidenav() {
        return {
            scope: {},
            bindToController: {
                items: '=',
            },
            controller: sidenavController,
            controllerAs: 'sidenavCtrl',
            transclude: true,
            restrict: 'E',
            templateUrl: 'app/components/sidenav.template.html'
        };
    }

    sidenavController.$inject = ['$mdSidenav'];
    function sidenavController($mdSidenav) {
        var vm = this;
        vm.openSideNavPanel = openSideNavPanel;
        vm.closeSideNavPanel = closeSideNavPanel;
        vm.redirect= redirect;

        /**   
   *  @description: Con tale metodo apriamo la barra di navigazione laterale.   
   *  @return{undefined} Non restituisce alcun valore
   */  
    function openSideNavPanel() {
        $mdSidenav('left').open();
    };

 /**   
   *  @description: Con tale metodo chiudiamo la barra di navigazione laterale.   
   *  @return{undefined} Non restituisce alcun valore
   */  
    function closeSideNavPanel() {
        $mdSidenav('left').close();
    };

     /**   
   *  @description: Con tale metodo sfruttiamo il servizio $location per reindirizzare la web-app alla pagina principale.   
   *  @return{undefined} Non restituisce alcun valore
   */  
  function redirect(){
       $location.path( '/' );
    };


        
    }
})();