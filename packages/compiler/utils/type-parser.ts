import { AnyOf, DataType, GenericArg, Nullable, ObjectType, PropType, TypeId } from '@easytype/core';
import * as ts from 'typescript';
import { createObjectLiteral } from '.';
import { ANY_ID, ARRAY_KEYWORDS, BIGINT_ID, BIGINT_NAME, BOOLEAN_ID, BOOLEAN_NAME, DATE_ID, DATE_NAME, FLOAT_ID, FLOAT_NAME, GENERIC_TYPE_ID, GENERIC_VARIABLE_ID, INTEGER_ID, INTEGER_NAME, INTERSECTION_TYPE_ID, METADATA_FIELD_NAME, NULL_ID, NUMBER_ID, NUMBER_NAME, STRING_ID, STRING_NAME, TYPEOF_TYPE_ID, TYPE_KEYWORDS, UNION_TYPE_ID } from '../constants';
import { getComment } from './comment-parser';

export const AnyType = ts.createIdentifier(ANY_ID);

export function getDataType(node: ts.Node) {
    switch (node.kind) {
        case ts.SyntaxKind.StringKeyword:
            return DataType.STRING;
        case ts.SyntaxKind.NumberKeyword:
            return DataType.NUMBER;
        case ts.SyntaxKind.BooleanKeyword:
            return DataType.BOOLEAN;
        case ts.SyntaxKind.AnyKeyword:
            return DataType.ANY;
        case ts.SyntaxKind.NullKeyword:
            return DataType.NULL;
    }

    let type: string;
    if (ts.isTypeReferenceNode(node) && (ts.isIdentifier(node.typeName) || ts.isQualifiedName(node.typeName))) {
        type = node.typeName.getText();
    } else if (ts.isIdentifier(node)) {
        type = node.escapedText.toString();
    }

    if (type) {
        switch (type) {
            case STRING_NAME:
                return DataType.STRING;
            case NUMBER_NAME:
                return DataType.NUMBER;
            case BOOLEAN_NAME:
                return DataType.BOOLEAN;
            case DATE_NAME:
                return DataType.DATE_TIME;
            case INTEGER_NAME:
                return DataType.INTEGER;
            case BIGINT_NAME:
                return DataType.BIG_INT;
            case FLOAT_NAME:
                return DataType.FLOAT;
        }
        return DataType.OBJECT;
    }

    return null;
}

export function getQualifiedName(node: ts.QualifiedName): ts.Expression {
    let left: any = node.left;
    if (ts.isQualifiedName(left)) {
        left = getQualifiedName(left);
    }
    return ts.createPropertyAccess(
        left as ts.Identifier,
        node.right
    );
}

export function getObjectTypeExpression(node: ts.Identifier, args: Nullable<GenericArg[]>): ts.Expression {
    const type = node.escapedText.toString();
    if (type && args && args.some(arg => arg.$name === type)) {
        return ts.createCall(
            ts.createIdentifier(GENERIC_VARIABLE_ID),
            undefined,
            [
                ts.createStringLiteral(type)
            ]
        );
    }
    return node;
}

export function getIndexSignatureExpression(member: ts.IndexSignatureDeclaration, args: Nullable<GenericArg[]>) {
    const key = getTypeExpression(member.parameters[0].type);
    const value = getTypeExpression(member.type, args);
    return ts.createArrayLiteral([key, value], false);
}

export function getGenericArgExpression(args: Nullable<GenericArg[]>) {
    return ts.createArrayLiteral(args.map(arg =>
        createObjectLiteral({
            ...arg,
            $name: ts.createStringLiteral(arg.$name),
        } as AnyOf<GenericArg>)
    ), true);
}

export function getObjectType(type: ts.TypeLiteralNode | ts.ClassDeclaration, args: Nullable<GenericArg[]>) {
    const obj: AnyOf<ObjectType> = {
        $type: ts.createNumericLiteral(TypeId.OBJECT_TYPE.toString()),
        $properties: {}
    };

    if (ts.isClassDeclaration(type) && type.name) {
        obj.$target = type.name;
        obj.$id = ts.createStringLiteral(type.name.text);
    }

    if (args && args.length) {
        obj.$args = getGenericArgExpression(args);
    }

    for (const member of type.members) {
        if (ts.isIndexSignatureDeclaration(member)) {
            obj.$index = getIndexSignatureExpression(member, args);
            continue;
        }

        if (!(ts.isPropertyDeclaration(member)
            || ts.isPropertySignature(member))
            || !member.name
            || !ts.isIdentifier(member.name)
            || member.name.text === METADATA_FIELD_NAME
        ) {
            continue;
        }

        const t = getObjectPropertyType(member as any, args);
        if (t) {
            obj.$properties[member.name.text] = createObjectLiteral(t, true);
        }
    }

    obj.$properties = createObjectLiteral(obj.$properties, true);

    const comment = getComment(type);
    if (comment) {
        obj.$description = ts.createStringLiteral(comment);
    }

    return obj;
}

export function getTypeLiteralTypeExpression(type: ts.TypeLiteralNode | ts.ClassDeclaration, args: Nullable<GenericArg[]>) {
    const obj = getObjectType(type, args);
    return createObjectLiteral(obj, true);
}

