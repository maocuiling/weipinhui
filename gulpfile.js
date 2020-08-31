var { series, src, dest, watch } = require("gulp");

var minifyCss = require("gulp-cssmin");
var minifyHtml = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var clean = require("gulp-clean");

function doCss() {
    return src(["./origin/css/**/*.scss", "./origin/css/**/*.css"])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(dest("./publish/css/"));
}

function doJS() {
    return src("./origin/js/**/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(dest("./publish/js"));
}
function doImage() {
    return src("./origin/images/**/*.*")
        .pipe(dest("./publish/images/"))
}

function doHTML() {
    return src("./origin/**/*.html")
        .pipe(minifyHtml({
            collapseWhitespace: true
        }))
        .pipe(dest("./publish/"))
}

function doResource() {
    return src("./origin/resource/**/*.*")
        .pipe(dest("./publish/resource/"))
}


function doClean() {
    return src("./publish/", { read: false, allowEmpty: true })
        .pipe(clean())
}

function webServer() {
    // 定位资源 
    return src("./publish")
        .pipe(webserver({
            host: "localhost",
            port: 3009,
            livereload: true,
            open: "./html/index.html",
            proxies: [
                {
                    source: "/PHP/",
                    target: "http://10.3.144.80:80/PHP/"

                },
            ]
        }))
}
function refresh() {
    return watch("./origin", series(doClean, [doImage, doCss, doHTML, doJS, doResource]))
}
module.exports.css = doCss;
module.exports.webserver = webServer;
module.exports.doResource = doResource;
module.exports.a = series(doClean, [doCss, doHTML, doJS, doResource], webServer);
module.exports.aa = series(webServer, refresh);