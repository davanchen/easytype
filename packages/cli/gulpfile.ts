import * as yargs from 'yargs';
import gulp = require('gulp');
import ts = require('gulp-typescript');
import merge = require('merge2');
import { EasyTransformer } from '@easytype/compiler';

const argv = yargs
  .option('dist', {
    default: 'dist',
    type: 'string',
  })
  .argv;

const tsProject = ts.createProject('tsconfig.json', {
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  declaration: false,
  getCustomTransformers: () => ({
    before: [
      EasyTransformer(),
    ]
  })
});
const dtsProject = ts.createProject('tsconfig.json');
const outPut = tsProject.options.outDir || argv.dist;

gulp.task('copy', function () {
  return gulp
    .src([`package.json`, `Readme.md`], { allowEmpty: true })
    .pipe(gulp.dest(outPut));
});

gulp.task('build', function () {
  const tsResult = tsProject.src()
    .pipe(tsProject(ts.reporter.longReporter()))
    .js.pipe(gulp.dest(outPut));

  if (dtsProject.options.declaration) {
    return merge([
      dtsProject.src()
        .pipe(dtsProject())
        .dts.pipe(gulp.dest(outPut)),
      tsResult
    ]);
  } else {
    return tsResult;
  }
});

gulp.task('default', gulp.series('build', 'copy'));
