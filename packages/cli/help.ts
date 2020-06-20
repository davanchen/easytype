export interface ModuleInfo {
    name: string;
    path: string;
    require: boolean;
}

export function resolveModules(modules: ModuleInfo[], cb?: (module: ModuleInfo) => void) {
    for (const module of modules) {
        try {
            module.path = require.resolve(module.path);
            if (cb) {
                cb(module);
            }
        } catch (err) {
            if (module.require) {
                console.log(`ERROR: '${module.name}' module is not installed, please install it first ($npm i ${module.name} --save-dev)`);
                process.exit(0);
            }
        }
    }
}