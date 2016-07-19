// Services that handle the api requests

var myApp = angular.module('MusicApp');

myApp.factory('MusicService', function($resource){
    console.log("MusicService")
    return $resource('http://104.197.128.152:8000/v1/tracks/:track', {track: '@track'}, {
    'update':{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    }
  });
});

myApp.factory('GenreService', function($resource){
    console.log("GenreService")
    return $resource('http://104.197.128.152:8000/v1/genres/:genre', {genre: '@genre'}, {
    'update':{
        method: 'POST'
    }
  });
});