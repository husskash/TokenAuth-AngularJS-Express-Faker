'use strict';

app.controller('MainCtrl', ['authTokenFactory',function(authTokenFactory) {
        var mc = this;
        mc.username = authTokenFactory.getUsername();
}]);