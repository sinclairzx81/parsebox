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

import { Runtime } from '@sinclair/parsebox'

// -----------------------------------------------------------------------
// Json
// -----------------------------------------------------------------------
const Json = Runtime.Union([
  Runtime.Ref('Number'),
  Runtime.Ref('Boolean'),
  Runtime.Ref('String'),
  Runtime.Ref('Null'),
  Runtime.Ref('Object'),
  Runtime.Ref('Array'),
])
// -----------------------------------------------------------------------
// Number
// -----------------------------------------------------------------------
const Number = Runtime.Number()
// -----------------------------------------------------------------------
// String
// -----------------------------------------------------------------------
const String = Runtime.String(['"'])
// -----------------------------------------------------------------------
// Boolean
// -----------------------------------------------------------------------
const Boolean = Runtime.Union([
  Runtime.Const('true'),
  Runtime.Const('false'),
])

// -----------------------------------------------------------------------
// Null
// -----------------------------------------------------------------------
const Null = Runtime.Const('null')
// -----------------------------------------------------------------------
// Key
// -----------------------------------------------------------------------
const Key = Runtime.Union([Runtime.String(['"'])])
// -----------------------------------------------------------------------
// Property
// -----------------------------------------------------------------------
const Property = Runtime.Tuple([Runtime.Ref('Key'), Runtime.Const(':'), Runtime.Ref('Json')])
// -----------------------------------------------------------------------
// Properties
// -----------------------------------------------------------------------
const Properties = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('Property'), Runtime.Const(','), Runtime.Ref('Properties')]),
  Runtime.Tuple([Runtime.Ref('Property')]),
  Runtime.Tuple([]),
])
// -----------------------------------------------------------------------
// Object
// -----------------------------------------------------------------------
const _Object = Runtime.Tuple([
  Runtime.Const('{'),
  Runtime.Ref('Properties'),
  Runtime.Const('}'),
])
// -----------------------------------------------------------------------
// Elemments
// -----------------------------------------------------------------------
const Elements = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('Json'), Runtime.Const(','), Runtime.Ref('Elements')]),
  Runtime.Tuple([Runtime.Ref('Json')]),
  Runtime.Tuple([]),
])
// -----------------------------------------------------------------------
// Array
// -----------------------------------------------------------------------
const Array = Runtime.Tuple([Runtime.Const('['), Runtime.Ref('Elements'), Runtime.Const(']')])

// -----------------------------------------------------------------------
// Coverage
//
// These are only here to test there are no errors running these
// combinators through the build process.
//
// -----------------------------------------------------------------------
const Coverage = Runtime.Union([
  Runtime.BigInt(),
  Runtime.Array(Runtime.String(['"'])),
  Runtime.Ident(),
  Runtime.Integer(),
  Runtime.Until(['x']),
  Runtime.Until_1(['x']),
  Runtime.Union([]),
  Runtime.Optional(Runtime.Ident()),
])
export const JsonModule = new Runtime.Module({
  // Coverage
  Coverage,
  // Json Core
  Number,
  Boolean,
  String,
  Null,
  Key,
  Property,
  Properties,
  Object: _Object,
  Elements,
  Array,
  Json,
})
