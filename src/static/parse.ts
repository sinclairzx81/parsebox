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

import * as Tokens from './token.ts'
import * as Types from './types.ts'

// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
type ArrayParser<Parser extends Types.IParser, Input extends string, Result extends unknown[] = []> = (
  Parse<Parser, Input> extends [infer Value1 extends unknown, infer Rest extends string]
    ? ArrayParser<Parser, Rest, [...Result, Value1]>
    : [Result, Input]
)
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
type ConstParser<Value extends string, Input extends string> = (
  Tokens.Const<Value, Input> extends [infer Match extends Value, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
type IdentParser<Input extends string> = (
  Tokens.Ident<Input> extends [infer Match extends string, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
type NumberParser<Input extends string> = (
  Tokens.Number<Input> extends [infer Match extends string, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
type OptionalParser<Parser extends Types.IParser, Input extends string> = (
  Parse<Parser, Input> extends [infer Value extends unknown, infer Rest extends string]
    ? [[Value], Rest]
    : [[], Input]
)
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
type StringParser<Options extends string[], Input extends string> = (
  Tokens.String<Options, Input> extends [infer Match extends string, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
type TupleParser<Parsers extends Types.IParser[], Input extends string, Result extends unknown[] = []> = (
  Parsers extends [infer Left extends Types.IParser, ...infer Right extends Types.IParser[]]
    ? Parse<Left, Input> extends [infer Value extends unknown, infer Rest extends string]
      ? TupleParser<Right, Rest, [...Result, Value]>
      : []
    : [Result, Input]
)
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
type UnionParser<Parsers extends Types.IParser[], Input extends string> = (
  Parsers extends [infer Left extends Types.IParser, ...infer Right extends Types.IParser[]]
    ? Parse<Left, Input> extends [infer Value extends unknown, infer Rest extends string]
      ? [Value, Rest]
      : UnionParser<Right, Input>
    : []
)
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
type UntilParser<Values extends string[], Input extends string> = (
  Tokens.Until<Values, Input> extends [infer Match extends string, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// UntilNonEmpty
// ------------------------------------------------------------------
type UntilNonEmptyParser<Values extends string[], Input extends string> = (
  Tokens.UntilNonEmpty<Values, Input> extends [infer Match extends string, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
type ParseCode<Parser extends Types.IParser, Input extends string> = (
  Parser extends Types.Array<infer Parser extends Types.IParser> ? ArrayParser<Parser, Input> :
  Parser extends Types.Const<infer Value extends string> ? ConstParser<Value, Input> :
  Parser extends Types.Ident ? IdentParser<Input> :
  Parser extends Types.Number ? NumberParser<Input> :
  Parser extends Types.Optional<infer Parser extends Types.IParser> ? OptionalParser<Parser, Input> :
  Parser extends Types.String<infer Options extends string[]> ? StringParser<Options, Input> :
  Parser extends Types.Tuple<infer Parsers extends Types.IParser[]> ? TupleParser<Parsers, Input> :
  Parser extends Types.Union<infer Parsers extends Types.IParser[]> ? UnionParser<Parsers, Input> :
  Parser extends Types.Until<infer Values extends string[]> ? UntilParser<Values, Input> :
  Parser extends Types.UntilNonEmpty<infer Values extends string[]> ? UntilNonEmptyParser<Values, Input> :
  []
)
type ParseMapping<Parser extends Types.IParser, Result extends unknown = unknown> = (
  (Parser['mapping'] & { input: Result })['output']
)
/** Parses code with the given parser */
export type Parse<Parser extends Types.IParser, Input extends string> = (
  ParseCode<Parser, Input> extends [infer Code extends unknown, infer Rest extends string]
    ? [ParseMapping<Parser, Code>, Rest]
    : []
)
