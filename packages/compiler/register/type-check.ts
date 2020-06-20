import * as TsNode from '../ts-node';
import { EasyTransformer } from '../transformers';

TsNode.register({
    transformers: { before: [EasyTransformer()] },
    typeCheck: true
});
