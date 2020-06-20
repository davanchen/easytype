import * as moment from 'moment';
import { DataType } from '../enums';
import { DateSchema, IType } from '../interfaces';
import { SchemaError } from '../errors';

export function DateType(schema: Partial<DateSchema> = {}): IType<number | string | Date> {
    schema.type = schema.type || DataType.NUMBER;
    schema.format = schema.format || DataType.DATE_TIME;
    schema.$type = DataType.DATE_TIME;
    if (schema.pattern && schema.type !== DataType.STRING) {
        throw new SchemaError(schema, `DateType Error: If the 'pattern' keyword is specified, the type must be 'STRING'.`);
    }
    schema.$value = schema.$value || DataType.DATE_TIME;

    return {
        type: DataType.DATE_TIME,
        schema: () => {
            return schema as DateSchema;
        },
        is: (value: any) => {
            if (value instanceof Date && !isNaN(value.getTime())) {
                return true;
            }
            if (typeof value === 'number' && !isNaN(value) && moment(value).isValid()) {
                return true;
            }
            return false;
        },
        value: (value: any) => {
            if (value) {
                try {
                    const date = moment(value, schema.pattern);
                    if (date.isValid()) {
                        switch (schema.$value) {
                            case DataType.NUMBER:
                                return date.valueOf();
                            case DataType.STRING:
                                return date.format(schema.pattern);
                            case DataType.DATE_TIME:
                                return date.toDate();
                        }
                    }
                } catch (err) {
                    return;
                }
            }
            return;
        }
    };
}
