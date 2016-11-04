'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('default', ['watch', 'browser-sync']);

gulp.task('workflow', function () {
	gulp.src('sass/**/*.scss')
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
