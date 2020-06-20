import { TypeId } from '../enums';
import { ObjectLiteral } from '../primitive-types';
import { TypeReference, Class, Fields } from './type.interface';
import { ParameterInfo } from './param-info.interface';

export interface GenericArg {
    $name: string;
    $default?: any;
}

export type GenericTypeArgType = TypeReference | GenericType | GenericVariable;

export type GenericTypeArg = GenericTypeArgType | GenericTypeArgType[];

export interface InheritInfo {
    $target: TypeReference | SpecialType;
    $fields: string[];
}

export interface SpecialType {
    $type: number;
    [key: string]: any;
}

export interface PropType extends SpecialType {
    $type: TypeId.PROP_TYPE;
    $ref: TypeReference;
    $description?: string;
    $readonly?: boolean;
    $optional?: boolean;
    $default?: any;
}

export interface ObjectType extends SpecialType {
    $type: TypeId.OBJECT_TYPE;
    $target?: Function;
    $id?: string;
    $index?: [TypeReference, TypeReference];
    $args: GenericArg[];
    $properties: ObjectLiteral<PropType>;
    $description?: string;
    $inherits?: InheritInfo[];
    $extends?: TypeReference | SpecialType;
}

export interface GenericType extends SpecialType {
    $type: TypeId.GENERIC_TYPE;
    $target: TypeReference;
    $args: GenericTypeArg;
    $description?: string;
}

export interface GenericVariable extends SpecialType {
    $type: TypeId.GENERIC_VARIABLE_TYPE;
    $name: string;
}

export interface TypeOfType extends SpecialType {
    $type: TypeId.TYPE_OF_TYPE;
    $value: any;
}

export interface UnionType extends SpecialType {
    $type: TypeId.UNION_TYPE;
    $refs: TypeReference[];
}

export interface IntersectionType extends SpecialType {
    $type: TypeId.INTERSECTION_TYPE;
    $refs: TypeReference[];
}

export interface FunctionType extends SpecialType {
    $type: TypeId.FUNCTION;
    $decorators: Function[];
    $returns: TypeReference;
    $params: ParameterInfo[];
    $modifiers: number[];
    $description?: string;
}
