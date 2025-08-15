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

import { Guard } from '../guard/index.ts'
import { Arguments } from '../system/arguments/index.ts'

import { type StaticParser } from './static.ts'
import { type IParser, type IProperties } from './parser.ts'

import { ParseArray, IsArray } from './array.ts'
import { ParseBigInt, IsBigInt } from './bigint.ts'
import { ParseConst, IsConst } from './const.ts'
import { ParseIdent, IsIdent } from './ident.ts'
import { ParseInteger, IsInteger } from './integer.ts'
import { ParseNumber, IsNumber } from './number.ts'
import { ParseOptional, IsOptional } from './optional.ts'
import { ParseRef, IsRef } from './ref.ts'
import { ParseString, IsString } from './string.ts'
import { ParseTuple, IsTuple } from './tuple.ts'
import { ParseUnion, IsUnion } from './union.ts'
import { ParseUntil_1, IsUntil_1 } from './until_1.ts'
import { ParseUntil, IsUntil } from './until.ts'

// ------------------------------------------------------------------
// ParseParser
// ------------------------------------------------------------------
export function ParseParser<Parser extends IParser>(context: IProperties, parser: Parser, input: string): [] | [StaticParser<Parser>, string] {
  const result = (
    IsArray(parser) ? ParseArray(context, parser.parser, input) :
    IsBigInt(parser) ? ParseBigInt(input) :
    IsConst(parser) ? ParseConst(parser.const, input) :
    IsIdent(parser) ? ParseIdent(input) :
    IsInteger(parser) ? ParseInteger(input) :
    IsNumber(parser) ? ParseNumber(input) :
    IsOptional(parser) ? ParseOptional(context, parser.parser, input) :
    IsRef(parser) ? ParseRef(context, parser.ref, input) :
    IsString(parser) ? ParseString(parser.quotes, input) :
    IsTuple(parser) ? ParseTuple(context, parser.parsers, input) :
    IsUnion(parser) ? ParseUnion(context, parser.parsers, input) :
    IsUntil(parser) ? ParseUntil(parser.end, input) :
    IsUntil_1(parser) ? ParseUntil_1(parser.end, input) :
    []
  )
  return (Guard.IsEqual(result.length, 2) ? [parser.mapping(result[0]), result[1]] : result) as never
}
// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
/** Parses input using the given Parser */
export function Parse<Parser extends IParser>(context: IProperties, parser: Parser, input: string): [] | [StaticParser<Parser>, string]
/** Parses input using the given Parser */
export function Parse<Parser extends IParser>(parser: Parser, content: string): [] | [StaticParser<Parser>, string]
/** Parses input using the given Parser */
export function Parse(...args: any[]): never {
  const [context, parser, input] = Arguments.Match<[IProperties, IParser, string]>(args, {
    3: (context, parser, input) => [context, parser, input],
    2: (parser, input) => [{}, parser, input]
  })
  return ParseParser(context, parser, input) as never
}
