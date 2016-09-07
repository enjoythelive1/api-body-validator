const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const merge2 = require('merge2');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', function () {
    var tsResult = gulp.src(['src/**/*.ts'])
        .pipe(ts(tsProject));
    return merge2([
        tsResult.js.pipe(gulp.dest('dist')),
        tsResult.dts.pipe(gulp.dest('dist'))
    ]);
});

gulp.task('clean', function () {
    return gulp.src('/dist', {read: false}).pipe(clean({force: true}));
});

gulp.task('default', ['clean', 'compile']);

gulp.task('watch', function () {
    return gulp.watch(['src/**/*.ts'], ['compile'])
});
