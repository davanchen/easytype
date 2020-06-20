import { DataType, EnumInfo, isNumber, SYMBOL_TYPE_KEY, Undefinable } from '@easytype/core';
import * as ts from 'typescript';
import { IGNORE_FLAG } from '../constants';
import { ITranslator } from '../interfaces/translator.interface';
import { getComment, TSNodeFactory } from '../utils';

export const EnumTranslator: ITranslator = (node: ts.Node): Undefinable<ts.Node | ts.Node[]> => {
    if (!ts.isEnumDeclaration(node)) {
        return;
    }

    const info = getEnumInfo(node);
    if (!info) {
        return;
    }

    return getEnumClass(info);
};

function getEnumInfo(node: ts.EnumDeclaration): EnumInfo {
    const comment = getComment(node, true, false);
    if (comment) {
        if (comment.includes(IGNORE_FLAG)) {
            return;
        }
    }

    const name = node.name.escapedText.toString();
    const info: EnumInfo = { name, description: comment, fields: [] };
    let index = 0;
    for (const member of node.members) {
        const key = (member.name as ts.Identifier).escapedText.toString();
        const description = getComment(member, true, false);
        let value;
        if (member.initializer) {
            if (ts.isNumericLiteral(member.initializer)) {
                value = Number(member.initializer.text);
            } else if (ts.isPrefixUnaryExpression(member.initializer)) { // x = 1 + 1
                value = member.initializer.getText();
            } else {
                value = member.initializer.getText();
            }
        } else {
            const field = info.fields[index - 1];
            value = (field && isNumber(field.value)) ? field.value + 1 : 0;
        }

        index++;
        info.fields.push({ key, value, description });
    }

    return info;
}

function getEnumClass(info: EnumInfo) {
    const keys = info.fields.map(v => `'${v.key}'`);
    const values = info.fields.map(v => v.value);
    const fields = info.fields.map(v => `{ key: '${v.key}', value: ${v.value}, description: ${JSON.stringify(v.description)} }`);
    const props = info.fields.map(v => `static ${v.key} = ${v.value};`);

    const source = `
export class ${info.name} {
    ${props.join('\r\n')}
    static hasValue(value: number | string): boolean {
        return this.values.some(v => v === value);
    }

    static getKey(value: any): undefined | string {
        const field = this.fields
            .find(v => v.value === value);
        return field ? field.key : undefined;
    }

    static getKeys(value: any): string[] {
        return this.fields
            .filter(v => v.value === value)
            .map(v => v.key);
    }

    static hasKey(key: string): boolean {
        return this.keys.some(v => v === key);
    }

    static getDescription(key: string): undefined | string {
        const field = this.fields.find(v => v.key === key);
        return field ? field.description : undefined;
    }
}
Object.defineProperties(${info.name}, {
    [Symbol.for('${SYMBOL_TYPE_KEY}')]: {
        value: '${DataType.ENUM}',
        enumerable: true,
        configurable: false,
        writable: false
    },
    'description': {
        get: function () {
            return \`${info.description}\`;
        },
        enumerable: true,
        configurable: false
    },
    'keys': {
        get: function () {
            return [${keys.join(', ')}];
        },
        enumerable: true,
        configurable: false
    },
    'values': {
        get: function () {
            return [${values.join(', ')}];
        },
        enumerable: true,
        configurable: false
    },
    'fields': {
        get: function () {
            return [${fields.join(', ')}];
        },
        enumerable: true,
        configurable: false
    }
});
    `;

    return TSNodeFactory.generateAst(source);
}
