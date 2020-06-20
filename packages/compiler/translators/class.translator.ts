import { AnyOf, EASY_METADATA, FunctionType, GenericArg, isEmpty, Nullable, ParameterInfo, TsModifier, TypeId, Undefinable, InheritInfo } from '@easytype/core';
import * as ts from 'typescript';
import { EXTENDS_METADATA, INHERITS_INTERFACE, INHERIT_METADATA, IS_OBJECT_METADATA, METADATA_FIELD_NAME } from '../constants';
import { ITranslator, ReflectContext } from '../interfaces';
import { addDecorator, addMethodDecorator, createObjectLiteral, getTypeExpression, getTypeLiteralTypeExpression, isReflectableDecorator, getComment, getObjectType } from '../utils';

export const ClassTranslator: ITranslator = (node: ts.Node): Undefinable<ts.Node | ts.Node[]> => {
    if (ts.isImportDeclaration(node)) {
        return ts.getMutableClone(node);
    }

    if (!ts.isClassDeclaration(node)) {
        return;
    }

    if (isEmpty(node.decorators)) {
        return;
    }

    const context: ReflectContext = {
        reflectable: isClassReflectable(node),
        props: getPropertyNames(node),
        args: getClassTypeArgs(node)
    };

    if (context.reflectable) {
        const metaNode: ts.Node = createMetadataPropertyNode(node);
        resolvePropertys(node, metaNode, context);
    }

    resolveMethods(node, context);
    return node;
};

function createMetadataPropertyNode(node: ts.ClassDeclaration) {
    const prop = ts.createProperty(
        undefined,
        [ts.createModifier(ts.SyntaxKind.PrivateKeyword)],
        ts.createIdentifier(METADATA_FIELD_NAME),
        ts.createToken(ts.SyntaxKind.QuestionToken),
        ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
        undefined
    );
    prop.parent = node;
    prop.flags = 0;

    (node.members as any as any[]).unshift(prop);
    return prop;
}

// @Reflectable()
function isClassReflectable(node: ts.ClassDeclaration) {
    if (!node.decorators.some((decorator) => isReflectableDecorator(decorator))
    ) {
        return false;
    }
    return true;
}

function getClassTypeArgs(node: ts.ClassDeclaration): Nullable<GenericArg[]> {
    if (!isEmpty(node.typeParameters)) {
        return node.typeParameters.map(type => {
            if (ts.isTypeParameterDeclaration(type) && ts.isIdentifier(type.name)) {
                const arg: GenericArg = {
                    $name: type.name.text,
                };

                if (type.default) {
                    arg.$default = getTypeExpression(type.default);
                }

                return arg;
            }
            return null;
        });
    }
    return null;
}

export function getPropertyNames(node: ts.ClassDeclaration) {
    const props: string[] = [];
    for (const member of node.members) {
        if (ts.isPropertyDeclaration(member)) {
            if (ts.isIdentifier(member.name)) {
                props.push(member.name.escapedText.toString());
            }
        }
    }
    return props;
}

export function resolveMethods(node: ts.ClassDeclaration, context: ReflectContext) {
    node.members
        .filter(member => ts.isMethodDeclaration(member) && !isEmpty(member.decorators))
        .forEach(member => resolveMethod(member as ts.MethodDeclaration, context));
}

export function resolvePropertys(node: ts.ClassDeclaration, metaNode: Nullable<ts.Node>, context: ReflectContext) {
    // class ? implements Inherits<?>
    const { $extends, $inherits } = resolveHeritageClauses(node, context);

    const obj = getObjectType(node, context.args);
    if ($extends) {
        obj.$extends = $extends;
    }
    if ($inherits && $inherits.length) {
        obj.$inherits = ts.createArrayLiteral($inherits, true);
    }

    addDecorator(metaNode, IS_OBJECT_METADATA, [createObjectLiteral(obj, true)]);
}

function resolveInherits(node: ts.ClassDeclaration, clauseType: ts.ExpressionWithTypeArguments, context: ReflectContext): ts.Expression {
    const typeArgs = clauseType.typeArguments;
    if (isEmpty(typeArgs)) {
        return;
    }

    let fields: string[] = [];
    const [baseType, propsType] = typeArgs;

    if (typeArgs.length === 2) {
        // Inherits<?, 'a'>
        if (ts.isLiteralTypeNode(propsType) && ts.isStringLiteral(propsType.literal)) {
            fields = [propsType.literal.text];
        }
        // Inherits<?, 'a'|'b'>
        if (ts.isUnionTypeNode(propsType)) {
            fields = propsType.types.map(type =>
                ts.isLiteralTypeNode(type)
                    && ts.isStringLiteral(type.literal) ? type.literal.text : null
            );
        }
    }

    if (ts.isTypeReferenceNode(baseType) && ts.isIdentifier(baseType.typeName)) {
        const info: AnyOf<InheritInfo> = {
            $target: getTypeExpression(baseType, context.args),
            $fields: ts.createArrayLiteral(
                fields.map(prop => ts.createStringLiteral(prop)),
                false
            )
        };
        return createObjectLiteral(info, true);
    }
}

