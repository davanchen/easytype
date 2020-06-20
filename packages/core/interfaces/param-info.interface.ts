import { TypeReference } from './type.interface';

export interface ParameterInfo {
    decorators: Function[];

    name: string;

    type: TypeReference;

    required?: boolean;
}
