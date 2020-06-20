import { RefSchema, IType, JSONSchema } from '../interfaces';
import { DataType } from '../enums';

export function RefType(id: string, root: JSONSchema, ref: JSONSchema): IType<any> {
    if (root) {
        root.$defs = root.$defs || {};
        root.$defs[id] = ref;
    }
    const schema = {
        $ref: `#/$defs/${id}`,
        type: undefined,
        $type: undefined,
    };

    return {
        type: DataType.REFERENCE,
        schema: () => schema as RefSchema,
    };
}
