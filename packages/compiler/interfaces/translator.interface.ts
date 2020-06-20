import * as ts from 'typescript';
import { Undefinable } from '@easytype/core';

export interface ITranslator {
    (node: ts.Node): Undefinable<ts.Node | ts.Node[]>;
}