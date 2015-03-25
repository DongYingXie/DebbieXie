#ionic sass 
####用sass 編寫ionic 項目
```
$ ionic start ionic_sass blank 
$ cd ionic_sass 
$ ionic setup sass
```
手動修改
######index.html 文件的頭部
* 去掉
```html 
 <link href="lib/ionic/css/ionic.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
```
* 添加
```html 
  <link href="css/ionic.app.css" rel="stylesheet">
```
######在index.html 中修改div 
```html 
  <ion-pane>
      <ion-header-bar class="bar-positive">
          <h1 class="title">myNetwork</h1>
      </ion-header-bar>
      <ion-header-bar class="bar-subheader bar-positive">
          <h1 class="title">Subheader</h1>
      </ion-header-bar>
      <ion-content class="padding">
          <ion-list>
              <button class="button button-positive">button</button>
              <button class="button button-block button-outline button-positive">
                  Outlined Button
              </button>
              <button class="button button-block button-positive">Block Button</button>
              <button class="button button-block button-clear  button-positive">Clear Button</button>
              <ion-item href="#" class="item-positive">Item</ion-item>
              <ion-toggle toggle-class="toggle-positive">Toggle</ion-toggle>
              <div class="item range range-positive">
                  <i class="icon ion-ios7-sunny-outline"></i>
                  <input type="range" name="volume" min="0" max="100" value="33">
                  <i class="icon ion-ios7-sunny"></i>
              </div>
              <a class="item" href="#">
                  Badges
                  <span class="badge badge-positive">0</span>
              </a>
          </ion-list>
      </ion-content>
      <ion-footer-bar class="bar-positive">
          <h1 class="title">Footer</h1>
      </ion-footer-bar>
  </ion-pane>
```
#####修改scss/ionic.app.scss 文件 ，這裏我們值修改 $positive 的值；
```java
// The path for our ionicons font files, relative to the built CSS in www/css
$ionicons-font-path: "../lib/ionic/fonts" !default;
$positive:#00ff00 !default;
// Include all of Ionic
@import "www/lib/ionic/scss/ionic";
```

