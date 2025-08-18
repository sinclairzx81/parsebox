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

import { Arguments } from '../system/arguments/index.ts'
import { Guard } from '../guard/index.ts'
import { type StaticParser, type StaticEnsure } from './static.ts'
import { type IParser, type IProperties, type IMapping, Identity } from './parser.ts'
import { ParseParser } from './parse.ts'

// ------------------------------------------------------------------
// Static
// ------------------------------------------------------------------
export type StaticTuple<Parsers extends IParser[], Result extends unknown[] = []> = StaticEnsure<
  Parsers extends [infer Left extends IParser, ...infer Right extends IParser[]]
  ? StaticTuple<Right, [...Result, StaticEnsure<StaticParser<Left>>]>
  : Result
>
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export interface ITuple<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Tuple'
  parsers: IParser[]
}
// ------------------------------------------------------------------
// Factory
// ------------------------------------------------------------------
export function Tuple<Parsers extends IParser[], Mapping extends IMapping = IMapping<StaticTuple<Parsers>>>(parsers: [...Parsers], mapping: Mapping): ITuple<ReturnType<Mapping>>
export function Tuple<Parsers extends IParser[]>(parsers: [...Parsers]): ITuple<StaticTuple<Parsers>>
export function Tuple(...args: unknown[]): never {
  const [parsers, mapping] = Arguments.Match<[IParser[], IMapping]>(args, {
    2: (parsers, mapping) => [parsers, mapping],
    1: (parsers) => [parsers, Identity]
  })
  return { type: 'Tuple', parsers, mapping } as never
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
/** True if the value is a Tuple parser */
export function IsTuple(value: unknown): value is ITuple {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'parsers')
    && Guard.IsEqual(value.type, 'Tuple')
    && Guard.IsArray(value.parsers)
}
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
export function ParseTuple<Context extends IProperties, Parsers extends IParser[]>(context: Context, parsers: [...Parsers], input: string): [] | [unknown[], string] {
  const buffer = [] as unknown[]
  let rest = input
  for (const parser of parsers) {
    const result = ParseParser(context, parser, rest)
    if (result.length === 0) return []
    buffer.push(result[0])
    rest = result[1]
  }
  return [buffer, rest]
}