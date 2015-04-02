#Template 模板使用；
* div 有个ID 为_divId;
* template 也有个ID 为_templateId;
* 有个数据源 data；
* 把数据源data 放进模板中；
```html
<div id="content"></div>
```
```java
<script id="test" type="text/html">
{{if isAdmin}}

<h1>{{title}}</h1>
<ul>
    {{each list as value }}
        <li>索引 ：{{value}}</li>
    {{/each}}
</ul>

{{/if}}
</script>
```
```java
    var data = {
                title: '基本例子',
                isAdmin: true,
                list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
            };
```
```java
pushTemplate('test','content',data);
//上面的pushTemplate 是我封装了一下的简单函数；
    function pushTemplate(_templateId,_divId,_data){
        var html = template(_templateId, _data);
        document.getElementById(_divId).innerHTML = html;
    }
```
#### template 有个辅助方法 用于过滤某些数据，或者对数据进行格式化；
```java
template.helper('filterName',function(_data,_format){
    return newFilterData;
})
```
使用方式
```html 
{{data | filterName:'format'}}
```
#### template 默认是把数据转为字符串的，也就是说可以不进行转义
* {{# }} 就是不进行转义
* {{}} 为转换为字符串；
不进行转义的好处 例如 数据是一个'<img src='logo.png'>'我希望它就是一个标签，显示图片，而不是把它当成字符串显示，这是不进行转义就可以了
```java
    <script>
    var data = {
        value: '<img src="logo.png"> '
    };
    var html = template('test', data);
    document.getElementById('content').innerHTML = html;
    </script>
```
```java
    <script id="test" type="text/html">
    <p>不转义：{{#value}}</p>
    <p>默认转义： {{value}}</p>
    </script>
```