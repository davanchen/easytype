import * as ts from 'typescript';

export class TransformerTester {
    public static run(source: string, transformer: () => ts.TransformerFactory<ts.SourceFile>) {
        const result = ts.transpileModule(source, {
            compilerOptions: {
                module: ts.ModuleKind.CommonJS,
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                //   noUnusedLocals: false,
                //   noUnusedParameters: false,
                target: ts.ScriptTarget.ES2017,

                isolatedModules: false
            },
            transformers: { before: [transformer()] },
            reportDiagnostics: true
        });

        return result.outputText;
    }
}
