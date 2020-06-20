import * as TsNode from '../ts-node';
import { EasyTransformer } from '../transformers';

TsNode.register({
    compilerOptions: {
        module: 'commonjs',
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        target: 'es2017'
    },
    transformers: { before: [EasyTransformer()] },
    transpileOnly: true
});
