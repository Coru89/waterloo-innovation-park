
// Load plugins
const gulp = require('gulp');

var browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const changed = require('gulp-changed');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

const clean = require('gulp-clean');

const browsersync = require('browser-sync').create();

// Clean assets

function clear() {
    return gulp.src('/source/scripts/*.ts', {
            read: false
        })
        .pipe(clean());
}

function ts() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['./source/scripts/index.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(gulp.dest('./web/assets/scripts'))
    .pipe(browsersync.stream());
}


// CSS function 
function css() {
    const source = './source/styles/**/*.scss';

    return gulp.src(source)
        .pipe(changed(source))
		.pipe(sass({
			style: 'compressed',
			errLogToConsole: false,
			onError: function(err) {
				return notify().write(err);
			}
		}))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./web/assets/styles'))
        .pipe(browsersync.stream());
}

function imgPassThru() {
    const source = './source/images/**/*.*';

    return gulp.src(source)
        .pipe(changed(source))
        .pipe(gulp.dest('./web/assets/images'))
        .pipe(browsersync.stream());
}



// Watch files
function watchTask(){
	browsersync.init({
		proxy: {
			target: "https://waterloo-innovation-park.ddev.site/"
    	}
	});

	gulp.watch('templates/**/*.twig').on('change', browsersync.reload);
	gulp.watch('source/styles/**/*.scss', css); // change to your source directory
	gulp.watch('source/scripts/*.ts', ts); // change to your source directory
  gulp.watch('source/images/*.*', imgPassThru); // change to your source directory
}

// Tasks to define the execution of the functions simultaneously or in gulp.series

exports.watchTask = watchTask;
exports.ts = ts;
exports.css = css;
exports.imgPassThru = imgPassThru;
exports.clear = clear;

// Default Gulp task 
exports.default = gulp.series(
    clear,
	css,
	ts,
    imgPassThru,
	watchTask
);




exports.watch = watchTask;
//exports.default = gulp.series(clear, gulp.parallel(css));
    