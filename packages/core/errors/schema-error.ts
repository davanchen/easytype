import { BaseSchema } from 'interfaces';

export class SchemaError {
    constructor(public schema: BaseSchema, public message: string) {
        this.message = `Schema '${schema.$id}' Error: ` + message;
        console.error(this.message);
    }
}
