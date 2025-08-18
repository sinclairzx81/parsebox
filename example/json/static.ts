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

import { Static } from '@sinclair/parsebox'

// -----------------------------------------------------------------------
// Json
// -----------------------------------------------------------------------
export type Json = Static.Union<[
  Number,
  Boolean,
  String,
  Null,
  Object,
  Array
]>
// -----------------------------------------------------------------------
// Number
// -----------------------------------------------------------------------
interface NumberMapping extends Static.IMapping {
  output: this['input'] extends `${infer N extends number}` ? N : never
}
type Number = Static.Number<NumberMapping>
// -----------------------------------------------------------------------
// String
// -----------------------------------------------------------------------
interface StringMapping extends Static.IMapping {
  output: this['input']
}
type String = Static.String<['"'], StringMapping>
// -----------------------------------------------------------------------
// Boolean
// -----------------------------------------------------------------------
interface BooleanMapping extends Static.IMapping {
  output: this['input'] extends `${infer N extends boolean}` ? N : never
}
type Boolean = Static.Union<[
  Static.Const<'true'>,
  Static.Const<'false'>,
], BooleanMapping>

// -----------------------------------------------------------------------
// Null
// -----------------------------------------------------------------------
interface NullMapping extends Static.IMapping {
  output: null
}
type Null = Static.Const<'null', NullMapping>
// -----------------------------------------------------------------------
// Key
// -----------------------------------------------------------------------
type Key = Static.Union<[Static.String<['"']>]>
// -----------------------------------------------------------------------
// Property
// -----------------------------------------------------------------------
interface PropertyMapping extends Static.IMapping {
  output: this['input'] extends [infer Key extends string, ':', infer Value extends unknown]
    ? { [_ in Key]: Value }
    : never
}
type Property = Static.Tuple<[Key, Static.Const<':'>, Json], PropertyMapping>
// -----------------------------------------------------------------------
// Properties
// -----------------------------------------------------------------------
interface PropertiesMapping extends Static.IMapping {
  output: (
    this['input'] extends [infer Property extends unknown, ',', infer Rest extends unknown[]] ? [Property, ...Rest] :
    this['input'] extends [infer Property extends unknown] ? [Property] :
    []
  )
}
type Properties = Static.Union<[
  Static.Tuple<[Property,Static.Const<','>, Properties]>,
  Static.Tuple<[Property]>,
  Static.Tuple<[]>
], PropertiesMapping>
// -----------------------------------------------------------------------
// Object
// -----------------------------------------------------------------------
type ObjectReduce<PropertyList extends Record<PropertyKey, unknown>[], Result extends Record<PropertyKey, unknown> = {}> = (
  PropertyList extends [infer Left extends Record<PropertyKey, unknown>, ...infer Right extends Record<PropertyKey, unknown>[]]
    ? ObjectReduce<Right, Result & Left>
    : {[K in keyof Result]: Result[K]} & {}
)
interface ObjectMapping extends Static.IMapping {
  output: this['input'] extends ['{', infer PropertyList extends Record<PropertyKey, unknown>[], '}']
    ? ObjectReduce<PropertyList>
    : never
}
type Object = Static.Tuple<[
  Static.Const<'{'>,
  Properties,
  Static.Const<'}'>
], ObjectMapping>
// -----------------------------------------------------------------------
// Elemments
// -----------------------------------------------------------------------
interface ElementsMapping extends Static.IMapping {
  output: (
    this['input'] extends [infer Element extends unknown, ',', infer Rest extends unknown[]] ? [Element, ...Rest] :
    this['input'] extends [infer Element extends unknown] ? [Element] :
    []
  )
}
type Elements = Static.Union<[
  Static.Tuple<[Json, Static.Const<','>, Elements]>,
  Static.Tuple<[Json]>,
  Static.Tuple<[]>
], ElementsMapping>
// -----------------------------------------------------------------------
// Array
// -----------------------------------------------------------------------
interface ArrayMapping extends Static.IMapping {
  output: this['input'] extends ['[', infer ElementList extends unknown[], ']']
    ? ElementList
    : never
}
type Array = Static.Tuple<[Static.Const<'['>, Elements, Static.Const<']'>], ArrayMapping>
