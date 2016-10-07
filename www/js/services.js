angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('userServices',function($http){
    var herokuUrl = "http://hoola-rails.herokuapp.com/api/v1/auth/"; //use this on mobile device
    var localHost = "http://localhost:1337/hoola-rails.herokuapp.com/api/v1/auth/"; //use this url when developing

    function newUser(loginDetails) {
        return $http({
            method: 'POST',
            url: localHost,
            data: {
                username: loginDetails.username,                
                first_name: loginDetails.first_name,
                last_name: loginDetails.last_name,
                city: loginDetails.city,
                email: loginDetails.email,
                password: loginDetails.password,
                password_confirmation:loginDetails.password_confirmation

            }
        })
    }

    function deleteUser(loginDetails) { //kiv
        return $http({
            method: 'DELETE',
            url: localHost,
            data: {
                id: loginDetails.id,
                auth_token: loginDetails.auth_token
            }
        })
    }

    function updateUser(updateInfo) {
        return $http({
            method: 'PUT',
            url: localHost,
            data: {
                password: updateInfo.password,
                password_confirmation: updateInfo.password_confirmation,
                //what do i put here if it's supposed to take any update?!
            }
        })
    }

    function login(loginDetails) { //both validate and login receive a header which have lots of data inside to be stored. Take note!
        return $http({
            method: 'POST',
            url: localHost + 'sign_in',
            data: {
                email: loginDetails.email,
                password: loginDetails.password
                //will get true response
            }
        })
        //probably add .then(result) { ...} and set login parameter to true
    }

    function logout(loginDetails) {
        return $http({
            method: 'DELETE',
            url: localHost + 'sign_out',
            data: {
                "access-token": loginDetails.access-token, //... can't put access-token, had to use underscore. Don't know if will bug.
                uid: loginDetails.uid, //technically on the database, uid and email have different fields but they actually have the same value of the user's email.
                client: loginDetails.client
            }
        })
    }

    function validateUser(loginDetails) { //used on return visit to app.
        return $http({
            method: 'GET',
            url: localHost + 'validate_token',
            data: {
                id: loginDetails.id,
                "access-token": loginDetails.access-token

            }
        })
    }

    return {
        newUser: newUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        validateUser: validateUser,
        login: login,
        logout: logout
    };
})


.service('listingServices', function ($http) { //waiting for api
    var localHost2 = "http://localhost:1337/hoola-rails.herokuapp.com/api/v1/listings/" //flight booking prototyping url
    getAllListings = function(){  //index
        return $http({
            method: 'GET',
            url: localHost2,
            data: {}
        })
    }


    
    getListing = function(id){
        return $http({
            method: 'GET',
            url: localHost2 + id,
            data: {
                //check
            }
        })
    }

    createListing = function (listingDetails) { //will get object json if successful, error description if error.
        return $http({
            method: 'POST',
            url: localHost2,
            data: {
                title: listingDetails.title,
                destination: listingDetails.destination,
                description: listingDetails.description,
                departure: listingDetails.Date, //help with this pleaseee? Not sure if date format is correct.
                user_id: listingDetails.id
            }
        })
    }

    updateListing = function (listingDetails) { //will get object json if successful, error description if error.
        return $http({
            method: 'PUT',
            url: localHost2,
            data: {
                title: listingDetails.title,
                destination: listingDetails.destination,
                description: listingDetails.description,
                departure: listingDetails.Date, //help with this pleaseee? Not sure if date format is correct.
                user_id: listingDetails.id
            }
        })
    }

    deleteListing = function (listingDetails) {
        return $http({
            method: 'DELETE',
            url: localHost2 + id,
            data: {
                //check
            }
        })
        //will get object json if successful, error description if error.
    }
    
    
    })




//.service('queryServices',function($http){

//    function adder(email,start, end, city, attributes) {
//        return $http({
//            method: 'POST',
//            url: 'http://hoola-sutd.herokuapp.com/api/query/add',
//            data: {
//                email: email,
//                start: start,
//                end: end,
//                city: city,
//                attributes: attributes
//            }
//        })
//    }

//    function deleter(email) {
//        return $http.delete('http://hoola-sutd.herokuapp.com/api/query/delete',email);
//        //each user can only have 1 listing.
//    }

//    function fetcher() {
//        return $http.get('http://hoola-sutd.herokuapp.com/api/query/fetch',email);
//    }
    

//    function similarer(city) {
//        return $http.get('http://hoola-sutd.herokuapp.com/api/query/similar', city);
        
//    }

//    return {
//        adder: adder,
//        deleter: deleter,
//        fetcher: fetcher,
//        similarer: similarer
//    }
//})

//.service("pusherService", function () {
//    var pusher = new Pusher("254721");
//    var channel = pusher.subscribe();
//    channel.bind('', function (data) {
//        alert("An event was triggered: " + data.message);
//    })
//    //every user should have their own channel
//    //if a user would like to chat with another user, he/she should subscribe to that user's channel and also bind so that notifications will be received.
//})
