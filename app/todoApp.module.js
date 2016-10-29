/**
 * @author: Giuseppe Vaccaro
 * @file: todoApp.module.js
 * @description: Questo file contiene la definizione del modulo principale della web-app,
 *               all'interno del quale viene configurato in meccanismo di routing per la SPA (single page application)
 */



(function(angular) {

    'use strict';
angular.module('todoApp', ['ngMaterial','ngMessages','ngRoute','ngMdIcons','ngSanitize','ngCsv'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html'
      })

    .when('/viewList', {
        templateUrl: 'pages/viewList.html',
        Controller:'todoController as ctrl'
      })

    .otherwise({redirectTo:'/'});

  $locationProvider.html5Mode(true);
  });

})(window.angular);