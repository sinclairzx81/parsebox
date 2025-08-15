/*--------------------------------------------------------------------------

ParseBox

The MIT License (MIT)

Copyright (c) 2024-2025 Haydn Paterson

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
// deno-lint-ignore-file

import { Unreachable } from '../../system/unreachable/index.ts'
import * as Runtime from '../../runtime/index.ts'
import { Infer, Escape } from '../common/index.ts'
import { Name } from './name.ts'

// ------------------------------------------------------------------
// State
// ------------------------------------------------------------------
const state = { reducers: new Set<string>() }

// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
function FromArrayReducer(name: string, parser: Runtime.IParser): string {
  const reducer_name = `${name}_${state.reducers.size}`
  const reducer = `export type ${reducer_name}<Input extends string, Result extends unknown[] = []> = ${FromParser(reducer_name, parser)} extends [infer _0, infer Input extends string] ? ${reducer_name}<Input, [...Result, _0]> : [Result, Input]`
  state.reducers.add(reducer)
  return reducer_name
}
function FromArray(name: string, parser: Runtime.IParser): string {
  const reducer_name = FromArrayReducer(Name(name), parser)
  return `${reducer_name}<Input>`
}
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
function FromConst(name: string, const_: string): string {
  return `Token.TConst<'${Escape(const_)}', Input>`
}
// ------------------------------------------------------------------
// BigInt
// ------------------------------------------------------------------
function FromBigInt(name: string): string {
  return `Token.TBigInt<Input>`
}
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
function FromIdent(name: string): string {
  return `Token.TIdent<Input>`
}
// ------------------------------------------------------------------
// Integer
// ------------------------------------------------------------------
function FromInteger(name: string): string {
  return `Token.TInteger<Input>`
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function FromNumber(name: string): string {
  return `Token.TNumber<Input>`
}
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
function FromOptional(name: string, parser: Runtime.IOptional): string {
  return `(${FromParser(name, parser.parser)} extends [infer _0, infer Input extends string] ? [[_0], Input]: [[], Input])`
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
function FromRef(name: string, ref: string): string {
  return `${Name(ref)}<Input>`
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function FromString(name: string, quotes: string[]): string {
  const _quotes = quotes.map((option) => `'${Escape(option)}'`).join(', ')
  return `Token.TString<[${_quotes}], Input>`
}
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
function FromTuple(name: string, parsers: Runtime.IParser[]): string {
  const initial = `[[${parsers.map((_, index) => `_${index}`).join(', ')}], Input]`
  return parsers.reduceRight((result, right, index) => `(${FromParser(name, right)} extends [infer _${index}, infer Input extends string] ? ${result} : [])`, initial)
}
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
function FromUnion(name: string, parsers: Runtime.IParser[]): string {
  return parsers.length === 0 ? '[]' : `(${parsers.reduceRight((result, right) => `${FromParser(name, right)} extends [infer _0, infer Input extends string] ? [_0, Input] : ${result}`, '[]')})`
}
// ------------------------------------------------------------------
// Until_1
// ------------------------------------------------------------------
function FromUntil_1(name: string, end: string[]): string {
  const escaped = end.map(value => `'${Escape(value)}'`)
  return `Token.TUntil_1<[${escaped.join(', ')}], Input>`
}
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
function FromUntil(name: string, end: string[]): string {
  const escaped = end.map(value => `'${Escape(value)}'`)
  return `Token.TUntil<[${escaped.join(', ')}], Input>`
}
// ------------------------------------------------------------------
// Parser
// ------------------------------------------------------------------
function FromParser(name: string, parser: Runtime.IParser): string {
  return (
    Runtime.IsArray(parser) ? FromArray(name, parser.parser) :
    Runtime.IsBigInt(parser) ? FromBigInt(name) :
    Runtime.IsConst(parser) ? FromConst(name, parser.const) :
    Runtime.IsInteger(parser) ? FromInteger(name) :
    Runtime.IsIdent(parser) ? FromIdent(name) :
    Runtime.IsNumber(parser) ? FromNumber(name) :
    Runtime.IsOptional(parser) ? FromOptional(name, parser) :
    Runtime.IsRef(parser) ? FromRef(name, parser.ref) :
    Runtime.IsString(parser) ? FromString(name, parser.quotes) :
    Runtime.IsTuple(parser) ? FromTuple(name, parser.parsers) :
    Runtime.IsUnion(parser) ? FromUnion(name, parser.parsers) :
    Runtime.IsUntil_1(parser) ? FromUntil_1(name, parser.end) :
    Runtime.IsUntil(parser) ? FromUntil(name, parser.end) :
    Unreachable(parser)
  )
}
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export function BuildStaticParse(name: string, parser: Runtime.IParser): string {
  state.reducers.clear()
  const semanticsType = `S.${Name(name)}Mapping`
  const type = `export type ${Name(name)}<Input extends string> = ${FromParser(name, parser)} extends [infer _0 extends ${Infer(parser)}, infer Input extends string] ? [${semanticsType}<_0>, Input] : []`
  const reducers = [...state.reducers]
  return [...reducers, type].join('\n')
}
