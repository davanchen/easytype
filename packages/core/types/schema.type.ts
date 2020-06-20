import { IType, JSONSchema } from '../interfaces';
import { DataType } from '../enums';

export function SchemaType(schema: Partial<JSONSchema> = {}): IType<any> {
    return {
        type: DataType.SCHEMA,
        schema: () => {
            return schema as JSONSchema;
        }
    };
}
