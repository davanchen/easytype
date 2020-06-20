import { DataType } from '../enums';
import { TypeCtor } from '../interfaces';
import { Type } from '../types';

/**
 * Define new type
 */
export function TypeDefine(id: string, type: TypeCtor): ClassDecorator {
    return (target: any) => {
        DataType[id] = id;
        Type.set(id, type);
    };
}
