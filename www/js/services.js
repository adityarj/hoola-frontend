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
    var herokuUrl = "http://hoola-sutd.herokuapp.com/api/user/";
    var localHost = "http://localhost:8100/user";
    function newUser(name,password,email) {
        return $http({
            method: 'GET',
            url: 'http://hoola-sutd.herokuapp.com/api/user/new',
            data: {
                name: name,
                password: password,
                email: email
            }
        })
    }

    function login(email, password) {
        return $http({
            method: 'GET',
            url: 'http://hoola-sutd.herokuapp.com/api/user/login',
            data: {
                email: email,
                password: password
                //will get true response
            }
        })
        //probably add .then(result) { ...} and set login parameter to true
    }

    function logout(email) {
        return $http.get('http://hoola-sutd.herokuapp.com/api/user/logout', email);
    }

    return {
        newUser: newUser,
        login: login,
        logout: logout
    };
})

.service('queryServices',function($http){

    function adder(email,start, end, city, attributes) {
        return $http({
            method: 'POST',
            url: 'http://hoola-sutd.herokuapp.com/api/query/add',
            data: {
                email: email,
                start: start,
                end: end,
                city: city,
                attributes: attributes
            }
        })
    }

    function deleter(email) {
        return $http.delete('http://hoola-sutd.herokuapp.com/api/query/delete',email);
        //each user can only have 1 listing.
    }

    function fetcher() {
        return $http.get('http://hoola-sutd.herokuapp.com/api/query/fetch',email);
    }
    

    function similarer(city) {
        return $http.get('http://hoola-sutd.herokuapp.com/api/query/similar', city);
        
    }

    return {
        adder: adder,
        deleter: deleter,
        fetcher: fetcher,
        similarer: similarer
    }
})

//.service("pusherService", function () {
//    var pusher = new Pusher("254721");
//    var channel = pusher.subscribe();
//    channel.bind('', function (data) {
//        alert("An event was triggered: " + data.message);
//    })
//    //every user should have their own channel
//    //if a user would like to chat with another user, he/she should subscribe to that user's channel and also bind so that notifications will be received.
//})
