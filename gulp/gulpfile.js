//引入插件
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var maps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = {
  scss: './www/sass/base.scss',
  css: './www/css/',
  mapcss: './www/sass/'
}
//使用connect启动一个Web服务器
gulp.task('connect', function() {
  connect.server({
    root: 'www',
    livereload: true
  });
});
//編譯sass
gulp.task('sass', function() {
  gulp.src(path.scss)
    .pipe(maps.init())
    //.pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    //.pipe(prefix('last 2 versions'))
    .pipe(maps.write())
    .pipe(gulp.dest(path.css))
});
//設置sass map 
gulp.task('autoprefix', function() {
  gulp.src(path.css)
    .pipe(prefix('last 5 versions', '> 1%', 'ie8'))
    .pipe(gulp.dest(path.mapcss));
});
//拼接、简化JS文件   
gulp.task('scripts', function() {
  gulp.src('./www/js/*/js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
// 重新加载index.html
gulp.task('html', function() {
  gulp.src('./www/*.html')
    .pipe(connect.reload());
});
//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function() {
  gulp.watch(['./www/css/*.css', './www/sass/*.scss', './www/index.html', './www/script/*.*', './www/page/*.html'], ['html', 'sass', 'autoprefix']);
});
//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch']);