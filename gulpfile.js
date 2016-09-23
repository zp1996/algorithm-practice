const gulp = require("gulp"),
	jade = require("gulp-jade"),
	uglify = require("gulp-uglify"),
	babel = require("gulp-babel"),
	less = require("gulp-less"),
	browserify = require("gulp-browserify"),
	filePath = [
		`${__dirname}/src/js/**/*.js`,
		`${__dirname}/views/jade/**/*.jade`,
		`${__dirname}/src/less/**/*.less`
	];

gulp.task("js", () => {
	gulp.src(filePath[0])
			.pipe(babel({
				presets: ["es2015"],
				plugins: ['transform-runtime']
			}))
		  .pipe(browserify({
        insertGlobals : true,
        debug : !gulp.env.production
      }))
			.pipe(uglify())
			.pipe(gulp.dest("./build/js"));
});

gulp.task("jade", () => {
	gulp.src(filePath[1])
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest("./views/html"));
});

gulp.task("less", () => {
	gulp.src(filePath[2])
			.pipe(less())
			.pipe(gulp.dest("./build/css"));
});

gulp.watch(filePath, ["js", "jade", "less"]);

gulp.task("default", ["js", "jade", "less"]);