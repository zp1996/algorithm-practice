const gulp = require("gulp"),
	babel = require("gulp-babel"),
	jshint = require("gulp-jshint"),
	less = require("gulp-less"),
	uglify = require("gulp-uglify"),
	cleanCss = require("gulp-clean-css"),
	concat = require("gulp-concat"),
	imagemin = require("gulp-imagemin"),
	browserSync = require("browser-sync"),
	browserify = require('gulp-browserify'),
	filePath = [
		`${__dirname}/src/less/**/*.less`,
		`${__dirname}/src/js/**/*.js`,
		`${__dirname}/src/images/*`
	],
	tasks = ["less", "js", "image"];

gulp.task("less", () => {
	return gulp.src(filePath[0])
						 .pipe(less())
						 .pipe(concat("main.min.css"))
						 .pipe(cleanCss())    // 上线后打开
						 .pipe(gulp.dest("./build/css"))
						 .pipe(browserSync.reload({stream: true}));
});

gulp.task("image", () => {
	return gulp.src(filePath[2])
						 .pipe(imagemin())
						 .pipe(gulp.dest("./build/images"));
});

gulp.task("es2015", () => {
	return gulp.src(filePath[1])
						 .pipe(babel({
						 		presets: ['es2015']
						 }))
						 .pipe(gulp.dest("./build/js"));
});

gulp.task("js", ["es2015"], () => {
	return gulp.src(`${__dirname}/build/js/index.js`)
						 .pipe(browserify({
			          insertGlobals : true,
			          debug : !gulp.env.production
			       }))
			     	 .pipe(jshint())
						 .pipe(uglify())    // 上线后打开
			       .pipe(gulp.dest("./build/js"))
			       .pipe(browserSync.reload({stream: true}));
});

gulp.task("server", tasks, () => {
	browserSync.init({
    proxy: "http://localhost:3000/"
  });
});

gulp.task("watch", () => {
	gulp.watch(filePath, tasks);
});

gulp.task("default", ["server", "watch"]);