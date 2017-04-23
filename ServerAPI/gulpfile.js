
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
gulp.task('run', function () {
  var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000,
            'IP':'localhost'
        },
        watch: ['app.js', 'controller/**/*.js', 'api/**/*.js', 'model/**/*.js']
    };
	nodemon(options).on('restart', function(){
		console.log('restarted!');
	});
});