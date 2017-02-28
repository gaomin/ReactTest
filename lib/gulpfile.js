var gulp = require('gulp');
var concat = require('gulp-concat')


gulp.task('base', function() {
    return gulp
    .src([
        'core/require.js',
        'core/require_config.js'
        ])
    .pipe(concat('base.js'))
    .pipe(gulp.dest(''));
});