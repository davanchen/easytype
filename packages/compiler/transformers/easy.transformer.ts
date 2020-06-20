import * as ts from 'typescript';
import { Translators } from '../translators';
import * as pkg from '../package.json';
import * as chalk from 'chalk';

export function EasyTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
    console.log(chalk.blue(`EasyType Transformer: v${pkg.version}`));

    return context => {
        const visit: ts.Visitor = node => {
            for (const translator of Translators) {
                const result = translator(node);
                if (result) {
                    node = result as any;
                    break;
                    //  return result;
                }
            }

            return ts.visitEachChild(node, child => visit(child), context);
        };

        return (node) => ts.visitNode(node, visit);
    };
}
