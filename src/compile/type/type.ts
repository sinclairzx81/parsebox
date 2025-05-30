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
import { Infer, Escape, Unreachable } from '../common/index.ts'
import { Options } from '../options.ts'
import { Name } from './name.ts'

// ------------------------------------------------------------------
// State
// ------------------------------------------------------------------
const state = { reducers: new Set<string>() }

// ------------------------------------------------------------------
// Context
// ------------------------------------------------------------------
function FromContext(options: Options, name: string, left: Runtime.IParser, right: Runtime.IParser): string {
  return `${FromParser(options, name, left)} extends [infer _0 extends ${options.contextType}, infer Input extends string] ? ${FromParser(options, name, right).replace('Context', '_0')} : []`
}
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
function FromArrayReducer(options: Options, name: string, parser: Runtime.IParser): string {
  const reducer_name = `${name}_${state.reducers.size}`
  const reducer = `export type ${reducer_name}<Input extends string, Context extends ${options.contextType}, Result extends unknown[] = []> = ${FromParser(options, reducer_name, parser)} extends [infer _0, infer Input extends string] ? ${reducer_name}<Input, Context, [...Result, _0]> : [Result, Input]`
  state.reducers.add(reducer)
  return reducer_name
}
function FromArray(options: Options, name: string, parser: Runtime.IParser): string {
  const reducer_name = FromArrayReducer(options, Name(name), parser)
  return `${reducer_name}<Input, Context>`
}
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
function FromConst(options: Options, name: string, value: string): string {
  return `Static.Token.Const<'${Escape(value)}', Input>`
}
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
function FromIdent(options: Options, name: string): string {
  return `Static.Token.Ident<Input>`
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function FromNumber(options: Options, name: string): string {
  return `Static.Token.Number<Input>`
}
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
function FromOptional(options: Options, name: string, parser: Runtime.IOptional): string {
  return `(${FromParser(options, name, parser.parser)} extends [infer _0, infer Input extends string] ? [[_0], Input]: [[], Input])`
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
function FromRef(options: Options, name: string, ref: string): string {
  return `${Name(ref)}<Input, Context>`
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function FromString(options: Options, name: string, string_options: string[]): string {
  const _options = string_options.map((option) => `'${Escape(option)}'`).join(', ')
  return `Static.Token.String<[${_options}], Input>`
}
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
function FromTuple(options: Options, name: string, parsers: Runtime.IParser[]): string {
  const initial = `[[${parsers.map((_, index) => `_${index}`).join(', ')}], Input]`
  return parsers.reduceRight((result, right, index) => `(${FromParser(options, name, right)} extends [infer _${index}, infer Input extends string] ? ${result} : [])`, initial)
}
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
function FromUnion(options: Options, name: string, parsers: Runtime.IParser[]): string {
  return parsers.length === 0 ? '[]' : `(${parsers.reduceRight((result, right) => `${FromParser(options, name, right)} extends [infer _0, infer Input extends string] ? [_0, Input] : ${result}`, '[]')})`
}
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
function FromUntil(options: Options, name: string, values: string[]): string {
  const escaped = values.map(value => `'${Escape(value)}'`)
  return `Static.Token.Until<[${escaped.join(', ')}], Input>`
}
// ------------------------------------------------------------------
// UntilNonEmpty
// ------------------------------------------------------------------
function FromUntilNonEmpty(options: Options, name: string, values: string[]): string {
  const escaped = values.map(value => `'${Escape(value)}'`)
  return `Static.Token.UntilNonEmpty<[${escaped.join(', ')}], Input>`
}
// ------------------------------------------------------------------
// Parser
// ------------------------------------------------------------------
function FromParser(options: Options, name: string, parser: Runtime.IParser): string {
  return (
    Runtime.IsArray(parser) ? FromArray(options, name, parser.parser) :
    Runtime.IsContext(parser) ? FromContext(options, name, parser.left, parser.right) :
    Runtime.IsConst(parser) ? FromConst(options, name, parser.value) :
    Runtime.IsIdent(parser) ? FromIdent(options, name) :
    Runtime.IsNumber(parser) ? FromNumber(options, name) :
    Runtime.IsOptional(parser) ? FromOptional(options, name, parser) :
    Runtime.IsRef(parser) ? FromRef(options, name, parser.ref) :
    Runtime.IsString(parser) ? FromString(options, name, parser.options) :
    Runtime.IsTuple(parser) ? FromTuple(options, name, parser.parsers) :
    Runtime.IsUnion(parser) ? FromUnion(options, name, parser.parsers) :
    Runtime.IsUntil(parser) ? FromUntil(options, name, parser.values) :
    Runtime.IsUntilNonEmpty(parser) ? FromUntilNonEmpty(options, name, parser.values) :
    Unreachable(parser)
  )
}
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export function CompileType(options: Options, name: string, parser: Runtime.IParser): string {
  state.reducers.clear()
  const semanticsType = `S.${Name(name)}Mapping`
  const type = `export type ${Name(name)}<Input extends string, Context extends ${options.contextType} = ${options.contextDefault}> = ${FromParser(options, name, parser)} extends [infer _0 extends ${Infer(parser)}, infer Input extends string] ? [${semanticsType}<_0, Context>, Input] : []`
  const reducers = [...state.reducers]
  return [...reducers, type].join('\n')
}
