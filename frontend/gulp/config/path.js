import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../../..");
const buildFolder = path.join(projectRoot, "www", "local", "templates", "legacy", "build");
const srcFolder = path.resolve(__dirname, "../../src");

export const path = {
    build: {
        assets: `${buildFolder}/assets`,
        html: `${buildFolder}/`,
        pages: `${buildFolder}/pages/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/assets/image/`,
        svg: `${buildFolder}/assets/image/`,
        sprite: `${buildFolder}/assets/image/`
    },
    src: {
        assets: `${srcFolder}/assets/**/*.*`,
        html: `${srcFolder}/*.twig`,
        pages: `${srcFolder}/pages/*.twig`,
        css: `${srcFolder}/sass/style.scss`,
        js: `${srcFolder}/js/main.js`,
        images: `${srcFolder}/assets/image/**/*.*{jpg,jpeg,png}`,
        svg: `${srcFolder}/assets/image/**/*.svg`,
        sprite: `${srcFolder}/assets/image/sprite/*.svg`,
    },
    watch: {
        html: `${srcFolder}/**/*.twig`,
        css: `${srcFolder}/sass/**/*.scss`,
        assets: `${srcFolder}/assets/**/*.*`,
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/assets/image/**/*.*{jpg,jpeg,png}`,
        sprite: `${srcFolder}/assets/image/sprite/*.svg`,
    },
    clean: buildFolder,
    srcFolder: srcFolder,
    buildFolder: buildFolder,
}
