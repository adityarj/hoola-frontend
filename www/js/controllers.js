

angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope,userServices,$state,$http,$rootScope) {
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
                $state.go('login')
            }), function (reject) {
                $scope.success = "Please register again, one or more fields are incorrectly filled"
            }
    }


    //success: function(data, textStatus, xhr) {
    //console.log(data);
    // console.log(xhr.getResponseHeader("Content-Length"));


    $scope.login = function (loginDetails) { //requires email and password, demand a login!
        userServices.login(loginDetails)
        .then(function(response) {
            $rootScope.header = response.headers()
            $rootScope.data = response.data.data
        console.log(response.headers());
        $state.go('tab.listings') //to be edited later for main page.
        $scope.loggedIn = true
                    
        }), function (reject) {
            $scope.loggedIn = false
            $scope.loginMessage = "Incorrect email and/or password. Please try again"
            $state.go('tab.login')
        }
    }

    $scope.returnVisit = function (loginDetails) { //requires id and auth_token not working yet
        
        userServices.validateUser(loginDetails)
        .then(function (success){
            $scope.loggedIn = true
            $scope.loginMessage = "Welcome back"
        }, function (reject) {
            $scope.loggedIn = false
            $scope.loginMessage = "Please login again"
            $state.go('tab.login')
        }
            )
    }

    $scope.logout = function (loginDetails) { //accesstoken, uid, client , figure out how to store these values client-side. not working yet
        userServices.logout(loginDetails)
        .then(function (result) {
            $scope.loggedIn = false
            $scope.logoutMessage = "You have successfully logged out!"
            $state.go('login')
        })
    }


    
})

.controller('ListingsCtrl', function (listingServices,$scope,$http,$rootScope,$state) {
    $scope.ListofListings = {}
    $scope.listingDetails = {}
    $scope.PersonalListings = {}
    $scope.listingDetails.id = $rootScope.data.id
    $scope.getMainList = function () {
        listingServices.getAllListings()
        .then(function (result) {
            $scope.ListofListings = result.data //check this result
            console.log($scope.ListofListings);
        })
    }

    $scope.getSingleListing = function (listingDetails) { //put id

        listingServices.getListing(listingDetails)
        .then(function (result) {
            $scope.PersonalListings = result.data //check
        })
    }

    $scope.createListing = function (listingDetails) {
        $scope.listingDetails.Date = Date.new
        
        listingServices.createListing(listingDetails)
        .then(function (result) {
            $rootScope.listingID = result.data.data.id
            $scope.createMessage = "Successfully created new listing!"
            console.log("posted");
            $scope.getMainList() //refresh listings
        }),
        function (failure) {
            alert("Failed to create a listing");
        }
    }
    //title: listingDetails.title,
    //destination: listingDetails.destination,
    //description: listingDetails.description,
    //departure: listingDetails.Date, //help with this pleaseee? Not sure if date format is correct.
   // user_id: listingDetails.id
    

    $scope.updateListing = function(listingDetails){
        listingServices.updateListing(listingDetails)
        .then(function (result) {
            $scope.updateMessage = "Successfully updated your listing."
        }),
        function (failure) {
            alert("Failed to update listing, check required fields!");
        }
    }

    $scope.deleteListing = function (listingDetails) {
        listingServices.deleteListing(listingDetails)
        .then(function (result) {
            $scope.deleteMessage = "You have deleted your listing."
        })
    }
    
    $scope.changeTab = function (tab) {

        $state.go(tab);
    }

    $scope.getMainList()

})


.controller('MessageController', function ($scope,$http) {
    $scope.items = [];
    $scope.showCalculator = false;
    var pusher = new Pusher('6e940f018f1b0b662664',{
        encrypted: 'true'
    });

    var channel = pusher.subscribe('ch-public-chat');

    channel.bind('new-message',function(data) {
        console.log(data);
        $scope.items.push(data);
    });

    var retrieveItems = function() {
        console.log('get');
   //      $http.get('/api/get')
			// .success(function (items) {
			// 	$scope.items = items;
			// });
    };

    $scope.addItem = function(Message) {
        if ($scope.showCalculator) {
            var messagePlate = {
                channel: 'public-chat',
                message: {
                    author: 'Kevin Tan',
                    text: $scope.BalanceTab.amount+'/'+$scope.BalanceTab.activity,
                    type: 'Calculator'
                }
            }
        } else {
            var messagePlate = {
                channel: 'public-chat',
                message: {
                    author: 'Kevin Tan',
                    text: $scope.Message,
                    type: 'Message'
                }
            };
        }
        
        if ($scope.Message!=null) {
            $http.post('http://hoola-rails.herokuapp.com/api/v1/chats',angular.toJson(messagePlate, true));
        }
        $scope.Message = null;
        $scope.showCalculator = false;
    };

    $scope.triggerInputHandler = function(Message) {
        if (Message == '@hoola') {
            //Trigger api.ai 
            $scope.Message = Message+' ';
        } else if (Message == '@money') {
            $scope.showCalculator = true;
        } else {
            $scope.showCalculator = false;
        }

    };

    retrieveItems();
})

