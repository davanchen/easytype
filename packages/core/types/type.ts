import { DataType } from '../enums';
import { TypeCtor } from '../interfaces';
import { AnyType } from './any.type';
import { ArrayType } from './array.type';
import { BigIntType } from './big-int.type';
import { BooleanType } from './boolean.type';
import { DateType } from './date.type';
import { EnumType } from './enum.type';
import { FloatType } from './float.type';
import { IntegerType } from './integer.type';
import { NumberType } from './number.type';
import { ObjectType } from './object.type';
import { RefType } from './ref.type';
import { SchemaType } from './schema.type';
import { StringType } from './string.type';

export class Type {
    public static Schema = SchemaType;

    public static Object = ObjectType;

    public static Ref = RefType;

    public static Any = AnyType;

    public static Array = ArrayType;

    public static String = StringType;

    public static Number = NumberType;

    public static Boolean = BooleanType;

    public static Integer = IntegerType;

    public static Float = FloatType;

    public static BigInt = BigIntType;

    public static Date = DateType;

    public static Enum = EnumType;

    private static readonly registers: { [key: string]: TypeCtor<any, any> } = {
        [DataType.ANY]: AnyType,
        [DataType.OBJECT]: ObjectType,
        [DataType.ARRAY]: ArrayType,

        [DataType.STRING]: StringType,
        [DataType.NUMBER]: NumberType,
        [DataType.BOOLEAN]: BooleanType,
        [DataType.INTEGER]: IntegerType,
        [DataType.FLOAT]: FloatType,
        [DataType.DATE_TIME]: DateType,
        [DataType.ENUM]: EnumType,
    };

    public static set(name: string, type: TypeCtor) {
        Type.registers[name] = type;
    }

    public static get(name: DataType | string) {
        return Type.registers[name];
    }
}
