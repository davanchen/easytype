import { DataType } from '../enums';
import { BigIntSchema, IType } from '../interfaces';

export function BigIntType(schema: Partial<BigIntSchema> = {}): IType<BigInt> {
    schema.type = schema.type || DataType.NUMBER;
    schema.format = schema.format || DataType.BIG_INT;
    schema.$type = DataType.BIG_INT;

    return {
        type: DataType.BIG_INT,
        schema: () => {
            return schema as BigIntSchema;
        },
        is: (value: any) => {
            return value instanceof BigInt;
        },
        value: (value: any) => {
            return BigInt(value);
        }
    };
}
