app.factory('config', function config() {
    'use strict';
    var address = 'localhost';
    var domainPort= '3000';
    var serverPort= '3300';
    var protocol = 'http';
    return {
        domain: function(){
            return protocol+'://'+address+':'+domainPort;
        },
        serverDomain: function(){
            return protocol+'://'+address+':'+serverPort;
        }
    }
});