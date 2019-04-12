'use strict';

var musicCatApp = angular.module('musicCatApp', []).config(function($interpolateProvider){           
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

musicCatApp.controller('MusicListController', function MusicListController($scope, $http) {
    angular.element(document).ready(function () {
        $(".music_search_button").click();
    });

    $scope.input = [];
    $scope.filter = [];

    $scope.keywordSearch = function() {
        if ($(".music_search_input").val() !== "") {
            $scope.input = $(".music_search_input").val().split(' ');
        }
        else {
            $scope.input = [];
        }
        
        var data = {"keywords":$scope.input, "filters":[]};
        $http({
            url: '../SearchResult/',
            method: "POST",
            data: data
        }).then(function successCallback(response) {
            $scope.filter = [];
            $scope.rawdata = response.data.rawdata
            $scope.artist = response.data.artist
            $scope.album = response.data.album
            $scope.genre = response.data.genre
        }, function errorCallback(response) {
            $scope.error = "error";
        });

    };

    $scope.change = function(name) {
        var idx = $scope.filter.indexOf(name);

        if (idx > -1) {
           $scope.filter.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.filter.push(name); 
        }

        var flatted = [];
        for (var n of $scope.filter) {
            var list = n.split(' ');
            for (var m of list) {
                flatted.push(m)
            }
            
        }

        var data = {"keywords":$scope.input, "filters":flatted};
        $http({
            url: '../SearchResult/',
            method: "POST",
            data: data
        }).then(function successCallback(response) {
            $scope.rawdata = response.data.rawdata
        }, function errorCallback(response) {
            $scope.error = "error";
        });
    };
});
