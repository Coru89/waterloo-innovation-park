        
const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
//const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const typescript = require('gulp-typescript');

// Clean assets

function clear() {
    return src('./web/assets/*', {
            read: false
        })
        .pipe(clean());
}

function ts() {
    return src('./source/scripts/*.ts')
	.pipe(typescript({
		noImplicitAny: true,
		outFile: 'output.js'
	}))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(dest('./web/assets/scripts'))
	.pipe(browsersync.stream());
}


// CSS function 

function css() {
    const source = './source/styles/**/*.scss';

    return src(source)
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
        .pipe(dest('./web/assets/styles'))
        .pipe(browsersync.stream());
}

function imgPassThru() {
    const source = './source/images/**/*.*';

    return src(source)
        .pipe(changed(source))
        .pipe(dest('./web/assets/images'))
        .pipe(browsersync.stream());
}

// Watch files
function watchTask(){
	browsersync.init({
		proxy: {
			target: "https://waterloo-innovation-park.ddev.site/"
    	}
	});

	watch('templates/**/*.twig').on('change', browsersync.reload);
	watch('source/styles/**/*.scss', css); // change to your source directory
	watch('source/scripts/*.ts', ts); // change to your source directory
    watch('source/images/*.*', img); // change to your source directory
}

// Tasks to define the execution of the functions simultaneously or in series

exports.watchTask = watchTask;
exports.ts = ts;
exports.css = css;
exports.imgPassThru = imgPassThru;
exports.clear = clear;

// Default Gulp task 
exports.default = series(
    clear,
	css,
	ts,
    imgPassThru,
	watchTask
);




exports.watch = watchTask;
//exports.default = series(clear, parallel(css));
    