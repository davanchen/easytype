import { DataType } from '../enums';
import { AnySchema, IType } from '../interfaces';

export function AnyType(schema: any = {}): IType<any> {
    // schema.type = [
    //     DataType.NUMBER,
    //     DataType.STRING,
    //     DataType.BOOLEAN,
    //     DataType.OBJECT,
    //     DataType.ARRAY,
    //     DataType.NULL
    // ];
    schema.$type = DataType.ANY;

    return {
        type: DataType.ANY,
        schema: () => schema as AnySchema,
    };
}
