/** -----------------------------
 * import
 ----------------------------- */
var gulp = require("gulp"),
    ejs = require("gulp-ejs"),
    inline = require("gulp-inline-css"),
    plumber = require("gulp-plumber"),
    replace = require("gulp-replace"),
    sass = require("gulp-sass"),
    fs = require("fs"),
    rename = require("gulp-rename");

/** -----------------------------
 * const
 ----------------------------- */
var DEV_IMAGE_URL = "/images";

/** -----------------------------
 * command
 ----------------------------- */
gulp.task("ejs:dev", function () {
    return gulp
        .src(["./src/templates/**/*.ejs", "!./src/templates/_*/**/*.ejs"])
        .pipe(plumber())
        .pipe(ejs({ image_url: DEV_IMAGE_URL }, {}))
        .pipe(rename({ extname: ".html" }))
        .pipe(gulp.dest("./tmp/dev/"));
});

gulp.task("sass", function () {
    return gulp
        .src(["./src/stylesheets/**/*.scss", "!./src/stylesheets/_*/**/*.scss"])
        .pipe(
            sass({
                outputStyle: "expanded",
            }).on("error", sass.logError)
        )
        .pipe(gulp.dest("./tmp/css/"));
});

gulp.task("inline:dev", function (done) {
    var fileList = [];

    fs.readdir("./tmp/dev/", function (error, files) {
        if (error) throw error;

        files
            .filter(function (file) {
                return fs.statSync("./tmp/dev/" + file).isDirectory();
            })
            .forEach(function (file) {
                fileList.push(file);
            });

        if (fileList.length > 0) {
            fileList.forEach(function (file) {
                fs.readFile(
                    "./tmp/css/" + file + "/styles.css",
                    "utf-8",
                    function (error, content) {
                        if (error) throw error;

                        return gulp
                            .src(["./tmp/dev/" + file + "/*.html"])
                            .pipe(plumber())
                            .pipe(
                                inline({
                                    extraCss: content,
                                    applyStyleTags: true,
                                    applyLinkTags: false,
                                    removeStyleTags: false,
                                    preserveMediaQueries: true,
                                })
                            )
                            .pipe(replace(/\t/g, ""))
                            .pipe(gulp.dest("./public/" + file + "/"));
                    }
                );
            });
        }
    });
    done();
});

gulp.task("serve-image", function (done) {
    gulp.src(["./src/images/**/*"])
        .pipe(plumber())
        .pipe(gulp.dest("./public/images/"));
    done();
});

gulp.task("imgsrc-replace", function (done) {
    fs.readFile("./src/img_src_replace.json", "utf-8", function (
        error,
        content
    ) {
        if (error) throw error;
        var pathList = JSON.parse(content);

        var gulpTask = gulp.src(["./public/**/index.html"]).pipe(plumber());

        for (var key in pathList) {
            if (pathList.hasOwnProperty(key)) {
                var val = pathList[key];
                var imgSrc = `${DEV_IMAGE_URL}/${key}`;

                gulpTask.pipe(replace(imgSrc, val));
            }
        }

        return gulpTask.pipe(gulp.dest("./prod/"));
    });
    done();
});

gulp.task("build:dev", function (done) {
    gulp.series("ejs:dev", "sass", "inline:dev");
    done();
});

gulp.task(
    "watch",
    gulp.series(gulp.parallel("build:dev", "sass", "serve-image"), function (
        done
    ) {
        gulp.watch("./src/templates/**/*.ejs", gulp.task("ejs:dev"));
        gulp.watch("./src/stylesheets/**/*.scss", gulp.task("sass"));
        gulp.watch(["./src/images/**/*"], gulp.task("serve-image"));
        gulp.watch("./tmp/dev/**/*", gulp.task("inline:dev"));
        gulp.watch("./tmp/css/**/*", gulp.task("inline:dev"));
        gulp.watch(["./public/**/index.html"], gulp.task("imgsrc-replace"));
        done();
    })
);

gulp.task("default", gulp.task("watch"));
