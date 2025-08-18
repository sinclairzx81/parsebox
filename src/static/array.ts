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

import type { Identity, IMapping, IParser } from './parser.ts'
import type { Parse } from './parse.ts'

// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export interface Array<Parser extends IParser = IParser, Mapping extends IMapping = Identity> extends IParser<Mapping> {
  type: 'Array'
  parser: Parser
}
// ------------------------------------------------------------------
// Parse
// ------------------------------------------------------------------
export type ParseArray<Parser extends IParser, Input extends string, Result extends unknown[] = []> = (
  Parse<Parser, Input> extends [infer Element extends unknown, infer InputRest extends string]
    ? ParseArray<Parser, InputRest, [...Result, Element]>
    : [Result, Input]
)
