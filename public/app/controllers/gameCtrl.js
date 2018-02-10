angular.module('gameController',['gameService'])

    .controller('gameCtrl',function ($scope,cogo) {
        var app = this;
        app.limit = 8; // Set a default limit to ng-repeat
        app.searchLimit = 8; // Set the default search page results limit to zero

        // Function: get all the users from database
        function getGames() {
            var datta={};
            // Runs function to get all the users from database
            cogo.getGames().then(function(data) {
                app.datta = data.data; // Assign titles from database to variable

            });
        }


    getGames(); // Invoke function to get Titles from databases

    // Function: Show more results on page
    app.showMore = function(number) {
    app.showMoreError = false; // Clear error message
    // Run functio only if a valid number above zero
    if (number > 0) {
        app.limit = number; // Change ng-repeat filter to number requested by user
    } else {
        app.showMoreError = 'Please enter a valid number'; // Return error if number not valid
    }
    };
    // Function: Show all results on page
    app.showAll = function() {
        app.limit = undefined; // Clear ng-repeat limit
        app.showMoreError = false; // Clear error message
    };

    // Function: Perform a basic search function
    app.search = function(searchKeyword, number) {
        // Check if a search keyword was provided
        if (searchKeyword) {
            // Check if the search keyword actually exists
            if (searchKeyword.length > 0) {
                app.limit = 0; // Reset the limit number while processing
                $scope.searchFilter = searchKeyword; // Set the search filter to the word provided by the user
                app.limit = number; // Set the number displayed to the number entered by the user
            } else {
                $scope.searchFilter = undefined; // Remove any keywords from filter
                app.limit = 0; // Reset search limit
            }
        } else {
            $scope.searchFilter = undefined; // Reset search limit
            app.limit = 0; // Set search limit to zero
        }
    };

    // Function: Clear all fields
    app.clear = function() {
        $scope.number = 'Clear'; // Set the filter box to 'Clear'
        app.limit = 0; // Clear all results
        $scope.searchKeyword = undefined; // Clear the search word
        $scope.searchFilter = undefined; // Clear the search filter
        app.showMoreError = false; // Clear any errors
    };

    // Function: Perform an advanced, criteria-based search
    app.advancedSearch = function(searchByPlatform, searchByScore, searchByName) {
    // Ensure only to perform advanced search if one of the fields was submitted
    if (searchByPlatform || searchByScore || searchByName) {
        $scope.advancedSearchFilter = {}; // Create the filter object
        if (searchByPlatform) {
            $scope.advancedSearchFilter.platform = searchByPlatform; // If username keyword was provided, search by username
        }
        if (searchByScore) {
            $scope.advancedSearchFilter.score = searchByScore; // If email keyword was provided, search by email
        }
        if (searchByName) {
            $scope.advancedSearchFilter.title = searchByName; // If name keyword was provided, search by name
        }
        app.searchLimit = undefined; // Clear limit on search results
    }
};
     app.sortOrder = function(order) {
    app.sort = order; // Assign sort order variable requested by user
    };
});
