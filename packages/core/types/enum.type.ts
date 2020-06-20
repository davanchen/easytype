import { DataType } from '../enums';
import { EnumSchema, IType } from '../interfaces';
import { isNil, isNumber, isString } from '../utils';
import { SchemaError } from '../errors';

export function EnumType(schema: Partial<EnumSchema> = {}): IType<number | string> {
    schema.type = schema.type || DataType.STRING;
    schema.format = DataType.ENUM;
    schema.$type = DataType.ENUM;

    if (!Array.isArray(schema.enum) || !schema.enum.length) {
        throw new SchemaError(schema, `the value of prop 'enum' must be a non-empty array.`);
    }

    if (schema.type === DataType.STRING
        && schema.enum.some(v => !isString(v))) {
        throw new SchemaError(schema, `each value of prop 'keys' must be a string.`);
    }

    if (schema.type === DataType.NUMBER
        && schema.enum.some(v => !isNumber(v))) {
        throw new SchemaError(schema, `each value of prop 'keys' must be a number.`);
    }

    return {
        type: DataType.ENUM,
        schema: () => {
            return schema as EnumSchema;
        },
        is: (value: any) => {
            return !schema.enum || (schema.enum as any[]).includes(value);
        },
        value: (value: any) => {
            if (isNil(value)) {
                return;
            }
            if (schema.enum.some(p => p === value)) {
                return value;
            }
            return;
        }
    };
}
