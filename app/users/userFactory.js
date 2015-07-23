app.factory('userFactory', function userFactory($http, authTokenFactory, jwtHelper, config) {
    'use strict';
    var token = authTokenFactory.getToken();
    var loggedUser_id;
    var access_level;
    var latam;
    return{
        login: login,
        logout: logout
    };
    function login(username, password) {
        return $http.post(config.serverDomain()+'/login', {
            username: username,
            password: password
        }).then(function success(response) {
            authTokenFactory.setToken(response.data.token);
            return response;
        });
    };
    function logout() {
        authTokenFactory.setToken();
    };
    function getLoggedUserId(){
        var loggedUser_id = null;
        if(authTokenFactory.getToken()){
            loggedUser_id = jwtHelper.decodeToken(authTokenFactory.getToken()).id;
            return loggedUser_id;
        }
    };
});