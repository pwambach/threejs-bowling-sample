'use strict';

var gulp = require('gulp'),
    useref = require('gulp-useref'),
    copy = require('gulp-copy'),
    deploy = require('gulp-gh-pages');
 
gulp.task('default', ['copy'], function () {
    var assets = useref.assets();
    
    return gulp.src('index.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});


gulp.task('copy', function(){
	gulp.src(
		'bower_components/physijs/examples/js/ammo.js'
	).pipe(gulp.dest('dist/bower_components/physijs/examples/js'));
	return gulp.src(
		'bower_components/physijs/physijs_worker.js'
	).pipe(gulp.dest('dist/bower_components/physijs'));
});

 
gulp.task('deploy', ['default'], function () {
    return gulp.src('./dist/**/*')
        .pipe(deploy({push: false}));
});