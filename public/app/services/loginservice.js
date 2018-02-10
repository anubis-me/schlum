/**
 * Created by abhi on 10-Feb-18.
 */
angular.module('loginService',[])

    .factory('schl',function ($http) {
        gamefactory = {};


        gamefactory.loginuser = function(gdata) {
            return $http.post('/api/authenticate',gdata);
        };
        gamefactory.createuser = function(gdata) {
            return $http.post('/api/reguser',gdata);
        };
        return gamefactory;
    });