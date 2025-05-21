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

// deno-fmt-ignore-file
// deno-lint-ignore-file no-unused-vars

import { Runtime } from '../../runtime/index.ts'
import { Infer, Escape } from '../common/index.ts'
import { Options } from '../options.ts'

// ------------------------------------------------------------------
// CompileState
// ------------------------------------------------------------------
const state = { reducers: new Set<string>() }
// ------------------------------------------------------------------
// Context
// ------------------------------------------------------------------
function FromContext(options: Options, name: string, left: Runtime.IParser, right: Runtime.IParser): string {
  return `If(${FromParser(options, name, left)}, ([_0, input]) => ${FromParser(options, name, right).replace('context', `_0 as ${options.contextType}`)}, () => [])`
}
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
function FromTuple(options: Options, name: string, parsers: Runtime.IParser[]): string {
  const parameters = `[${parsers.map((_, index) => `_${index}`).join(', ')}]`
  const initial = `[${parameters}, input]`
  return parsers.reduceRight((result, right, index) => `If(${FromParser(options, name, right)}, ([_${index}, input]) => ${result})`, initial)
}
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
function FromUnion(options: Options, name: string, parsers: Runtime.IParser[]): string {
  return parsers.length === 0 ? '[]' : parsers.reduceRight((result, right) => `If(${FromParser(options, name, right)}, ([_0, input]) => [_0, input], () => ${result})`, '[]')
}
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
function FromArrayReducer(options: Options, name: string, parser: Runtime.IParser): string {
  const reducer_name = `${name}_${state.reducers.size}`
  const reducer = `export const ${reducer_name} = (input: string, context: ${options.contextType}, result: unknown[] = []): [unknown[], string] => If(${FromParser(options, reducer_name, parser)}, ([_0, input]) => ${reducer_name}(input, context, [...result, _0]), () => [result, input]) as [unknown[], string]`
  state.reducers.add(reducer)
  return reducer_name
}
function FromArray(options: Options, name: string, parser: Runtime.IParser): string {
  const reducer_name = FromArrayReducer(options, name, parser)
  return `${reducer_name}(input, context)`
}
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
function FromOptional(options: Options, name: string, parser: Runtime.IOptional): string {
  return `If(${FromParser(options, name, parser.parser)}, ([_0, input]) => [[_0], input], () => [[], input])`
}
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
function FromConst(options: Options, name: string, value: string): string {
  return `Runtime.Token.Const('${Escape(value)}', input)`
}
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
function FromUntil(options: Options, name: string, value: string): string {
  return `Runtime.Token.Until('${Escape(value)}', input)`
}
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
function FromIdent(options: Options, name: string): string {
  return `Runtime.Token.Ident(input)`
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function FromNumber(options: Options, name: string): string {
  return `Runtime.Token.Number(input)`
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function FromString(options: Options, name: string, string_options: string[]): string {
  const _options = string_options.map((option) => `'${Escape(option)}'`).join(', ')
  return `Runtime.Token.String([${_options}], input)`
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
function FromRef(options: Options, name: string, ref: string): string {
  return `${ref}(input, context)`
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
function FromParser(options: Options, name: string, parser: Runtime.IParser): string {
  return (
    Runtime.IsContext(parser) ? FromContext(options, name, parser.left, parser.right) :
    Runtime.IsTuple(parser) ? FromTuple(options, name, parser.parsers) :
    Runtime.IsUnion(parser) ? FromUnion(options, name, parser.parsers) :
    Runtime.IsArray(parser) ? FromArray(options, name, parser.parser) :
    Runtime.IsOptional(parser) ? FromOptional(options, name, parser) :
    Runtime.IsString(parser) ? FromString(options, name, parser.options) :
    Runtime.IsConst(parser) ? FromConst(options, name, parser.value) :
    Runtime.IsUntil(parser) ? FromUntil(options, name, parser.value) :
    Runtime.IsRef(parser) ? FromRef(options, name, parser.ref) :
    Runtime.IsIdent(parser) ? FromIdent(options, name) :
    Runtime.IsNumber(parser) ? FromNumber(options, name) :
    '<unreachable>'
  )
}
// ------------------------------------------------------------------
// Func
// ------------------------------------------------------------------
export function CompileFunc(options: Options, name: string, parser: Runtime.IParser): string {
  state.reducers.clear()
  const semanticsFunc = `S.${name}Mapping`
  const type = `export const ${name} = (input: string, context: ${options.contextType} = ${options.contextDefault}): [unknown, string] | [] => If(${FromParser(options, name, parser)}, ([_0, input]) => [${semanticsFunc}(_0 as ${Infer(parser)}, context), input])`
  const reducers = [...state.reducers]
  return [...reducers, type].join('\n')
}
