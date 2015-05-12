/*global -$ */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    rename: {
        'gulp-download-electron': 'downloadelectron'
    }
});

var argv = require('minimist')(process.argv.slice(2));
var packagejson = require('./package.json');

var config = {
    env: process.env,
    dev: process.argv.indexOf('release') === -1,
    beta: argv.beta
};

gulp.task('download', function(cb) {
    $.downloadelectron({
        version: packagejson['electron-version'],
        outputDir: 'cache'
    }, cb);
});

gulp.task('copy', function() {
    gulp.src('app/index.html')
        .pipe(gulp.dest('build'))
        .pipe($.if(config.dev, $.livereload()));

    gulp.src('app/fonts/**')
        .pipe($.if(config.dev, $.changed('build')))
        .pipe(gulp.dest('build/fonts'))
        .pipe($.if(config.dev, $.livereload()));

    gulp.src('package.json')
        .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
    return gulp.src('app/**/*.js')
        .pipe($.if(config.dev, $.changed('build')))
        .pipe($.plumber(function(error) {
            $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message));
            this.emit('end');
        }))
        .pipe($.sourcemaps.init())
        .pipe($.babel({blacklist: ['regenerator']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('build'))
        .pipe($.if(config.dev, $.livereload()));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{cleanupIDs: false}]
        })))
        .pipe(gulp.dest('build/images'));
});

gulp.task('styles', function() {
    return gulp.src('app/styles/main.scss')
        .pipe($.plumber(function(error) {
            $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message));
            this.emit('end');
        }))
        .pipe($.if(config.dev, $.changed('build')))
        .pipe($.if(config.dev, $.sourcemaps.init()))
        .pipe($.sass({
            outputStyle: 'nested', // libsass doesn't support expanded yet
            precision: 10
        }).on('error', $.sass.logError))
        .pipe($.if(config.dev, $.sourcemaps.write()))
        .pipe(gulp.dest('build/styles'))
        .pipe($.if(!config.dev, $.csso()))
        .pipe($.concat('main.css'))
        .pipe($.if(config.dev, $.livereload()));
});

gulp.task('clean', require('del').bind(null, ['build']));

gulp.task('build', ['download', 'copy', 'js', 'images', 'styles'], function() {
    gulp.watch('app/index.html', ['copy']);
    gulp.watch('app/**/*.js', ['js']);
    gulp.watch('app/images/**', ['images']);
    gulp.watch('app/styles/**/*.scss', ['styles']);

    $.livereload.listen();

    var env = config.env;

    env.NODE_ENV = 'development';

    if (process.platform === 'win32') {
        gulp.src('').pipe($.shell(['cache\\electron.exe ./build'], {
            env: env
        }));
    } else {
        gulp.src('').pipe($.shell(['./cache/Electron.app/Contents/MacOS/Electron ./build'], {
            env: env
        }));
    }
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
