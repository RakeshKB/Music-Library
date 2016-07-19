// Initializing the Angular app named MusicApp with its dependencies
var myApp = angular.module('MusicApp', ['ngResource', 'ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider
        .when('/tracks',{
            templateUrl: 'templates/tracks.html',
            controller: 'MainController'
        })
        .when('/genres', {
            templateUrl: 'templates/genres.html',
            controller: 'GenreController'
        })
        .otherwise({
            redirectTo: '/tracks'
        });
});
