import { TYPE_SYMBOL } from '../constants';
import { DataType, TypeId } from '../enums';
import { Enum, GenericType, IType, ObjectType, PropType, SpecialType, TypeOfType, UnionType, IntersectionType, FunctionType } from '../interfaces';

export function isPromise(obj: any): obj is Promise<any> {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export function isUndefined(obj: any): obj is undefined {
    return typeof obj === 'undefined';
}

export function isNil(obj: any): boolean {
    return typeof obj === 'undefined' || obj === null;
}

export function isEmpty(array: any): boolean {
    return !(array && array.length > 0);
}

export function isObject(value: any): boolean {
    return !isNil(value) && typeof value === 'object';
}

export function isFunction(func: any): func is Function {
    return typeof func === 'function';
}

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function isBigInt(value: any): value is BigInt {
    return typeof value === 'bigint';
}

export function isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
}

export function isInstance(value: any): boolean {
    return isObject(value) && isFunction(value.constructor);
}

export function isSymbol(value: any): value is symbol {
    return typeof value === 'symbol';
}

export function isType(obj: any): obj is IType {
    return isObject(obj) && isFunction(obj.schema);
}

export function isEnum(value: any): value is Enum {
    return value
        && isFunction(value)
        && value[TYPE_SYMBOL] === DataType.ENUM;
}

export function isSpecialType(obj: any): obj is SpecialType {
    return isObject(obj)
        && obj.$type;
}

export function isObjectType(obj: any): obj is ObjectType {
    return isSpecialType(obj)
        && obj.$type === TypeId.OBJECT_TYPE
        && obj.$properties;
}

export function isPropType(obj: any): obj is PropType {
    return isSpecialType(obj)
        && obj.$type === TypeId.PROP_TYPE
        && obj.$ref;
}

export function isGenericType(obj: any): obj is GenericType {
    return isSpecialType(obj)
        && obj.$type === TypeId.GENERIC_TYPE
        && obj.$target
        && obj.$args;
}

export function isTypeOfType(obj: any): obj is TypeOfType {
    return isSpecialType(obj)
        && obj.$type === TypeId.TYPE_OF_TYPE
        && obj.$value;
}

export function isUnionType(obj: any): obj is UnionType {
    return isSpecialType(obj)
        && obj.$type === TypeId.UNION_TYPE
        && obj.$refs;
}

export function isIntersectionType(obj: any): obj is IntersectionType {
    return isSpecialType(obj)
        && obj.$type === TypeId.INTERSECTION_TYPE
        && obj.$refs;
}

export function isFunctionType(obj: any): obj is FunctionType {
    return isSpecialType(obj)
        && obj.$type === TypeId.FUNCTION
        && obj.$decorators
        && obj.$returns
        && obj.$params
        && obj.$modifiers;
}
