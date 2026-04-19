import twig from "gulp-twig";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message%>"
            })
        ))
        .pipe(twig())
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream());
}

export const pages = () => {
    return app.gulp.src(app.path.src.pages)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message%>"
            })
        ))
        .pipe(twig())
        .pipe(app.gulp.dest(app.path.build.pages))
        .pipe(app.plugins.browserSync.stream());
}
