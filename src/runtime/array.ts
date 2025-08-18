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
export type StaticArray<Parser extends IParser> = StaticEnsure<
  StaticParser<Parser>[]
>
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export interface IArray<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Array'
  parser: IParser
}
// ------------------------------------------------------------------
// Factory
// ------------------------------------------------------------------
export function Array<Parser extends IParser, Mapping extends IMapping = IMapping<StaticArray<Parser>>>(parser: Parser, mapping: Mapping): IArray<ReturnType<Mapping>>
export function Array<Parser extends IParser>(parser: Parser): IArray<StaticArray<Parser>>
export function Array(...args: unknown[]): never {
  const [parser, mapping] = Arguments.Match<[IParser, IMapping]>(args, {
    2: (parser, mapping) => [parser, mapping],
    1: (parser) => [parser, Identity]
  })
  return { type: 'Array', parser, mapping } as never
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
/** True if the value is a Array parser */
export function IsArray(value: unknown): value is IArray {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'parser')
    && Guard.IsEqual(value.type, 'Array')
    && Guard.IsObject(value.parser)
}
// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
export function ParseArray<Context extends IProperties, Parser extends IParser>(context: Context, parser: Parser, input: string): unknown[] {
  const buffer = [] as unknown[]
  let rest = input
  while (rest.length > 0) {
    const result = ParseParser(context, parser, rest)
    if (result.length === 0) return [buffer, rest]
    buffer.push(result[0])
    rest = result[1]
  }
  return [buffer, rest]
}