var gulp = require('gulp');
var tap = require('gulp-tap');
var fs = require('fs');
var path = require('path');
var uglify = require('gulp-uglify');
var prettyData = require('gulp-pretty-data');
//********
var sMyAppName = "."; //****Change it to your app name before you run gulpcmd.bat
//********
var sFilename = "Component-preload";
var oComp = {
	name : sMyAppName + "/" + sFilename,
	version : "0.1.0",
	modules : {}
};

gulp.task('streamifyComponentJS', function () {
	console.log('start ComponentJS');
	return gulp.src('Component.js')
	.pipe(uglify())
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/' + path.basename(file.path);
			oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ComponentJS');
});

gulp.task('streamifyViewXML', ['streamifyComponentJS'], function () {
	console.log('start ViewXML');
	return gulp.src('./view/*.xml')
	.pipe(prettyData({
			type : 'minify',
			preserveComments : false
		}))
	.pipe(tap(function (file, t) {
			var fPath = sMyAppName + '/view/' + path.basename(file.path);
			oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ViewXML');
});

gulp.task('streamifyViewJS', ['streamifyViewXML'], function () {
	console.log('start ViewJS');
	return gulp.src('./view/*.js')
	.pipe(uglify())
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/view/' + path.basename(file.path);
				oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ViewJS');
});

gulp.task('streamifyUtilsJS', ['streamifyViewJS'], function () {
	console.log('start ControlJS');
	return gulp.src('./control/*.js')
	.pipe(uglify())
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/control/' + path.basename(file.path);
				oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ControlJS');
});

gulp.task('streamifyModelJSON', ['streamifyUtilsJS'], function () {
	console.log('start ModelJS');
	return gulp.src('./model/*.js')
	.pipe(uglify())
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/model/' + path.basename(file.path);
				oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ModelJS');
});
gulp.task('streamifyModelXML', ['streamifyModelJSON'], function () {
	console.log('start ModelXML');
	return gulp.src('./model/*.xml')
	.pipe(prettyData({
			type : 'minify',
			preserveComments : false
		}))
	.pipe(tap(function (file, t) {
			fPath = sMyAppName + '/model/' + path.basename(file.path);
				oComp.modules[fPath] = file._contents.toString();
			console.log(fPath.toString());
			console.log('__________________');
		}));
	console.log('end ModelXML');
});

gulp.task('myWriteToFile', ['streamifyModelXML'], function () {
	console.log('start writefile');
	var sFileTmp = "jQuery.sap.registerPreloadedModules(" + JSON.stringify(oComp) + ")";
	var sFileNameQ = sFilename + ".js"; //Component-preload.js;
	fs.writeFile(sFileNameQ, sFileTmp,
		function (err) {
		if (err) {
			console.log('It is ERROR!');
			throw err;
		}
		console.log('It is saved!');
	});
	console.log('end writefile');
});

gulp.task('default', ['myWriteToFile']);