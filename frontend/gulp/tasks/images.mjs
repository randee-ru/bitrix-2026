import imagemin from 'gulp-imagemin';
import svgo from 'imagemin-svgo';
import svgstore from 'gulp-svgstore';
import pngQuant from 'imagemin-pngquant';
import mozJpeg from 'imagemin-mozjpeg';
import webp from 'gulp-webp';
import avif from 'gulp-avif';

export const sprite = () =>
    app.gulp
        .src(app.path.src.sprite)
        .pipe(svgstore({inlineSvg: true}))
        .pipe(app.plugins.rename('sprite.svg'))
        .pipe(app.gulp.dest(app.path.build.sprite));

export const optimizeSvg = () =>
    app.gulp.src(`${app.path.build.images}**/*.svg`)
        .pipe(
            imagemin([
                svgo({
                    plugins: [
                        {
                            name: 'removeViewBox',
                            active: false,
                        },
                        {
                            name: 'removeRasterImages',
                            active: true,
                        },
                        {
                            name: 'removeUselessStrokeAndFill',
                            active: false,
                        }],
                })]))
        .pipe(app.gulp.dest(app.path.build.images));

export const optimizeJpg = () =>
    app.gulp
        .src(`${app.path.build.images}**/*.{jpg,jpeg}`)
        .pipe(imagemin([mozJpeg({quality: 90, progressive: true})]))
        .pipe(app.gulp.dest(app.path.build.images));

export const  optimizePng = () =>
    app.gulp
        .src(`${app.path.build.images}**/*.png`)
        .pipe(
            imagemin([
                pngQuant({
                    speed: 1,
                    strip: true,
                    dithering: 1,
                    quality: [0.8, 0.9],
                })]))
        .pipe(app.gulp.dest(app.path.build.images));

/*
  Optional tasks
  ---------------------------------

  Используйте отличное от дефолтного значение root, если нужно обработать отдельную папку в image,
  а не все изображения в image во всех папках.

  root = '' - по дефолту webp,avif добавляются и обновляются во всех папках в src/image/
  root = 'content/' - webp добавляются и обновляются только в src/image/content/
*/

export const createWebp = () => {
    const root = '';
    return app.gulp
        .src(`${app.path.srcFolder}/assets/image/${root}**/*.{png,jpg}`)
        .pipe(webp({quality: 90}))
        .pipe(app.gulp.dest(`${app.path.build.images}${root}`));
};

export const createAvif = () => {
    const root = '';
    return app.gulp
        .src(`${app.path.srcFolder}/assets/image/${root}**/*.{png,jpg}`)
        .pipe(avif({quality: 90}))
        .pipe(app.gulp.dest(`${app.path.build.images}${root}`));
};
