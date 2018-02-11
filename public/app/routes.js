var app = angular.module('gameRoutes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        // AngularJS Route Handler
        $routeProvider

            //Home
            .when('/', {
                templateUrl: 'app/views/pages/login.html'
            })
            .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })

           .when('/game', {
                templateUrl: 'app/views/pages/games.html'
            })
            .when('/contact', {
                templateUrl: 'app/views/pages/contact.html'
            })
            .when('/login', {
                templateUrl: 'app/views/pages/login.html',
                controller : 'doLogin',
                controllerAs: 'main'
            })
            .when('/register', {
                templateUrl: 'app/views/pages/register.html',
                controller : 'registeruser',
                controllerAs: 'reguser'
            })

            .otherwise({ redirectTo: '/' }); // If user tries to access any other route, redirect to home page

        $locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)
    });
