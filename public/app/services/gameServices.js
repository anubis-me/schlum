angular.module('gameService',[])

    .factory('cogo',function ($http) {
        gamefactory = {};


        gamefactory.getGames = function(gdata) {
            return $http.get('assets/gamesarena.json',gdata);
        };
        return gamefactory;
    });