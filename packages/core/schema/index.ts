import { Schema } from './schema';
import { Type } from '../types';
import { Integer, BigInt, Float, Double, Any, Null } from '../primitive-types';

export * from './schema';
export * from './schema-visitor';

(() => {
    Schema.addRef(Number, Type.Number().schema());
    Schema.addRef(String, Type.String().schema());
    Schema.addRef(Boolean, Type.Boolean().schema());
    Schema.addRef(Date, Type.Date().schema());
    Schema.addRef(Integer, Type.Integer().schema());
    Schema.addRef(BigInt, Type.BigInt().schema());
    Schema.addRef(Float, Type.Float().schema());
    Schema.addRef(Double, Type.Float().schema());
    Schema.addRef(Any, Type.Any().schema());
    Schema.addRef(Null, Type.Any().schema());
})();
