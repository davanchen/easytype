import { spawn } from 'child_process';
import * as fs from 'fs';
import { ModuleInfo, resolveModules } from '../help';
import * as path from 'path';
import * as yargs from 'yargs';

const sourceDirs = ['./', './src'];
const modules: ModuleInfo[] = [
    {
        name: '@easytype/compiler',
        path: '@easytype/compiler/register/transpile-only',
        require: true
    },
    {
        name: 'reflect-metadata',
        path: 'reflect-metadata/Reflect.js',
        require: true
    },
    {
        name: 'tsconfig-paths',
        path: 'tsconfig-paths/register',
        require: false
    }
];

function getMainFile(mainFile): string {
    const files = mainFile.includes('.') ? [mainFile] : [`${mainFile}.js`, `${mainFile}.ts`];
    const results = [];
    for (const dir of sourceDirs) {
        for (const file of files) {
            const full = path.resolve(`${dir}/${file}`);
            if (fs.existsSync(full)) {
                return full;
            }
            results.push(full);
        }
    }
    console.log(`ERROR: Unable to find '${mainFile}' in the following folder: \r\n`, results);
    process.exit(0);
}

export default {
    command: 'start [file] [...args]',
    aliases: ['run'],
    desc: 'startup project',
    builder: (y) => {
        return y
            .default('debug', false)
            .default('file', 'main');
    },
    handler: (argv) => {
        const mainFile = getMainFile(argv.file);
        const command = 'node';
        const args = [mainFile, ...process.argv.splice(3)];

        resolveModules(modules, (module) => args.unshift('--require', module.path));

        if (argv.debug) {
            console.log(args);
        }

        const child = spawn(command, args, {
            stdio: 'inherit',
            shell: true
        });

        if (argv.debug) {
            child.on('exit', code => {
                console.log('exit', code);
            });
        }
    }
} as yargs.CommandModule;
