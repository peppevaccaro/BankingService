/**
 * @author: Giuseppe Vaccaro
 * @file: registerClient.controller.js
 * @description: Questo file contiene la definizione del controller che si occuperà di gestire la registrazione di un nuovo cliente.
 * 
 */

(function(){
angular.module('todoApp').controller('RegisterClientController', RegisterClientController);

RegisterClientController.$inject = ['todoItemService','$mdDialog','$location','items'];
function RegisterClientController(todoItemService,$mdDialog,$location,items) {

  var vm = this;
  vm.client = {};
  vm.addClient = addClient;
  vm.showConfirm = showConfirm;
  vm.showAlert = showAlert;
  vm.cancel = cancel;
  vm.items = items;


  /** @description: richiama il metodo createItem del servizio, passando come argomenti i dati modificati del cliente. 
    *  @return{undefined} Non restituisce alcun valore
    */
  function addClient(){
   todoItemService.createItem(vm.items,vm.client.name,vm.client.type,vm.client.taxCode,vm.client.email,vm.client.balance);
  };


   /** @description: Con tale metodo viene visualizzata una finestra di dialogo attraverso la quale si informa l'utente dell'avvenuta registrazione del nuovo cliente. 
    *  @return{undefined} Non restituisce alcun valore
    */
   function showAlert(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Confirm registration')
        .textContent('Registration was carried out successfully')
        .ariaLabel('Alert Dialog Demo')
        .ok('OK')
        .targetEvent(ev)
    );
  };


  /** @description: Tale metodo apre una finestra di dialogo attraverso la quale l'utente può confermare o meno la registrazione del nuovo cliente.
   *                Se si conferma viene successivamente effettuato l'inserimento del cliente nella lista, altrimenti si chiude semplicemente la finestra di dialogo senza alcuna modifica. 
   *  @return{undefined} Non restituisce alcun valore
   */  
  function showConfirm(ev) {        
        var confirm = $mdDialog.confirm()
              .title('Would you like to add new Client?')
              .textContent('Through this registration you will be added to the new customer in our banking system.')
              .ariaLabel('Confirm registration')
              .targetEvent(ev)
              .ok('Confirm')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
          vm.addClient();
          vm.showAlert(); 
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