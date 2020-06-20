import { DataType } from '../enums';
import { NumberSchema, IType } from '../interfaces';
import { isNumber } from '../utils';

export function NumberType(schema: Partial<NumberSchema> = {}): IType {
    schema.type = schema.type || DataType.NUMBER;

    return {
        type: DataType.NUMBER,
        schema: () => {
            return schema as NumberSchema;
        },
        is: (value: any) => {
            return isNumber(value) && !isNaN(value);
        },
        value: (value: any) => {
            value = isNumber(value) ? value : Number(value);
            return !isNaN(value) ? value : undefined;
        }
    };
}
