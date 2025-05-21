/*--------------------------------------------------------------------------

@sinclair/parsebox

The MIT License (MIT)

Copyright (c) 2024-2025 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

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

import { Runtime } from '../../runtime/index.ts'

function InferUnion(parsers: Runtime.IParser[]): string {
  return [...new Set(parsers.map((parser) => Infer(parser)))].join(' | ')
}
function InferTuple(parsers: Runtime.IParser[]): string {
  return `[${parsers.map(() => 'unknown').join(', ')}]`
}
function InferArray(parser: Runtime.IParser): string {
  return `(${Infer(parser)})[]`
}
function InferContext(left: Runtime.IParser, right: Runtime.IParser) {
  return Infer(right)
}
function InferOptional(parser: Runtime.IParser) {
  return `([${Infer(parser)}] | [])`
}
function InferConst(parser: Runtime.IConst) {
  return `'${parser.value}'`
}
function InferUntil(parser: Runtime.IUntil) {
  return `string`
}
export function Infer(parser: Runtime.IParser): string {
  return (
    Runtime.IsContext(parser) ? InferContext(parser.right, parser.right) :
    Runtime.IsTuple(parser) ? InferTuple(parser.parsers) :
    Runtime.IsUnion(parser) ? InferUnion(parser.parsers) :
    Runtime.IsArray(parser) ? InferArray(parser.parser) :
    Runtime.IsOptional(parser) ? InferOptional(parser.parser) :
    Runtime.IsRef(parser) ? `unknown` :
    Runtime.IsConst(parser) ? InferConst(parser) :
    Runtime.IsUntil(parser) ? InferUntil(parser) :
    Runtime.IsString(parser) ? `string` :
    Runtime.IsIdent(parser) ? `string` :
    Runtime.IsNumber(parser) ? `string` :
    '<unreachable>'
  )
}
