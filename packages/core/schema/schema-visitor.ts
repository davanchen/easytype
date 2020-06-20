import { RuntimeError } from '../errors';
import { ArraySchema, ObjectSchema, RefSchema, ISchemaVisitor, JSONSchema } from '../interfaces';
import { isFunction } from '../utils';
import { Schema } from './schema';

export abstract class SchemaVisitor<TContext = any> {
    protected visitor: ISchemaVisitor<TContext>;

    constructor() {
        this.visitor = this as any;
    }

    public visit(schema: Function | JSONSchema, context?: TContext, fieldKey?: string): TContext {
        if (isFunction(schema)) {
            const obj = Schema.getMetadata(schema as any) as JSONSchema;
            if (!obj) {
                throw new RuntimeError(`'${schema.name}' is not a valid schema.`);
            }
            schema = obj;
        } else {
            schema = schema as JSONSchema;
        }

        if (!Schema.isSchema(schema)) {
            throw new Error(`'${fieldKey}' is not a valid schema.`);
        }

        if (Schema.isObjectSchema(schema)) {
            return this.visitor.visitObject(fieldKey, schema, context);
        } else if (Schema.isRefSchema(schema)) {
            return this.visitor.visitRef(fieldKey, schema, context);
        } else if (Schema.isArraySchema(schema)) {
            return this.visitor.visitArray(fieldKey, schema, context);
        } else {
            return this.visitor.visitField(fieldKey, schema, context);
        }
    }

    protected getRefObject(ref: string): ObjectSchema {
        const schema = Schema.getRef(ref);
        if (!ref) {
            throw new Error(`Can not found schema ref: ${ref}`);
        }
        if (!Schema.isObjectSchema(schema)) {
            throw new Error(`Ref schema '${ref}' is not an Object Schema.`);
        }
        return schema;
    }

    protected visitEachChild(schema: ObjectSchema | ArraySchema | RefSchema, context?: TContext, fieldKey?: string): TContext {
        if (Schema.isRefSchema(schema)) {
            schema = this.getRefObject(schema.$ref);
        }

        if (Schema.isObjectSchema(schema)) {
            for (const key of Object.keys(schema.properties)) {
                const prop = schema.properties[key];
                this.visit(prop, context, key);
            }
            return context;
        }
        if (Schema.isArraySchema(schema)) {
            this.visit(schema.items, context, fieldKey);
            return context;
        }

        return context;
    }

}
