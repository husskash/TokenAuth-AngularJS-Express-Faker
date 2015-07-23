'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', ['ngRoute', 'angular-jwt']);
app.config(['$locationProvider', '$routeProvider',
  function($location, $routeProvider){
    $routeProvider    
    //rout for the main page
    .when('/', {
        templateUrl : "main/main.html",
        controller: "MainCtrl",
        requiredLogin: true
    })
    .when('/main', {
        templateUrl : "main/main.html",
        controller: "MainCtrl",
        requiredLogin: true
    })
    //route for the login page
    .when('/login',{
        templateUrl : "authentication/login.html", 
        controller: "LoginCtrl",
        requiredLogin: false
    });
}]);

app.run(function ($rootScope,  $location,  authTokenFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
            if (nextRoute.requiredLogin && !authTokenFactory.getToken()) {
                authTokenFactory.setToken();
                $location.path("/login");
            }
    });
});


