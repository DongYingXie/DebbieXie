var app = angular.module('myapp', ['contrlModule', 'ui.router']);
app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/page/home',
		controller:'homeCtrl',
		templateUrl: 'page/home.html'
	}).state('detail',{
		url:'/page/detail/:detailID',
		controller:'detailCtrl',
		templateUrl:'page/detail.html'
	})
	.state('aboutMe', {
		url: '/page/aboutMe',
		templateUrl: 'page/aboutMe.html'
	}).state('register', {
		url: '/page/register',
		templateUrl: 'page/register.html'
	}).state('login', {
		url: '/page/login',
		controller: 'loginCtrl',
		templateUrl: 'page/login.html'
	}).state('editor',{
		url:'/page/editor',
		controller: 'editorCtrl',
		templateUrl:'page/editor.html'
	})
})