function resolveExtends(node: ts.ClassDeclaration, clauseType: ts.ExpressionWithTypeArguments, context: ReflectContext): ts.Expression {
    let type: ts.Node;
    if (!isEmpty(clauseType.typeArguments)) {
        type = ts.createTypeReferenceNode(
            ts.isIdentifier(clauseType.expression)
                ? clauseType.expression
                : ts.createIdentifier(''),
            clauseType.typeArguments
        );
    } else {
        type = clauseType.expression;
    }

    return getTypeExpression(type, context.args);
}

function resolveHeritageClauses(node: ts.ClassDeclaration, context: ReflectContext) {
    if (!node.heritageClauses || !node.heritageClauses.length) {
        return {};
    }
    let $extends: ts.Expression;
    const $inherits: ts.Expression[] = [];

    for (const clause of node.heritageClauses) {
        for (const clauseType of clause.types) {
            if (ts.isExpressionWithTypeArguments(clauseType)
                && ts.isIdentifier(clauseType.expression)
            ) {
                // extends
                if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
                    const exp = resolveExtends(node, clauseType, context);
                    if (exp) {
                        $extends = exp;
                    }
                }

                // class ? implements Inherits<?>
                if (clause.token === ts.SyntaxKind.ImplementsKeyword
                    && clauseType.expression.escapedText === INHERITS_INTERFACE) {
                    const exp = resolveInherits(node, clauseType, context);
                    if (exp) {
                        $inherits.push(exp);
                    }
                }
            }
        }
    }

    return { $extends, $inherits };
}

function resolveDecorators(decorators: ts.NodeArray<ts.Decorator>): ts.ArrayLiteralExpression {
    return ts.createArrayLiteral(
        decorators ? decorators
            .filter(decorator => ts.isCallExpression(decorator.expression) && ts.isIdentifier(decorator.expression.expression))
            .map(decorator => (decorator.expression as ts.CallExpression).expression)
            : [],
        false);
}

function resolveMethod(node: ts.MethodDeclaration, context: ReflectContext) {
    const returns = getTypeExpression(node.type, context.args) || ts.createNull();

    let params: ts.Expression[];
    if (node.parameters) {
        params = node.parameters.map(param => {
            const name = ts.isIdentifier(param.name) ? param.name.escapedText.toString() : '';
            if (!name) {
                return;
            }

            const info: AnyOf<ParameterInfo> = {
                decorators: resolveDecorators(param.decorators),
                name: ts.createStringLiteral(name),
                type: getTypeExpression(param.type),
                required: param.questionToken ? ts.createFalse() : ts.createTrue(),
            };
            return createObjectLiteral(info, true);
        })
            .filter(v => v);
    }

    const modifiers: number[] = [];

    if (node.modifiers) {
        for (const m of node.modifiers) {
            switch (m.kind) {
                case ts.SyntaxKind.PublicKeyword:
                    modifiers.push(TsModifier.Public);
                    break;
                case ts.SyntaxKind.PrivateKeyword:
                    modifiers.push(TsModifier.Private);
                    break;
                case ts.SyntaxKind.ProtectedKeyword:
                    modifiers.push(TsModifier.Protected);
                    break;
                case ts.SyntaxKind.StaticKeyword:
                    modifiers.push(TsModifier.Static);
                    break;
                case ts.SyntaxKind.AsyncKeyword:
                    modifiers.push(TsModifier.Async);
                    break;
            }
        }
    }

    const type: AnyOf<FunctionType> = {
        $type: ts.createNumericLiteral(TypeId.FUNCTION.toString()),
        $returns: returns,
        $decorators: resolveDecorators(node.decorators),
        $params: ts.createArrayLiteral(params, true),
        $modifiers: ts.createArrayLiteral(
            modifiers.map(m => ts.createNumericLiteral(m.toString())),
            false
        ),
    };

    const comment = getComment(node, false);
    if (comment) {
        type.$description = ts.createStringLiteral(comment);
    }

    addMethodDecorator(
        node,
        EASY_METADATA,
        createObjectLiteral(type, true)
    );

    return node;
}
