import { DataType } from '../enums';
import { FloatSchema, NumberSchema, IType } from '../interfaces';
import { isNumber } from '../utils';

export function FloatType(schema: Partial<FloatSchema> = {}): IType<number> {
    schema.type = schema.type || DataType.NUMBER;
    schema.format = schema.format || DataType.FLOAT;
    schema.$type = DataType.FLOAT;
    schema.not = { multipleOf: 1 } as NumberSchema;

    return {
        type: DataType.FLOAT,
        schema: () => {
            return schema as FloatSchema;
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
