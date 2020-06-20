import { GenericArg, Nullable } from '@easytype/core';

export interface ReflectContext {
    reflectable: boolean;
    props: string[];
    args: Nullable<GenericArg[]>;
}
