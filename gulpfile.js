var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;

var jshint = require('gulp-jshint');

gulp.task('lint', function() {
	return gulp.src(['*.js', 'js/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('protractor', function() {
	return gulp.src(["./src/tests/*.js"])
    	.pipe(
    		protractor({
        		configFile: "config/spec-e2e.js"
    		}
    	)
    ).on('error', function(e) { throw e; });
});

gulp.task('default', ['lint']);