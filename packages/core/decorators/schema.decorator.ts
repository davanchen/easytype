import { StringFormats } from '../enums';
import { JSONSchema, ObjectSchema, ObjectType } from '../interfaces';
import { Schema } from '../schema';
import { TypeFactory } from '../type-factory';
import { isObject } from '../utils';
import _ = require('lodash');
import { Type } from '../types';

function setProperty(metadata?: Partial<JSONSchema>): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
        Schema.setProperty<any>(target.constructor, propertyKey as string, metadata);
    };
}

export const IsSchema = (schema?: Partial<JSONSchema>, additional?: Partial<JSONSchema>): ClassDecorator => {
    return (target: any) => {
        if (schema && isObject(schema)) {
            Schema.setMetadata(target, schema as any);
        }

        if (additional) {
            const metadata = Schema.getMetadata(target);
            _.assign(metadata, additional);
        }
    };
};

export const Reflectable = (): ClassDecorator => IsSchema();

export const Reflective = (): ClassDecorator => IsSchema();

export const IsObject = (obj: ObjectType): PropertyDecorator => {
    return (target: any, propertyKey: string | symbol) => {
        const type = TypeFactory.getType(obj);
        Schema.setMetadata(target.constructor, type.schema() as ObjectSchema);
    };
};

export const Description = (description: string): any => {
    return (target: any, propertyKey?: string | symbol) => {
        if (propertyKey) {
            return setProperty({ description })(target, propertyKey);
        }
        const schema = Schema.getMetadata(target);
        schema.description = description;
    };
};

export const Format = (format: StringFormats | string): PropertyDecorator => setProperty({ format });

export const Title = (title: string): PropertyDecorator => setProperty({ title });

export const Examples = (examples: any[]): PropertyDecorator => setProperty({ examples });

export const ReadOnly = (): PropertyDecorator => setProperty({ readOnly: true });

export const WriteOnly = (): PropertyDecorator => setProperty({ writeOnly: true });

export const Optional = (): PropertyDecorator => {
    return (target: any, propertyKey: string | symbol) => {
        const schema = Schema.getMetadata(target.constructor);
        Type
            .Object(schema)
            .prop(propertyKey as string, { optional: true } as any);
    };
};

/**
 * '@Optional' decorator can be omitted.
 */
export const Default = (value: any): PropertyDecorator => {
    return (target: any, propertyKey: string | symbol) => {
        setProperty({ default: value })(target, propertyKey);
        Optional()(target, propertyKey);
    };
};

// export const Expose = (value: boolean = true) => IsSchema(null, { $expose: value });

// export const IsNull = (): PropertyDecorator => IsType(Null);

// export const IsAny = (): PropertyDecorator => IsType(Any);

// export const IsBoolean = (): PropertyDecorator => IsType(Boolean);

// export const IsNumber = (): PropertyDecorator => IsType(Number);

// export const IsInteger = (): PropertyDecorator => IsType(Integer);

// export const IsBigInt = (): PropertyDecorator => IsType(BigInt);

// export const IsFloat = (): PropertyDecorator => IsType(Float);

// export const IsDouble = (): PropertyDecorator => IsType(Double);

// export const IsString = (): PropertyDecorator => IsType(String);

// export const IsDate = (valueType: Function = Date, format?: string): PropertyDecorator => {
//     const type = TypeFactory.createDateType(valueType, format);
//     return setProperty(type.schema());
// };

// export const IsTypeOf = (value: any): PropertyDecorator => {
//     if (isFunction(value)) {
//         return IsType(value);
//     }
//     if (isObject(value) && isFunction(value.constructor)) {
//         return IsType(value.constructor);
//     }
//     return IsAny();
// };

// export const IsArray = (obj: TypeReference): PropertyDecorator => IsType([obj]);


// export const IsType = (ref?: TypeReference): PropertyDecorator => {
//     return (target: any, propertyKey: string | symbol) => {
//         if (!ref) {
//             ref = Reflect.getMetadata(TYPE_METADATA, target, propertyKey);
//             if (!isFunction(ref)) {
//                 throw new RuntimeError(`@IsType Error: field '${propertyKey as string}' value type must be an instance of the class.`);
//             }
//         }

//         const root = Schema.getMetadata(target.constructor as any);
//         const type = TypeFactory.getType(ref, root);
//         setProperty(type.schema())(target, propertyKey);
//     };
// };

