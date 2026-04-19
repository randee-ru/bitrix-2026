import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.mjs";
import { clean } from "./gulp/tasks/clean.mjs";
import { server } from "./gulp/tasks/server.mjs";

import { html, pages } from "./gulp/tasks/html.mjs";
import { styles } from "./gulp/tasks/sass.mjs";
import { scripts } from "./gulp/tasks/scripts.mjs";
import { sprite, optimizeSvg, optimizeJpg, optimizePng, createWebp, createAvif } from "./gulp/tasks/images.mjs";

const htmlTasks = gulp.parallel(html, pages)

function watcher() {
    gulp.watch(path.watch.assets, copy)
    gulp.watch(path.watch.html, styles)
    gulp.watch(path.watch.html, htmlTasks)
    gulp.watch(path.watch.css, styles)
    gulp.watch(path.watch.js, scripts)
    gulp.watch(path.watch.sprite, sprite)
}

const mainTasks = gulp.parallel(htmlTasks, styles, scripts);
const buildTasks = gulp.parallel(htmlTasks, styles, scripts, optimizeJpg, optimizePng, optimizeSvg)

const start = gulp.series(clean, copy, sprite, mainTasks, gulp.parallel(watcher, server));
const dev = gulp.series(clean, copy, sprite, buildTasks, gulp.parallel(watcher, server));
const build = gulp.series(clean, copy, sprite, buildTasks);
const buildSmall = gulp.series(clean, copy, sprite, styles, scripts);

export {start, dev, build, buildSmall, sprite, createWebp as webp}