export function getObjectPropertyType(member: ts.PropertyDeclaration, args: Nullable<GenericArg[]>): Nullable<AnyOf<PropType>> {
    const type: AnyOf<PropType> = {
        $type: ts.createNumericLiteral(TypeId.PROP_TYPE.toString()),
    };

    if (member.modifiers) {
        // Ignore private property
        if (member.modifiers.some(modifier =>
            modifier.kind === ts.SyntaxKind.PrivateKeyword || modifier.kind === ts.SyntaxKind.StaticKeyword)) {
            return;
        }

        if (member.modifiers.some(modifier =>
            modifier.kind === ts.SyntaxKind.ReadonlyKeyword)) {
            type.$readonly = ts.createTrue();
        }
    }

    if (member.questionToken) {
        type.$optional = ts.createTrue();
    }

    if (member.initializer) {
        type.$default = member.initializer;
    }

    const comment = getComment(member);
    if (comment) {
        type.$description = ts.createStringLiteral(comment);
    }

    if (!member.type
        || member.type.kind === ts.SyntaxKind.UnknownKeyword
        || member.type.kind === ts.SyntaxKind.AnyKeyword
    ) {
        type.$ref = AnyType;
        return type;
    }

    const exp = getTypeExpression(member.type, args);
    if (exp) {
        type.$ref = exp;
    }

    return type;
}

export function getArrayExpression(type: ts.Node, args: Nullable<GenericArg[]>): ts.Expression {
    const exp = getTypeExpression(type, args);
    if (!exp) {
        return AnyType;
    }
    return ts.createArrayLiteral(
        [exp],
        false
    );
}

export function getGenericTypeExpression(node: ts.TypeReferenceNode, args: Nullable<GenericArg[]>): ts.Expression {
    if (ts.isIdentifier(node.typeName)) {
        const text = node.typeName.escapedText.toString();

        if (TYPE_KEYWORDS.includes(text)) {
            return getTypeExpression(node.typeArguments[0], args);
        } else if (ARRAY_KEYWORDS.includes(text)) {
            return getArrayExpression(node.typeArguments[0], args);
        } else {
            const name = node.typeName;
            return ts.createCall(
                ts.createIdentifier(GENERIC_TYPE_ID),
                undefined,
                [
                    ts.createBinary(
                        name,
                        ts.createToken(ts.SyntaxKind.BarBarToken),
                        ts.createStringLiteral(name.text)
                    ),
                    ts.createArrayLiteral(
                        node.typeArguments.map(arg => getTypeExpression(arg, args)),
                        false
                    ),
                    node.pos > -1 ? ts.createStringLiteral(node.getFullText().trim()) : ts.createNull()
                ]
            );
        }
    }
}

export function getMultipleTypeExpression(id: string, type: ts.UnionOrIntersectionTypeNode) {
    return ts.createCall(
        ts.createIdentifier(id),
        undefined,
        [
            ts.createArrayLiteral(
                type.types.map(t => getTypeExpression(t as any)),
                false
            ),
        ]
    );
}

export function getTypeExpression(node: ts.Node, args: Nullable<GenericArg[]> = []): ts.Expression {
    if (!node) {
        return AnyType;
    }

    // a | b
    if (ts.isUnionTypeNode(node)) {
        return getMultipleTypeExpression(UNION_TYPE_ID, node);
    }

    // a & b
    if (ts.isIntersectionTypeNode(node)) {
        return getMultipleTypeExpression(INTERSECTION_TYPE_ID, node);
    }

    // a: typeof b
    if (ts.isTypeQueryNode(node)) {
        if (ts.isIdentifier(node.exprName)) {
            return ts.createCall(
                ts.createIdentifier(TYPEOF_TYPE_ID),
                undefined,
                [node.exprName]
            );
        }
        return AnyType;
    }

    // Generic Type: Promise<?> / Observable<?> / Array<?> / ReadonlyArray<?> ...
    if (ts.isTypeReferenceNode(node)
        && ts.isIdentifier(node.typeName)
        && node.typeArguments
        && node.typeArguments.length
    ) {
        return getGenericTypeExpression(node, args);
    }

    // Array: var:foo[]
    if (ts.isArrayTypeNode(node)) {
        return getArrayExpression(node.elementType, args);
    }

    // Tuple: { var:[string, number] }
    if (ts.isTupleTypeNode(node)) {
        return getArrayExpression(node.elementTypes[0], args);
    }

    // obj: {a: string; ...}
    if (ts.isTypeLiteralNode(node)) {
        return getTypeLiteralTypeExpression(node, args);
    }

    const type = getDataType(node);
    if (type) {
        switch (type) {
            case DataType.STRING:
                return ts.createIdentifier(STRING_ID);
            case DataType.NUMBER:
                return ts.createIdentifier(NUMBER_ID);
            case DataType.BOOLEAN:
                return ts.createIdentifier(BOOLEAN_ID);
            case DataType.DATE_TIME:
                return ts.createIdentifier(DATE_ID);
            case DataType.INTEGER:
                return ts.createIdentifier(INTEGER_ID);
            case DataType.FLOAT:
                return ts.createIdentifier(FLOAT_ID);
            case DataType.BIG_INT:
                return ts.createIdentifier(BIGINT_ID);
            case DataType.OBJECT: {
                if (ts.isTypeReferenceNode(node)) {
                    if (ts.isIdentifier(node.typeName)) {
                        return getObjectTypeExpression(node.typeName, args);
                    }
                    // support 'ns.class'
                    if (ts.isQualifiedName(node.typeName)) {
                        return getQualifiedName(node.typeName);
                    }
                }
                if (ts.isIdentifier(node)) {
                    return getObjectTypeExpression(node, args);
                }
            }
            case DataType.ANY:
                return AnyType;
            case DataType.NULL:
                return ts.createIdentifier(NULL_ID);
        }
    }

    return AnyType;
}
