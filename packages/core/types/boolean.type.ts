import { DataType } from '../enums';
import { BooleanSchema, IType } from '../interfaces';
import { isBoolean, isEmpty, isString } from '../utils';

export function BooleanType(schema: Partial<BooleanSchema> = {}): IType<boolean> {
    schema.type = schema.type || DataType.BOOLEAN;

    return {
        type: DataType.BOOLEAN,
        schema: () => schema as BooleanSchema,
        is: (value: any) => {
            return value instanceof Boolean || typeof value === 'boolean';
        },
        value: (value: any) => {
            if (isBoolean(value) || value instanceof Boolean) {
                return value.valueOf();
            }
            if (isString(value) && !isEmpty(value)) {
                switch (value.toLowerCase()) {
                    case 'true':
                    case 'yes':
                        return true;
                    case 'false':
                    case 'no':
                        return false;
                }
            }
            return;
        }
    };
}
