/*eslint-env node*/
/*eslint no-console: "error"*/
/*eslint no-console: ["error", { allow: ["Gus"] }] */

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint");


gulp.task("default", ["styles", "lint"], function() {
	gulp.watch("sass/**/*.scss",["styles"]);
	gulp.watch("js/**/*.js",["lint"]);
	// eslint-disable-next-line no-console
	console.log("Gus, just turned on the 'watch' function.");
});

gulp.task("styles", function() {
	gulp.src("sass/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"] //gets the two last versions of every popular browser
		}))
		.pipe(gulp.dest("./css"));
	console.log("Gus, just applied 'styles' function over scss files.");
});

browserSync.init({
	server: "./"
});
browserSync.stream();

gulp.task("lint", () => {
	// ESLint ignores files with "node_modules" paths.
	// So, it's best to have gulp ignore the directory as well.
	// Also, Be sure to return the stream from the task;
	// Otherwise, the task may end before the stream has finished.
	return gulp.src(["**/*.js","!node_modules/**"])
	// eslint() attaches the lint output to the "eslint" property
	// of the file object so it can be used by other modules.
		.pipe(eslint())
	// eslint.format() outputs the lint results to the console.
	// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
	// To have the process exit with an error code (1) on
	// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
	// console.log("Gus, just applied 'lint' function over js files.");

});
