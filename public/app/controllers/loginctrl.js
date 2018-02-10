/**
 * Created by abhi on 10-Feb-18.
 */
angular.module('loginController',['loginService'])

    .controller('doLogin',function ($scope,schl,$timeout,$location) {
        var app = this;
        this.Login = function(loginData) {
            schl.loginuser(app.loginData).then(function(data) {
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
