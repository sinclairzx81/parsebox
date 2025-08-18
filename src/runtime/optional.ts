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

import { type StaticParser } from './static.ts'
import { type IParser, type IProperties, type IMapping, Identity } from './parser.ts'
import { ParseParser } from './parse.ts'

// ------------------------------------------------------------------
// Static
// ------------------------------------------------------------------
export type StaticOptional<Parser extends IParser, Result extends unknown = [StaticParser<Parser>] | []> = (
  Result
)
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export interface IOptional<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Optional'
  parser: IParser
}
// ------------------------------------------------------------------
// Factory
// ------------------------------------------------------------------
export function Optional<Parser extends IParser, Mapping extends IMapping = IMapping<StaticOptional<Parser>>>(parser: Parser, mapping: Mapping): IOptional<ReturnType<Mapping>>
export function Optional<Parser extends IParser>(parser: Parser): IOptional<StaticOptional<Parser>>
export function Optional(...args: unknown[]): never {
  const [parser, mapping] = Arguments.Match<[IParser, IMapping]>(args, {
    2: (parser, mapping) => [parser, mapping],
    1: (parser) => [parser, Identity]
  })
  return { type: 'Optional', parser, mapping } as never
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
export function IsOptional(value: unknown): value is IOptional {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'parser')
    && Guard.IsEqual(value.type, 'Optional')
    && Guard.IsObject(value.parser)
}
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
export function ParseOptional<Context extends IProperties, Parser extends IParser>(context: Context, parser: Parser, input: string): [] | [[unknown] | [], unknown] {
  const result = ParseParser(context, parser, input)
  return (
    Guard.IsEqual(result.length, 2) 
      ? [[result[0]], result[1]] 
      : [[], input]
  ) as never
}