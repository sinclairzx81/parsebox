/*--------------------------------------------------------------------------

@sinclair/parsebox

The MIT License (MIT)

Copyright (c) 2024-2025 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

import { Runtime } from '../runtime/index'
import { CompileType, CompileTypeMap } from './type/index'
import { CompileFunc, CompileFuncMap } from './func/index'
import { CompileComment } from './common/index'
import { DefaultOptions, Options } from './options'

// ------------------------------------------------------------------
// Header
// ------------------------------------------------------------------
export interface HeaderResult {
  imports: string
  importSemantics: string
  ifExpression: string
}
function Header(options: Options): HeaderResult {
  const imports = [`import { Runtime, Static } from '@sinclair/parsebox'`].join('\n')
  const importSemantics = `import * as S from '${options.mappingPath}'`
  const ifExpression = `const If = (result: [unknown, string] | [], left: (input: [unknown, string]) => [unknown, string] | [], right: () => [unknown, string] | [] = () => []): [unknown, string] | [] => result.length === 2 ? left(result) : right()`
  return { imports, importSemantics, ifExpression }
}
// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface Type {
  comment: string
  typeMap: string
  funcMap: string
  type: string
  func: string
}
export interface TypesResult {
  header: HeaderResult
  types: Type[]
}
export interface TypesOptions {
  semanticsNamespace: string
}
export function Types(module: Runtime.Module, options: Options = DefaultOptions()): TypesResult {
  const header = Header(options)
  const types: Type[] = Object.entries(module.parsers).map(([key, parser]) => {
    return {
      comment: CompileComment(key, parser),
      funcMap: CompileFuncMap(options, key, parser),
      typeMap: CompileTypeMap(options, key, parser),
      type: CompileType(options, key, parser),
      func: CompileFunc(options, key, parser),
    }
  })
  return { header, types }
}
// ------------------------------------------------------------------
// Project
// ------------------------------------------------------------------
export interface ProjectResult {
  parser: string
  mapping: string
}
export function Project(module: Runtime.Module, options: Options = DefaultOptions()): ProjectResult {
  const types = Types(module, options)
  // ----------------------------------------------------------------
  // File: Parser
  // ----------------------------------------------------------------
  const parserHeader = [types.header.imports, ...options.parserImports, types.header.importSemantics].join('\n')
  const parserTypes = types.types.reduce((result, type) => [result, type.type].join('\n'), '')
  const parserFuncs = types.types.reduce((result, type) => [result, type.func].join('\n'), '')
  const parser = [parserHeader, parserTypes, types.header.ifExpression, parserFuncs].join('\n')
  // ----------------------------------------------------------------
  // File: Mapping
  // ----------------------------------------------------------------
  const semanticsHeader = [...options.mappingImports].join('\n')
  const semanticsBody = types.types.reduce((result, type) => [result, type.comment, type.typeMap, type.funcMap].join('\n'), '')
  const semantics = [semanticsHeader, semanticsBody].join('\n')
  return { parser, mapping: semantics }
}
