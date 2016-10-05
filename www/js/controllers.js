angular.module('starter.controllers', [])

.controller('TestCtrl', function ($scope,queryServices,userServices,$state,$http) {
    //to be filled//
    $scope.loginDetails = {}

    $scope.changeTab = function () {
        $state.go('tab.chats');
        console.log("this button working tho")
    }

    $scope.newUser = function (loginDetails) {
        console.log("initial");
        userServices.newUser(loginDetails.name, loginDetails.password, loginDetails.email)
            .then(function(result){
                $scope.success = "You have successfully created a new account!"
                $scope.loginDetails = {}
                console.log("hello");
            })

    }

    $scope.login = function (email, password) {
        userServices.login(email, password)
        .then(function (result) {
            $scope.loggedIn = true //Find out what result you're getting before finalising this function
            $scope.loginMessage = "You have successfully logged in!"
        })
    }

    $scope.logout = function (email) {
        userServices.logout(email)
        .then(function (result) {
            $scope.loggedIn = false
            $scope.logoutMessage = "You have successfully logged out!"
        })
    }


    $scope.adder = function (email,start, end, city, attributes) {
        queryServices.adder(email,start, end, city, attributes)
        .then(function (result) {
            $scope.addMessage = "Successfully added listing!"
            //what do I do with this?
        })
    }

    $scope.deleter = function (email) {
        queryServices.deleter(email)
        .then(function (result) {
            $scope.deleteMessage = "Successfully deleted your listing"
        })
    }

    $scope.fetcher = function () {
        queryServices.fetcher()
        .then(function (result) {
            $scope.fetchMessage = "Successfully fetched data!"
        })
    }

    $scope.similarer = function (city) {
        queryServices.similarer(city)
        .then(function (result) {
            $scope.similarMessage = "Similar cities found!"
        })
    }

    
})




.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

