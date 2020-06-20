import { DataType, NumberFormats, StringFormats } from '../../enums';
import { ObjectLiteral } from '../../primitive-types';

export type SchemaObject = ObjectLiteral<JSONSchema>;

/**
 * JSON Schema Annotations
 */
export interface BaseSchema<TValue = any> {
    type?: DataType | string;
    $type?: string;

    /** descriptive */
    $id?: string;
    title?: string;
    description?: string;
    examples?: TValue[];

    /** condition */
    not?: JSONSchema | JSONSchema[];

    /** access attributes */
    readOnly?: boolean;
    writeOnly?: boolean;

    /** value */
    optional?: boolean;
    default?: TValue;

    $defs?: SchemaObject;
}

export interface ComplexSchema extends BaseSchema {
    type: never;
}

export interface RefSchema extends ComplexSchema {
    $ref: string;
}

export interface OneOfSchema extends ComplexSchema {
    oneOf?: JSONSchema[];
}

export interface AllOfSchema extends ComplexSchema {
    allOf?: JSONSchema[];
}

export interface AnyOfSchema extends ComplexSchema {
    anyOf?: JSONSchema[];
}

export interface AnySchema extends ComplexSchema {
    $type: DataType.ANY;
}

export interface NullSchema extends ComplexSchema {
    $type: DataType.NULL;
}

export interface ObjectSchema extends BaseSchema {
    type: DataType.OBJECT;
    properties: SchemaObject;
    required?: string[];
    additionalProperties?: boolean | JSONSchema;

    minProperties?: number;
    maxProperties?: number;

    $expose?: boolean;

    /** Base Class */
    $x?: string;

    /** Generic Class */
    $args?: string[];
}

export interface ArraySchema extends BaseSchema<any[]> {
    type: DataType.ARRAY;
    items: JSONSchema;
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    contains?: JSONSchema[];
}

export interface StringSchema extends BaseSchema<string> {
    type: DataType.STRING;
    format?: StringFormats | string;
    enum?: string[];
    pattern?: string;
    maxLength?: number;
    minLength?: number;
}

export interface NumberSchema extends BaseSchema<number> {
    type: DataType.NUMBER;
    format?: NumberFormats | string;
    enum?: number[];
    multipleOf?: number;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
}

export interface BooleanSchema extends BaseSchema<boolean> {
    type: DataType.BOOLEAN;
}

export interface IntegerSchema extends NumberSchema {
    type: DataType.NUMBER;
    format: DataType.INTEGER;
}

export interface BigIntSchema extends NumberSchema {
    type: DataType.NUMBER;
    format: DataType.BIG_INT;
}

export interface FloatSchema extends NumberSchema {
    type: DataType.NUMBER;
    format: DataType.FLOAT;
}

export interface DoubleSchema extends NumberSchema {
    type: DataType.NUMBER;
    format: DataType.DOUBLE;
}

export interface DateSchema extends BaseSchema<number | string | Date> {
    type: DataType.NUMBER | DataType.STRING;
    format: DataType.DATE_TIME;
    $value: DataType.NUMBER | DataType.STRING | DataType.DATE_TIME;
    pattern?: string;
}

export interface EnumSchema extends BaseSchema<string | number> {
    type: DataType.NUMBER | DataType.STRING;
    format: DataType.ENUM;
    enum: number[] | string[];
}

export type JSONSchema =
    | AnySchema
    | NullSchema
    | ObjectSchema
    | ArraySchema
    | StringSchema
    | NumberSchema
    | BooleanSchema
    | IntegerSchema
    | BigIntSchema
    | FloatSchema
    | DoubleSchema
    | DateSchema
    | EnumSchema
    | RefSchema
    | OneOfSchema
    | AllOfSchema
    | AnyOfSchema
    ;
