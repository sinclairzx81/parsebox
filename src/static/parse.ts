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

import type { Array, ParseArray } from './array.ts'
import type { BigInt, ParseBigInt } from './bigint.ts'
import type { Const, ParseConst } from './const.ts'
import type { Ident, ParseIdent } from './ident.ts'
import type { Integer, ParseInteger } from './integer.ts'
import type { Number, ParseNumber } from './number.ts'
import type { Optional, ParseOptional } from './optional.ts'
import type { ParseString, String } from './string.ts'
import type { ParseTuple, Tuple } from './tuple.ts'
import type { ParseUnion, Union } from './union.ts'
import type { ParseUntil_1, Until_1 } from './until_1.ts'
import type { ParseUntil, Until } from './until.ts'

import type { IParser } from './parser.ts'

// ------------------------------------------------------------------
// ParseInput
// ------------------------------------------------------------------
type ParseInput<Input extends string, Parser extends IParser> = (
  Parser extends Array<infer Parser extends IParser> ? ParseArray<Parser, Input> :
  Parser extends BigInt ? ParseBigInt<Input> :
  Parser extends Const<infer Const extends string> ? ParseConst<Const, Input> : 
  Parser extends Ident ? ParseIdent<Input> : 
  Parser extends Integer ? ParseInteger<Input> :
  Parser extends Number ? ParseNumber<Input> : 
  Parser extends Optional<infer Parser extends IParser> ? ParseOptional<Parser, Input> : 
  Parser extends String<infer Quotes extends string[]> ? ParseString<Quotes, Input> : 
  Parser extends Tuple<infer Parsers extends IParser[]> ? ParseTuple<Parsers, Input> : 
  Parser extends Union<infer Parsers extends IParser[]> ? ParseUnion<Parsers, Input> : 
  Parser extends Until<infer End extends string[]> ? ParseUntil<End, Input> : 
  Parser extends Until_1<infer End extends string[]> ? ParseUntil_1<End, Input>
  : []
)
// ------------------------------------------------------------------
// ParseMapping
// ------------------------------------------------------------------
type ParseMapping<Parser extends IParser, ParseResult extends unknown = unknown> = ((
  Parser['mapping'] & { input: ParseResult })['output']
)
// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
/** Parses code with the given parser */
export type Parse<Parser extends IParser, Input extends string> = (
  ParseInput<Input, Parser> extends [infer ParseResult extends unknown, infer InputRest extends string] 
    ? [ParseMapping<Parser, ParseResult>, InputRest]
    : []
)
