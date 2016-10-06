angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope,userServices,$state,$http) {
    //to be filled//
    //
    console.log("loaded");
    $scope.loginDetails = {}

    $scope.changeTab = function (tab) {

        $state.go(tab); //update this later
        
    }

    $scope.newUser = function (loginDetails) { //tbd
        
        userServices.newUser(loginDetails)
            .then(function(result){
                $scope.success = "You have successfully created a new account!"
                $scope.loginDetails = {}
          
            })
    }

    $scope.login = function (loginDetails) { //requires email and password, demand a login!
        userServices.login(loginDetails)
        .then(function (result) {
            $scope.loggedIn = true
            $scope.loginMessage = "You have successfully logged in!"
        }), function (reject) {
            $scope.loggedIn = false
            $scope.loginMessage = "Incorrect email and/or password. Please try again"
            $state.go('tab.dash')
        }
    }

    $scope.returnVisit = function (loginDetails) { //requires id and auth_token
        userServices.validateUser(loginDetails)
        .then(function (success){
            $scope.loggedIn = true
            $scope.loginMessage = "Welcome back"
        }, function (reject) {
            $scope.loggedIn = false
            $scope.loginMessage = "Please login again"
            $state.go('tab.dash')
        }
            )
    }

    $scope.logout = function (loginDetails) { //accesstoken, uid, client , figure out how to store these values client-side.
        userServices.logout(loginDetails)
        .then(function (result) {
            $scope.loggedIn = false
            $scope.logoutMessage = "You have successfully logged out!"
        })
    }


    //$scope.adder = function (email,start, end, city, attributes) {
    //    queryServices.adder(email,start, end, city, attributes)
    //    .then(function (result) {
    //        $scope.addMessage = "Successfully added listing!"
    //        //what do I do with this?
    //    })
    //}

    //$scope.deleter = function (email) {
    //    queryServices.deleter(email)
    //    .then(function (result) {
    //        $scope.deleteMessage = "Successfully deleted your listing"
    //    })
    //}

    //$scope.fetcher = function () {
    //    queryServices.fetcher()
    //    .then(function (result) {
    //        $scope.fetchMessage = "Successfully fetched data!"
    //    })
    //}

    //$scope.similarer = function (city) {
    //    queryServices.similarer(city)
    //    .then(function (result) {
    //        $scope.similarMessage = "Similar cities found!"
    //    })
    //}

    
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

