import { DataType } from '../enums';
import { DoubleSchema, NumberSchema, IType } from '../interfaces';
import { isNumber } from '../utils';

export function DoubleType(schema: Partial<DoubleSchema> = {}): IType<number> {
    schema.type = schema.type || DataType.NUMBER;
    schema.format = schema.format || DataType.DOUBLE;
    schema.$type = DataType.DOUBLE;
    schema.not = { multipleOf: 1 } as NumberSchema;

    return {
        type: DataType.DOUBLE,
        schema: () => {
            return schema as DoubleSchema;
        },
        is: (value: any) => {
            return isNumber(value)
                && !isNaN(value)
                && (value % 1 !== 0);
        },
        value: (value: any) => {
            value = parseFloat(value);
            return !Number.isNaN(value) ? value : undefined;
        }
    };
}
