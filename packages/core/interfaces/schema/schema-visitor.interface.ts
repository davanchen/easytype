import { ArraySchema, ObjectSchema, RefSchema, JSONSchema } from './json-schema.interface';

export interface ISchemaVisitor<TContext = any> {
    visit(schema: JSONSchema, context?: TContext): TContext;

    visitField(field: string, schema: JSONSchema, context?: TContext): TContext;

    visitRef(field: string, schema: RefSchema, context?: TContext): TContext;

    visitAllOf(field: string, schema: JSONSchema, context?: TContext);

    visitOneOf(field: string, schema: JSONSchema, context?: TContext);

    visitObject(field: string, schema: ObjectSchema, context?: TContext): TContext;

    visitArray(field: string, schema: ArraySchema, context?: TContext): TContext;
}
