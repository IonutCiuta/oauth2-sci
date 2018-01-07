'use strict';

var app = angular.module('trusted-app', ['ngRoute', 'ngStorage']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'template/createAccount.html',
            controller: 'CreateAccountController'
        })
        .when('/authenticate', {
            templateUrl: 'template/authenticate.html',
            controller: 'AuthenticationController'
        })
        .when('/credentials', {
            templateUrl: 'template/credentials.html',
            controller: 'CredentialsController'
        });
});

app.controller('CreateAccountController', [
                '$scope', '$rootScope', '$localStorage', '$location', '$http',
                function($scope, $rootScope, $localStorage, $location, $http) {
    console.log('Create account area');

    $scope.authenticate = function() {
        $location.path('/authenticate');
    }

    $scope.createAccount = function() {
        console.log('Account:' + JSON.stringify($scope.user));
        $http.post('/api/v1/account/create', $scope.user, {})
            .then(function(response) {
                console.log("Account created successfully!");
                $rootScope.username = $scope.user.username;
                $rootScope.password = $scope.user.password;
                $scope.authenticate();
            }, function(error) {
                console.error(JSON.stringify(error));
            });
    }
}]);

app.controller('AuthenticationController', [
                '$scope', '$rootScope', '$localStorage', '$location', '$http',
                function($scope, $rootScope, $localStorage, $location, $http) {
    console.log('Authentication area');

    checkUserDetails();

    $scope.register = function() {
        $http.post('/api/v1/account/authenticate', $scope.user, {})
            .then(function(response) {
                console.log("Authentication was successful: " + response.data.token);
            }, function(error) {
                console.error(JSON.stringify(error));
            });
    }

    $scope.authenticateUser = function() {
        console.log('User: ' + JSON.stringify($scope.user));

        if($scope.user.username === 'admin' && $scope.user.password === 'admin') {
            $location.path('/credentials');
        } else {
            $scope.register();
        }
    }

    function checkUserDetails() {
        if($rootScope.username && $rootScope.password) {
            console.log("Found user details")
            $scope.user = {
                "username": $rootScope.username,
                "password": $rootScope.password
            }
        }
    }
}]);

app.controller('CredentialsController', [
                '$scope', '$rootScope', '$localStorage', '$location', '$http',
                function($scope, $rootScope, $localStorage, $location, $http) {
    console.log('Credentials area');

    $scope.saveCredentials = function() {
        console.log('Credentials: ' + JSON.stringify($scope.app));

        $http.post('/api/v1/authorization/credentials', $scope.app, {})
        .then(function(response) {
           $location.path('/');
        }, function(error) {
            console.error(JSON.stringify(error));
        });
    }
}]);