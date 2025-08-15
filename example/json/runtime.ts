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
  Runtime.Ref('Array')
])
// -----------------------------------------------------------------------
// Number
// -----------------------------------------------------------------------
function NumberMapping(value: string) {
  return parseFloat(value)
}
const Number = Runtime.Number(NumberMapping)
// -----------------------------------------------------------------------
// String
// -----------------------------------------------------------------------
function StringMapping(value: string) {
  return value
}
const String = Runtime.String(['"'], StringMapping)
// -----------------------------------------------------------------------
// Boolean
// -----------------------------------------------------------------------
function BooleanMapping(value: string) {
  return value === 'true'
}
const Boolean = Runtime.Union([
  Runtime.Const('true'),
  Runtime.Const('false'),
], BooleanMapping)

// -----------------------------------------------------------------------
// Null
// -----------------------------------------------------------------------
function NullMapping(_value: string) {
  return null
}
const Null = Runtime.Const('null', NullMapping)
// -----------------------------------------------------------------------
// Property
// -----------------------------------------------------------------------
const Key = Runtime.Union([Runtime.String(['"'])])

function PropertyMapping(input: unknown[]) {
  return { [input[0] as string]: input[2] }
}
const Property = Runtime.Tuple([Runtime.Ref('Key'), Runtime.Const(':'), Runtime.Ref('Json')], PropertyMapping)

// -----------------------------------------------------------------------
// Properties
// -----------------------------------------------------------------------
function PropertiesMapping(input: unknown[]) {
  return (
    input.length === 3 ? [input[0], ...input[2] as unknown[]] :
    input.length === 1 ? [input[0]] :
    []
  )
}
const Properties = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('Property'), Runtime.Const(','), Runtime.Ref('Properties')]),
  Runtime.Tuple([Runtime.Ref('Property')]),
  Runtime.Tuple([])
], PropertiesMapping)
// -----------------------------------------------------------------------
// Object
// -----------------------------------------------------------------------
function ObjectReduce(propertiesList: Record<PropertyKey, unknown>[]) {
  return propertiesList.reduce((result, properties) => {
    return {...result, ...properties }
  }, {})
}
function ObjectMapping(input: unknown[]) {
  return ObjectReduce(input[1] as Record<PropertyKey, unknown>[])
}
const _Object = Runtime.Tuple([
  Runtime.Const('{'),
  Runtime.Ref('Properties'),
  Runtime.Const('}')
], ObjectMapping)
// -----------------------------------------------------------------------
// Elemments
// -----------------------------------------------------------------------
function ElementsMapping(input: unknown[]) {
  return (
    input.length === 3 ? [input[0], ...input[2] as unknown[]] :
    input.length === 1 ? [input[0]] :
    []
  )
}
const Elements = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('Json'), Runtime.Const(','), Runtime.Ref('Elements')]),
  Runtime.Tuple([Runtime.Ref('Json')]),
  Runtime.Tuple([])
], ElementsMapping)
// -----------------------------------------------------------------------
// Array
// -----------------------------------------------------------------------
function ArrayMapping(values: unknown[]) {
  return values[1]
}
const Array = Runtime.Tuple([Runtime.Const('['), Runtime.Ref('Elements'), Runtime.Const(']')], ArrayMapping)

export const JsonModule = new Runtime.Module({
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
  Json
})
