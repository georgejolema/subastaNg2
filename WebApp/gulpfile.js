var gulp = require('gulp'),
    clean = require('gulp-clean'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json'),
    server = require('gulp-express'),
    runSequence = require('run-sequence'),
    watch = require('gulp-watch'),
    wiredep = require('wiredep').stream,
    sass = require('gulp-sass'),    
    webpack = require('webpack-stream'),
    uglify = require('gulp-uglify'),
    optimizer=require('webpack').optimize.CommonsChunkPlugin,
    inlineNg2Template = require('gulp-inline-ng2-template'),
    htmlMinifier = require('html-minifier'),
    inject = require('gulp-inject'),
    path={
        app:'tmp/',
        source:'web/',
        finalApp:'../WebServer/dist/'
    };


gulp.task('cleanFinal', function () {
    return gulp.src(path.finalApp, {read: false})
        .pipe(clean({force: true}));
});
gulp.task('clean', function () {
    return gulp.src(path.app, {read: false})
        .pipe(clean());
});
gulp.task('cleanproject', function(){
    return gulp.src(path.source+'**/*.js', {read: false})
        .pipe(clean());
});
gulp.task('copy', function () {
    return gulp.src([  
        path.app+'/dist/*.js',
        path.source+'index.html'
    ])
    .pipe(gulp.dest(path.finalApp));
});
gulp.task('generateTempFiles', function(){
    return gulp.src([path.source+'**/*']).pipe(gulp.dest(path.app));
});
gulp.task('transpileSass', function(){
    return gulp.src([path.source+'**/*.sass', path.source+'**/*.scss'])
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(path.app));
});
gulp.task('transpile', function ()
{
    var tsResult = tsProject.src([
            "typings/**/*.ts",
            path.app + "**/*.ts"
    ]).pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('./'));
});
gulp.task('inject', function(){
    var options = {
        bowerJson: require('../WebServer/bower.json'),
        directory: '../WebServer/bower_components',
        ignorePath: '../bower_components'
    };
    var injectSrc = gulp.src([path.finalApp+'*.css',
                              path.finalApp+'*.js'], {
        read: false
    });
	
    return gulp.src(path.finalApp+'index.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, {ignorePath: '../WebServer/dist/'}))
        .pipe(gulp.dest(path.finalApp));
});
gulp.task('removeTemplates', function () {
    return gulp.src(path.app+'/**/*.ts')
        .pipe(inlineNg2Template(
            { 
                base: path.app,
                templateProcessor: function (path, ext, file, cb) {
                    var minifiedFile = htmlMinifier.minify(file, {
                        collapseWhitespace: true,
                        caseSensitive: true,
                        removeComments: true,
                        removeRedundantAttributes: true
                        });
                        cb(null, minifiedFile);
                }
            }))
        .pipe(gulp.dest(path.app));
});
gulp.task('webpack', function() {
  return gulp.src(path.app+'/main.js')
    .pipe(webpack({
       entry: {
           'base.app': './'+path.app+'/main.js',
            'app.vendor': './'+path.app+'/vendor.js'
        },
        output:{
            filename: '[name].js'
        },
        plugins:[ new optimizer({
                    name: ['base.app', 'app.vendor']
                    })
        ]
    }, require('webpack')))
    .pipe(gulp.dest(path.app+'/dist'));
});
gulp.task('compress', function () {
  return gulp.src(path.app+'/dist/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.app+'/dist'));

});
gulp.task('build.prod',function () {
     runSequence('cleanFinal', 'generateTempFiles', 'transpileSass', 'removeTemplates', 'transpile','cleanproject' , 'webpack', 'compress', 'copy', 'inject','clean');
});
gulp.task('build',function () {
    runSequence('cleanFinal', 'generateTempFiles', 'transpileSass', 'removeTemplates', 'transpile','cleanproject' , 'webpack', 'copy', 'inject','clean');
});
gulp.task('run',['build'], function () {
    return gulp.watch(['web/**/*.ts','web/**/*.scss','web/**/*.html'], function (event) {
        runSequence('build');
    });
});


