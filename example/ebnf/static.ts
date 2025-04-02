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

import { Static, Runtime } from '@sinclair/parsebox'

// ------------------------------------------------------------------
// Identifier
// ------------------------------------------------------------------
type Identifier = Static.Ident

// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
interface RefMapping extends Static.IMapping {
  output: Runtime.IRef<this['input']>
}
type Ref = Static.Ident<RefMapping>

// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
interface ConstMapping extends Static.IMapping {
  output: Runtime.IConst<this['input']>
}
type Const = Static.String<['"'], ConstMapping>

// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
interface IdentMapping extends Static.IMapping {
  output: Runtime.IIdent
}
type Ident = Static.Const<'Ident', IdentMapping>

// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
interface NumberMapping extends Static.IMapping {
  output: Runtime.INumber<string>
}
type Number = Static.Const<'Number', NumberMapping>

// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
interface ArrayMapping extends Static.IMapping {
  output: this['input'] extends ['{', infer Expression extends Runtime.IParser, '}']
    ? Runtime.IArray<Expression>
    : never
}
type Array = Static.Tuple<[
  Static.Const<'{'>, Expression, Static.Const<'}'>
], ArrayMapping>

// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
interface OptionalMapping extends Static.IMapping {
  output: this['input'] extends ['[', infer Expression extends Runtime.IParser, ']']
    ? Runtime.IOptional<Expression>
    : never
}
type Optional = Static.Tuple<[
  Static.Const<'['>, Expression, Static.Const<']'>
], OptionalMapping>

// ------------------------------------------------------------------
// Epsilon
// ------------------------------------------------------------------
interface EpsilonMapping extends Static.IMapping {
  output: Runtime.ITuple<[]>
}
type Epsilon = Static.Const<'e', EpsilonMapping>

// ------------------------------------------------------------------
// Terminal
// ------------------------------------------------------------------
type Terminal = Static.Union<[
  Epsilon, 
  Const, 
  Number,
  Ident,
  Ref, 
]>

// ------------------------------------------------------------------
// Elements
// ------------------------------------------------------------------
interface ElementsMapping extends Static.IMapping {
  output: this['input'] extends [infer Left extends unknown, infer Right extends unknown[]]
    ? [Left, ...Right]
    : []
}
type Elements = Static.Union<[
  Static.Tuple<[Terminal, Elements]>,
  Static.Tuple<[]>
], ElementsMapping>

// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
interface TupleMapping extends Static.IMapping {
  output: (
    this['input'] extends [infer Element extends Runtime.IParser] ? Element :
    this['input'] extends [...infer Elements extends Runtime.IParser[]] ? Runtime.ITuple<Elements> : 
    never
  )
}
type Tuple = Static.Union<[Elements], TupleMapping>

// ------------------------------------------------------------------
// ExpressionGroup
// ------------------------------------------------------------------
interface ExpressionGroupMapping extends Static.IMapping {
  output: this['input'] extends ['(', infer Expression extends Runtime.IParser, ')']
    ? Expression
    : never
}
type ExpressionGroup = Static.Tuple<[
  Static.Const<'('>, Expression, Static.Const<')'>,
], ExpressionGroupMapping>

// ------------------------------------------------------------------
// Factor
// ------------------------------------------------------------------
type Factor = Static.Union<[
  ExpressionGroup,
  Optional,
  Array,
  Tuple,
]>

// ------------------------------------------------------------------
// Variants
// ------------------------------------------------------------------
interface VariantsMapping extends Static.IMapping {
  output: (
    this['input'] extends [infer Left extends Runtime.IParser, '|', infer Rest extends unknown[]] ? [Left, ...Rest] :
    this['input'] extends [infer Left extends Runtime.IParser] ? [Left] :
    []
  )
}
type Variants = Static.Union<[
  Static.Tuple<[Factor, Static.Const<'|'>, Variants]>,
  Static.Tuple<[Factor]>,
  Static.Tuple<[]>
], VariantsMapping>

// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
interface UnionMapping extends Static.IMapping {
  output: (
    this['input'] extends [infer Variant extends Runtime.IParser] ? Variant :
    this['input'] extends [...infer Variants extends Runtime.IParser[]] ? Runtime.IUnion<Variants> :
    never
  )
}
type Union = Static.Union<[
  Variants
], UnionMapping>

// ------------------------------------------------------------------
// Expression
// ------------------------------------------------------------------
type Expression = Union

// ------------------------------------------------------------------
// Declaration
// ------------------------------------------------------------------
interface DeclarationMapping extends Static.IMapping {
  output: this['input'] extends [infer Identifier extends string, '::=', infer Expression extends Runtime.IParser]
    ? { [_ in Identifier]: Expression }
    : never
}
type Declaration = Static.Tuple<[
  Identifier,
  Static.Const<'::='>,
  Expression
], DeclarationMapping>

// ------------------------------------------------------------------
// Declarations
// ------------------------------------------------------------------
interface DeclarationsMapping extends Static.IMapping {
  output: (
    this['input'] extends [infer Declaration extends Record<PropertyKey, Runtime.IParser>, ';', infer Rest extends unknown[]] ? [Declaration, ...Rest] :
    this['input'] extends [infer Declaration extends Record<PropertyKey, Runtime.IParser>] ? [Declaration] :
    []
  ) 
}
type Declarations = Static.Union<[
  Static.Tuple<[Declaration, Static.Const<';'>, Declarations]>,
  Static.Tuple<[Declaration]>,
  Static.Tuple<[]>
], DeclarationsMapping>

// ------------------------------------------------------------------
// Ebnf
// ------------------------------------------------------------------
type EbnfEvaluate<T> = { [K in keyof T]: T[K] } & {}

type EbnfReduce<Declarations extends Record<PropertyKey, Runtime.IParser>[], Result extends Record<PropertyKey, Runtime.IParser> = {}> = (
  Declarations extends [infer Left extends Record<PropertyKey, Runtime.IParser>, ...infer Right extends Record<PropertyKey, Runtime.IParser>[]]
    ? EbnfReduce<Right, Result & Left>
    : EbnfEvaluate<Result>
)
interface EbnfMapping extends Static.IMapping {
  output: (
    this['input'] extends [...infer Declarations extends Record<PropertyKey, Runtime.IParser>[]]
      ? Runtime.Module<EbnfReduce<Declarations>>
      : never
  ) 
}
export type Ebnf = Static.Union<[Declarations], EbnfMapping>

