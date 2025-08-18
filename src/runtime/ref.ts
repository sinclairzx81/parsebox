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
import { type IParser, type IProperties, type IMapping, Identity } from './parser.ts'
import { ParseParser } from './parse.ts'

// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export interface IRef<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Ref'
  ref: string
}
// ------------------------------------------------------------------
// Factory
// ------------------------------------------------------------------
export function Ref<Type extends unknown, Mapping extends IMapping<Type>>(ref: string, mapping: Mapping): IRef<ReturnType<Mapping>>
export function Ref<Type extends unknown>(ref: string): IRef<Type>
export function Ref(...args: unknown[]): never {
  const [ref, mapping] = Arguments.Match<[string, IMapping]>(args, {
    2: (ref, mapping) => [ref, mapping],
    1: (ref) => [ref, Identity]
  })
  return { type: 'Ref', ref, mapping } as never
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
export function IsRef(value: unknown): value is IRef {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'ref')
    && Guard.IsEqual(value.type, 'Ref')
    && Guard.IsString(value.ref)
}
// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
export function ParseRef<Context extends IProperties, Ref extends string>(context: Context, ref: Ref, input: string): [] | [string, string] {
  const parser = Guard.HasPropertyKey(context, ref) ? context[ref] : (() => { throw new Error(`Cannot dereference Parser '${ref}'`) })()
  return ParseParser(context, parser, input) as never
}