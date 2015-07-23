(function () {
    'use strict';
    app.controller('LoginCtrl', function LoginCtrl(userFactory, $location, $window) {
        'use strict';
        var lc = this;
        lc.store = $window.localStorage;
        lc.login = login;

        function login(username, password) {
            return userFactory.login(username, password).then(function success(response) {
                lc.user = response.data.user;
                $location.path("/main");

            }, handleError);
        }
    });
    function handleError(response) {
        console.log('Error: ' + response.data);
    }
})();
