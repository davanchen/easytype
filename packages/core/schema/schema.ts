import * as _ from 'lodash';
import 'reflect-metadata';
import { DataType } from '../enums';
import { Class, Fields, AllOfSchema, AnyOfSchema, ArraySchema, BigIntSchema, BooleanSchema, DateSchema, DoubleSchema, EnumSchema, FloatSchema, IntegerSchema, NumberSchema, ObjectSchema, OneOfSchema, RefSchema, BaseSchema, StringSchema, JSONSchema, Undefinable } from '../interfaces';
import { Type } from '../types';
import { isObject, isString } from '../utils';
import { SchemaDefinition } from './schema-definition';

export class Schema extends SchemaDefinition {

    public static setProperty<T = any>(target: Class<T>, propertyKey: Fields<T>, metadata: Partial<JSONSchema>): void {
        const schema = Schema.getMetadata<T>(target);
        if (!schema) {
            throw new Error(`metadata does not exist for field '${propertyKey}'`);
            // schema = Type.Object().schema();
            // schema.$id = this.setMetadata(target, schema);
        }

        Type
            .Object(schema)
            .prop(propertyKey as string, metadata);
    }

    public static getProperty<T = any>(target: Class<T>, propertyKey: Fields<T> | string): Undefinable<JSONSchema> {
        const schema = Schema.getMetadata<T>(target);
        if (propertyKey && schema) {
            const prop = schema.properties[propertyKey as string];
            return prop;
        }
        return schema;
    }

    public static getMetadata<T = any>(target: Class<T>, clone?: boolean): Undefinable<ObjectSchema> {
        const schema: ObjectSchema = this.getRef(target) as ObjectSchema;
        if (!schema) {
            return schema;
        }

        return clone ? _.cloneDeep(schema) : schema;
    }

    public static setMetadata<T = any>(target: Class<T>, schema: ObjectSchema): string {
        return this.addRef(target, schema);
    }

    public static isSchema(schema: JSONSchema): schema is JSONSchema {
        return isObject(schema)
            && (isString(schema.type)
                || isString(schema.$type)
                || this.isRefSchema(schema)
                || this.isOneOfSchema(schema)
                || this.isAllOfSchema(schema)
                || this.isAnyOfSchema(schema)
                || isObject((schema as BaseSchema).not)
            );
    }

    public static getDataType(schema: JSONSchema): string {
        if (Schema.isStringSchema(schema)
            && schema.format
            && Object.values(DataType).includes(schema.format as any)
        ) {
            return schema.format;
        } else {
            return schema.$type || schema.type || DataType.ANY;
        }
    }

    public static isRefSchema(schema: JSONSchema): schema is RefSchema {
        return schema && isString((schema as RefSchema).$ref);
    }

    public static isOneOfSchema(schema: JSONSchema): schema is OneOfSchema {
        return schema && isObject((schema as OneOfSchema).oneOf);
    }

    public static isAllOfSchema(schema: JSONSchema): schema is AllOfSchema {
        return schema && isObject((schema as AllOfSchema).allOf);
    }

    public static isAnyOfSchema(schema: JSONSchema): schema is AllOfSchema {
        return schema && isObject((schema as AnyOfSchema).anyOf);
    }

    public static isNumberSchema(schema: JSONSchema): schema is NumberSchema {
        return schema && schema.type === DataType.NUMBER;
    }

    public static isStringSchema(schema: JSONSchema): schema is StringSchema {
        return schema && schema.type === DataType.STRING;
    }

    public static isObjectSchema(schema: JSONSchema): schema is ObjectSchema {
        return schema && schema.type === DataType.OBJECT;
    }

    public static isArraySchema(schema: JSONSchema): schema is ArraySchema {
        return schema && schema.type === DataType.ARRAY;
    }

    public static isBooleanSchema(schema: JSONSchema): schema is BooleanSchema {
        return schema && schema.type === DataType.BOOLEAN;
    }

    public static isIntegerSchema(schema: JSONSchema): schema is IntegerSchema {
        return this.isNumberSchema(schema) && schema.format === DataType.INTEGER;
    }

    public static isBigIntSchema(schema: JSONSchema): schema is BigIntSchema {
        return this.isNumberSchema(schema) && schema.format === DataType.BIG_INT;
    }

    public static isFloatSchema(schema: JSONSchema): schema is FloatSchema {
        return this.isNumberSchema(schema) && schema.format === DataType.FLOAT;
    }

    public static isDoubleSchema(schema: JSONSchema): schema is DoubleSchema {
        return this.isNumberSchema(schema) && schema.format === DataType.DOUBLE;
    }

    public static isDateSchema(schema: JSONSchema): schema is DateSchema {
        return schema
            && (schema.type === DataType.STRING
                || schema.type === DataType.NUMBER)
            && ((schema as StringSchema).format === DataType.DATE_TIME);
    }

    public static isEnumSchema(schema: JSONSchema): schema is EnumSchema {
        return schema
            && (schema.type === DataType.STRING
                || schema.type === DataType.NUMBER)
            && ((schema as StringSchema).format === DataType.ENUM);
    }
}