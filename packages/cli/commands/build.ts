import { join } from 'path';
import { spawn } from 'child_process';
import * as yargs from 'yargs';
import { ModuleInfo, resolveModules } from '../help';

const modules: ModuleInfo[] = [
    {
        name: '@easytype/compiler',
        path: '@easytype/compiler/register/transpile-only',
        require: true
    },
    {
        name: 'gulp',
        path: 'gulp/bin/gulp.js',
        require: true
    }
];

export default {
    command: 'build',
    desc: 'compile project',
    builder: (y) => {
        return y
            .option('output', {
                alias: 'o',
                describe: 'output directory',
                type: 'string'
            })
            .default('output', 'dist');
    },
    handler: (argv) => {
        let bin: string;
        resolveModules(modules, (module) => bin = module.path);

        const file = join(__dirname, '../gulpfile.js');
        const command = 'node';
        const args = [
            bin,
            '--gulpfile',
            file,
            '--cwd',
            process.cwd(),
            '--dist',
            argv.output as string
        ];

        if (argv.debug) {
            console.log(args.join(' '));
        }

        spawn(command, args, {
            stdio: 'inherit',
            shell: true
        });
    }
} as yargs.CommandModule;
