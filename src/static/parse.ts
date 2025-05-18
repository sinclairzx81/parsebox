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
// Context
// ------------------------------------------------------------------
type ContextParser<Left extends Types.IParser, Right extends Types.IParser, Input extends string, Context extends unknown> = (
  Parse<Left, Input, Context> extends [infer Context extends unknown, infer Rest extends string]
    ? Parse<Right, Rest, Context>
    : []
)
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
type ArrayParser<Parser extends Types.IParser, Input extends string, Context extends unknown, Result extends unknown[] = []> = (
  Parse<Parser, Input, Context> extends [infer Value1 extends unknown, infer Rest extends string]
    ? ArrayParser<Parser, Rest, Context, [...Result, Value1]>
    : [Result, Input]
)
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
type ConstParser<Value extends string, Input extends string, _Context extends unknown> = (
  Tokens.Const<Value, Input> extends [infer Match extends Value, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
type UntilParser<Value extends string, Input extends string, _Context extends unknown> = (
  Tokens.Until<Value, Input> extends [infer Match extends string, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
type IdentParser<Input extends string, _Context extends unknown> = (
  Tokens.Ident<Input> extends [infer Match extends string, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
type NumberParser<Input extends string, _Context extends unknown> = (
  Tokens.Number<Input> extends [infer Match extends string, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
type OptionalParser<Parser extends Types.IParser, Input extends string, Context extends unknown> = (
  Parse<Parser, Input, Context> extends [infer Value extends unknown, infer Rest extends string]
    ? [[Value], Rest]
    : [[], Input]
)
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
type StringParser<Options extends string[], Input extends string, _Context extends unknown> = (
  Tokens.String<Options, Input> extends [infer Match extends string, infer Rest extends string]
    ? [Match, Rest]
    : []
)
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
type TupleParser<Parsers extends Types.IParser[], Input extends string, Context extends unknown, Result extends unknown[] = []> = (
  Parsers extends [infer Left extends Types.IParser, ...infer Right extends Types.IParser[]]
    ? Parse<Left, Input, Context> extends [infer Value extends unknown, infer Rest extends string]
      ? TupleParser<Right, Rest, Context, [...Result, Value]>
      : []
    : [Result, Input]
)
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
type UnionParser<Parsers extends Types.IParser[], Input extends string, Context extends unknown> = (
  Parsers extends [infer Left extends Types.IParser, ...infer Right extends Types.IParser[]]
    ? Parse<Left, Input, Context> extends [infer Value extends unknown, infer Rest extends string]
      ? [Value, Rest]
      : UnionParser<Right, Input, Context>
    : []
)
// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
type ParseCode<Parser extends Types.IParser, Input extends string, Context extends unknown = unknown> = (
  Parser extends Types.Context<infer Left extends Types.IParser, infer Right extends Types.IParser> ? ContextParser<Left, Right, Input, Context> :
  Parser extends Types.Array<infer Parser extends Types.IParser> ? ArrayParser<Parser, Input, Context> :
  Parser extends Types.Const<infer Value extends string> ? ConstParser<Value, Input, Context> :
  Parser extends Types.Ident ? IdentParser<Input, Context> :
  Parser extends Types.Number ? NumberParser<Input, Context> :
  Parser extends Types.Optional<infer Parser extends Types.IParser> ? OptionalParser<Parser, Input, Context> :
  Parser extends Types.String<infer Options extends string[]> ? StringParser<Options, Input, Context> :
  Parser extends Types.Tuple<infer Parsers extends Types.IParser[]> ? TupleParser<Parsers, Input, Context> :
  Parser extends Types.Union<infer Parsers extends Types.IParser[]> ? UnionParser<Parsers, Input, Context> :
  Parser extends Types.Until<infer Value extends string> ? UntilParser<Value, Input, Context> :
  []
)
type ParseMapping<Parser extends Types.IParser, Result extends unknown, Context extends unknown = unknown> = (
  (Parser['mapping'] & { input: Result, context: Context })['output']
)
/** Parses code with the given parser */
export type Parse<Parser extends Types.IParser, Input extends string, Context extends unknown = unknown> = (
  ParseCode<Parser, Input, Context> extends [infer Code extends unknown, infer Rest extends string]
    ? [ParseMapping<Parser, Code, Context>, Rest]
    : []
)
