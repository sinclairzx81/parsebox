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

import * as Token from '../token/index.ts'

import { Arguments } from '../system/arguments/index.ts'
import { Guard } from '../guard/index.ts'
import { type IParser, type IMapping, Identity } from './parser.ts'

// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export interface IConst<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Const'
  const: string
}
// ------------------------------------------------------------------
// Factory
// ------------------------------------------------------------------
export function Const<Value extends string, Mapping extends IMapping<Value>>(value: Value, mapping: Mapping): IConst<ReturnType<Mapping>>
export function Const<Value extends string>(value: Value): IConst<Value>
export function Const(...args: unknown[]): never {
  const [const_, mapping] = Arguments.Match<[string, IMapping]>(args, {
    2: (const_, mapping) => [const_, mapping],
    1: (const_) => [const_, Identity]
  })
  return { type: 'Const', const: const_, mapping } as never
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
export function IsConst(value: unknown): value is IConst {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'const')
    && Guard.IsEqual(value.type, 'Const')
    && Guard.IsString(value.const)
}
// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
export function ParseConst<Const extends string>(const_: Const, input: string): [] | [Const, string] {
  return Token.Const(const_, input) as never
}