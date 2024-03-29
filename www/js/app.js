// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngMaterial'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider,$mdThemingProvider) {

        
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
   

  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('deep-orange').dark();


    $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

  // Each tab has its own nav history stack:

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'LoginCtrl'
    })

    .state('personal', {
        url: '/home/:id',
        views: {
            'tab-listings': {
                templateUrl: 'templates/personal-listing.html',
                controller: 'ListingsCtrl'
            }
        }
    })

  .state('tab.listings',{
      url: '/home',
      views: {
          'tab-listings': {
              templateUrl: 'templates/tab-listings.html',
              controller: 'ListingsCtrl'
          }
      }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.pusher',{
    url: '/chat',
    views: {
      'tab-pusher': {
        templateUrl: 'templates/pusher.html',
        controller: 'MessageController'
      }
    }
  })
  .state('tab.stay',{
    url: '/stay',
    views: {
      'stay-reservation': {
        templateUrl: 'templates/hotel.html',
        controller: 'StayController'
      }
    }
  })
  .state('tab.flight',{
    url: '/flight',
    views: {
      'flight-reservation': {
        templateUrl: 'templates/flight.html',
        controller: 'FlightController'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
