const root = typeof global === 'object' ? global :
    typeof self === 'object' ? self :
        typeof this === 'object' ? this :
            Function('return this;')();

export class GlobalFactory {
    public static createValue<T = any>(name: string, value: () => T): T {
        name = `@@${name}`;
        if (typeof root[name] === 'undefined') {
            root[name] = value();
        }
        return root[name];
    }

    public static createMap<K = any, V = any>(name: string): Map<K, V> {
        return GlobalFactory.createValue(name, () => new Map());
    }

    public static createArray<T = any>(name: string): T[] {
        return GlobalFactory.createValue(name, () => []);
    }
}

export const createGlobalValue = GlobalFactory.createValue;

export const createGlobalMap = GlobalFactory.createMap;

export const createGlobalArray = GlobalFactory.createArray;
