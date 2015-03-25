#af.touchEvent.js 分析；
---
```java
var touch={},touchTimeout;
```
定義了 touch對象變量，touch超時的時間變量；
```java
function parentIfText(node){
    return "tagName" in node ? node :node.parentNode;
}
```
返回touch元素或者touch元素的父元素的標籤名；
```java 
function swipeDirection(x1,x2,y1,y2){
var xDelta=Math.abs(x1-x2),yDelta=Math.abs(y1-y2);
if(xDelta>=yDelta){
    return (x1-x2 > 0 ?"Left":"Right");
}else{
    return (y1-y2 > 0? "Up" :"Down");
}
    
}
```
通過判斷手指移動的xy ，返回滑動的方向；
```java
var longTapDelay=750;
```
定義了長按的時間；
```java
function longTap(){
    if(touch.last&&(Date.now()-touch.last>=longTapDelay)){
    touch.el.trigger("longTap"); //觸發 長按事件；
    touch={};//清空該對象 ，這個很重要；
}
}
```
判斷長按的時間是否超過了定義的長按的時間；超過則，觸發從長按事件；
###touchstart 绑定
```java
$(document.body).bind("touchstart", function(e) {
            swipeCounter=0;
            if (e.originalEvent)
                e = e.originalEvent;
            if (!e.touches || e.touches.length === 0) return;//如果已經有其他的觸發touch，返回；
            var now = Date.now(), delta = now - (touch.last || now);//第一次觸發 touchstart delta=0;第二次觸發是 delta!=0;
            if (!e.touches || e.touches.length === 0) return;
            touch.el = $(parentIfText(e.touches[0].target));
            touchTimeout && clearTimeout(touchTimeout);
            touch.x1 = e.touches[0].pageX;
            touch.y1 = e.touches[0].pageY;
            touch.x2 = touch.y2 = 0;
            if (delta > 0 && delta <= 250)//第二次觸發touchstart ,时间间隔大于0，小于.25s，判斷為双击事件，当手指离开是，将触发双击事件；
                touch.isDoubleTap = true;
            touch.last = now;
            longTapTimer = setTimeout(longTap, longTapDelay);//定時，如果手指没有移动和离开 ，超过.75s,執行longTap 函數，看是否是長按事件；

            if ($.afui.useAutoPressed && !touch.el.attr("data-ignore-pressed"))
                touch.el.addClass("pressed");
            if (prevEl && $.afui.useAutoPressed && !prevEl.attr("data-ignore-pressed") && prevEl[0] !== touch.el[0])
                prevEl.removeClass("pressed");
            prevEl = touch.el;
            parentChecker=false;
            didParentCheck=false;
        })
```
---
###touchmove 绑定
```java
.bind("touchmove", function(e) {
            if(e.originalEvent)
                e = e.originalEvent;
            touch.x2 = e.touches[0].pageX;
            touch.y2 = e.touches[0].pageY;
            //如果手指移动屏幕超过5像素，则触发相应的滑动事件：swipeStart，swipeStartLeft,swipeStartRight,swipeStartUp,swipeStartDown;
            if(!didParentCheck&&(Math.abs(touch.x2-touch.x1)>5||Math.abs(touch.y2-touch.y1)>5))
            {
                var moveX=Math.abs(touch.x2-touch.x1)>5;
                var moveY=Math.abs(touch.y2-touch.y1)>5;

                didParentCheck=true;
                touch.el.trigger("swipeStart",[e]);
                touch.el.trigger("swipeStart" + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)), [touch,e]);
                var parentContainers=touch.el.closest(".swipe, .swipe-reveal, .swipe-x, .swipe-y");
                var elScroller=touch.el.closest(".x-scroll, .y-scroll, .scroll");


                parentChecker=touch.el.closest(".swipe, .swipe-reveal").length!==0;
                if(elScroller.parent(parentContainers).length!==0)
                {
                    parentChecker=false;
                }
                else if(moveX&&touch.el.closest(".swipe-x").length!==0)
                    parentChecker=true;
                else if(moveY&&touch.el.closest(".swipe-y").length!==0)
                    parentChecker=true;
            }

            if($.os.android){
                if(didParentCheck&&parentChecker)
                    e.preventDefault();
            }
            clearTimeout(longTapTimer);
        })
```
---
### touchend 绑定
```java
.bind("touchend", function(e) {
            if(e.originalEvent)
                e=e.originalEvent;
            if (!touch.el)
                return;
            if ($.afui.useAutoPressed && !touch.el.attr("data-ignore-pressed"))
                touch.el.removeClass("pressed");
            if (touch.isDoubleTap) {//如果是双击屏幕，则触发双击事件；
                touch.el.trigger("doubleTap");
                touch = {};
            } else if (touch.x2 > 0 || touch.y2 > 0) {//如果手指移动超过30像素，则触发相应的事件，如swipeRight,swipeLeft,swipeUp,swipeDown;
                (Math.abs(touch.x1 - touch.x2) > 30 || Math.abs(touch.y1 - touch.y2) > 30) &&
                touch.el.trigger("swipe");
                //touch.el.trigger("swipe" + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)), touch);
                //@TODO - don't dispatch when you need to block it (scrolling areas)
                var direction= (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2));
                var scrollDir=".x-scroll";
                var swipeDir=".swipe-x";
                if(direction.toLowerCase()==="up"||direction.toLowerCase()==="down"){
                    scrollDir=".y-scroll";
                    swipeDir=".swipe-y";
                }
                var swipe=touch.el.closest(swipeDir);
                var scroller=touch.el.closest(scrollDir);

                if((swipe.length===0||scroller.length===0)||swipe.find(scroller).length===0)
                {
                    touch.el.trigger("swipe"+direction);
                }

                touch.x1 = touch.x2 = touch.y1 = touch.y2 = touch.last = 0;
            } else if ("last" in touch) { //否则，触发tap事件；
                touch.el.trigger("tap");
                touchTimeout = setTimeout(function() {
                    touchTimeout = null;
                    if (touch.el)
                        touch.el.trigger("singleTap");
                    touch = {};
                }, 250);
            }

        })
        ```