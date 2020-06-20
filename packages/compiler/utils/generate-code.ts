/**
 * this file is a part of the 'TypeScript AST Viewer'
 * @see https://github.com/dsherret/ts-ast-viewer
 */

/* tslint:disable */
import CodeBlockWriter from "code-block-writer";
import * as ts from 'typescript';

export function generateFactoryCode(initialNode: ts.Node) {
    const writer = new CodeBlockWriter({ newLine: "\n", indentNumberOfSpaces: 2 });
    const syntaxKindToName = createSyntaxKindToNameMap();

    if (ts.isSourceFile(initialNode)) {
        writer.write("[");
        if (initialNode.statements.length > 0) {
            writer.indent(() => {
                for (let i = 0; i < initialNode.statements.length; i++) {
                    const statement = initialNode.statements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(statement);
                }
            }).newLine();
        }
        writer.write("];");
    }
    else {
        writeNodeText(initialNode);
    }
    writer.newLineIfLastNot();

    return writer.toString();

    function writeNodeText(node: ts.Node) {
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral:
                createNumericLiteral(node as ts.NumericLiteral);
                return;
            case ts.SyntaxKind.BigIntLiteral:
                createBigIntLiteral(node as ts.BigIntLiteral);
                return;
            case ts.SyntaxKind.StringLiteral:
                createStringLiteral(node as ts.StringLiteral);
                return;
            case ts.SyntaxKind.RegularExpressionLiteral:
                createRegularExpressionLiteral(node as ts.RegularExpressionLiteral);
                return;
            case ts.SyntaxKind.Identifier:
                createIdentifier(node as ts.Identifier);
                return;
            case ts.SyntaxKind.SuperKeyword:
                createSuper(node as ts.SuperExpression);
                return;
            case ts.SyntaxKind.ThisKeyword:
                createThis(node as ts.ThisExpression);
                return;
            case ts.SyntaxKind.NullKeyword:
                createNull(node as ts.NullLiteral);
                return;
            case ts.SyntaxKind.TrueKeyword:
                createTrue(node as ts.BooleanLiteral);
                return;
            case ts.SyntaxKind.FalseKeyword:
                createFalse(node as ts.BooleanLiteral);
                return;
            case ts.SyntaxKind.QualifiedName:
                createQualifiedName(node as ts.QualifiedName);
                return;
            case ts.SyntaxKind.ComputedPropertyName:
                createComputedPropertyName(node as ts.ComputedPropertyName);
                return;
            case ts.SyntaxKind.TypeParameter:
                createTypeParameterDeclaration(node as ts.TypeParameterDeclaration);
                return;
            case ts.SyntaxKind.Parameter:
                createParameter(node as ts.ParameterDeclaration);
                return;
            case ts.SyntaxKind.Decorator:
                createDecorator(node as ts.Decorator);
                return;
            case ts.SyntaxKind.PropertySignature:
                createPropertySignature(node as ts.PropertySignature);
                return;
            case ts.SyntaxKind.PropertyDeclaration:
                createProperty(node as ts.PropertyDeclaration);
                return;
            case ts.SyntaxKind.MethodSignature:
                createMethodSignature(node as ts.MethodSignature);
                return;
            case ts.SyntaxKind.MethodDeclaration:
                createMethod(node as ts.MethodDeclaration);
                return;
            case ts.SyntaxKind.Constructor:
                createConstructor(node as ts.ConstructorDeclaration);
                return;
            case ts.SyntaxKind.GetAccessor:
                createGetAccessor(node as ts.GetAccessorDeclaration);
                return;
            case ts.SyntaxKind.SetAccessor:
                createSetAccessor(node as ts.SetAccessorDeclaration);
                return;
            case ts.SyntaxKind.CallSignature:
                createCallSignature(node as ts.CallSignatureDeclaration);
                return;
            case ts.SyntaxKind.ConstructSignature:
                createConstructSignature(node as ts.ConstructSignatureDeclaration);
                return;
            case ts.SyntaxKind.IndexSignature:
                createIndexSignature(node as ts.IndexSignatureDeclaration);
                return;
            case ts.SyntaxKind.AnyKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.BooleanKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.NeverKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.NumberKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.ObjectKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.StringKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.SymbolKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.UndefinedKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.UnknownKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.BigIntKeyword:
                createKeywordTypeNode(node as ts.KeywordTypeNode);
                return;
            case ts.SyntaxKind.TypePredicate:
                createTypePredicateNode(node as ts.TypePredicateNode);
                return;
            case ts.SyntaxKind.TypeReference:
                createTypeReferenceNode(node as ts.TypeReferenceNode);
                return;
            case ts.SyntaxKind.FunctionType:
                createFunctionTypeNode(node as ts.FunctionTypeNode);
                return;
            case ts.SyntaxKind.ConstructorType:
                createConstructorTypeNode(node as ts.ConstructorTypeNode);
                return;
            case ts.SyntaxKind.TypeQuery:
                createTypeQueryNode(node as ts.TypeQueryNode);
                return;
            case ts.SyntaxKind.TypeLiteral:
                createTypeLiteralNode(node as ts.TypeLiteralNode);
                return;
            case ts.SyntaxKind.ArrayType:
                createArrayTypeNode(node as ts.ArrayTypeNode);
                return;
            case ts.SyntaxKind.TupleType:
                createTupleTypeNode(node as ts.TupleTypeNode);
                return;
            case ts.SyntaxKind.OptionalType:
                createOptionalTypeNode(node as ts.OptionalTypeNode);
                return;
            case ts.SyntaxKind.RestType:
                createRestTypeNode(node as ts.RestTypeNode);
                return;
            case ts.SyntaxKind.UnionType:
                createUnionTypeNode(node as ts.UnionTypeNode);
                return;
            case ts.SyntaxKind.IntersectionType:
                createIntersectionTypeNode(node as ts.IntersectionTypeNode);
                return;
            case ts.SyntaxKind.ConditionalType:
                createConditionalTypeNode(node as ts.ConditionalTypeNode);
                return;
            case ts.SyntaxKind.InferType:
                createInferTypeNode(node as ts.InferTypeNode);
                return;
            case ts.SyntaxKind.ImportType:
                createImportTypeNode(node as ts.ImportTypeNode);
                return;
            case ts.SyntaxKind.ParenthesizedType:
                createParenthesizedType(node as ts.ParenthesizedTypeNode);
                return;
            case ts.SyntaxKind.ThisType:
                createThisTypeNode(node as ts.ThisTypeNode);
                return;
            case ts.SyntaxKind.TypeOperator:
                createTypeOperatorNode(node as ts.TypeOperatorNode);
                return;
            case ts.SyntaxKind.IndexedAccessType:
                createIndexedAccessTypeNode(node as ts.IndexedAccessTypeNode);
                return;
            case ts.SyntaxKind.MappedType:
                createMappedTypeNode(node as ts.MappedTypeNode);
                return;
            case ts.SyntaxKind.LiteralType:
                createLiteralTypeNode(node as ts.LiteralTypeNode);
                return;
            case ts.SyntaxKind.ObjectBindingPattern:
                createObjectBindingPattern(node as ts.ObjectBindingPattern);
                return;
            case ts.SyntaxKind.ArrayBindingPattern:
                createArrayBindingPattern(node as ts.ArrayBindingPattern);
                return;
            case ts.SyntaxKind.BindingElement:
                createBindingElement(node as ts.BindingElement);
                return;
            case ts.SyntaxKind.ArrayLiteralExpression:
                createArrayLiteral(node as ts.ArrayLiteralExpression);
                return;
            case ts.SyntaxKind.ObjectLiteralExpression:
                createObjectLiteral(node as ts.ObjectLiteralExpression);
                return;
            case ts.SyntaxKind.PropertyAccessExpression:
                createPropertyAccess(node as ts.PropertyAccessExpression);
                return;
            case ts.SyntaxKind.ElementAccessExpression:
                createElementAccess(node as ts.ElementAccessExpression);
                return;
            case ts.SyntaxKind.CallExpression:
                createCall(node as ts.CallExpression);
                return;
            case ts.SyntaxKind.NewExpression:
                createNew(node as ts.NewExpression);
                return;
            case ts.SyntaxKind.TaggedTemplateExpression:
                createTaggedTemplate(node as ts.TaggedTemplateExpression);
                return;
            case ts.SyntaxKind.TypeAssertionExpression:
                createTypeAssertion(node as ts.TypeAssertion);
                return;
            case ts.SyntaxKind.ParenthesizedExpression:
                createParen(node as ts.ParenthesizedExpression);
                return;
            case ts.SyntaxKind.FunctionExpression:
                createFunctionExpression(node as ts.FunctionExpression);
                return;
            case ts.SyntaxKind.ArrowFunction:
                createArrowFunction(node as ts.ArrowFunction);
                return;
            case ts.SyntaxKind.DeleteExpression:
                createDelete(node as ts.DeleteExpression);
                return;
            case ts.SyntaxKind.TypeOfExpression:
                createTypeOf(node as ts.TypeOfExpression);
                return;
            case ts.SyntaxKind.VoidExpression:
                createVoid(node as ts.VoidExpression);
                return;
            case ts.SyntaxKind.AwaitExpression:
                createAwait(node as ts.AwaitExpression);
                return;
            case ts.SyntaxKind.PrefixUnaryExpression:
                createPrefix(node as ts.PrefixUnaryExpression);
                return;
            case ts.SyntaxKind.PostfixUnaryExpression:
                createPostfix(node as ts.PostfixUnaryExpression);
                return;
            case ts.SyntaxKind.BinaryExpression:
                createBinary(node as ts.BinaryExpression);
                return;
            case ts.SyntaxKind.ConditionalExpression:
                createConditional(node as ts.ConditionalExpression);
                return;
            case ts.SyntaxKind.TemplateExpression:
                createTemplateExpression(node as ts.TemplateExpression);
                return;
            case ts.SyntaxKind.TemplateHead:
                createTemplateHead(node as ts.TemplateHead);
                return;
            case ts.SyntaxKind.TemplateMiddle:
                createTemplateMiddle(node as ts.TemplateMiddle);
                return;
            case ts.SyntaxKind.TemplateTail:
                createTemplateTail(node as ts.TemplateTail);
                return;
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                createNoSubstitutionTemplateLiteral(node as ts.NoSubstitutionTemplateLiteral);
                return;
            case ts.SyntaxKind.YieldExpression:
                createYield(node as ts.YieldExpression);
                return;
            case ts.SyntaxKind.SpreadElement:
                createSpread(node as ts.SpreadElement);
                return;
            case ts.SyntaxKind.ClassExpression:
                createClassExpression(node as ts.ClassExpression);
                return;
            case ts.SyntaxKind.OmittedExpression:
                createOmittedExpression(node as ts.OmittedExpression);
                return;
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                createExpressionWithTypeArguments(node as ts.ExpressionWithTypeArguments);
                return;
            case ts.SyntaxKind.AsExpression:
                createAsExpression(node as ts.AsExpression);
                return;
            case ts.SyntaxKind.NonNullExpression:
                createNonNullExpression(node as ts.NonNullExpression);
                return;
            case ts.SyntaxKind.MetaProperty:
                createMetaProperty(node as ts.MetaProperty);
                return;
            case ts.SyntaxKind.TemplateSpan:
                createTemplateSpan(node as ts.TemplateSpan);
                return;
            case ts.SyntaxKind.SemicolonClassElement:
                createSemicolonClassElement(node as ts.SemicolonClassElement);
                return;
            case ts.SyntaxKind.Block:
                createBlock(node as ts.Block);
                return;
            case ts.SyntaxKind.VariableStatement:
                createVariableStatement(node as ts.VariableStatement);
                return;
            case ts.SyntaxKind.EmptyStatement:
                createEmptyStatement(node as ts.EmptyStatement);
                return;
            case ts.SyntaxKind.ExpressionStatement:
                createExpressionStatement(node as ts.ExpressionStatement);
                return;
            case ts.SyntaxKind.IfStatement:
                createIf(node as ts.IfStatement);
                return;
            case ts.SyntaxKind.DoStatement:
                createDo(node as ts.DoStatement);
                return;
            case ts.SyntaxKind.WhileStatement:
                createWhile(node as ts.WhileStatement);
                return;
            case ts.SyntaxKind.ForStatement:
                createFor(node as ts.ForStatement);
                return;
            case ts.SyntaxKind.ForInStatement:
                createForIn(node as ts.ForInStatement);
                return;
            case ts.SyntaxKind.ForOfStatement:
                createForOf(node as ts.ForOfStatement);
                return;
            case ts.SyntaxKind.ContinueStatement:
                createContinue(node as ts.ContinueStatement);
                return;
            case ts.SyntaxKind.BreakStatement:
                createBreak(node as ts.BreakStatement);
                return;
            case ts.SyntaxKind.ReturnStatement:
                createReturn(node as ts.ReturnStatement);
                return;
            case ts.SyntaxKind.WithStatement:
                createWith(node as ts.WithStatement);
                return;
            case ts.SyntaxKind.SwitchStatement:
                createSwitch(node as ts.SwitchStatement);
                return;
            case ts.SyntaxKind.LabeledStatement:
                createLabel(node as ts.LabeledStatement);
                return;
            case ts.SyntaxKind.ThrowStatement:
                createThrow(node as ts.ThrowStatement);
                return;
            case ts.SyntaxKind.TryStatement:
                createTry(node as ts.TryStatement);
                return;
            case ts.SyntaxKind.DebuggerStatement:
                createDebuggerStatement(node as ts.DebuggerStatement);
                return;
            case ts.SyntaxKind.VariableDeclaration:
                createVariableDeclaration(node as ts.VariableDeclaration);
                return;
            case ts.SyntaxKind.VariableDeclarationList:
                createVariableDeclarationList(node as ts.VariableDeclarationList);
                return;
            case ts.SyntaxKind.FunctionDeclaration:
                createFunctionDeclaration(node as ts.FunctionDeclaration);
                return;
            case ts.SyntaxKind.ClassDeclaration:
                createClassDeclaration(node as ts.ClassDeclaration);
                return;
            case ts.SyntaxKind.InterfaceDeclaration:
                createInterfaceDeclaration(node as ts.InterfaceDeclaration);
                return;
            case ts.SyntaxKind.TypeAliasDeclaration:
                createTypeAliasDeclaration(node as ts.TypeAliasDeclaration);
                return;
            case ts.SyntaxKind.EnumDeclaration:
                createEnumDeclaration(node as ts.EnumDeclaration);
                return;
            case ts.SyntaxKind.ModuleDeclaration:
                createModuleDeclaration(node as ts.ModuleDeclaration);
                return;
            case ts.SyntaxKind.ModuleBlock:
                createModuleBlock(node as ts.ModuleBlock);
                return;
            case ts.SyntaxKind.CaseBlock:
                createCaseBlock(node as ts.CaseBlock);
                return;
            case ts.SyntaxKind.NamespaceExportDeclaration:
                createNamespaceExportDeclaration(node as ts.NamespaceExportDeclaration);
                return;
            case ts.SyntaxKind.ImportEqualsDeclaration:
                createImportEqualsDeclaration(node as ts.ImportEqualsDeclaration);
                return;
            case ts.SyntaxKind.ImportDeclaration:
                createImportDeclaration(node as ts.ImportDeclaration);
                return;
            case ts.SyntaxKind.ImportClause:
                createImportClause(node as ts.ImportClause);
                return;
            case ts.SyntaxKind.NamespaceImport:
                createNamespaceImport(node as ts.NamespaceImport);
                return;
            case ts.SyntaxKind.NamedImports:
                createNamedImports(node as ts.NamedImports);
                return;
            case ts.SyntaxKind.ImportSpecifier:
                createImportSpecifier(node as ts.ImportSpecifier);
                return;
            case ts.SyntaxKind.ExportAssignment:
                createExportAssignment(node as ts.ExportAssignment);
                return;
            case ts.SyntaxKind.ExportDeclaration:
                createExportDeclaration(node as ts.ExportDeclaration);
                return;
            case ts.SyntaxKind.NamedExports:
                createNamedExports(node as ts.NamedExports);
                return;
            case ts.SyntaxKind.ExportSpecifier:
                createExportSpecifier(node as ts.ExportSpecifier);
                return;
            case ts.SyntaxKind.ExternalModuleReference:
                createExternalModuleReference(node as ts.ExternalModuleReference);
                return;
            case ts.SyntaxKind.JsxElement:
                createJsxElement(node as ts.JsxElement);
                return;
            case ts.SyntaxKind.JsxSelfClosingElement:
                createJsxSelfClosingElement(node as ts.JsxSelfClosingElement);
                return;
            case ts.SyntaxKind.JsxOpeningElement:
                createJsxOpeningElement(node as ts.JsxOpeningElement);
                return;
            case ts.SyntaxKind.JsxClosingElement:
                createJsxClosingElement(node as ts.JsxClosingElement);
                return;
            case ts.SyntaxKind.JsxFragment:
                createJsxFragment(node as ts.JsxFragment);
                return;
            case ts.SyntaxKind.JsxText:
                createJsxText(node as ts.JsxText);
                return;
            case ts.SyntaxKind.JsxOpeningFragment:
                createJsxOpeningFragment(node as ts.JsxOpeningFragment);
                return;
            case ts.SyntaxKind.JsxClosingFragment:
                createJsxJsxClosingFragment(node as ts.JsxClosingFragment);
                return;
            case ts.SyntaxKind.JsxAttribute:
                createJsxAttribute(node as ts.JsxAttribute);
                return;
            case ts.SyntaxKind.JsxAttributes:
                createJsxAttributes(node as ts.JsxAttributes);
                return;
            case ts.SyntaxKind.JsxSpreadAttribute:
                createJsxSpreadAttribute(node as ts.JsxSpreadAttribute);
                return;
            case ts.SyntaxKind.JsxExpression:
                createJsxExpression(node as ts.JsxExpression);
                return;
            case ts.SyntaxKind.CaseClause:
                createCaseClause(node as ts.CaseClause);
                return;
            case ts.SyntaxKind.DefaultClause:
                createDefaultClause(node as ts.DefaultClause);
                return;
            case ts.SyntaxKind.HeritageClause:
                createHeritageClause(node as ts.HeritageClause);
                return;
            case ts.SyntaxKind.CatchClause:
                createCatchClause(node as ts.CatchClause);
                return;
            case ts.SyntaxKind.PropertyAssignment:
                createPropertyAssignment(node as ts.PropertyAssignment);
                return;
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                createShorthandPropertyAssignment(node as ts.ShorthandPropertyAssignment);
                return;
            case ts.SyntaxKind.SpreadAssignment:
                createSpreadAssignment(node as ts.SpreadAssignment);
                return;
            case ts.SyntaxKind.EnumMember:
                createEnumMember(node as ts.EnumMember);
                return;
            case ts.SyntaxKind.CommaListExpression:
                createCommaList(node as ts.CommaListExpression);
                return;
            default:
                if (node.kind >= ts.SyntaxKind.FirstToken && node.kind <= ts.SyntaxKind.LastToken) {
                    writer.write("ts.createToken(ts.SyntaxKind.").write(syntaxKindToName[node.kind]).write(")");
                    return;
                }
                writer.write("/* Unhandled node kind: ").write(syntaxKindToName[node.kind]).write(" */")
        }
    }

    function createNumericLiteral(node: ts.NumericLiteral) {
        writer.write("ts.createNumericLiteral(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createBigIntLiteral(node: ts.BigIntLiteral) {
        writer.write("ts.createBigIntLiteral(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createStringLiteral(node: ts.StringLiteral) {
        writer.write("ts.createStringLiteral(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createRegularExpressionLiteral(node: ts.RegularExpressionLiteral) {
        writer.write("ts.createRegularExpressionLiteral(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createIdentifier(node: ts.Identifier) {
        writer.write("ts.createIdentifier(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createSuper(node: ts.SuperExpression) {
        writer.write("ts.createSuper(");
        writer.write(")");
    }

    function createThis(node: ts.ThisExpression) {
        writer.write("ts.createThis(");
        writer.write(")");
    }

    function createNull(node: ts.NullLiteral) {
        writer.write("ts.createNull(");
        writer.write(")");
    }

    function createTrue(node: ts.BooleanLiteral) {
        writer.write("ts.createTrue(");
        writer.write(")");
    }

    function createFalse(node: ts.BooleanLiteral) {
        writer.write("ts.createFalse(");
        writer.write(")");
    }

    function createQualifiedName(node: ts.QualifiedName) {
        writer.write("ts.createQualifiedName(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.left)
            writer.write(",").newLine();
            writeNodeText(node.right)
        });
        writer.write(")");
    }

    function createComputedPropertyName(node: ts.ComputedPropertyName) {
        writer.write("ts.createComputedPropertyName(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createTypeParameterDeclaration(node: ts.TypeParameterDeclaration) {
        writer.write("ts.createTypeParameterDeclaration(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.constraint == null)
                writer.write("undefined");
            else {
                writeNodeText(node.constraint)
            }
            writer.write(",").newLine();
            if (node.default == null)
                writer.write("undefined");
            else {
                writeNodeText(node.default)
            }
        });
        writer.write(")");
    }

    function createParameter(node: ts.ParameterDeclaration) {
        writer.write("ts.createParameter(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createDecorator(node: ts.Decorator) {
        writer.write("ts.createDecorator(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createPropertySignature(node: ts.PropertySignature) {
        writer.write("ts.createPropertySignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createProperty(node: ts.PropertyDeclaration) {
        writer.write("ts.createProperty(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken != null)
                writer.write("ts.createToken(ts.SyntaxKind.QuestionToken)");
            else if (node.exclamationToken != null)
                writer.write("ts.createToken(ts.SyntaxKind.ExclamationToken)");
            else
                writer.write("undefined");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createMethodSignature(node: ts.MethodSignature) {
        writer.write("ts.createMethodSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
        });
        writer.write(")");
    }

    function createMethod(node: ts.MethodDeclaration) {
        writer.write("ts.createMethod(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createConstructor(node: ts.ConstructorDeclaration) {
        writer.write("ts.createConstructor(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createGetAccessor(node: ts.GetAccessorDeclaration) {
        writer.write("ts.createGetAccessor(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createSetAccessor(node: ts.SetAccessorDeclaration) {
        writer.write("ts.createSetAccessor(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createCallSignature(node: ts.CallSignatureDeclaration) {
        writer.write("ts.createCallSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
        });
        writer.write(")");
    }

    function createConstructSignature(node: ts.ConstructSignatureDeclaration) {
        writer.write("ts.createConstructSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
        });
        writer.write(")");
    }

    function createIndexSignature(node: ts.IndexSignatureDeclaration) {
        writer.write("ts.createIndexSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
        });
        writer.write(")");
    }

    function createKeywordTypeNode(node: ts.KeywordTypeNode) {
        writer.write("ts.createKeywordTypeNode(");
        writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.kind])
        writer.write(")");
    }

    function createTypePredicateNode(node: ts.TypePredicateNode) {
        writer.write("ts.createTypePredicateNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.parameterName)
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createTypeReferenceNode(node: ts.TypeReferenceNode) {
        writer.write("ts.createTypeReferenceNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.typeName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeText(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }

    function createFunctionTypeNode(node: ts.FunctionTypeNode) {
        writer.write("ts.createFunctionTypeNode(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createConstructorTypeNode(node: ts.ConstructorTypeNode) {
        writer.write("ts.createConstructorTypeNode(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createTypeQueryNode(node: ts.TypeQueryNode) {
        writer.write("ts.createTypeQueryNode(");
        writeNodeText(node.exprName)
        writer.write(")");
    }

    function createTypeLiteralNode(node: ts.TypeLiteralNode) {
        writer.write("ts.createTypeLiteralNode(");
        writer.write("[");
        if (node.members.length === 1) {
            const item = node.members![0];
            writeNodeText(item)
        }
        else if (node.members.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.members!.length; i++) {
                    const item = node.members![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createArrayTypeNode(node: ts.ArrayTypeNode) {
        writer.write("ts.createArrayTypeNode(");
        writeNodeText(node.elementType)
        writer.write(")");
    }

    function createTupleTypeNode(node: ts.TupleTypeNode) {
        writer.write("ts.createTupleTypeNode(");
        writer.write("[");
        if (node.elementTypes.length === 1) {
            const item = node.elementTypes![0];
            writeNodeText(item)
        }
        else if (node.elementTypes.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elementTypes!.length; i++) {
                    const item = node.elementTypes![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createOptionalTypeNode(node: ts.OptionalTypeNode) {
        writer.write("ts.createOptionalTypeNode(");
        writeNodeText(node.type)
        writer.write(")");
    }

    function createRestTypeNode(node: ts.RestTypeNode) {
        writer.write("ts.createRestTypeNode(");
        writeNodeText(node.type)
        writer.write(")");
    }

    function createUnionTypeNode(node: ts.UnionTypeNode) {
        writer.write("ts.createUnionTypeNode(");
        writer.write("[");
        if (node.types.length === 1) {
            const item = node.types![0];
            writeNodeText(item)
        }
        else if (node.types.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.types!.length; i++) {
                    const item = node.types![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createIntersectionTypeNode(node: ts.IntersectionTypeNode) {
        writer.write("ts.createIntersectionTypeNode(");
        writer.write("[");
        if (node.types.length === 1) {
            const item = node.types![0];
            writeNodeText(item)
        }
        else if (node.types.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.types!.length; i++) {
                    const item = node.types![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createConditionalTypeNode(node: ts.ConditionalTypeNode) {
        writer.write("ts.createConditionalTypeNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.checkType)
            writer.write(",").newLine();
            writeNodeText(node.extendsType)
            writer.write(",").newLine();
            writeNodeText(node.trueType)
            writer.write(",").newLine();
            writeNodeText(node.falseType)
        });
        writer.write(")");
    }

    function createInferTypeNode(node: ts.InferTypeNode) {
        writer.write("ts.createInferTypeNode(");
        writeNodeText(node.typeParameter)
        writer.write(")");
    }

    function createImportTypeNode(node: ts.ImportTypeNode) {
        writer.write("ts.createImportTypeNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.argument)
            writer.write(",").newLine();
            if (node.qualifier == null)
                writer.write("undefined");
            else {
                writeNodeText(node.qualifier)
            }
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeText(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.isTypeOf == null)
                writer.write("undefined");
            else {
                writer.quote(node.isTypeOf.toString())
            }
        });
        writer.write(")");
    }

    function createParenthesizedType(node: ts.ParenthesizedTypeNode) {
        writer.write("ts.createParenthesizedType(");
        writeNodeText(node.type)
        writer.write(")");
    }

    function createThisTypeNode(node: ts.ThisTypeNode) {
        writer.write("ts.createThisTypeNode(");
        writer.write(")");
    }

    function createTypeOperatorNode(node: ts.TypeOperatorNode) {
        writer.write("ts.createTypeOperatorNode(");
        writeNodeText(node.type)
        writer.write(")");
    }

    function createIndexedAccessTypeNode(node: ts.IndexedAccessTypeNode) {
        writer.write("ts.createIndexedAccessTypeNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.objectType)
            writer.write(",").newLine();
            writeNodeText(node.indexType)
        });
        writer.write(")");
    }

    function createMappedTypeNode(node: ts.MappedTypeNode) {
        writer.write("ts.createMappedTypeNode(");
        writer.newLine();
        writer.indent(() => {
            if (node.readonlyToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.readonlyToken)
            }
            writer.write(",").newLine();
            writeNodeText(node.typeParameter)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
        });
        writer.write(")");
    }

    function createLiteralTypeNode(node: ts.LiteralTypeNode) {
        writer.write("ts.createLiteralTypeNode(");
        writeNodeText(node.literal)
        writer.write(")");
    }

    function createObjectBindingPattern(node: ts.ObjectBindingPattern) {
        writer.write("ts.createObjectBindingPattern(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createArrayBindingPattern(node: ts.ArrayBindingPattern) {
        writer.write("ts.createArrayBindingPattern(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createBindingElement(node: ts.BindingElement) {
        writer.write("ts.createBindingElement(");
        writer.newLine();
        writer.indent(() => {
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken)
            }
            writer.write(",").newLine();
            if (node.propertyName == null)
                writer.write("undefined");
            else {
                writeNodeText(node.propertyName)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createArrayLiteral(node: ts.ArrayLiteralExpression) {
        writer.write("ts.createArrayLiteral(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.elements.length === 1) {
                const item = node.elements![0];
                writeNodeText(item)
            }
            else if (node.elements.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.elements!.length; i++) {
                        const item = node.elements![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(((node as any).multiLine || false).toString())
        });
        writer.write(")");
    }

    function createObjectLiteral(node: ts.ObjectLiteralExpression) {
        writer.write("ts.createObjectLiteral(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.properties.length === 1) {
                const item = node.properties![0];
                writeNodeText(item)
            }
            else if (node.properties.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.properties!.length; i++) {
                        const item = node.properties![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(((node as any).multiLine || false).toString())
        });
        writer.write(")");
    }

    function createPropertyAccess(node: ts.PropertyAccessExpression) {
        writer.write("ts.createPropertyAccess(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createElementAccess(node: ts.ElementAccessExpression) {
        writer.write("ts.createElementAccess(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.argumentExpression)
        });
        writer.write(")");
    }

    function createCall(node: ts.CallExpression) {
        writer.write("ts.createCall(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeText(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.arguments.length === 1) {
                const item = node.arguments![0];
                writeNodeText(item)
            }
            else if (node.arguments.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.arguments!.length; i++) {
                        const item = node.arguments![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createNew(node: ts.NewExpression) {
        writer.write("ts.createNew(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeText(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.arguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.arguments.length === 1) {
                    const item = node.arguments![0];
                    writeNodeText(item)
                }
                else if (node.arguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.arguments!.length; i++) {
                            const item = node.arguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }

    function createTaggedTemplate(node: ts.TaggedTemplateExpression) {
        writer.write("ts.createTaggedTemplate(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tag)
            writer.write(",").newLine();
            writeNodeText(node.template)
        });
        writer.write(")");
    }

    function createTypeAssertion(node: ts.TypeAssertion) {
        writer.write("ts.createTypeAssertion(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.type)
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createParen(node: ts.ParenthesizedExpression) {
        writer.write("ts.createParen(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createFunctionExpression(node: ts.FunctionExpression) {
        writer.write("ts.createFunctionExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken)
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            writeNodeText(node.body)
        });
        writer.write(")");
    }

    function createArrowFunction(node: ts.ArrowFunction) {
        writer.write("ts.createArrowFunction(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            writeNodeText(node.equalsGreaterThanToken)
            writer.write(",").newLine();
            writeNodeText(node.body)
        });
        writer.write(")");
    }

    function createDelete(node: ts.DeleteExpression) {
        writer.write("ts.createDelete(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createTypeOf(node: ts.TypeOfExpression) {
        writer.write("ts.createTypeOf(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createVoid(node: ts.VoidExpression) {
        writer.write("ts.createVoid(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createAwait(node: ts.AwaitExpression) {
        writer.write("ts.createAwait(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createPrefix(node: ts.PrefixUnaryExpression) {
        writer.write("ts.createPrefix(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.operator])
            writer.write(",").newLine();
            writeNodeText(node.operand)
        });
        writer.write(")");
    }

    function createPostfix(node: ts.PostfixUnaryExpression) {
        writer.write("ts.createPostfix(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.operand)
            writer.write(",").newLine();
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.operator])
        });
        writer.write(")");
    }

    function createBinary(node: ts.BinaryExpression) {
        writer.write("ts.createBinary(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.left)
            writer.write(",").newLine();
            writeNodeText(node.operatorToken)
            writer.write(",").newLine();
            writeNodeText(node.right)
        });
        writer.write(")");
    }

    function createConditional(node: ts.ConditionalExpression) {
        writer.write("ts.createConditional(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.condition)
            writer.write(",").newLine();
            writeNodeText(node.whenTrue)
            writer.write(",").newLine();
            writeNodeText(node.whenFalse)
        });
        writer.write(")");
    }

    function createTemplateExpression(node: ts.TemplateExpression) {
        writer.write("ts.createTemplateExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.head)
            writer.write(",").newLine();
            writer.write("[");
            if (node.templateSpans.length === 1) {
                const item = node.templateSpans![0];
                writeNodeText(item)
            }
            else if (node.templateSpans.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.templateSpans!.length; i++) {
                        const item = node.templateSpans![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createTemplateHead(node: ts.TemplateHead) {
        writer.write("ts.createTemplateHead(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createTemplateMiddle(node: ts.TemplateMiddle) {
        writer.write("ts.createTemplateMiddle(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createTemplateTail(node: ts.TemplateTail) {
        writer.write("ts.createTemplateTail(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createNoSubstitutionTemplateLiteral(node: ts.NoSubstitutionTemplateLiteral) {
        writer.write("ts.createNoSubstitutionTemplateLiteral(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createYield(node: ts.YieldExpression) {
        writer.write("ts.createYield(");
        if (node.expression == null)
            writer.write("undefined");
        else {
            writeNodeText(node.expression)
        }
        writer.write(")");
    }

    function createSpread(node: ts.SpreadElement) {
        writer.write("ts.createSpread(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createClassExpression(node: ts.ClassExpression) {
        writer.write("ts.createClassExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.heritageClauses == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.heritageClauses.length === 1) {
                    const item = node.heritageClauses![0];
                    writeNodeText(item)
                }
                else if (node.heritageClauses.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.heritageClauses!.length; i++) {
                            const item = node.heritageClauses![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members![0];
                writeNodeText(item)
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createOmittedExpression(node: ts.OmittedExpression) {
        writer.write("ts.createOmittedExpression(");
        writer.write(")");
    }

    function createExpressionWithTypeArguments(node: ts.ExpressionWithTypeArguments) {
        writer.write("ts.createExpressionWithTypeArguments(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeText(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createAsExpression(node: ts.AsExpression) {
        writer.write("ts.createAsExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createNonNullExpression(node: ts.NonNullExpression) {
        writer.write("ts.createNonNullExpression(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createMetaProperty(node: ts.MetaProperty) {
        writer.write("ts.createMetaProperty(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.keywordToken])
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createTemplateSpan(node: ts.TemplateSpan) {
        writer.write("ts.createTemplateSpan(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.literal)
        });
        writer.write(")");
    }

    function createSemicolonClassElement(node: ts.SemicolonClassElement) {
        writer.write("ts.createSemicolonClassElement(");
        writer.write(")");
    }

    function createBlock(node: ts.Block) {
        writer.write("ts.createBlock(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.statements.length === 1) {
                const item = node.statements![0];
                writeNodeText(item)
            }
            else if (node.statements.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.statements!.length; i++) {
                        const item = node.statements![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(((node as any).multiLine || false).toString())
        });
        writer.write(")");
    }

    function createVariableStatement(node: ts.VariableStatement) {
        writer.write("ts.createVariableStatement(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.declarationList)
        });
        writer.write(")");
    }

    function createEmptyStatement(node: ts.EmptyStatement) {
        writer.write("ts.createEmptyStatement(");
        writer.write(")");
    }

    function createExpressionStatement(node: ts.ExpressionStatement) {
        writer.write("ts.createExpressionStatement(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createIf(node: ts.IfStatement) {
        writer.write("ts.createIf(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.thenStatement)
            writer.write(",").newLine();
            if (node.elseStatement == null)
                writer.write("undefined");
            else {
                writeNodeText(node.elseStatement)
            }
        });
        writer.write(")");
    }

    function createDo(node: ts.DoStatement) {
        writer.write("ts.createDo(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.statement)
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createWhile(node: ts.WhileStatement) {
        writer.write("ts.createWhile(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createFor(node: ts.ForStatement) {
        writer.write("ts.createFor(");
        writer.newLine();
        writer.indent(() => {
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
            writer.write(",").newLine();
            if (node.condition == null)
                writer.write("undefined");
            else {
                writeNodeText(node.condition)
            }
            writer.write(",").newLine();
            if (node.incrementor == null)
                writer.write("undefined");
            else {
                writeNodeText(node.incrementor)
            }
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createForIn(node: ts.ForInStatement) {
        writer.write("ts.createForIn(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.initializer)
            writer.write(",").newLine();
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createForOf(node: ts.ForOfStatement) {
        writer.write("ts.createForOf(");
        writer.newLine();
        writer.indent(() => {
            if (node.awaitModifier == null)
                writer.write("undefined");
            else {
                writeNodeText(node.awaitModifier)
            }
            writer.write(",").newLine();
            writeNodeText(node.initializer)
            writer.write(",").newLine();
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createContinue(node: ts.ContinueStatement) {
        writer.write("ts.createContinue(");
        if (node.label == null)
            writer.write("undefined");
        else {
            writeNodeText(node.label)
        }
        writer.write(")");
    }

    function createBreak(node: ts.BreakStatement) {
        writer.write("ts.createBreak(");
        if (node.label == null)
            writer.write("undefined");
        else {
            writeNodeText(node.label)
        }
        writer.write(")");
    }

    function createReturn(node: ts.ReturnStatement) {
        writer.write("ts.createReturn(");
        if (node.expression == null)
            writer.write("undefined");
        else {
            writeNodeText(node.expression)
        }
        writer.write(")");
    }

    function createWith(node: ts.WithStatement) {
        writer.write("ts.createWith(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createSwitch(node: ts.SwitchStatement) {
        writer.write("ts.createSwitch(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.caseBlock)
        });
        writer.write(")");
    }

    function createLabel(node: ts.LabeledStatement) {
        writer.write("ts.createLabel(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.label)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createThrow(node: ts.ThrowStatement) {
        writer.write("ts.createThrow(");
        if (node.expression == null)
            writer.write("undefined");
        else {
            writeNodeText(node.expression)
        }
        writer.write(")");
    }

    function createTry(node: ts.TryStatement) {
        writer.write("ts.createTry(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tryBlock)
            writer.write(",").newLine();
            if (node.catchClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.catchClause)
            }
            writer.write(",").newLine();
            if (node.finallyBlock == null)
                writer.write("undefined");
            else {
                writeNodeText(node.finallyBlock)
            }
        });
        writer.write(")");
    }

    function createDebuggerStatement(node: ts.DebuggerStatement) {
        writer.write("ts.createDebuggerStatement(");
        writer.write(")");
    }

    function createVariableDeclaration(node: ts.VariableDeclaration) {
        writer.write("ts.createVariableDeclaration(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createVariableDeclarationList(node: ts.VariableDeclarationList) {
        writer.write("ts.createVariableDeclarationList(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.declarations.length === 1) {
                const item = node.declarations![0];
                writeNodeText(item)
            }
            else if (node.declarations.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.declarations!.length; i++) {
                        const item = node.declarations![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(getNodeFlagValues(node.flags || 0));
        });
        writer.write(")");
    }

    function createFunctionDeclaration(node: ts.FunctionDeclaration) {
        writer.write("ts.createFunctionDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken)
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createClassDeclaration(node: ts.ClassDeclaration) {
        writer.write("ts.createClassDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.heritageClauses == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.heritageClauses.length === 1) {
                    const item = node.heritageClauses![0];
                    writeNodeText(item)
                }
                else if (node.heritageClauses.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.heritageClauses!.length; i++) {
                            const item = node.heritageClauses![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members![0];
                writeNodeText(item)
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createInterfaceDeclaration(node: ts.InterfaceDeclaration) {
        writer.write("ts.createInterfaceDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.heritageClauses == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.heritageClauses.length === 1) {
                    const item = node.heritageClauses![0];
                    writeNodeText(item)
                }
                else if (node.heritageClauses.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.heritageClauses!.length; i++) {
                            const item = node.heritageClauses![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members![0];
                writeNodeText(item)
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createTypeAliasDeclaration(node: ts.TypeAliasDeclaration) {
        writer.write("ts.createTypeAliasDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createEnumDeclaration(node: ts.EnumDeclaration) {
        writer.write("ts.createEnumDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members![0];
                writeNodeText(item)
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createModuleDeclaration(node: ts.ModuleDeclaration) {
        writer.write("ts.createModuleDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
            writer.write(",").newLine();
            writer.write(getNodeFlagValues(node.flags || 0));
        });
        writer.write(")");
    }

    function createModuleBlock(node: ts.ModuleBlock) {
        writer.write("ts.createModuleBlock(");
        writer.write("[");
        if (node.statements.length === 1) {
            const item = node.statements![0];
            writeNodeText(item)
        }
        else if (node.statements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.statements!.length; i++) {
                    const item = node.statements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createCaseBlock(node: ts.CaseBlock) {
        writer.write("ts.createCaseBlock(");
        writer.write("[");
        if (node.clauses.length === 1) {
            const item = node.clauses![0];
            writeNodeText(item)
        }
        else if (node.clauses.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.clauses!.length; i++) {
                    const item = node.clauses![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createNamespaceExportDeclaration(node: ts.NamespaceExportDeclaration) {
        writer.write("ts.createNamespaceExportDeclaration(");
        writeNodeText(node.name)
        writer.write(")");
    }

    function createImportEqualsDeclaration(node: ts.ImportEqualsDeclaration) {
        writer.write("ts.createImportEqualsDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writeNodeText(node.moduleReference)
        });
        writer.write(")");
    }

    function createImportDeclaration(node: ts.ImportDeclaration) {
        writer.write("ts.createImportDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.importClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.importClause)
            }
            writer.write(",").newLine();
            writeNodeText(node.moduleSpecifier)
        });
        writer.write(")");
    }

    function createImportClause(node: ts.ImportClause) {
        writer.write("ts.createImportClause(");
        writer.newLine();
        writer.indent(() => {
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.namedBindings == null)
                writer.write("undefined");
            else {
                writeNodeText(node.namedBindings)
            }
        });
        writer.write(")");
    }

    function createNamespaceImport(node: ts.NamespaceImport) {
        writer.write("ts.createNamespaceImport(");
        writeNodeText(node.name)
        writer.write(")");
    }

    function createNamedImports(node: ts.NamedImports) {
        writer.write("ts.createNamedImports(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createImportSpecifier(node: ts.ImportSpecifier) {
        writer.write("ts.createImportSpecifier(");
        writer.newLine();
        writer.indent(() => {
            if (node.propertyName == null)
                writer.write("undefined");
            else {
                writeNodeText(node.propertyName)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createExportAssignment(node: ts.ExportAssignment) {
        writer.write("ts.createExportAssignment(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.isExportEquals == null)
                writer.write("undefined");
            else {
                writer.quote(node.isExportEquals.toString())
            }
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createExportDeclaration(node: ts.ExportDeclaration) {
        writer.write("ts.createExportDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length === 1) {
                    const item = node.decorators![0];
                    writeNodeText(item)
                }
                else if (node.decorators.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("ts.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.exportClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.exportClause)
            }
            writer.write(",").newLine();
            if (node.moduleSpecifier == null)
                writer.write("undefined");
            else {
                writeNodeText(node.moduleSpecifier)
            }
        });
        writer.write(")");
    }

    function createNamedExports(node: ts.NamedExports) {
        writer.write("ts.createNamedExports(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createExportSpecifier(node: ts.ExportSpecifier) {
        writer.write("ts.createExportSpecifier(");
        writer.newLine();
        writer.indent(() => {
            if (node.propertyName == null)
                writer.write("undefined");
            else {
                writeNodeText(node.propertyName)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createExternalModuleReference(node: ts.ExternalModuleReference) {
        writer.write("ts.createExternalModuleReference(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createJsxElement(node: ts.JsxElement) {
        writer.write("ts.createJsxElement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.openingElement)
            writer.write(",").newLine();
            writer.write("[");
            if (node.children.length === 1) {
                const item = node.children![0];
                writeNodeText(item)
            }
            else if (node.children.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.children!.length; i++) {
                        const item = node.children![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.closingElement)
        });
        writer.write(")");
    }

    function createJsxSelfClosingElement(node: ts.JsxSelfClosingElement) {
        writer.write("ts.createJsxSelfClosingElement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tagName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeText(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.attributes)
        });
        writer.write(")");
    }

    function createJsxOpeningElement(node: ts.JsxOpeningElement) {
        writer.write("ts.createJsxOpeningElement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tagName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeText(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.attributes)
        });
        writer.write(")");
    }

    function createJsxClosingElement(node: ts.JsxClosingElement) {
        writer.write("ts.createJsxClosingElement(");
        writeNodeText(node.tagName)
        writer.write(")");
    }

    function createJsxFragment(node: ts.JsxFragment) {
        writer.write("ts.createJsxFragment(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.openingFragment)
            writer.write(",").newLine();
            writer.write("[");
            if (node.children.length === 1) {
                const item = node.children![0];
                writeNodeText(item)
            }
            else if (node.children.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.children!.length; i++) {
                        const item = node.children![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.closingFragment)
        });
        writer.write(")");
    }

    function createJsxText(node: ts.JsxText) {
        writer.write("ts.createJsxText(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString())
            writer.write(",").newLine();
            writer.quote(node.containsOnlyTriviaWhiteSpaces.toString())
        });
        writer.write(")");
    }

    function createJsxOpeningFragment(node: ts.JsxOpeningFragment) {
        writer.write("ts.createJsxOpeningFragment(");
        writer.write(")");
    }

    function createJsxJsxClosingFragment(node: ts.JsxClosingFragment) {
        writer.write("ts.createJsxJsxClosingFragment(");
        writer.write(")");
    }

    function createJsxAttribute(node: ts.JsxAttribute) {
        writer.write("ts.createJsxAttribute(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createJsxAttributes(node: ts.JsxAttributes) {
        writer.write("ts.createJsxAttributes(");
        writer.write("[");
        if (node.properties.length === 1) {
            const item = node.properties![0];
            writeNodeText(item)
        }
        else if (node.properties.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.properties!.length; i++) {
                    const item = node.properties![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createJsxSpreadAttribute(node: ts.JsxSpreadAttribute) {
        writer.write("ts.createJsxSpreadAttribute(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createJsxExpression(node: ts.JsxExpression) {
        writer.write("ts.createJsxExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken)
            }
            writer.write(",").newLine();
            if (node.expression == null)
                writer.write("undefined");
            else {
                writeNodeText(node.expression)
            }
        });
        writer.write(")");
    }

    function createCaseClause(node: ts.CaseClause) {
        writer.write("ts.createCaseClause(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writer.write("[");
            if (node.statements.length === 1) {
                const item = node.statements![0];
                writeNodeText(item)
            }
            else if (node.statements.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.statements!.length; i++) {
                        const item = node.statements![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createDefaultClause(node: ts.DefaultClause) {
        writer.write("ts.createDefaultClause(");
        writer.write("[");
        if (node.statements.length === 1) {
            const item = node.statements![0];
            writeNodeText(item)
        }
        else if (node.statements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.statements!.length; i++) {
                    const item = node.statements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createHeritageClause(node: ts.HeritageClause) {
        writer.write("ts.createHeritageClause(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.token])
            writer.write(",").newLine();
            writer.write("[");
            if (node.types.length === 1) {
                const item = node.types![0];
                writeNodeText(item)
            }
            else if (node.types.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.types!.length; i++) {
                        const item = node.types![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createCatchClause(node: ts.CatchClause) {
        writer.write("ts.createCatchClause(");
        writer.newLine();
        writer.indent(() => {
            if (node.variableDeclaration == null)
                writer.write("undefined");
            else {
                writeNodeText(node.variableDeclaration)
            }
            writer.write(",").newLine();
            writeNodeText(node.block)
        });
        writer.write(")");
    }

    function createPropertyAssignment(node: ts.PropertyAssignment) {
        writer.write("ts.createPropertyAssignment(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            writeNodeText(node.initializer)
        });
        writer.write(")");
    }

    function createShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment) {
        writer.write("ts.createShorthandPropertyAssignment(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.objectAssignmentInitializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.objectAssignmentInitializer)
            }
        });
        writer.write(")");
    }

    function createSpreadAssignment(node: ts.SpreadAssignment) {
        writer.write("ts.createSpreadAssignment(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createEnumMember(node: ts.EnumMember) {
        writer.write("ts.createEnumMember(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createCommaList(node: ts.CommaListExpression) {
        writer.write("ts.createCommaList(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createSyntaxKindToNameMap() {
        const map: { [kind: number]: string } = {};
        for (const name of Object.keys(ts.SyntaxKind).filter(k => isNaN(parseInt(k, 10)))) {
            const value = (ts.SyntaxKind as any)[name] as number;
            if (map[value] == null)
                map[value] = name;
        }
        return map;
    }

    function getNodeFlagValues(value: number) {
        // ignore the BlockScoped node flag
        return getFlagValuesAsString(ts.NodeFlags, "ts.NodeFlags", value || 0, "None", getFlagValues(ts.NodeFlags, value).filter(v => v !== ts.NodeFlags.BlockScoped));
    }

    function getFlagValuesAsString(enumObj: any, enumName: string, value: number, defaultName: string, flagValues?: number[]) {
        flagValues = flagValues || getFlagValues(enumObj, value);
        const members: string[] = [];
        for (const flagValue of flagValues)
            members.push(enumName + "." + enumObj[flagValue]);
        if (members.length === 0)
            members.push(enumName + "." + defaultName);
        return members.join(" | ");
    }

    function getFlagValues(enumObj: any, value: number) {
        const members: number[] = [];
        for (const prop in enumObj) {
            if (typeof enumObj[prop] === "string")
                continue;
            if ((enumObj[prop] & value) !== 0)
                members.push(enumObj[prop]);
        }
        return members;
    }
}
