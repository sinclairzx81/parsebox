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
// deno-lint-ignore-file

import { Runtime } from '../../runtime/index.ts'
import { Infer, Escape, Unreachable } from '../common/index.ts'

// ------------------------------------------------------------------
// CompileState
// ------------------------------------------------------------------
const state = { reducers: new Set<string>() }

// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
function FromArrayReducer(name: string, parser: Runtime.IParser): string {
  const reducer_name = `${name}_${state.reducers.size}`
  const reducer = `export const ${reducer_name} = (input: string, result: unknown[] = []): [unknown[], string] => If(${FromParser(reducer_name, parser)}, ([_0, input]) => ${reducer_name}(input, [...result, _0]), () => [result, input]) as [unknown[], string]`
  state.reducers.add(reducer)
  return reducer_name
}
function FromArray(name: string, parser: Runtime.IParser): string {
  const reducer_name = FromArrayReducer(name, parser)
  return `${reducer_name}(input)`
}
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
function FromConst(name: string, value: string): string {
  return `Runtime.Token.Const('${Escape(value)}', input)`
}
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
function FromIdent(name: string): string {
  return `Runtime.Token.Ident(input)`
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function FromNumber(name: string): string {
  return `Runtime.Token.Number(input)`
}
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
function FromOptional(name: string, parser: Runtime.IOptional): string {
  return `If(${FromParser(name, parser.parser)}, ([_0, input]) => [[_0], input], () => [[], input])`
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
function FromRef(name: string, ref: string): string {
  return `${ref}(input)`
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function FromString(name: string, string_options: string[]): string {
  const _options = string_options.map((option) => `'${Escape(option)}'`).join(', ')
  return `Runtime.Token.String([${_options}], input)`
}
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
function FromTuple(name: string, parsers: Runtime.IParser[]): string {
  const parameters = `[${parsers.map((_, index) => `_${index}`).join(', ')}]`
  const initial = `[${parameters}, input]`
  return parsers.reduceRight((result, right, index) => `If(${FromParser(name, right)}, ([_${index}, input]) => ${result})`, initial)
}
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
function FromUnion(name: string, parsers: Runtime.IParser[]): string {
  return parsers.length === 0 ? '[]' : parsers.reduceRight((result, right) => `If(${FromParser(name, right)}, ([_0, input]) => [_0, input], () => ${result})`, '[]')
}
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
function FromUntil(name: string, values: string[]): string {
  const escaped = values.map(value => `'${Escape(value)}'`)
  return `Runtime.Token.Until([${escaped.join(', ')}], input)`
}
// ------------------------------------------------------------------
// UntilNonEmpty
// ------------------------------------------------------------------
function FromUntilNonEmpty(name: string, values: string[]): string {
  const escaped = values.map(value => `'${Escape(value)}'`)
  return `Runtime.Token.UntilNonEmpty([${escaped.join(', ')}], input)`
}
// ------------------------------------------------------------------
// Parser
// ------------------------------------------------------------------
function FromParser(name: string, parser: Runtime.IParser): string {
  return (
    Runtime.IsArray(parser) ? FromArray(name, parser.parser) :
      Runtime.IsConst(parser) ? FromConst(name, parser.value) :
        Runtime.IsIdent(parser) ? FromIdent(name) :
          Runtime.IsNumber(parser) ? FromNumber(name) :
            Runtime.IsOptional(parser) ? FromOptional(name, parser) :
              Runtime.IsRef(parser) ? FromRef(name, parser.ref) :
                Runtime.IsString(parser) ? FromString(name, parser.options) :
                  Runtime.IsTuple(parser) ? FromTuple(name, parser.parsers) :
                    Runtime.IsUnion(parser) ? FromUnion(name, parser.parsers) :
                      Runtime.IsUntil(parser) ? FromUntil(name, parser.values) :
                        Runtime.IsUntilNonEmpty(parser) ? FromUntilNonEmpty(name, parser.values) :
                          Unreachable(parser)
  )
}
// ------------------------------------------------------------------
// Func
// ------------------------------------------------------------------
export function CompileFunc(name: string, parser: Runtime.IParser): string {
  state.reducers.clear()
  const semanticsFunc = `S.${name}Mapping`
  const type = `export const ${name} = (input: string): [unknown, string] | [] => If(${FromParser(name, parser)}, ([_0, input]) => [${semanticsFunc}(_0 as ${Infer(parser)}), input])`
  const reducers = [...state.reducers]
  return [...reducers, type].join('\n')
}
