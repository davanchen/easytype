/**
 * 枚举字段声明
 */
export interface EnumField {
    /**
     * 字段名
     */
    key: string;

    /**
     * 常量值
     */
    value: number | string;

    /**
     * 字段描述
     */
    description: string;
}

/**
 * enum info
 */
export interface EnumInfo {
    name: string;

    description: string;

    fields: EnumField[];
}
