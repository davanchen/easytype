import { ObjectLiteral } from '../../primitive-types';
import { Fields, Undefinable } from '../type.interface';
import { JSONSchema, ObjectSchema, ArraySchema } from './json-schema.interface';

export interface IType<V = any, S = JSONSchema> {
    readonly type: string;
    is?: (value: any) => boolean;
    value?: (value: any) => Undefinable<V>;
    schema: () => S;
}

export interface IObjectType<T = any> extends IType<ObjectLiteral, ObjectSchema> {
    setId(id: string): void;
    description(text: string): void;
    prop(name: Fields<T>, propSchema: Partial<JSONSchema>): void;
    required(name: string | string[]): void;
    optional(name: string | string[]): void;
}

export interface IArrayType extends IType<any[], ArraySchema> {
    items(values: IType): IArrayType;
    contains(value: IType | IType[]): IArrayType;
}

// export interface IFunctionType extends IType<void> {
//     parameters(values: IType | IType[]): IFunctionType;
//     returns(value: IType): IFunctionType;
// }

export type TypeCtor<T = JSONSchema, R = IType<any, T>> = (schema?: Partial<T>) => R;
