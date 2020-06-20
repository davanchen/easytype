import * as _ from 'lodash';
import { DataType } from './enums';
import { Class, Enum, GenericType, IObjectType, IType, JSONSchema, SpecialType, TypeReference, Undefinable, ObjectSchema, ObjectType } from './interfaces';
import { Null, ObjectLiteral } from './primitive-types';
import { Schema } from './schema';
import { Type } from './types';
import { isEnum, isFunction, isObjectType, isPropType, isSpecialType, isGenericType, isNil, isUndefined, isBoolean } from './utils';

export class TypeFactory {
    public static getDataType(type: TypeReference) {
        if (isFunction(type)) {
            if (type === String) {
                return DataType.STRING;
            } else if (type === Number) {
                return DataType.NUMBER;
            } else if (type === Boolean) {
                return DataType.BOOLEAN;
            } else if (type === Date) {
                return DataType.DATE_TIME;
            } else {
                if (isEnum(type)) {
                    return DataType.ENUM;
                }
                return DataType.OBJECT;
            }
        } else if (Array.isArray(type)) {
            return DataType.ARRAY;
        } else {
            return;
        }
    }

    public static createDateType(valueType: Function = Date, format?: string) {
        return Type.Date({
            $value: this.getDataType(valueType) as any,
            pattern: format
        });
    }

    public static getEnumType(obj: Enum, valueType: TypeReference = String) {
        return Type.Enum({
            $id: obj.name,
            type: this.getDataType(valueType) as any,
            enum: valueType === String ? obj.keys : obj.values
        });
    }

    public static getGenericType(type: GenericType): Undefinable<IType> {
        // console.log(type);
        if (type.$target === Map) {

        }

        if (type.$target === ObjectLiteral) {

        }

        if (type.$target === Null) {

        }

        return Type.Object({ $id: type.$description }); // Type.Any();
    }

    public static getObjectType(ref: ObjectType): Undefinable<IObjectType> {
        const result = Schema.getRef(ref.$target as Class);
        if (result) {
            return Type.Object(result as ObjectSchema);
        }

        // extends
        let obj: IObjectType;
        if (ref.$extends) {
            const base = this.getReferenceType(ref.$extends);
            if (base) {
                const schema = _.cloneDeep(base.schema()) as ObjectSchema;
                if (schema.type !== DataType.OBJECT) {
                    throw new Error(`'${ref.$id}' must extends from class`);
                }
                if (!schema.$id) {
                    throw new Error(`'${ref.$id}' inherited class has no ID`);
                }
                schema.$x = schema.$id;
                obj = Type.Object(schema);
            }
        } else {
            obj = Type.Object({});
        }

        if (ref.$id) {
            obj.setId(ref.$id);
        }

        // inherits
        if (ref.$inherits) {
            for (const inherits of ref.$inherits) {
                const base = this.getReferenceType(inherits.$target);
                if (base) {
                    const schema = base.schema() as ObjectSchema;
                    if (schema.type !== DataType.OBJECT) {
                        throw new Error(`'${ref.$id}' must inherits from class`);
                    }
                    const fields = (inherits.$fields && inherits.$fields.length > 0) ? inherits.$fields : Object.keys(ref.$properties);
                    for (const field of fields) {
                        const prop = schema.properties[field];
                        if (prop) {
                            obj.prop(field, _.cloneDeep(prop));
                        }
                    }
                }
            }
        }

        for (const key in ref.$properties) {
            const value = ref.$properties[key];
            if (!isPropType(value)) {
                throw new Error(`prop '${key}' must be 'PropType'. `);
            }

            const type = this.getType(value.$ref, obj.schema());
            if (!type) {
                throw new Error(`invalid type reference for prop '${key}'. `);
            }

            const schema: Partial<JSONSchema> = type.schema();
            if (isBoolean(value.$optional)) {
                schema.optional = value.$optional;
            }
            if (isBoolean(value.$readonly)) {
                schema.readOnly = value.$readonly;
            }
            if (!isUndefined(value.$default)) {
                schema.default = value.$default;
                schema.optional = true;
            }
            if (value.$description) {
                schema.description = value.$description;
            }
            obj.prop(key, schema);
        }

        return obj;
    }

    public static getSpecialType(obj: SpecialType, root?: JSONSchema): Undefinable<IObjectType> {
        if (isObjectType(obj)) {
            return this.getObjectType(obj);
        }

        if (isGenericType(obj)) {
            return this.getGenericType(obj) as any;
        }
    }

    public static getReferenceType(obj: TypeReference | SpecialType, root?: JSONSchema): Undefinable<IObjectType> {
        if (isSpecialType(obj)) {
            return this.getSpecialType(obj);
        }
        const target = obj as Class;
        const ref = Schema.getMetadata(target);
        if (!ref) {
            throw new Error(`schema metadata for class '${target.name}' is missing.`);
        }
        return Type.Object(ref);
    }

    public static getType(obj: TypeReference | SpecialType, root?: JSONSchema): Undefinable<IType> {
        if (isSpecialType(obj)) {
            return this.getSpecialType(obj);
        }

        const type = this.getDataType(obj);
        if (!type) {
            const name = isFunction(obj) ? obj.name : obj;
            throw new Error(`object '${name}' is an unknown type.`);
        }

        switch (type) {
            case DataType.OBJECT: {
                const target = obj as Class;
                const ref = Schema.getMetadata(target);
                if (!ref) {
                    throw new Error(`schema metadata for class '${target.name}' is missing.`);
                }
                // support third-party schema like { type: 'OBJECT_ID' }
                if (ref.type !== DataType.OBJECT || !ref.$id) {
                    return Type.Schema(_.cloneDeep(ref));
                }
                return Type.Ref(ref.$id, root, ref);
            }
            case DataType.ENUM: {
                const enumType = TypeFactory.getEnumType(obj as any, Number);
                if (enumType) {
                    Schema.addRef(obj as any, enumType.schema());
                }
                return enumType;
            }
            case DataType.ARRAY: {
                return Type
                    .Array()
                    .items(this.getType(obj[0], root));
            }
            default:
                return Type.get(type)();
        }
    }
}
