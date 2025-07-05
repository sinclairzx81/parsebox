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

import * as Token from './token.ts'
import * as Types from './types.ts'

export function Throw(message: string): never {
  throw new Error(message)
}
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
function ParseArray<ModuleProperties extends Types.IModuleProperties, Parser extends Types.IParser>(moduleProperties: ModuleProperties, parser: Parser, input: string): unknown[] {
  const buffer = [] as unknown[]
  let rest = input
  while (rest.length > 0) {
    const result = ParseParser(moduleProperties, parser, rest)
    if (result.length === 0) return [buffer, rest]
    buffer.push(result[0])
    rest = result[1]
  }
  return [buffer, rest]
}

// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
function ParseConst<Value extends string>(value: Value, input: string): [] | [Value, string] {
  return Token.Const(value, input) as never
}
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
function ParseIdent(input: string): [] | [string, string] {
  return Token.Ident(input)
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function ParseNumber(input: string): [] | [string, string] {
  return Token.Number(input)
}
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
function ParseOptional<ModuleProperties extends Types.IModuleProperties, Parser extends Types.IParser>(moduleProperties: ModuleProperties, parser: Parser, input: string): [] | [[unknown] | [], unknown] {
  const result = ParseParser(moduleProperties, parser, input)
  return (result.length === 2 ? [[result[0]], result[1]] : [[], input]) as never
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
function ParseRef<ModuleProperties extends Types.IModuleProperties, Ref extends string>(moduleProperties: ModuleProperties, ref: Ref, input: string): [] | [string, string] {
  const parser = ref in moduleProperties ? moduleProperties[ref] : Throw(`Cannot dereference Parser '${ref}'`)
  return ParseParser(moduleProperties, parser, input) as never
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function ParseString(options: string[], code: string): [] | [string, string] {
  return Token.String(options, code)
}
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
function ParseTuple<ModuleProperties extends Types.IModuleProperties, Parsers extends Types.IParser[]>(moduleProperties: ModuleProperties, parsers: [...Parsers], input: string): [] | [unknown[], string] {
  const buffer = [] as unknown[]
  let rest = input
  for (const parser of parsers) {
    const result = ParseParser(moduleProperties, parser, rest)
    if (result.length === 0) return []
    buffer.push(result[0])
    rest = result[1]
  }
  return [buffer, rest]
}
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
function ParseUnion<ModuleProperties extends Types.IModuleProperties, Parsers extends Types.IParser[]>(moduleProperties: ModuleProperties, parsers: [...Parsers], input: string): [] | [unknown, string] {
  for (const parser of parsers) {
    const result = ParseParser(moduleProperties, parser, input)
    if (result.length === 0) continue
    return result
  }
  return []
}
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
function ParseUntil<Values extends string[]>(values: [...Values], input: string): [] | [string, string] {
  return Token.Until(values, input) as never
}
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
function ParseUntilNonEmpty<Values extends string[]>(values: [...Values], code: string): [] | [string, string] {
  return Token.UntilNonEmpty(values, code) as never
}
// ------------------------------------------------------------------
// Parser
// ------------------------------------------------------------------
function ParseParser<Parser extends Types.IParser>(moduleProperties: Types.IModuleProperties, parser: Parser, input: string): [] | [Types.StaticParser<Parser>, string] {
  const result = (
    Types.IsArray(parser) ? ParseArray(moduleProperties, parser.parser, input) :
      Types.IsConst(parser) ? ParseConst(parser.value, input) :
        Types.IsIdent(parser) ? ParseIdent(input) :
          Types.IsNumber(parser) ? ParseNumber(input) :
            Types.IsOptional(parser) ? ParseOptional(moduleProperties, parser.parser, input) :
              Types.IsRef(parser) ? ParseRef(moduleProperties, parser.ref, input) :
                Types.IsString(parser) ? ParseString(parser.options, input) :
                  Types.IsTuple(parser) ? ParseTuple(moduleProperties, parser.parsers, input) :
                    Types.IsUnion(parser) ? ParseUnion(moduleProperties, parser.parsers, input) :
                      Types.IsUntil(parser) ? ParseUntil(parser.values, input) :
                        Types.IsUntilNonEmpty(parser) ? ParseUntilNonEmpty(parser.values, input) :
                          []
  )
  return (result.length === 2 ? [parser.mapping(result[0]), result[1]] : result) as never
}

// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
/** Parses content using the given Parser */
export function Parse<Parser extends Types.IParser>(moduleProperties: Types.IModuleProperties, parser: Parser, input: string): [] | [Types.StaticParser<Parser>, string]
/** Parses content using the given Parser */
export function Parse<Parser extends Types.IParser>(parser: Parser, content: string): [] | [Types.StaticParser<Parser>, string]
/** Parses content using the given parser */
export function Parse(...args: any[]): never {
  const withModuleProperties = typeof args[1] === 'string' ? false : true
  const [moduleProperties, parser, input] = withModuleProperties
    ? [args[0], args[1], args[2]]
    : [{}, args[0], args[1]]
  return ParseParser(moduleProperties, parser, input) as never
}
