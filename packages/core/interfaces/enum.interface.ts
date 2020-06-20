import { EnumInfo } from './enum-info.interface';
import { Undefinable } from './type.interface';

export interface EnumInterface<T> {
    readonly keys: string[];

    readonly values: number[] | string[];

    getValue(key: string): Undefinable<T>;

    hasValue(value: any): boolean;

    getKeys(value: any): string[];

    getKey(value: any): Undefinable<string>;

    hasKey(key: string): boolean;

    getDescription(key: string): Undefinable<string>;
}

export type Enum<T = any, V = number | string> =
    { readonly [P in keyof T]: T[P]; }
    & Readonly<EnumInfo>
    & EnumInterface<V>
    ;
