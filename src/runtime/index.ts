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

export { type IArray, Array, IsArray } from './array.ts'
export { type IBigInt, BigInt, IsBigInt } from './bigint.ts'
export { type IConst, Const, IsConst } from './const.ts'
export { type IIdent, Ident, IsIdent } from './ident.ts'
export { type IInteger, Integer, IsInteger } from './integer.ts'
export { Module } from './module.ts'
export { type INumber, IsNumber, Number } from './number.ts'
export { type IOptional, IsOptional, Optional } from './optional.ts'
export { Parse } from './parse.ts'
export { type IParser, type IProperties, type IMapping, As, Identity } from './parser.ts'
export { type IRef, Ref, IsRef, } from './ref.ts'
export { type IString, IsString, String } from './string.ts'
export { type ITuple, IsTuple, Tuple } from './tuple.ts'
export { type IUnion, IsUnion, Union } from './union.ts'
export { type IUntil_1, IsUntil_1, Until_1 } from './until_1.ts'
export { type IUntil, IsUntil, Until } from './until.ts'
