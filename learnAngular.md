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

#### 使用 $http 構建restful 架構；
####  $resource 中的資源的方法；
#### 通過$resource 