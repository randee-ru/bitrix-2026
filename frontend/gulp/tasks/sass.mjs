import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import cleanCSS from 'gulp-clean-css';
import tailwind from 'tailwindcss';

const sass = gulpSass(dartSass);

export const styles = () => {
    return app.gulp.src(app.path.src.css, {sourcemaps: true})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(sass())
        .pipe(postcss([
          tailwind('./tailwind.config.js'),
          autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: false,
        })]))
        .pipe(app.plugins.rename('style.css'))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCSS())
        .pipe(app.plugins.rename('style.min.css'))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream());
}
