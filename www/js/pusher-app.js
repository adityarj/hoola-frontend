angular.module('pusherInterface', ['doowb.angular-pusher'])
	.controller('MessageController', ['$scope','$http','Pusher', function ($scope,$http,Pusher) {
		$scope.items = [];

		Pusher.subscribe('my-channel','notification',function(item) {
			$scope.items.push(item);
		})

		var retrieveItems = function() {
			console.log('get');
			$http.get('/api/get')
				.success(function (items) {
					$scope.items = items;
				});
		};

		$scope.addItem = function(item) {
			console.log('post');
			$http.post('/api/post',item);
		};

		retrieveItems();
	}]);
	.config('PusherServiceProvider',function (PusherServiceProvider) {
		PusherServiceProvider.setToken('6ad8804a371caa2d7eeb').setOptions({

		});
	})
	