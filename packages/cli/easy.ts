#!/usr/bin/env node
import * as yargs from 'yargs';
import build from './commands/build';
import start from './commands/start';

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

const cmd = 'easy';

yargs
    .option('debug', {
        alias: 'd',
        describe: 'debug',
        type: 'boolean'
    })
    .usage(`Usage: ${cmd} <command> [options]`)
    .command(start)
    .command(build)
    .example(`${cmd} start main.js`, 'startup project')
    .demandCommand(1, 'ERROR: You need at least one command before moving on')
    .help()
    .epilog('EasyType CLI Tools')
    .argv;