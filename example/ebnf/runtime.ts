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

// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'

// ------------------------------------------------------------------
// Identifier
// ------------------------------------------------------------------
const Identifier = Runtime.Ident()

// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
const RefMapping = (value: string) => Runtime.Ref(value)

const Ref = Runtime.Ident(RefMapping)

// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
const ConstMapping = (value: string) => Runtime.Const(value)

const Const = Runtime.String(['"'], ConstMapping)

// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
const IdentMapping = (value: string) => Runtime.Ident()

const Ident = Runtime.Const('Ident', IdentMapping)

// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
const NumberMapping = (value: string) => Runtime.Number()

const Number = Runtime.Const('Number', NumberMapping)

// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
const ArrayMapping = (_0: '{', Expression: Runtime.IParser, R: '}') => {
  return Runtime.Array(Expression)
}
const Array = Runtime.Tuple([
  Runtime.Const('{'), Runtime.Ref<Runtime.IParser>('Expression'), Runtime.Const('}')
], values => ArrayMapping(...values))

// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
const OptionalMapping = (L: "[", Expression: Runtime.IParser, R: "]") => {
  return Runtime.Optional(Expression)
}

const Optional = Runtime.Tuple([
  Runtime.Const('['), Runtime.Ref<Runtime.IParser>('Expression'), Runtime.Const(']')
], values => OptionalMapping(...values))

// ------------------------------------------------------------------
// Epsilon
// ------------------------------------------------------------------
const EpsilonMapping = (_e: 'e') => Runtime.Tuple([])

const Epsilon = Runtime.Const('e', EpsilonMapping)

// ------------------------------------------------------------------
// Terminal
// ------------------------------------------------------------------
const Terminal = Runtime.Union([
  Runtime.Ref('Epsilon'), 
  Runtime.Ref('Const'), 
  Runtime.Ref('Number'),
  Runtime.Ref('Ident'),
  Runtime.Ref('Ref') 
])

// ------------------------------------------------------------------
// Elements
// ------------------------------------------------------------------
const ElementsMapping = (values: unknown[]) => {
  return values.length === 2 
    ? [values[0], ...values[1] as unknown[]]
    : []
}
const Elements = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('Terminal'), Runtime.Ref('Elements')]),
  Runtime.Tuple([])
], values => ElementsMapping(values))

// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
const TupleMapping = (values: Runtime.IParser[]) => {
  return values.length === 1 ? values[0] : Runtime.Tuple(values)
}
const Tuple = Runtime.Union([
  Runtime.Ref<Runtime.IParser[]>('Elements')
], values => TupleMapping(values))

// ------------------------------------------------------------------
// ExpressionGroup
// ------------------------------------------------------------------
const ExpressionGroupMapping = (L: '(', Expression: Runtime.IParser, R: ')') => {
  return Expression
}
const ExpressionGroup = Runtime.Tuple([
  Runtime.Const('('), Runtime.Ref<Runtime.IParser>('Expression'), Runtime.Const(')')
], values => ExpressionGroupMapping(...values))

// ------------------------------------------------------------------
// Factor
// ------------------------------------------------------------------
const Factor = Runtime.Union([
  Runtime.Ref('ExpressionGroup'),
  Runtime.Ref('Optional'),
  Runtime.Ref('Array'),
  Runtime.Ref('Tuple')
])

// ------------------------------------------------------------------
// Variants
// ------------------------------------------------------------------
const VariantsMapping = (values: unknown[]) => {
  return (
    values.length === 3 ? [values[0], ...values[2] as unknown[]] :
    values.length === 1 ? [values[0]] :
    []
  )
}
const Variants = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('Factor'), Runtime.Const('|'), Runtime.Ref('Variants')]),
  Runtime.Tuple([Runtime.Ref('Factor')]),
  Runtime.Tuple([])
], values => VariantsMapping(values))

// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
const UnionMapping = (values: Runtime.IParser[]) => {
  return values.length === 1 ? values[0] : Runtime.Union(values)
}
const Union = Runtime.Union([
  Runtime.Ref('Variants')
], UnionMapping)

// ------------------------------------------------------------------
// Expression
// ------------------------------------------------------------------
const Expression = Runtime.Ref('Union')

// ------------------------------------------------------------------
// Declaration
// ------------------------------------------------------------------
const DeclarationMapping = (Identifier: string, M: '::=', Expression: Runtime.IParser) => {
  return { [Identifier]: Expression }
}
const Declaration = Runtime.Tuple([
  Runtime.Ref<string>('Identifier'),
  Runtime.Const('::='),
  Runtime.Ref<Runtime.IParser>('Expression')
], values => DeclarationMapping(...values))

// ------------------------------------------------------------------
// Declarations
// ------------------------------------------------------------------
const DeclarationsMapping = (values: unknown[]) => {
  return (
    values.length === 3 ? [values[0], ...values[2] as unknown[]] :
    values.length === 1 ? [values[0]] :
    []
  )
}
const Declarations = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('Declaration'), Runtime.Const(';'), Runtime.Ref('Declarations')]),
  Runtime.Tuple([Runtime.Ref('Declaration')]),
  Runtime.Tuple([]),
], values => DeclarationsMapping(values))

// ------------------------------------------------------------------
// Ebnf
// ------------------------------------------------------------------
const EbnfReduce = (declarations: Record<PropertyKey, Runtime.IParser>[]) => {
  return declarations.reduce((result, declaration) => {
    return { ...result, ...declaration }
  }, {})
}
const EbnfMapping = (declarations: Record<PropertyKey, Runtime.IParser>[]) => {
  return new Runtime.Module(EbnfReduce(declarations))
}
const Ebnf = Runtime.Union([
  Runtime.Ref<Record<PropertyKey, Runtime.IParser>[]>('Declarations')
], values => EbnfMapping(values))

// ------------------------------------------------------------------
// Module
// ------------------------------------------------------------------
export const Module = new Runtime.Module({
  Identifier,
  Ref,
  Const,
  Ident,
  Number,
  Array,
  Optional,
  Epsilon,
  Terminal,
  Elements,
  Tuple,
  ExpressionGroup,
  Factor,
  Variants,
  Union,
  Expression,
  Declaration,
  Declarations,
  Ebnf
})

