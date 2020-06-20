export class Float extends Number { }

export class Double extends Number { }

export class Integer extends Number { }

export class BigInt extends Number { }

export class Any { }

export class Null { }

export class ObjectLiteral<T = any>  {
    [key: string]: T;
}