.controller('StayController', function ($scope,$http) {
    //Replace this initialization with global scope values once completed
    $scope.disabledStatus = false;
    $scope.hotelBookingDetails.id = $rootScope.listingID
    $scope.Reservation = {
        people: 2,
        city: 'Tokyo',
        checkIn: '',
        checkOut: ''
    };

    $scope.listings = [];

    

    $scope.fetchHotels = function() {
        $http.get('https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty&locale=en-US&currency=SGD&_format=for_search_results_with_minimal_pricing&_limit=10&_offset=0&fetch_facets=true&guests=1&ib=true&ib_add_photo_flow=true&'
            +'location='+$scope.Reservation.city+'&min_bathrooms=0&min_bedrooms=0&'+
            +'min_beds='+$scope.Reservation.people+'&min_num_pic_urls=10&price_max=210&price_min=40&sort=1&user_lat=37.3398634&user_lng=-122.0455164')
            .success(function (listings) {
                $scope.disabledStatus = true;
                $scope.listings = listings.search_results;
        });
    };

    $scope.bookHotel = function(address) {
        var listing = {
            checkIn: $scope.Reservation.checkIn,
            checkOut: $scope.Reservation.checkOut,
            addresss: address
        };
    };

})

.controller('FlightController',function($scope,$http,flightBookingService) {

    $scope.airports = {
        SIN: {
            city: 'Singapore',
            time: 480
        },
        NRT: {
            city: 'Tokyo',
            time: 540
        },
        TPE: {city: 'Taipei'},
        MNL: { city: 'Manila'},
        CTU: {city: 'Chengdu'},
        SGN: {city: 'Hanoi'},
        PEK: {city: 'Beijing'},
        PVG: {city: 'Shanghai'}, 
        PEN: {
            city: 'Penang',
            time: 480
        },
        DMK: {
            city: 'Bangkok',
            time: 420
        },
        BKK: {
            city: 'Bangkok',
            time: 420
        },
        DPS: {
            city: 'Bali',
            time: 420
        },
        KUL: {
            city: 'Kuala Lumpur',
            time: '480'
        } 
    };

    $scope.disabledStatus = false;

    $scope.Reservation = {
        people: 2,
        origin: 'SIN',
        destination: 'NRT',
        depart: ''
    };

    $scope.listings = [];

    $scope.fetchFlights = function() {
        console.log('fetching flights')
        $scope.disabledStatus = true;
        $http.get('https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=HmYcharZZH0rBuoOvwHP4H96b6ZYXqnu&origin='
            +$scope.Reservation.origin+'&destination='
            +$scope.Reservation.destination+'&departure_date='
            +moment($scope.Reservation.depart).format('YYYY-MM-DD')+'&number_of_results=5')
            .success(function(listings) {
                
                $scope.disabledStatus = false;
                
                console.log(listings.results);
                for (i = 0;i < listings.results.length;i++) {
                    for (j = 0; j < listings.results[i].itineraries.length;j++) {
                        var previousArrivalTime = null;
                        var totalFlightTime = 0;
                        var arriveSubstr = 1;
                        var departSubstr = 1;
                        listings.results[i].itineraries[j].outbound.flights.forEach(function(flight) {

                            var departTime = new moment(flight.departs_at.substr(11),'HH:mm')
                            var arrivalTime = new moment(flight.arrives_at.substr(11),'HH:mm')

                            if (previousArrivalTime) {
                                if (departTime < previousArrivalTime) {

                                    totalFlightTime+= (+departTime.hours() + 24 - +previousArrivalTime.hours())*60 + (+departTime.minutes() - +previousArrivalTime.minutes());
                                } else {
                                    totalFlightTime+= (+departTime.hours() - +previousArrivalTime.hours())*60 + (+departTime.minutes() - +previousArrivalTime.minutes());
                                }
                            }

                            if (departTime < arrivalTime) {
                                totalFlightTime+= (+arrivalTime.hours() - +departTime.hours())*60 + (+arrivalTime.minutes() - +departTime.minutes());
                            } else {
                                totalFlightTime+= (+arrivalTime.hours() + 24 - +departTime.hours())*60 + (+arrivalTime.minutes() - +departTime.minutes());
                            }
                            previousArrivalTime = arrivalTime;

                        });

                        totalFlightTime -= $scope.airports['NRT'].time - $scope.airports['SIN'].time;

                        listings.results[i].itineraries['total_hrs'] = Math.floor(totalFlightTime/60);
                        listings.results[i].itineraries['total_min'] = totalFlightTime%60;

                    }
                }
                $scope.listings = listings.results;
            });
     };

    $scope.totalFlightTime = [];

    $scope.bookFlight = function(flightDetails) {

        var flight1 = flightDetails.itineraries[0].outbound.flights[0]

        if (flightDetails.itineraries[0].outbound.flights[1]) {
            var flight2 = flightDetails.itineraries[0].outbound.flights[1];
            var flight_info = {
                origin: flight1.origin.airport,
                destination: flight2.destination.airport,
                depart: new moment(flight1.departs_at.substr(11),'HH:mm'),
                arrival: new moment(flight2.arrives_at.substr(11),'HH:mm'),
                date: new moment($scope.Reservation.depart),
                flight_num: flight1.marketing_airline+flight1.flight_number,
            }
        } else {
            var flight_info = {
                origin: flight1.origin.airport,
                destination: flight1.destination.airport,
                departure_time: new moment(flight1.departs_at.substr(11),'HH:mm'),
                arrival_time: new moment(flight1.arrives_at.substr(11),'HH:mm'),
                flight_date: new moment($scope.Reservation.depart),
                flight_number: flight1.marketing_airline+flight1.flight_number,
            }
        }

        console.log(flight_info);

        flightBookingService.createBooking(flight_info);


        //listing: flightBookingDetails.listing,
        //origin: flightBookingDetails.origin,
        //destination: flightBookingDetails.destination,
        //flight_number: flightBookingDetails.flight_number,
        //flight_date: flightBookingDetails.flight_date,
        //price: flightBookingDetails.price
        

        
        //Perform post request here, change params if needed
        
    };
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
});



