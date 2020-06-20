import { ClassTranslator } from './class.translator';
import { EnumTranslator } from './enum.translator';
import { ImportTranslator } from './import.translator';

export const Translators = [
    ImportTranslator,
    EnumTranslator,
    ClassTranslator,
];
