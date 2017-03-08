var gulp = require('gulp');
var concat = require('gulp-concat');
var react = require('gulp-react');
var requirejsOptimize = require('gulp-requirejs-optimize');
var replace = require('gulp-replace');
var del = require('del');
var through = require('through2');
var filepath;


gulp.task('base', function() {
    return gulp
        .src([
            'lib/core/require.js',
            'lib/core/require_config.js'
        ])
        .pipe(concat('base.js'))
        .pipe(gulp.dest('lib/'));
});


gulp.task('replaceJsx', function() {
     gulp.src(['app/**/*.js'])
        .pipe(replace(/jsx!/g, ''))
        .pipe(gulp.dest('_current/'));
});


gulp.task('jsxTojs', function() {
    return gulp.src('app/**/*.jsx')
        .pipe(replace(/jsx!/g, ''))
        .pipe(react())
        .pipe(gulp.dest('_current/'));
});


gulp.task('requirejsBuild', ['jsxTojs', 'replaceJsx'],function() {
    return gulp.src('_current/helloworld/main.*.js')
        // .pipe(through.obj(function(file,enc,cb){
        //      console.log(file.relative);
        //      file.relative = file.relative.replace(/main\..+\.js/g,"");
        //      console.log(filepath);
        //      this.push(file);
        //      cb();
        // }))
        .pipe(requirejsOptimize({
            // //optimize:"none",    
            paths: {
                'react': '../../lib/core/react',
                'react-dom': '../../lib/core/react-dom',
            },
        }))
       .pipe(gulp.dest('./vendor/')); // pipe it to the output DIR  
});

gulp.task('replaceMainJsUrl', function(){
    return gulp.src('../**/*.html',{base: '.'})
        .pipe(replace(/main\..+\.js/g, "vendor/$&"))
        .pipe(gulp.dest('.'));
});


gulp.task('defaultBuild', ['requirejsBuild'], function(){
     return del(['_current/'], {force: true});
});
