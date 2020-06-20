import { generateFactoryCode } from './generate-code';
import * as ts from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

export class TSNodeFactory {
    public static generateAst(source: string): ts.Node {
        const node: ts.Node = tsquery.ast(source);
        const fun = new Function('ts', `return ${generateFactoryCode(node)}`);
        return fun(ts);
    }
}
