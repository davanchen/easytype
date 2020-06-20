import { $I, $T, $TypeOf, $U, $V, Any, BigInt, Float, Integer, Null } from '@easytype/core';

export const IGNORE_FLAG = '@es-ignore';

export const PACKAGE_NAMESPACE = '$easy';

export const PACKAGE_NAME = '@easytype/core';

export const METADATA_FIELD_NAME = '$metadata';

export const TS_METADATA = '__metadata';

export const REFLECT_METADATA = ['Reflectable', 'Reflective'];

export const INHERITS_INTERFACE = 'Inherits';

export const EXTENDS_METADATA = 'Extends';

export const INHERIT_METADATA = 'Inherit';

export const IS_TYPE_METADATA = 'IsType';

export const IS_OBJECT_METADATA = 'IsObject';

export const STRING_ID = 'String';

export const NUMBER_ID = 'Number';

export const BOOLEAN_ID = 'Boolean';

export const DATE_ID = 'Date';

export const INTEGER_ID = `${PACKAGE_NAMESPACE}.${Integer.name}`;

export const FLOAT_ID = `${PACKAGE_NAMESPACE}.${Float.name}`;

export const BIGINT_ID = `${PACKAGE_NAMESPACE}.${BigInt.name}`;

export const ANY_ID = `${PACKAGE_NAMESPACE}.${Any.name}`;

export const NULL_ID = `${PACKAGE_NAMESPACE}.${Null.name}`;

export const GENERIC_TYPE_ID = `${PACKAGE_NAMESPACE}.${$T.name}`;

export const GENERIC_VARIABLE_ID = `${PACKAGE_NAMESPACE}.${$V.name}`;

export const TYPEOF_TYPE_ID = `${PACKAGE_NAMESPACE}.${$TypeOf.name}`;

export const UNION_TYPE_ID = `${PACKAGE_NAMESPACE}.${$U.name}`;

export const INTERSECTION_TYPE_ID = `${PACKAGE_NAMESPACE}.${$I.name}`;

export const STRING_NAME = 'String';

export const NUMBER_NAME = 'Number';

export const BOOLEAN_NAME = 'Boolean';

export const DATE_NAME = 'Date';

export const INTEGER_NAME = 'Integer';

export const BIGINT_NAME = 'BigInt';

export const FLOAT_NAME = 'Float';

export const TYPE_KEYWORDS = ['Promise', 'Observable', 'Partial', 'Required', 'Readonly'];

export const ARRAY_KEYWORDS = ['Array', 'ReadonlyArray', 'ArrayLike'];
