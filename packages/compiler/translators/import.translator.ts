import { Undefinable } from '@easytype/core';
import * as ts from 'typescript';
import { PACKAGE_NAME, PACKAGE_NAMESPACE } from '../constants';
import { ITranslator } from '../interfaces/translator.interface';

export const ImportTranslator: ITranslator = (node: ts.Node): Undefinable<ts.Node> => {
    if (ts.isSourceFile(node)) {
        createImportDeclaration(node, PACKAGE_NAMESPACE, PACKAGE_NAME);
        return;
    }
};

const imports: Map<ts.SourceFile, boolean> = new Map();

export function createImportDeclaration(file: ts.SourceFile, clause: string, module: string) {
    if (imports.get(file)) {
        return null;
    }
    imports.set(file, true);

    const exp = ts.createImportDeclaration(
        undefined,
        undefined,
        ts.createImportClause(
            undefined,
            ts.createNamespaceImport(ts.createIdentifier(clause))
        ),
        ts.createStringLiteral(module)
    );
    // for (const statement of file.statements) {
    //     if (ts.isModuleDeclaration(statement)) {
    //         statement.modifiers = ts.createNodeArray([ts.createModifier(ts.SyntaxKind.ExportKeyword)]);
    //     }
    // }

    file.statements = ts.createNodeArray([exp, ...file.statements]);
    return exp;
}
