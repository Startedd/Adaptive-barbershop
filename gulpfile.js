'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');

gulp.task('default', ['browser-sync', 'watch', 'images']);

gulp.task('workflow', function () {
	gulp.src('sass/**/*.scss')
        .pipe(plumber())
		.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/**/*.scss', ['workflow']);
	gulp.watch(['./*.{js,css,html}', 'css/*.css', 'js/*.js']).on('change', browserSync.reload);
});

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('images', function () {
    gulp.src("img/**/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel:3}),
            imagemin.jpegtran({progressive:true})
        ]))
        .pipe(gulp.dest("img"));
})
