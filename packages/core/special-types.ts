import { TypeId } from './enums';
import { GenericType, GenericTypeArg, GenericVariable, IntersectionType, TypeOfType, TypeReference, UnionType } from './interfaces';

export function $T(target: TypeReference, args: GenericTypeArg, description?: string): GenericType {
    return {
        $type: TypeId.GENERIC_TYPE,
        $target: target,
        $args: args,
        $description: description
    };
}

/**
 * CLASS<T> | var:T
 */
export function $V(name: string): GenericVariable {
    return {
        $type: TypeId.GENERIC_VARIABLE_TYPE,
        $name: name
    };
}

export function $TypeOf(value: any): TypeOfType {
    return {
        $type: TypeId.TYPE_OF_TYPE,
        $value: value
    };
}

export function $U(...refs: TypeReference[]): UnionType {
    return {
        $type: TypeId.UNION_TYPE,
        $refs: refs
    };
}

export function $I(...refs: TypeReference[]): IntersectionType {
    return {
        $type: TypeId.INTERSECTION_TYPE,
        $refs: refs
    };
}
