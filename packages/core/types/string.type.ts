import { DataType } from '../enums';
import { IType, StringSchema } from '../interfaces';

export function StringType(schema: Partial<StringSchema> = {}): IType<string> {
    schema.type = schema.type || DataType.STRING;

    return {
        type: DataType.STRING,
        schema: () => {
            return schema as StringSchema;
        },
        is: (value: any) => {
            return value instanceof String || typeof value === 'string';
        },
        value: (value: any) => {
            return value ? value.toString() : undefined;
        }
    };
}
