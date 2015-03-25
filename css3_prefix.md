### 處理CSS3 前綴的方式
#### 在sublime text 3 安裝Autoprefixer
* 打開sublime Text 3 同時按下 command+shift+p
* 輸入 install package
* 再輸入 Autoprefixer 
使用方法 同時按下 command+shift+p 選擇 Autoprefixer 處理CSS
或者 直接同時按下 shift+command+9 (看個人的設置)
---
### Gulp中配置Autoprefixer
```
npm install gulp-autoprefixer --save-dev
```
在gulpfile.js 中
```java
// include gulp
var gulp = require('gulp'); 

// include plugin
var autoprefix = require('gulp-autoprefixer');

// task
gulp.task('styles', function() {
  gulp.src(['./src/styles/*.css'])
    .pipe(autoprefix('last 2 versions'))
    .pipe(gulp.dest('./build/styles'));
});
```
### 直接編寫一個 prefixer.scss 文件 處理CSS3 前綴
新建一個_prefixer.scss 文件_
```java
//************************************************************************//
// Example: @include prefixer(border-radius, $radii, webkit ms spec);
//************************************************************************//
$prefix-for-webkit:    true !default;
$prefix-for-mozilla:   true !default;
$prefix-for-microsoft: true !default;
$prefix-for-opera:     true !default;
$prefix-for-spec:      true !default; // required for keyframe mixin

@mixin prefixer ($property, $value, $prefixes) {
  @each $prefix in $prefixes {
    @if $prefix == webkit {
      @if $prefix-for-webkit {
        -webkit-#{$property}: $value;
      }
    }
    @else if $prefix == moz {
      @if $prefix-for-mozilla {
        -moz-#{$property}: $value;
      }
    }
    @else if $prefix == ms {
      @if $prefix-for-microsoft {
        -ms-#{$property}: $value;
      }
    }
    @else if $prefix == o {
      @if $prefix-for-opera {
        -o-#{$property}: $value;
      }
    }
    @else if $prefix == spec {
      @if $prefix-for-spec {
        #{$property}: $value;
      }
    }
    @else  {
      @warn "Unrecognized prefix: #{$prefix}";
    }
  }
}

@mixin disable-prefix-for-all() {
  $prefix-for-webkit:    false;
  $prefix-for-mozilla:   false;
  $prefix-for-microsoft: false;
  $prefix-for-opera:     false;
  $prefix-for-spec:      false;
}


```
使用上面的_prefixer.scss 文件_
```
.testone{
    @include prefixer(border-radius, 5px, webkit ms spec);  
}
```
得到的結果如下
```
.testone {
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  border-radius: 5px; }
```