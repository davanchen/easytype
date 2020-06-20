export type Fields<T> = keyof T;

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

/**
 * Partial PLUS ++
 */
export type AnyOf<T, V = any> = {
    [P in keyof T]?: V;
};

export interface Abstract<T> {
    prototype: T;
}

export type Class<T = any> = {
    new(...args: any[]): T;
};

export type TypeReference = Function | any[];

export type Inherits<T, K extends keyof T = keyof T> = Partial<Pick<T, K>>;
