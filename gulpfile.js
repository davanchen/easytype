const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const shell = require('gulp-shell')

const source = 'packages';
const dist = './build';
const pkgPath = path.join(process.cwd(), source)
const options = { verbose: true };
const rootPkgPath = path.join(process.cwd(), 'package.json');

const modules = fs
  .readdirSync(pkgPath)
  .filter(
    file => fs.statSync(path.join(pkgPath, file)).isDirectory()
  );

const packages = {};
const dependencies = {}

function getPackageConfig (module) {
  const pkg_file = path.join(pkgPath, module, 'package.json');
  if (fs.existsSync(pkg_file)) {
    return require(pkg_file);
  }
  return null;
}

function writePackageConfig (module, cfg) {
  const pkg_file = path.join(pkgPath, module, 'package.json');
  fs.writeFileSync(pkg_file, JSON.stringify(cfg, null, 3));
}

function addDependencies (module) {
  const cfg = getPackageConfig(module);
  if (cfg) {
    dependencies[cfg.name] = '^' + cfg.version;
  }
  const pkg = require(rootPkgPath);

  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const key in deps) {
    dependencies[key] = deps[key];
  }
}

function addTSProjects (module) {
  let options = {};
  packages[module] = ts.createProject(`packages/${module}/tsconfig.json`, options);
}

function addModuleTasks (module) {
  const _dependencies = {};
  const sync = (deps) => {
    for (const key in deps) {
      const ver = dependencies[key];
      if (ver) {
        deps[key] = ver;
      }
      _dependencies[key] = deps[key];
    }
  }

  gulp.task(`${module}:sync`, (done) => {
    const pkg = require(rootPkgPath);
    const cfg = getPackageConfig(module);

    if (cfg) {
      sync(cfg.dependencies);
      sync(cfg.devDependencies);
      sync(cfg.peerDependencies);

      if (pkg) {
        cfg.description = pkg.description;
        cfg.author = pkg.author;
        cfg.license = pkg.license;
      }

      writePackageConfig(module, cfg);
    }
    console.log(_dependencies);
    done();
  });

  gulp.task(`${module}:build`, () => {
    return packages[module]
      .src()
      .pipe(packages[module]())
      .pipe(gulp.dest(`${dist}/${module}`));
  });


  gulp.task(`${module}:copy`, () => {
    return gulp
      .src([`${source}/${module}/package.json`, `${source}/${module}/Readme.md`], { allowEmpty: true })
      .pipe(gulp.dest(`${dist}/${module}`))
  });

  gulp.task(module, gulp.series(
    `${module}:sync`,
    `${module}:build`,
    shell.task(`cd ${source}/${module} && npm version patch `, options),
    `${module}:copy`,
    shell.task(`cd ${dist}/${module} && cnpm publish`, options)
  ));
}

modules.forEach(module => {
  addDependencies(module);
  addTSProjects(module);
  addModuleTasks(module)
})


// 编译所有模块
gulp.task('build', gulp.series(modules));


gulp.task('watch', function () {
  modules.forEach(module => {
    gulp.watch(
      [`${source}/${module}/**/*.ts`, `!${source}/${module}/**/*.d.ts`],
      gulp.series(module),
    );
  });
});


gulp.task('clean:output', function () {
  return gulp
    .src(
      [`${source}/**/*.js`, `${source}/**/*.d.ts`, `${source}/**/*.js.map`, '!**/node_modules/**'],
      {
        read: false,
      },
    )
    .pipe(clean());
});

gulp.task('build:debug', async function () {
  const configurations = modules.map(module => {
    const register = ['api', 'common'].includes(module)
      ? "@easytype/compiler/register/transpile-only"
      : "ts-node/register/transpile-only";

    return {
      "type": "node",
      "request": "launch",
      "name": `Run ${module[0].toUpperCase() + module.slice(1)} Tests`,
      "sourceMaps": true,
      "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
      "args": [
        "--require",
        register,
        "--require",
        "'node_modules/reflect-metadata/Reflect.js'",
        "--timeout",
        "999999",
        "--colors",
        `\${workspaceFolder}/packages/${module}/**/*.spec.ts`,
      ],
      "console": "integratedTerminal"
    }
  });

  const content = {
    "version": "0.2.0",
    "configurations": configurations
  }
  const file = path.join(process.cwd(), '.vscode', 'launch.json');
  fs.writeFileSync(file, JSON.stringify(content, null, 3));
});

