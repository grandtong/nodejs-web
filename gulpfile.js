var gulp = require('gulp'),
    less = require('gulp-less');
 
gulp.task('testLess', function () {
    gulp.src(['src/less/*.less','!src/less/extend/{reset,test}.less'])
        .pipe(less())
        .pipe(gulp.dest('public/stylesheets'));
});
 
gulp.task('testWatch', function () {
    gulp.watch('src/**/*.less', ['testLess']); //当所有less文件发生改变时，调用testLess任务
});