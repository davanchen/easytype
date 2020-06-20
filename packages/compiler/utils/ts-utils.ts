import { ObjectLiteral } from '@easytype/core';
import * as ts from 'typescript';
import { PACKAGE_NAMESPACE, TS_METADATA, REFLECT_METADATA } from '../constants';

export function createObjectLiteral(obj: ObjectLiteral, multiLine?: boolean) {
    const props = [];
    for (const key in obj) {
        props.push(ts.createPropertyAssignment(
            ts.createIdentifier(key),
            obj[key]
        ));
    }
    return ts.createObjectLiteral(props, multiLine);
}

export function addMethodDecorator(node: ts.Node, key: string, exp: ts.Expression) {
    const decorator = ts.createDecorator(ts.createCall(
        ts.createIdentifier(TS_METADATA),
        undefined,
        [
            ts.createStringLiteral(key),
            exp,
        ]
    ));
    (node.decorators as any as any[]).push(decorator);
}

export function isReflectableDecorator(decorator: ts.Decorator) {
    // @Reflectable()
    return ts.isCallExpression(decorator.expression)
        && ts.isIdentifier(decorator.expression.expression)
        && REFLECT_METADATA.includes(decorator.expression.expression.escapedText.toString())
        && (!decorator.expression.arguments || !decorator.expression.arguments.length);
}

export function addDecorator(node: ts.Node, id: string, params: ts.Expression[] = []) {
    const decorator = ts.createDecorator(ts.createCall(
        ts.createPropertyAccess(
            ts.createIdentifier(PACKAGE_NAMESPACE),
            ts.createIdentifier(id)
        ),
        undefined,
        [...params]
    ));

    if (!node.decorators) {
        node.decorators = ts.createNodeArray([decorator]);
        return;
    }

    (node.decorators as any as any[]).push(decorator);
}
