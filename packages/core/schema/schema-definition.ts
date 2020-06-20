import { Class, JSONSchema } from '../interfaces';
import { GlobalFactory, isString, uuid } from '../utils';

export class SchemaDefinition {
    // id => schema
    private static readonly definitions = GlobalFactory.createMap<string, JSONSchema>('definitions');

    // id => class
    private static readonly refs = GlobalFactory.createMap<string, Class>('refs');

    // class => id
    private static readonly objs = GlobalFactory.createMap<Class, string>('objs');

    public static getClass(id: string) {
        return this.refs.get(id);
    }

    public static getClassByRef(id: string) {
        const ref = this.getRef(id);
        return ref ? this.getClass(ref.$id) : null;
    }

    public static getRefs() {
        return this.refs.values();
    }

    public static getRef(param: string | Class) {
        let id;
        if (isString(param)) {
            id = param;
            if (id.startsWith('#')) {
                const names = id.split('/');
                id = names.length ? names[names.length - 1] : id;
            }
            return this.definitions.get(id);
        } else {
            const target = param as Function;
            if (!target) {
                return null;
            }
            id = this.objs.get(target as any);
            if (!id) {
                return null;
            }
            return this.definitions.get(id as string);
        }
    }

    public static addRef(target: Class, schema: JSONSchema): string {
        let id = this.objs.get(target);
        if (id) {
            return id;
        }

        id = target.name;
        // exists / rename
        if (this.refs.has(id)) {
            id = `${id}_${uuid(6)}`;
        }
        this.objs.set(target, id);
        this.refs.set(id, target);
        this.definitions.set(id, schema);
        return id;
    }
}
