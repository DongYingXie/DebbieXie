* 表单验证 自定义验证 error
### express+angular
新建一個 express 項目
```
express -e express_angular 
cd express_angular && sudo npm install -d
```
* 修改ejs文件名為html 
```
//app.js 
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); //替换文件扩展名ejs为html
```
* 修改views 文件下的index.ejs為index.html error.ejs 為error.html 
* 同時去掉文件裏面的<%= %> 
* 當然要添加angular.js 到index.html 中；

[流浪猫の窝](http://www.cnblogs.com/liulangmao/p/3719130.html)
### ng-model-options
控制ng-model何时进行同步。
如
1.当某个确定的事件被触发的时候 2.在指定的防抖动延迟时间之后,这样视图值就会在指定的时间之后被同步到模型. 
```java
ng-model-options="{updateOn:'blur'}"//失去焦点时同步，更新
ng-model-options="{debounce:1000}" //有一秒的延迟；
```
#### $watch 
###### $scope.$watch(watchObj,watchCallBack,ifDeep)
watchObj 需要被檢測的對象，該對象可能是 摸個數據，表達式，或者一個函數（）
watchCallBack 當被檢測的對象發生變化時，執行該回調函數；改回調函數有三個參數
watchCallBack(newValue,oldValue,scope);
* newValue 被檢測對象watchObj的新的值
* oldValue 被檢測對象watchObj的老的值
* scope 當前控制器的$scope;
```html 
<!DOCTYPE html>
<html lang="en" ng-app='myApp'>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script> 
    <script type="text/javascript" src="main.js"></script>
</head>
<body>
    <div ng-controller="watchController">
        <input type="text" ng-model="yourInput">
        <div>{{result}}</div>
    </div>
</body>
</html>
```
main.js 
```
var myappModule=angular.module('myApp',[]);

myappModule.controller('watchController',  function($scope){
    $scope.yourInput=1;
    $scope.watchCallBack=function(newValue,oldValue,scope){
        $scope.result=$scope.yourInput*4;
        console.log(newValue);
        console.log(oldValue);
    }
    $scope.$watch('yourInput',$scope.watchCallBack,false);
});
```

####css 樣式 
###### 點擊高亮效果

```html 
<!DOCTYPE html>
<html lang="en" ng-app='myApp'>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script> 
    <script type="text/javascript" src="main.js"></script>
    <style type="text/css">
    .active{
    background-color: red;
    color:#fff;
    }
    </style>
</head>
<body>
    <div ng-controller="liController">
        <ul>
            <li ng-repeat="li in lis" ng-class="{active:$index==selted}" ng-click="choose($index)">
                {{li.title}}
            </li>
        </ul>
    </div>
</body>
</html>
```
點擊li 列表 通過 ng-click="choose($index)" ,將當前的$index 傳入到$scope.selted;
當ng-class="{active:$index==selted}" 為真，添加class active
main.js 
--- 
```
var myappModule=angular.module('myApp',[]);
myappModule.controller('liController',function($scope){
    $scope.lis=[{"title":"text1"},{"title":"text2"},{"title":"text3"},{"title":"text4"}];
    $scope.choose=function(_index){
        $scope.selted=_index;
    }
})
```

#### module 服務
在不同的控制器中需要用到相同的數據時，就需要 用到服務；
* 先創建一個模塊；
* 然後通過以下三種API來創建服務；
* 使用時，注入到需要用到的模塊中；
```
var FactoryModule=angular.module('factoryData',[]);
FactoryModule.factory('factoryLists', function(){
    var lists={};
    lists.all=function(){
        return [{
            "title":"textli1"
        },{
            "title":"textli2"
        },{
            "title":"textli3"
        }]
    }
    return lists;
})
```
---
```

var myappModule=angular.module('myApp',['factoryData']);

myappModule.controller('factoryController',  function($scope,factoryLists){
$scope.lists=factoryLists.all();
});
```
---
```html
<!DOCTYPE html>
<html lang="en" ng-app='myApp'>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script> 
    <script type="text/javascript" src="main.js"></script>
</head>
<body>
    <div ng-controller="factoryController">
         <ul>
            <li ng-repeat="li in lists">
                {{li.title}}
            </li>
         </ul>
    </div>
</body>
</html> 
```
#### 指令修改dom
* 新建一個模塊
* 然後再建一個指令；
```javascript
var directiveModule=angular.module('directiveModule',[]);
directiveModule.directive('directiveName',  function(){
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            
        }
    };
});
```
其中：
* directive 傳入二個參數
  1. 第一個參數為 指令的名稱；
  2. 第二個參數為 一個工廠函數
  3.  該函數返回一個對象，對象的link 方法的函數有四個參數：
  * $scope 獲取外層scope的引用
  * iElm 它所在的DOM元素
  * attrs 傳遞給指令的一個屬性數組
  * controller DOM元素上的控制器
```
myappModule.directive('testDirective',  function(){
    // Runs during compile
    return {
         restrict: 'EACM', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
            iElm.bind('click', function(event) {
                /* Act on the event */
                iElm.css({
                    'color': 'blue'
                });
            });
        }
    };
});
```
---
```html 
         <test-directive>testDirective color</test-directive>
         <div class="test-directve">test-directve color</div>
```
---

#### $http.get 
$http.get('url',{}).sucess(function(data,status,config){}).error(function(data,status,header,config){});
* url: 請求的路徑
* json對象： 請求的參數配置，如{params:{id:5}} 得到的路徑為 url?id=5
* sucess 請求成功的囘調
* error 請求失敗的囘調
*  sucess 和 error 有四個參數 ：
    - data 返回的數據
    - status 返回的響應的狀態碼
    - headers 
    - congfig 請求的配置對象；
     ```
     {
        method:"GET",
        url:"/api/user"
        parmas:{id:5}

         }
     ```
 新建一個模塊 負責http 請求
```java
var httpGet=angular.module('httpGet',[]);
httpGet.factory('httpGets', function($http,$q){
    return function (){
        var defer=$q.defer();
        $http.get('app.js').success(function(data,status,header){
            defer.resolve(data);
        }).error(function(data,status,header){
            defer.reject(data);
        });
        return defer.promise;
    };
})
```
---
注入以上的模塊'httpGet'，同時注入依賴 'httpGets'
```java
var myappModule=angular.module('myApp',[httpGet']);

myappModule.controller('factoryController',  function($scope,httpGets){
$scope.getHttp=function(){
httpGets().then(function(data){
    console.log(data);
}, function(data){
    console.log(data);
})
}
});
```
---
### $http.post
$http.post('url',{}，{}).success(function(data,status,header,config){}).error(function(data,status,header,config){});
* url 請求的路徑
* 請求發送的數據：json 對象 {name:'debbie'}
* 請求配置的參數 ：json 對象 {params:{id:5}} 得到實際的路徑 url?id=5
* 其他的跟get 一樣；
```java
var httpPOST=angular.module('httpPost',[]);
httpPOST.factory('getData',function($http,$q){
    return function(){
        var defer = $q.defer();
        $http.post('http://localhost:3000/path/',jsonData,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).success(function(data,status,headers,congfig){
            defer.resolve(data);
        }).error(function(data,status,headers,congfig){
            defer.reject(data);
        });

        return defer.promise
    }
});
```
---
```java
$scope.postHttp=function(){
    getData().then(function(data){console.log(data)}, function(data){console.log(data)});
};
```
> 不要忘記注入以上的模塊'httpPost'，同時注入依賴 'getData'

## 过滤器 filter
filter 
* 过滤不符合条件的，
* 或者格式化数据；
内置的过滤器有许多，现在自定义自己的过滤器；

```java
var myapp=angular.module("myapp",[]);
myapp.controller('filterCtrl', ['', function(){
    
}]).filter("filterName",function(){
    var filterString=function(_data,_condition){
        return _data+' -->debbie';
    }
    return filterString;
});
```
定义了一个 名为 filterName 的过滤器， 返回一个 数据filterString，filterString就是由 需要过滤器过滤的数据加' -->debbie' 字符串而来；
```html
    <input ng-model="myyear">
    {{myyear | filterName}}
```
---
再来一个时间戳 转为时间格式的过滤器
```java
var myapp=angular.module("myapp",[]);
myapp.controller('filterCtrl',function($scope){
$scope.time="1427858024";   
}).filter('timeFormat',function(){
    var timeString=function(_time,_condition){
        return new Date(parseInt( _time ) * 1000).toLocaleString().replace(/:d{1,2}$/,' ');
    };
    return timeString;
 });
```
```
    <input ng-model="time">
    {{time | timeFormat}} 
```
# ngSanitize 
## ng-bind-html
* 这个相当于jq里面的 .text() .html() 
* 需要 angular-animate.min.js 在模块中添加ngSanitize 依赖；
```java
var myapp=angular.module("myapp",['ngSanitize']);
myapp.controller('filterCtrl',function($scope){
$scope.htmls='<a href="http://baidu.com/">baidu</a>';   
})
```
```html
    <p ng-bind-html="htmls"></p>
```
#### 注意：$sanitize会把标签的属性都移除,以及绑定在元素上的事件.仅保留了标签和内容,所以有时还是需要用到下面的这个的

* 还是可以用$sec 这个内置的服务；
```java
var myapp=angular.module("myapp",['ngSanitize']);
myapp.controller('filterCtrl',function($scope,$sce){
$scope.htmls='<a href="http://baidu.com/" ng-click="test()">baidu</a>'; 
$scope.SCEhtml=$sce.trustAsHtml($scope.htmls);
})
```
```html 
<p ng-bind-html="SCEhtml"></p>
```
### 注意：$sce 保留了所有的属性和事件;
# linky 过滤器；
linky 根据ng-bind-html里面的文本的内容（http https FTP mailto /email） 转换成HTML的链接 即加个a 便签 或者设置 a 便签打开方式 (_blank,_self)；
```java
var myapp=angular.module("myapp",['ngSanitize']);
myapp.controller('filterCtrl',function($scope,$sce){
$scope.htmls='<a href="http://baidu.com/" ng-click="test()">baidu</a> http://google.com';   
})
``` 
```html
    <p ng-bind-html="htmls | linky"></p>
    <p ng-bind-html="htmls | linky :'_blank'"></p>
```
# 路由 $stateProvider /ui-router
* 页面加载'angular-ui-router.min.js 和一个 ui-view 属性的便签；
* 模块加入依赖 ui-router
```html
<div ui-view></div> 
```
```java
var myapp=angular.module('myapp',['ui.router']);
myapp.config(function($stateProvider) {
    $stateProvider.state('demo1',{
        url:'/demo1',
        templateUrl:'demo.html'
    })
})
```
嵌入 
```java 
var myapp=angular.module('myapp',['ui.router']);
myapp.config(function($stateProvider) {
    $stateProvider.state('parent1',{
        url:'/parent1',
        templateUrl:'parent.html'
    }).state('parent1.child',{
        url:'/child',
        templateUrl:'child.html'
    }).state('parent2',{
        url:'/parent2',
        templateUrl:'parent.html'
    })
})
```
```html 
<body ng-app="myapp" ng-controller="routerCtrl">
<a href="#/parent1">parent1</a>
<a href="#/parent2">parent2</a>
<a href="#/parent1/child">child</a>
<button ng-click="goto()">go parent1.child</button>
<div ui-view></div>
</body>
```