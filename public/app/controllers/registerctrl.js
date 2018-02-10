/**
 * Created by abhi on 10-Feb-18.
 */
angular.module('registerController',['loginService'])

    .controller('registeruser',function ($scope,schl,$timeout,$location) {
        var app = this;
        this.regUser = function(regData) {
            schl.createuser(app.regData).then(function(data) {
                if (data.data.success) {
                    $timeout(function() {
                        $location.path('/game');
                    }, 2000);
                }
                else{
                    $timeout(function() {
                        $location.path('/login');
                    }, 2000);
                }
            });
        }

    });
