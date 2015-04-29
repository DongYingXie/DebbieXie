var contrlModule = angular.module('contrlModule', ['httpPost']);
contrlModule
	/** [description]
	 *	mainCtrl		主控制器
	 *	navLists		获取菜单的服务------------factory.js
	 *	
	 **/
	.controller('mainCtrl', ['$scope', '$state', 'navLists', function($scope, $state, navLists) {
		$scope.navs = navLists.all();
		$scope.navIndex = 0;
		$scope.clickNav = function(_index) {
			$scope.navIndex = _index;
		}
		$state.go('home');
	}])
	/** [description]
	*	loginCtrl		登录页面的控制器
	*	$localstorage	缓存数据的服务-----------factory.js
	*	
	*  */
	.controller('loginCtrl', function($scope, postData, $localstorage, $state) {
		$scope.form = {
			email: '',
			password: ''
		}
		$scope.formBtnClick = function() {
			if (($scope.form.email != '') && ($scope.form.password != '')) {
				postData(loginUrl, $scope.form).then(function(data) {
					console.log(data);
					if (data.result == 'admin') {
						$state.go('editor');
					} else if (data.result == 'true') {
						$state.go('home');
						$localstorage.set('logined', 'yes');
					} else {
						$state.go('login');
						$localstorage.set('logined', 'no');
					}
				}, function(data) {})
			}
		}
	})
	.controller('homeCtrl', function($scope, getData) {
		getData(homeUrl).then(function(data) {
			$scope.homedatas = data;
		}, function(data) {
			console.log(data);
		})
	})
	/** [description]
	*   detailCtrl		详细页面的控制器
	*   getData			向后台发送get请求的数据的服务------------factory.js
	*   			
	*/
	.controller('detailCtrl', function($scope, $stateParams, getData) {
		console.log($stateParams.detailID);
		getData(homeUrl).then(function(data) {
			$scope.datas = data;
			$scope.data = data[$stateParams.detailID];
		}, function(data) {
			console.log(data);
		})
	})
	/** [description]
	*   editorCtrl		编辑页面的控制器 
	*   postData 		向后台发送post请求的数据的服务------------factory.js
	*   editorBtnClick	编辑页面的post 按钮点击时数据的处理方法
	*/
	.controller('editorCtrl', function($scope, postData, $state) {
		$scope.editorForm = {
			title: '',
			content: ''
		};
		$scope.editorBtnClick = function() {
			console.log($scope.editorForm.title);
			postData(homeUrl, $scope.editorForm).then(function(data) {
				console.log(data.result);
				if (data.result == 'success') {
					$state.go('home');
				} else {
					$scope.editorForm = {
						title: '',
						content: ''
					};
				}
			}, function(data) {
				console.log(data);
			})
		}
	})