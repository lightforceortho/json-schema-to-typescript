import { Options } from './index';
import { AST } from './types/AST';
export declare function generate(ast: AST, alwaysExported: Set<string>, options?: Options): string;
