/*--------------------------------------------------------------------------

ParseBox

The MIT License (MIT)

Copyright (c) 2024-2026 Haydn Paterson

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

import * as Token from '../token/index.ts'

import { Arguments } from '../system/arguments/index.ts'
import { Guard } from '../guard/index.ts'
import { type IParser, type IMapping, Identity } from './parser.ts'

// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export interface IUnsignedNumber<Output extends unknown = unknown> extends IParser<Output> {
  type: 'UnsignedNumber'
}
// ------------------------------------------------------------------
// Factory
// ------------------------------------------------------------------
export function UnsignedNumber<Mapping extends IMapping<string>>(mapping: Mapping): IUnsignedNumber<ReturnType<Mapping>>
export function UnsignedNumber(): IUnsignedNumber<string>
export function UnsignedNumber(...args: unknown[]): never {
  const [mapping] = Arguments.Match<[IParser, IMapping]>(args, {
    1: (mapping) => [mapping],
    0: () => [Identity]
  })
  return { type: 'UnsignedNumber', mapping } as never
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
export function IsUnsignedNumber(value: unknown): value is IUnsignedNumber {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.IsEqual(value.type, 'UnsignedNumber')
}
// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
export function ParseUnsignedNumber(input: string): [] | [string, string] {
  return Token.UnsignedNumber(input)
}