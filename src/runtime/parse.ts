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
// deno-lint-ignore-file no-unused-vars no-explicit-any

import * as Token from './token.ts'
import * as Types from './types.ts'

export function Throw(message: string): never {
  throw new Error(message)
}

// ------------------------------------------------------------------
// Context
// ------------------------------------------------------------------
function ParseContext<ModuleProperties extends Types.IModuleProperties, Parser extends Types.IParser>(moduleProperties: ModuleProperties, left: Parser, right: Parser, code: string, context: unknown): unknown[] {
  const result = ParseParser(moduleProperties, left, code, context)
  return result.length === 2 ? ParseParser(moduleProperties, right, result[1], result[0]) : []
}

// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
function ParseArray<ModuleProperties extends Types.IModuleProperties, Parser extends Types.IParser>(moduleProperties: ModuleProperties, parser: Parser, code: string, context: unknown): unknown[] {
  const buffer = [] as unknown[]
  let rest = code
  while (rest.length > 0) {
    const result = ParseParser(moduleProperties, parser, rest, context)
    if (result.length === 0) return [buffer, rest]
    buffer.push(result[0])
    rest = result[1]
  }
  return [buffer, rest]
}

// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
function ParseConst<Value extends string>(value: Value, code: string, context: unknown): [] | [Value, string] {
  return Token.Const(value, code) as never
}
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
function ParseUntil<Value extends string>(value: Value, code: string, context: unknown): [] | [Value, string] {
  return Token.Until(value, code) as never
}
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
function ParseIdent(code: string, _context: unknown): [] | [string, string] {
  return Token.Ident(code)
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function ParseNumber(code: string, _context: unknown): [] | [string, string] {
  return Token.Number(code)
}
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
function ParseOptional<ModuleProperties extends Types.IModuleProperties, Parser extends Types.IParser>(moduleProperties: ModuleProperties, parser: Parser, code: string, context: unknown): [] | [[unknown] | [], unknown] {
  const result = ParseParser(moduleProperties, parser, code, context)
  return (result.length === 2 ? [[result[0]], result[1]] : [[], code]) as never
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
function ParseRef<ModuleProperties extends Types.IModuleProperties, Ref extends string>(moduleProperties: ModuleProperties, ref: Ref, code: string, context: unknown): [] | [string, string] {
  const parser =  ref in moduleProperties ? moduleProperties[ref] : Throw(`Cannot dereference Parser '${ref}'`)
  return ParseParser(moduleProperties, parser, code, context) as never
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function ParseString(options: string[], code: string, _context: unknown): [] | [string, string] {
  return Token.String(options, code)
}
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
function ParseTuple<ModuleProperties extends Types.IModuleProperties, Parsers extends Types.IParser[]>(moduleProperties: ModuleProperties, parsers: [...Parsers], code: string, context: unknown): [] | [unknown[], string] {
  const buffer = [] as unknown[]
  let rest = code
  for (const parser of parsers) {
    const result = ParseParser(moduleProperties, parser, rest, context)
    if (result.length === 0) return []
    buffer.push(result[0])
    rest = result[1]
  }
  return [buffer, rest]
}
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
function ParseUnion<ModuleProperties extends Types.IModuleProperties, Parsers extends Types.IParser[]>(moduleProperties: ModuleProperties, parsers: [...Parsers], code: string, context: unknown): [] | [unknown, string] {
  for (const parser of parsers) {
    const result = ParseParser(moduleProperties, parser, code, context)
    if (result.length === 0) continue
    return result
  }
  return []
}
// ------------------------------------------------------------------
// Parser
// ------------------------------------------------------------------
function ParseParser<Parser extends Types.IParser>(moduleProperties: Types.IModuleProperties, parser: Parser, code: string, context: unknown): [] | [Types.StaticParser<Parser>, string] {
  const result = (
    Types.IsContext(parser) ? ParseContext(moduleProperties, parser.left, parser.right, code, context) :
    Types.IsArray(parser) ? ParseArray(moduleProperties, parser.parser, code, context) :
    Types.IsConst(parser) ? ParseConst(parser.value, code, context) :
    Types.IsIdent(parser) ? ParseIdent(code, context) :
    Types.IsNumber(parser) ? ParseNumber(code, context) :
    Types.IsOptional(parser) ? ParseOptional(moduleProperties, parser.parser, code, context) :
    Types.IsRef(parser) ? ParseRef(moduleProperties, parser.ref, code, context) :
    Types.IsString(parser) ? ParseString(parser.options, code, context) :
    Types.IsTuple(parser) ? ParseTuple(moduleProperties, parser.parsers, code, context) :
    Types.IsUnion(parser) ? ParseUnion(moduleProperties, parser.parsers, code, context) :
    Types.IsUntil(parser) ?  ParseUntil(parser.value, code, context) :
    []
  )
  return (result.length === 2 ? [parser.mapping(result[0], context), result[1]] : result) as never
}

// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
/** Parses content using the given Parser */
export function Parse<Parser extends Types.IParser>(moduleProperties: Types.IModuleProperties, parser: Parser, code: string, context: unknown): [] | [Types.StaticParser<Parser>, string]
/** Parses content using the given Parser */
export function Parse<Parser extends Types.IParser>(moduleProperties: Types.IModuleProperties, parser: Parser, code: string): [] | [Types.StaticParser<Parser>, string]
/** Parses content using the given Parser */
export function Parse<Parser extends Types.IParser>(parser: Parser, content: string, context: unknown): [] | [Types.StaticParser<Parser>, string]
/** Parses content using the given Parser */
export function Parse<Parser extends Types.IParser>(parser: Parser, content: string): [] | [Types.StaticParser<Parser>, string]
/** Parses content using the given parser */
export function Parse(...args: any[]): never {
  const withModuleProperties = typeof args[1] === 'string' ? false : true
  const [moduleProperties, parser, content, context] = withModuleProperties 
    ? [args[0], args[1], args[2], args[3]]
    : [{}, args[0], args[1], args[2]]
  return ParseParser(moduleProperties, parser, content, context) as never
}
