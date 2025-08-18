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
// deno-lint-ignore-file no-unused-vars

import { Unreachable } from '../../system/unreachable/index.ts'
import * as Runtime from '../../runtime/index.ts'

function InferArray(parser: Runtime.IParser): string {
  return `(${Infer(parser)})[]`
}
function InferConst(parser: Runtime.IConst) {
  return `'${parser.const}'`
}
function InferBigInt(parser: Runtime.IBigInt) {
  return `string`
}
function InferIdent(parser: Runtime.IIdent) {
  return `string`
}
function InferInteger(parser: Runtime.IInteger) {
  return `string`
}
function InferOptional(parser: Runtime.IParser) {
  return `([${Infer(parser)}] | [])`
}
function InferUnion(parsers: Runtime.IParser[]): string {
  return [...new Set(parsers.map((parser) => Infer(parser)))].join(' | ')
}
function InferString(parser: Runtime.IString) {
  return `string`
}
function InferRef(parser: Runtime.IRef) {
  return `unknown`
}
function InferNumber(parser: Runtime.INumber) {
  return `string`
}
function InferTuple(parsers: Runtime.IParser[]): string {
  return `[${parsers.map(() => 'unknown').join(', ')}]`
}
function InferUntil_1(parser: Runtime.IUntil_1) {
  return `string`
}
function InferUntil(parser: Runtime.IUntil) {
  return `string`
}
export function Infer(parser: Runtime.IParser): string {
  return (
    Runtime.IsArray(parser) ? InferArray(parser.parser) :
    Runtime.IsBigInt(parser) ? InferBigInt(parser) :
    Runtime.IsConst(parser) ? InferConst(parser) :
    Runtime.IsInteger(parser) ? InferInteger(parser) :
    Runtime.IsIdent(parser) ? InferIdent(parser) :
    Runtime.IsNumber(parser) ? InferNumber(parser) :
    Runtime.IsOptional(parser) ? InferOptional(parser.parser) :
    Runtime.IsRef(parser) ? InferRef(parser) :
    Runtime.IsString(parser) ? InferString(parser) :
    Runtime.IsTuple(parser) ? InferTuple(parser.parsers) :
    Runtime.IsUnion(parser) ? InferUnion(parser.parsers) :
    Runtime.IsUntil_1(parser) ? InferUntil_1(parser) :
    Runtime.IsUntil(parser) ? InferUntil(parser) :
    Unreachable(parser)
  )
}
