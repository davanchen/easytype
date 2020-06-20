import { DataType } from '../enums';
import { ArraySchema, IArrayType, IType } from '../interfaces';
import { isNil } from '../utils';

export function ArrayType(schema: Partial<ArraySchema> = {}): IArrayType {
    schema.type = schema.type || DataType.ARRAY;

    return {
        type: DataType.ARRAY,
        schema: () => {
            if (!schema.items) {
                throw new Error(`'${schema.$id}' schema.items should not empty or undefined.`);
            }
            return schema as ArraySchema;
        },
        is: (value: any) => {
            return value instanceof Array;
        },
        value: (value: any) => {
            if (isNil(value)) {
                return;
            }
            if (Array.isArray(value)) {
                return value;
            }
            return [value];
        },
        items: (values: any) => {
            values = Array.isArray(values) ? values : [values] as IType[];
            for (const value of values) {
                if (Array.isArray(schema.items)) {
                    schema.items.push(value.schema());
                } else {
                    schema.items = value.schema();
                }
            }

            return ArrayType(schema);
        },
        contains: (values) => {
            values = Array.isArray(values) ? values : [values];
            schema.contains = schema.contains || [];
            schema.contains.push(...values.map(value => value.schema()));
            return ArrayType(schema);
        }
    };
}
