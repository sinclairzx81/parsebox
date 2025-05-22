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
import { Unreachable } from './unreachable.ts'
import { Escape } from './escape.ts'

function FromContext(parser: Runtime.IContext): string {
  return `${FromParser(parser.left)} -> ${FromParser(parser.right)}`
}
function FromTuple(parser: Runtime.ITuple): string {
  return `[${parser.parsers.map((parser) => `${FromParser(parser)}`).join(', ')}]`
}
function FromUnion(parser: Runtime.IUnion): string {
  return parser.parsers.map((parser) => `${FromParser(parser)}`).join(' | ')
}
function FromArray(parser: Runtime.IArray): string {
  return `${FromParser(parser.parser)}[]`
}
function FromOptional(parser: Runtime.IOptional): string {
  return `${FromParser(parser.parser)}?`
}
function FromRef(parser: Runtime.IRef): string {
  return `${parser.ref}`
}
function FromConst(parser: Runtime.IConst): string {
  return `'${Escape(parser.value)}'`
}
function FromUntil(parser: Runtime.IUntil): string {
  return `string`
}
function FromIdent(parser: Runtime.IIdent): string {
  return `<Ident>`
}
function FromString(parser: Runtime.IString): string {
  return `<String>`
}
function FromNumber(parser: Runtime.INumber): string {
  return `<Number>`
}
function FromParser(parser: Runtime.IParser): string {
  return (
    Runtime.IsContext(parser) ? FromContext(parser) : 
    Runtime.IsTuple(parser) ? FromTuple(parser) : 
    Runtime.IsUnion(parser) ? FromUnion(parser) : 
    Runtime.IsArray(parser) ? FromArray(parser) : 
    Runtime.IsOptional(parser) ? FromOptional(parser) : 
    Runtime.IsString(parser) ? FromString(parser) : 
    Runtime.IsConst(parser) ? FromConst(parser) : 
    Runtime.IsUntil(parser) ? FromUntil(parser) : 
    Runtime.IsRef(parser) ? FromRef(parser) : 
    Runtime.IsIdent(parser) ? FromIdent(parser) : 
    Runtime.IsNumber(parser) ? FromNumber(parser) : 
    Unreachable(parser)
  )
}
export function CompileComment(name: string, parser: Runtime.IParser): string {
  const line = `// ${'-'.repeat(67)}`
  const type = `// ${name}: ${FromParser(parser)}`
  return [line, type, line].join('\n')
}
