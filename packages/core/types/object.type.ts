import { DataType } from '../enums';
import { SchemaError } from '../errors';
import { Fields, ObjectSchema, IObjectType, JSONSchema } from '../interfaces';
import { isObject, isString } from '../utils';
import _ = require('lodash');

export function ObjectType<TClass = any>(schema: Partial<ObjectSchema> = {}): IObjectType<TClass> {
    schema.type = schema.type || DataType.OBJECT;
    schema.properties = schema.properties || {};
    schema.required = schema.required || [];

    return {
        type: DataType.OBJECT,
        schema() {
            return schema as ObjectSchema;
        },
        is(value: any) {
            return typeof value === 'object';
        },
        value(value: any) {
            if (isObject(value)) {
                return value;
            }
            if (isString(value)) {
                try {
                    return JSON.parse(value);
                } catch (err) {
                    return;
                }
            }
            return;
        },
        setId(id: string) {
            schema.$id = id;
        },
        description(text: string) {
            schema.description = text;
        },
        prop(name: Fields<TClass> | string, propSchema: Partial<JSONSchema>, required: boolean = true) {
            if (!isString(name)) {
                throw new SchemaError(schema, `object's prop name must be string.`);
            }

            // merge prop schema
            let prop = schema.properties[name];
            if (prop) {
                prop = _.assign(prop, propSchema);
            } else {
                prop = propSchema as JSONSchema;
            }
            schema.properties[name] = prop;

            if (prop.optional) {
                return this.optional(name);
            }

            if (required) {
                this.required(name);
            }
        },
        required(names: string | string[]) {
            names = Array.isArray(names) ? names : [names];
            for (const field of names) {
                if (!schema.required.includes(field)) {
                    schema.required.push(field);
                }
            }
        },
        optional(names: string | string[]) {
            names = Array.isArray(names) ? names : [names];
            for (const field of names) {
                const pos = schema.required.indexOf(field);
                if (pos === -1) {
                    continue;
                }
                schema.required.splice(pos, 1);
            }
        },
    };
}
