import { DataType } from '../enums';
import { IntegerSchema, IType } from '../interfaces';
import { isNumber } from '../utils';

export function IntegerType(schema: Partial<IntegerSchema> = {}): IType<number> {
    schema.type = schema.type || DataType.NUMBER;
    schema.format = schema.format || DataType.INTEGER;
    schema.$type = DataType.INTEGER;
    schema.multipleOf = 1.0;

    return {
        type: DataType.INTEGER,
        schema: () => {
            return schema as IntegerSchema;
        },
        is: (value: any) => {
            return isNumber(value)
                && !isNaN(value)
                && Number.isInteger(value);
        },
        value: (value: any) => {
            value = parseInt(value, 0);
            return !Number.isNaN(value) ? value : undefined;
        }
    };
}
