(function () {
    app.factory('authTokenFactory', function authTokenFactory($window,jwtHelper){
       'use strict';
       var store = $window.localStorage;
       var key = 'auth-token';
       
       return{
           getToken: getToken,
           setToken: setToken,
           getUsername: getUsername
       };
       function getToken(){
          return store.getItem(key);
       }
       function setToken(token){
           if(token){
               store.setItem(key,token);     
           } else{
               store.clear();
           }                
       }
       function getUsername(){
           if(store.getItem(key)){
               console.log(JSON.stringify(jwtHelper.decodeToken(store.getItem(key))));
               return jwtHelper.decodeToken(store.getItem(key)).username;
           }
           
       }
    });
    
    app.factory('AuthInterceptor', function AuthInterceptor(authTokenFactory){
       'use strict'
       return{
           request: addToken
       };
       function addToken(config){
           var token = authTokenFactory.getToken();
           if(token){
               config.headers = config.headers || {};
               config.headers.Authorization = 'Bearer ' + token;
           }
           return config;
       }
       
    });
    
    app.config(function($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptor');
    });
    
})()