[轉載](http://www.iteye.com/topic/545971)
#jQuery plugin develop
## 一 、類級別的插件開發
### 1.1 添加一個新的全局函數
```java
jQuery.foo=function(){
    alert('plugin develop test');
};
```
####調用該函數
```java
jQuery.foo();//或者
$.foo();
```
### 1.2 使用jQuery.extend(object);
```java
jQuery.extend({foo:function(){
     alert('plugin develop test');
},bar:function(){
     alert('plugin develop test');
}});
```
### 調用該函數
```java
jQuery.foo();//或者
$.foo();
```
### 1.3 使用命名空間
```java
jQuery.PluginTest={
foo:function(){
     alert('plugin develop test');
},bar:function(){
     alert('plugin develop test');    
}
};
```
### 調用該函數
```java
$.PluginTest.foo();//或者
jQuery.PluginTest.foo();
```
---
## 二、 對象級別
### 2.1 形式一
```java
(function($){
    $.fn.extend({
    pluginName:function(){
                 alert('plugin develop test');
},pluginName2:function(){
                 alert('plugin develop test');
}
    });
})(jQuery);
```
### 2.2 形式二
```java
(function($){
    $.fn.pluginName=function(){
     alert('plugin develop test');
};
})(jQuery);
```
### 以上兩種調用方法
```java
$('.something').pluginName();//或者下面
jQuery('.something').pluginName();
```






