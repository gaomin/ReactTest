var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');
var requirejsOptimize = require('gulp-requirejs-optimize');
var replace = require('gulp-replace');
var del = require('del');


gulp.task('base', function() {
    return gulp
        .src([
            'core/require.js',
            'core/require_config.js'
        ])
        .pipe(concat('base.js'))
        .pipe(gulp.dest(''));
});


gulp.task('replaceJsx', function() {
    return gulp.src(['../**/*.js'])
        .pipe(replace(/jsx!/g, ''))
        .pipe(gulp.dest('./current/'));
});


gulp.task('jsxTojs', function() {
    return gulp.src('../**/*.jsx')
        .pipe(replace(/jsx!/g, ''))
        .pipe(react())
        .pipe(gulp.dest('./current/'));
});


gulp.task('requirejsBuild', ['replaceJsx', 'jsxTojs'],function() {
    return gulp.src('../**/current/main.*.js')
        .pipe(requirejsOptimize({
            //baseUrl: './',
            //optimize:"none",    
            paths: {
                'react': '../../lib/core/react',
                'react-dom': '../../lib/core/react-dom',
            },
        }))
        .pipe(gulp.dest('./vendor/')); // pipe it to the output DIR  
});


gulp.task('defaultBuild', ['requirejsBuild'], function(){
     return del(['./current/'], {force: true});
});
