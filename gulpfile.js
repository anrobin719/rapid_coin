const { series, src, dest, watch } = require("gulp");

const concat = require("gulp-concat");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const gulp_remove_logging = require("gulp-remove-logging");

// COMBINE JS FILES
function combineJs() {
  return src([
    "src/js/clock.js",
    "src/js/coin.js",
    "src/js/sideDrawer.js",
    "src/js/coinOrder.js",
    "src/js/cryptoNews.js"
  ])
    .pipe(concat("all.js"))
    .pipe(gulp_remove_logging())
    .pipe(dest("dist/js"));
}

// COMPILE SASS TO CSS & AUTOPREFIX
function compileSass() {
  return src("src/sass/main.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass().on("error", function(err) {
        log.error(err.message);
      })
    )
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

// WATCH CHANGES
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch("src/sass/**/*.scss", compileSass);
  watch("index.html").on("change", browserSync.reload);
  watch("src/js/*.js").on("change", browserSync.reload);
}

exports.watch = watchFiles;
exports.default = series(combineJs, compileSass);
