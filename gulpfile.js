const { src, dest, series, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps')
const cleanCss = require('gulp-clean-css')
const del = require('del')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const browserSync = require('browser-sync').create()
// const uglify = require('gulp-uglify-es').default

const clean = () => {
    return del(['./dist'])
}

const styles = () => {
    return src('./src/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist'))
        .pipe(browserSync.stream())
}

const html = () => {
    return src('./src/*.html')
        .pipe(dest('./dist'))
        .pipe(browserSync.stream())
}

const fonts = () => {
    return src('./src/fonts/**/*')
        .pipe(dest('./dist/fonts'))
}

const images = () => {
    return src([
        './src/images/*.webp',
        './src/images/*.webm',
        './src/images/*.ico',
        './src/images/*.svg',
    ])
        // .pipe(image())
        .pipe(dest('./dist/images'))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src('./src/*.js')
        .pipe(sourcemaps.init())
        .pipe(webpackStream({
            output: {
                filename: 'main.js',
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist'))
        .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    watch('./src/*.css', styles)
}

watch('./src/*.css', styles)
watch('./src/index.html', html)
watch('./src/fonts/*.woff2', fonts)
watch('./src/images/**', images)
watch('./src/*.js', scripts)

exports.styles = styles
exports.scripts = scripts
exports.html = html
exports.images = images
exports.fonts = fonts
exports.watchFiles = watchFiles

exports.default = series(clean, html, scripts, fonts, images, styles, watchFiles)