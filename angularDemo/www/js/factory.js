var baseUrl = '';
var loginUrl = '/login';
var homeUrl = '/home.json';
var httpPOST = angular.module('httpPost', []);
httpPOST
	/** [description]
	*	postData		向后台发送post请求，获取到相应的数据
	*	_url			后台的API
	*	jsonData		向后台发送的数据 (json)
	*	[使用例子]		postData(_url,jsonData).then(doneCallbacks, failCallbacks)
	*  */
	.factory('postData', function($http, $q) {
		return function(_url, jsonData) {
			var defer = $q.defer();
			$http.post(_url, jsonData, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function(data, status, headers, congfig) {
				defer.resolve(data);
			}).error(function(data, status, headers, congfig) {
				defer.reject(data);
			});

			return defer.promise
		}
	})
	/** [description]
	*	getData			向后台发送post请求，获取到相应的数据
	*	_url			后台的API
	*	[使用例子]		getData(_url).then(doneCallbacks, failCallbacks)
	*	
	*  */
	.factory('getData', function($http, $q) {
		return function(_url) {
			var defer = $q.defer();
			$http.get(_url).success(function(data, status, headers, congfig) {
				defer.resolve(data);
			}).error(function(data, status, headers, congfig) {
				defer.reject(data);
			});

			return defer.promise
		};
	})
	/** [description] 
	*	$localstorage		存取数据
	*	[使用例子]		$localstorage.set('key','value')		保存数据 (key=value)
	*	[使用例子]		$localstorage.get('key')				获取数据 (key=value)
	*	 	
	*  */
	.factory('$localstorage', ['$window', function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			}
		}
	}])
	/** [description]
	*	navLists		获取到页面菜单的数据 
	*	[使用例子]		navLists.all()
	*	
	*  */
	.factory('navLists', function() {
		var lists = {};
		lists.all = function() {
			return [{
				"id": "01",
				"name": "home",
				"link": "#/page/home"
			}, {
				"id": "02",
				"name": "aboutMe",
				"link": "#/page/aboutMe"
			}, {
				"id": "03",
				"name": "register",
				"link": "#/page/register"
			}, {
				"id": "04",
				"name": "login",
				"link": "#/page/login"
			}]
		}
		return lists;
	})