const gulp = require('gulp');
const sass = require('gulp-sass');
const sync = require('browser-sync');

const prefixer = require('gulp-autoprefixer');

/* Configs */
const themePath = 'static';

/* Tasks */
const sassPortfolio = () => (
  gulp
    .src('src/' + themePath + '/scss/**/**.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer('Last 50 versions'))
    .pipe(gulp.dest('src/' + themePath + '/css/'))
    .pipe(sync.stream())
);

const sassWatch = () => {
  gulp.watch('src/' + themePath + '/scss/**/**.scss', sassPortfolio);
};

const browserSync = () => {
  sync.init({
    server: { baseDir: './src/' },
    ghostMode: false
  });
};

/* Tasks Declaration */
gulp.task('sass-portfolio', sassPortfolio);
gulp.task('sass-watch', sassWatch);
gulp.task('browser-sync', browserSync);
gulp.task('duran', gulp.series('sass-portfolio', gulp.parallel('browser-sync', 'sass-watch')));