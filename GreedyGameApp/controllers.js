var myApp = angular.module('MusicApp');

myApp.controller('MainController', function($scope, $http, $route, MusicService){

    // var tracks = $http.get('http://104.197.128.152:8000/v1/tracks');
    $scope.tracks = [];

    // using the MusicService to invoke the get method
    var response = MusicService.get({method: 'get', isArray:false});
    response.$promise.then(function(data){
        $scope.tracks = data.results;
    });

    // object to hold the text values entered by the user for search
    $scope.params = {};
  
    $scope.clearText = function() {
        // console.log("clearText called")
        $scope.params.text = null;
    }

    // To display the list items page wise
    // Each page consists of 5 list items
    var currentPage = 0;
    $scope.pageSize = 5;

    // console.log($scope.tracks.length)
    $scope.numberOfPages = function(){
    return Math.ceil($scope.tracks.length/$scope.pageSize);
    }

    var limitStep = 5;
    $scope.limit = limitStep;
    $scope.currentPage = currentPage;

    // Incrementing the page counter while clicking the Next button
    $scope.incrementLimit = function(){
    $scope.limit += limitStep;
    $scope.currentPage += 1
    };

    // Decrementing the page counter while clicking the Back button
    $scope.decrementLimit = function(){
    $scope.limit -= limitStep;
    $scope.currentPage -= 1
    };

    // To view a single music track
    $scope.viewTrack = function(trackID){
        $scope.currentTrack = MusicService.get({track: trackID})
    }

    // Adding a new track to the collections
    $scope.addNewTrack = function(){
         var data = MusicService.save({
            "title": $scope.title,
            "rating":$scope.rating,
            "genres": [
                $scope.genre
            ]
        });
        console.log($scope.genre)
        console.log(data)
        $('#myAddTrackModal').modal('hide');
    }

    // Editing an existing track from the collections
    $scope.editTrack = function(trackID){
        $scope.id = trackID;
        console.log($scope.id)
        console.log('Inside editTrack')
        //get the id to be edited
        $scope.updateTrack = function(){
            console.log("inside updateTrack")
            MusicService.update({track: $scope.id},
            {
                "id": $scope.id,
                "title": $scope.title,
                "rating": $scope.rating,
                "genres": [
                    $scope.genre
                ]
            });
            $('#myEditTrackModal').modal('hide');
            alert("update successful")
        }; 
    };
});


myApp.controller('GenreController', function($scope, $route, GenreService){
    $scope.genres = [];
    $scope.params = {};
  
    $scope.clearText = function() {
        // console.log("clearText called")
        $scope.params.text = null;
    }


    var currentPage = 0;
    $scope.pageSize = 5;

    $scope.numberOfPages = function(){
    // console.log($scope.genres.length)
    return Math.ceil($scope.genres.length/$scope.pageSize);
    }

    var limitStep = 5;
    $scope.limit = limitStep;
    $scope.currentPage = currentPage;

    $scope.incrementLimit = function(){
    $scope.limit += limitStep;
    $scope.currentPage += 1
    };

    $scope.decrementLimit = function(){
    $scope.limit -= limitStep;
    $scope.currentPage -= 1
    };

    var response = GenreService.get({method: 'get', isArray:false});

    response.$promise.then(function(data){
        $scope.genres = data.results;
    });

    $scope.viewGenre = function(genreID){
        $scope.currentGenre = GenreService.get({genre: genreID})
    };

    $scope.editGenre = function(genreID){
        $scope.id = genreID;
        console.log('Inside editGenre')
        $scope.updateGenre = function(){
            GenreService.update({genre: $scope.id},
                {
                    "id": $scope.id,
                    "name": $scope.name,
                }
            )
            $('#myEditGenreModal').modal('hide');
            alert("update successful")
            // window.location.reload();
            };
    };

    $scope.addNewGenre = function(){
         var data = GenreService.save({
            "name": $scope.name
         });
        console.log("Genre Added")
        $('#myAddGenreModal').modal('hide');
    };
});
