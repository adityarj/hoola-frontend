angular.module('starter.services', [])

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
                
            }
        })
        //probably add .then(result) { ...} and set login parameter to true
    }

    function logout(loginDetails) {
        return $http({
            method: 'DELETE',
            url: localHost + 'sign_out',
            data: {
                "access-token": loginDetails.access-token, //... can't put access-token
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

    getAllListings = function () {  //index
        return $http({
            method: 'GET',
            url: localHost2,
        })
    }

  
    getListing = function(id){
        return $http({
            method: 'GET',
            url: localHost2 + id,
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
    
    return {
        getAllListings: getAllListings,
        getListing: getListing,
        createListing: createListing,
        updateListing: updateListing,
        deleteListing: deleteListing
    }
    
})
    //implement stay controller and flight booking controller, find a way to restrict chat.
.service('flightBookingService', function(){
    var localHost3 = "http://localhost:3000/api/v1/flight_bookings";
    getAllFlightBookings = function () { //will get object json if successful, error description if error.

        return $http({
            method: 'GET',
            url: localHost3
        })
    }

    getSingleFlightBooking = function (flightBookingDetails) { //will get object json if successful, error description if error.

        return $http({
            method: 'GET',
            url: localHost3 + flightBookingDetails.id,
            data: {
                id: id
            }
        })
    }

    createFlightBooking = function (flightBookingDetails) { //will get object json if successful, error description if error.

        return $http({
            method: 'POST',
            url: localHost3,
            data: {
                listing: flightBookingDetails.listing,
                origin: flightBookingDetails.origin,
                destination: flightBookingDetails.destination,
                flight_number: flightBookingDetails.flight_number,
                flight_date: flightBookingDetails.flight_date,
                price: flightBookingDetails.price
            }
        })
    }

    updateFlightBooking = function (flightBookingDetails) { //will get object json if successful, error description if error.

        return $http({
            method: 'PUT',
            url: localHost3 + flightBookingDetails.id,
            data: {
                listing: flightBookingDetails.listing,
                origin: flightBookingDetails.origin,
                destination: flightBookingDetails.destination,
                flight_number: flightBookingDetails.flight_number,
                flight_date: flightBookingDetails.flight_date, //is this datenew
                price: flightBookingDetails.price
            }
        })
    }

    deleteFlightBooking = function (flightBookingDetails){ //will get object json if successful, error description if error.

        return $http({
            method: 'DELETE',
            url: localHost3 + flightBookingDetails.id,
        })
    }

    return {
        getAllFlightBookings: getAllFlightBookings,
        getSingleFlightBooking: getSingleFlightBooking,
        createFlightBooking: createFlightBooking,
        updateFlightBooking: updateFlightBooking,
        deleteFlightBooking: deleteFlightBooking
    }

})

.service('hotelBookingService', function (hotelBookingServices) {
    var localHost4 = "http://localhost:3000/api/v1/accommodation_bookings";
    getAllHotelBookings = function () { //will get object json if successful, error description if error.

        return $http({
            method: 'GET',
            url: localHost4
        })
    }

    getSingleHotelBooking = function (hotelBookingDetails) { //will get object json if successful, error description if error.

        return $http({
            method: 'GET',
            url: localHost4 + hotelBookingDetails.id,
            data: {
                id: id
            }
        })
    }

    createHotelBooking = function (hotelBookingDetails) { //will get object json if successful, error description if error.

        return $http({
            method: 'POST',
            url: localHost4,
            data: {
                listing: hotelBookingDetails.listing,
                city: hotelBookingDetails.city,
                address: hotelBookingDetails.address,
                check_in: hotelBookingDetails.check_in,
                check_out: hotelBookingDetails.check_out,
                price: hotelBookingDetails.price
            }
        })
    }

    updateHotelBooking = function (hotelBookingDetails) { //will get object json if successful, error description if error.

        return $http({
            method: 'PUT',
            url: localHost4 + hotelBookingDetails.id,
            data: {
                listing: hotelBookingDetails.listing,
                origin: hotelBookingDetailss.origin,
                destination: hotelBookingDetails.destination,
                flight_number: hotelBookingDetails.flight_number,
                flight_date: hotelBookingDetails.flight_date, //is this datenew
                price: hotelBookingDetails.price
            }
        })
    }

    deleteHotelBooking = function (hotelBookingDetails) { //will get object json if successful, error description if error.

        return $http({
            method: 'DELETE',
            url: localHost4 + hotelBookingDetails.id,
        })
    }

    return {
        getAllHotelBookings: getAllHotelBookings,
        getSingleHotelBooking: getSingleHotelBooking,
        createHotelBooking: createHotelBooking,
        updateHotelBooking: updateHotelBooking,
        deleteHotelBooking: deleteHotelBooking
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
