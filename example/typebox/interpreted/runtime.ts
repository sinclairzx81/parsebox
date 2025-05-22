/*--------------------------------------------------------------------------

@sinclair/typebox/syntax

The MIT License (MIT)

Copyright (c) 2017-2025 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

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
// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import * as T from 'npm:@sinclair/typebox'

// ------------------------------------------------------------------
// Tokens
// ------------------------------------------------------------------
const Newline = '\n'
const LBracket = '['
const RBracket = ']'
const LParen = '('
const RParen = ')'
const LBrace = '{'
const RBrace = '}'
const LAngle = '<'
const RAngle = '>'
const Question = '?'
const Colon = ':'
const Comma = ','
const SemiColon = ';'
const SingleQuote = "'"
const DoubleQuote = '"'
const Tilde = '`'
const Equals = '='

// ------------------------------------------------------------------
// DestructureRight
// ------------------------------------------------------------------
function DestructureRight<T>(values: T[]): [T[], T | undefined] {
  return (values.length > 0)
    ? [values.slice(0, values.length - 1), values[values.length - 1]]
    : [values, undefined]
}
// ------------------------------------------------------------------
// Delimit
// ------------------------------------------------------------------
const DelimitHeadMapping = (results: unknown[]) => results.reduce((result: unknown[], value) => {
  const [element, _delimiter] = value as [unknown, unknown]
  return [...result, element]
}, [] as unknown[])
const DelimitHead = <Element extends Runtime.IParser, Delimiter extends Runtime.IParser>(element: Element, delimiter: Delimiter) => (
  Runtime.Array(Runtime.Tuple([element, delimiter]), DelimitHeadMapping)
)
const DelimitTail = <Element extends Runtime.IParser>(element: Element) => Runtime.Union([
  Runtime.Tuple([element]),
  Runtime.Tuple([]),
])
const DelimitMapping = (results: [unknown[], unknown[]]) => {
  return [...results[0], ...results[1]]
}
const Delimit = <Element extends Runtime.IParser, Delimiter extends Runtime.IParser>(element: Element, delimiter: Delimiter) => Runtime.Tuple([
  DelimitHead(element, delimiter),
  DelimitTail(element),
], DelimitMapping)
// ------------------------------------------------------------------
// Dereference
// ------------------------------------------------------------------
const Dereference = (context: T.TProperties, key: string): T.TSchema => {
  return key in context ? context[key] : T.Ref(key)
}
// ------------------------------------------------------------------
// GenericArgumentsList
// ------------------------------------------------------------------
const GenericArgumentsList = Delimit(Runtime.Ident(), Runtime.Const(Comma))
// ------------------------------------------------------------------
// GenericArguments
// ------------------------------------------------------------------
const GenericArgumentsContext = (args: string[], context: T.TProperties) => {
  return args.reduce((result, arg, index) => {
    return { ...result, [arg]: T.Argument(index) }
  }, context)
}
const GenericArgumentsMapping = (results: unknown[], context: T.TProperties) => {
  return results.length === 3
    ? GenericArgumentsContext(results[1] as string[], context)
    : {}
}
const GenericArguments = Runtime.Tuple([
  Runtime.Const(LAngle),
  Runtime.Ref('GenericArgumentsList'),
  Runtime.Const(RAngle),
], (results, context) => GenericArgumentsMapping(results, context))
// ------------------------------------------------------------------
// GenericReference
// ------------------------------------------------------------------
function GenericReferenceMapping(results: unknown[], context: T.TProperties) {
  const type = Dereference(context, results[0] as string)
  const args = results[2] as T.TSchema[]
  return T.Instantiate(type, args)
}
const GenericReferenceParameters = Delimit(Runtime.Ref('Type'), Runtime.Const(Comma))
const GenericReference = Runtime.Tuple([
  Runtime.Ident(), 
  Runtime.Const(LAngle), 
  Runtime.Ref('GenericReferenceParameters'),
  Runtime.Const(RAngle)
], (results, context) => GenericReferenceMapping(results, context))
// ------------------------------------------------------------------
// Reference
// ------------------------------------------------------------------
function ReferenceMapping(result: string, context: T.TProperties) {
  const target = Dereference(context, result)
  return target
}
const Reference = Runtime.Ident((result, context) => ReferenceMapping(result, context))
// ------------------------------------------------------------------
// TemplateText
// ------------------------------------------------------------------
function TemplateTextMapping(input: string) {
  return T.Literal(input)
}
const TemplateText = Runtime.Until(['`', '${'], TemplateTextMapping)
// ------------------------------------------------------------------
// TemplateInterpolate
// ------------------------------------------------------------------
function TemplateInterpolateMapping(input: [unknown, unknown, unknown]) {
  return input[1]
}
const TemplateInterpolate = Runtime.Tuple([
  Runtime.Const('${'),
  Runtime.Ref('Type'),
  Runtime.Const('}')
], TemplateInterpolateMapping)
// ------------------------------------------------------------------
// TemplateBody
// ------------------------------------------------------------------
function TemplateBodyMapping(input: [unknown] | [unknown, unknown, unknown]) {
  return (
    input.length === 3
      ? [input[0], input[1], ...input[2] as unknown[]]
      : [input[0]]
  )
}
const TemplateBody = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('TemplateText'), Runtime.Ref('TemplateInterpolate'), Runtime.Ref('TemplateBody')]),
  Runtime.Tuple([Runtime.Ref('TemplateText')]),
], TemplateBodyMapping)
// ------------------------------------------------------------------
// TemplateLiteral
// ------------------------------------------------------------------
function TemplateLiteralMapping(input: [unknown, unknown, unknown]) {
  return T.TemplateLiteral(input[1] as T.TTemplateLiteralKind[])
}
const TemplateLiteral = Runtime.Tuple([
  Runtime.Const('`'),
  Runtime.Ref('TemplateBody'),
  Runtime.Const('`'),
], TemplateLiteralMapping)

// ------------------------------------------------------------------
// Literal
// ------------------------------------------------------------------
const Literal = Runtime.Union([
  Runtime.Union([Runtime.Const('true'), Runtime.Const('false')], value => T.Literal(value === 'true')),
  Runtime.Number(value => T.Literal(parseFloat(value))),
  Runtime.String([SingleQuote, DoubleQuote], value => T.Literal(value))
])
// ------------------------------------------------------------------
// Keyword
// ------------------------------------------------------------------
const Keyword = Runtime.Union([
  Runtime.Const('string', Runtime.As(T.String())),
  Runtime.Const('number', Runtime.As(T.Number())),
  Runtime.Const('boolean', Runtime.As(T.Boolean())),
  Runtime.Const('undefined', Runtime.As(T.Undefined())),
  Runtime.Const('null', Runtime.As(T.Null())),
  Runtime.Const('integer', Runtime.As(T.Integer())),
  Runtime.Const('bigint', Runtime.As(T.BigInt())),
  Runtime.Const('unknown', Runtime.As(T.Unknown())),
  Runtime.Const('any', Runtime.As(T.Any())),
  Runtime.Const('never', Runtime.As(T.Never())),
  Runtime.Const('symbol', Runtime.As(T.Symbol())),
  Runtime.Const('void', Runtime.As(T.Void())),
])
// ------------------------------------------------------------------
// KeyOf
// ------------------------------------------------------------------
const KeyOfMapping = (values: unknown[]) => (
  values.length > 0
)
const KeyOf = Runtime.Union([
  Runtime.Tuple([Runtime.Const('keyof')]), Runtime.Tuple([])
], KeyOfMapping)

// ------------------------------------------------------------------
// IndexArray
// ------------------------------------------------------------------
const IndexArrayMapping = (results: ([unknown, unknown, unknown] | [unknown, unknown])[]) => {
  return results.reduce((result: unknown[], current) => {
    return current.length === 3 
      ? [...result, [current[1]]] 
      : [...result, []]
  }, [] as unknown[])
}
const IndexArray = Runtime.Array(Runtime.Union([
  Runtime.Tuple([Runtime.Const(LBracket), Runtime.Ref('Type'), Runtime.Const(RBracket)]),
  Runtime.Tuple([Runtime.Const(LBracket), Runtime.Const(RBracket)]),
]), IndexArrayMapping)
// ------------------------------------------------------------------
// Extends
// ------------------------------------------------------------------
const ExtendsMapping = (values: unknown[]) => {
  return values.length === 6
    ? [values[1], values[3], values[5]]
    : []
}
const Extends = Runtime.Union([
  Runtime.Tuple([Runtime.Const('extends'), Runtime.Ref('Type'), Runtime.Const(Question), Runtime.Ref('Type'), Runtime.Const(Colon), Runtime.Ref('Type')]),
  Runtime.Tuple([])
], ExtendsMapping)
// ------------------------------------------------------------------
// Base
// ------------------------------------------------------------------
const BaseMapping = (value: unknown) => {
  return T.ValueGuard.IsArray(value) && value.length === 3 
    ? value[1] 
    : value
}
const Base = Runtime.Union([
  Runtime.Tuple([Runtime.Const(LParen), Runtime.Ref('Type'), Runtime.Const(RParen)]),
  Runtime.Ref('Keyword'),
  Runtime.Ref('Object'),
  Runtime.Ref('Tuple'),
  Runtime.Ref('Literal'),
  Runtime.Ref('TemplateLiteral'),
  Runtime.Ref('Constructor'),
  Runtime.Ref('Function'),
  Runtime.Ref('Mapped'),
  Runtime.Ref('AsyncIterator'),
  Runtime.Ref('Iterator'),
  Runtime.Ref('ConstructorParameters'),
  Runtime.Ref('FunctionParameters'),
  Runtime.Ref('InstanceType'),
  Runtime.Ref('ReturnType'),
  Runtime.Ref('Argument'),
  Runtime.Ref('Awaited'),
  Runtime.Ref('Array'),
  Runtime.Ref('Record'),
  Runtime.Ref('Promise'),
  Runtime.Ref('Partial'),
  Runtime.Ref('Required'),
  Runtime.Ref('Pick'),
  Runtime.Ref('Omit'),
  Runtime.Ref('Exclude'),
  Runtime.Ref('Extract'),
  Runtime.Ref('Uppercase'),
  Runtime.Ref('Lowercase'),
  Runtime.Ref('Capitalize'),
  Runtime.Ref('Uncapitalize'),
  Runtime.Ref('Date'),
  Runtime.Ref('Uint8Array'),
  Runtime.Ref('GenericReference'),
  Runtime.Ref('Reference')
], BaseMapping)
// ------------------------------------------------------------------
// Factor
// ------------------------------------------------------------------
const FactorExtends = (Type: T.TSchema, Extends: T.TSchema[]) => {
  return Extends.length === 3
    ? T.Extends(Type, Extends[0], Extends[1], Extends[2])
    : Type
}
const FactorIndexArray = (Type: T.TSchema, IndexArray: unknown[]): T.TSchema => {
  const [Left, Right] = DestructureRight(IndexArray) as [unknown[], T.TSchema[]]
  return (
    !T.ValueGuard.IsUndefined(Right) ? (
      // note: Indexed types require reimplementation to replace `[number]` indexers
      Right.length === 1 ? T.Index(FactorIndexArray(Type, Left), Right[0]) as never :
      Right.length === 0 ? T.Array(FactorIndexArray(Type, Left)) :
      T.Never()
    ) : Type
  ) 
}
const FactorMapping = (KeyOf: boolean, Type: T.TSchema, IndexArray: unknown[], Extends: T.TSchema[]) => {
  return KeyOf
    ? FactorExtends(T.KeyOf(FactorIndexArray(Type, IndexArray)), Extends)
    : FactorExtends(FactorIndexArray(Type, IndexArray), Extends)
}
const Factor = Runtime.Tuple([
  Runtime.Ref<boolean>('KeyOf'), 
  Runtime.Ref<T.TSchema>('Base'),
  Runtime.Ref<unknown[]>('IndexArray'),
  Runtime.Ref<T.TSchema[]>('Extends')
], results => FactorMapping(...results))
// ------------------------------------------------------------------
// Expr
// ------------------------------------------------------------------
function ExprBinaryMapping(Left: T.TSchema, Rest: unknown[]): T.TSchema {
  return (
    Rest.length === 3 ? (() => {
      const [Operator, Right, Next] = Rest as [string, T.TSchema, unknown[]]
      const Schema = ExprBinaryMapping(Right, Next)
      if (Operator === '&') {
        return T.TypeGuard.IsIntersect(Schema)
          ? T.Intersect([Left, ...Schema.allOf])
          : T.Intersect([Left, Schema])
      }
      if (Operator === '|') {
        return T.TypeGuard.IsUnion(Schema)
          ? T.Union([Left, ...Schema.anyOf])
          : T.Union([Left, Schema])
      }
      throw 1
    })() : Left
  )
}
const ExprTermTail = Runtime.Union([
  Runtime.Tuple([Runtime.Const('&'), Runtime.Ref('Factor'), Runtime.Ref('ExprTermTail')]),
  Runtime.Tuple([])
])
const ExprTerm = Runtime.Tuple([
  Runtime.Ref<T.TSchema>('Factor'), Runtime.Ref<unknown[]>('ExprTermTail')
], results => ExprBinaryMapping(...results))
const ExprTail = Runtime.Union([
  Runtime.Tuple([Runtime.Const('|'), Runtime.Ref('ExprTerm'), Runtime.Ref('ExprTail')]),
  Runtime.Tuple([])
])
const Expr = Runtime.Tuple([
  Runtime.Ref<T.TSchema>('ExprTerm'), Runtime.Ref<unknown[]>('ExprTail')
], results => ExprBinaryMapping(...results))
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
const Type = Runtime.Union([
  Runtime.Context(Runtime.Ref('GenericArguments'), Runtime.Ref('Expr')), 
  Runtime.Ref('Expr')
])
// ------------------------------------------------------------------
// Property
// ------------------------------------------------------------------
const PropertyKey = Runtime.Union([Runtime.Ident(), Runtime.String([SingleQuote, DoubleQuote])])
const Readonly = Runtime.Union([Runtime.Tuple([Runtime.Const('readonly')]), Runtime.Tuple([])], (value) => value.length > 0)
const Optional = Runtime.Union([Runtime.Tuple([Runtime.Const(Question)]), Runtime.Tuple([])], (value) => value.length > 0)
const PropertyMapping = (IsReadonly: boolean, Key: string, IsOptional: boolean, _: typeof Colon, Type: T.TSchema) => ({
  [Key]: (
    IsReadonly && IsOptional ? T.ReadonlyOptional(Type) :
    IsReadonly && !IsOptional ? T.Readonly(Type) :
    !IsReadonly && IsOptional ? T.Optional(Type) :
    Type
  )
})
const Property = Runtime.Tuple([
  Runtime.Ref<boolean>('Readonly'),
  Runtime.Ref<string>('PropertyKey'),
  Runtime.Ref<boolean>('Optional'),
  Runtime.Const(Colon),
  Runtime.Ref<T.TSchema>('Type'),
], results => PropertyMapping(...results))
// ------------------------------------------------------------------
// PropertyDelimiter
// ------------------------------------------------------------------
const PropertyDelimiter = Runtime.Union([
  Runtime.Tuple([Runtime.Const(Comma), Runtime.Const(Newline)]),
  Runtime.Tuple([Runtime.Const(SemiColon), Runtime.Const(Newline)]),
  Runtime.Tuple([Runtime.Const(Comma)]),
  Runtime.Tuple([Runtime.Const(SemiColon)]),
  Runtime.Tuple([Runtime.Const(Newline)]),
])
// ------------------------------------------------------------------
// PropertyList
// ------------------------------------------------------------------
const PropertyList = Delimit(Runtime.Ref('Property'), Runtime.Ref('PropertyDelimiter'))
// ------------------------------------------------------------------
// Object
// ------------------------------------------------------------------
const ObjectMapping = (results: unknown[]) => {
  const propertyList = results[1] as T.TProperties[]
  return T.Object(propertyList.reduce((result, property) => {
    return { ...result, ...property }
  }, {} as T.TProperties))
}
const _Object = Runtime.Tuple([
  Runtime.Const(LBrace),
  Runtime.Ref('PropertyList'),
  Runtime.Const(RBrace)
], ObjectMapping)
// ------------------------------------------------------------------
// ElementList
// ------------------------------------------------------------------
const ElementList = Delimit(Runtime.Ref('Type'), Runtime.Const(Comma))
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
const Tuple = Runtime.Tuple([
  Runtime.Const(LBracket),
  Runtime.Ref<T.TSchema[]>('ElementList'),
  Runtime.Const(RBracket)
], results => T.Tuple(results[1]))
// ------------------------------------------------------------------
// Parameters
// ------------------------------------------------------------------
const Parameter = Runtime.Tuple([
  Runtime.Ident(), Runtime.Const(Colon), Runtime.Ref<T.TSchema>('Type')
], results => results[2])
// ------------------------------------------------------------------
// ParameterList
// ------------------------------------------------------------------
const ParameterList = Delimit(Runtime.Ref('Parameter'), Runtime.Const(Comma))
// ------------------------------------------------------------------
// Constructor
// ------------------------------------------------------------------
const Constructor = Runtime.Tuple([
  Runtime.Const('new'), 
  Runtime.Const(LParen), 
  Runtime.Ref<T.TSchema[]>('ParameterList'), 
  Runtime.Const(RParen), 
  Runtime.Const('=>'), 
  Runtime.Ref<T.TSchema>('Type')
], results => T.Constructor(results[2], results[5]))
// ------------------------------------------------------------------
// Function
// ------------------------------------------------------------------
const Function = Runtime.Tuple([
  Runtime.Const(LParen), 
  Runtime.Ref<T.TSchema[]>('ParameterList'), 
  Runtime.Const(RParen), 
  Runtime.Const('=>'), 
  Runtime.Ref<T.TSchema>('Type')
], results => T.Function(results[1], results[4]))
// ------------------------------------------------------------------
// Mapped (requires deferred types)
// ------------------------------------------------------------------
const MappedMapping = (results: unknown[]) => {
  return T.Literal('Mapped types not supported')
}
const Mapped = Runtime.Tuple([
  Runtime.Const(LBrace), 
  Runtime.Const(LBracket), 
  Runtime.Ident(), 
  Runtime.Const('in'), 
  Runtime.Ref('Type'), 
  Runtime.Const(RBracket), 
  Runtime.Const(Colon), 
  Runtime.Ref('Type'), 
  Runtime.Const(RBrace)
], MappedMapping)
// ------------------------------------------------------------------
// AsyncIterator
// ------------------------------------------------------------------
const AsyncIterator = Runtime.Tuple([
  Runtime.Const('AsyncIterator'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),
], results => T.AsyncIterator(results[2]))
// ------------------------------------------------------------------
// Iterator
// ------------------------------------------------------------------
const Iterator = Runtime.Tuple([
  Runtime.Const('Iterator'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),
], results => T.Iterator(results[2]))
// ------------------------------------------------------------------
// ConstructorParameters
// ------------------------------------------------------------------
const ConstructorParameters = Runtime.Tuple([
  Runtime.Const('ConstructorParameters'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TConstructor>('Type'), 
  Runtime.Const(RAngle),
], results => T.ConstructorParameters(results[2]))
// ------------------------------------------------------------------
// Parameters
// ------------------------------------------------------------------
const FunctionParameters = Runtime.Tuple([
  Runtime.Const('Parameters'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TFunction>('Type'), 
  Runtime.Const(RAngle),
], results => T.Parameters(results[2]))
// ------------------------------------------------------------------
// InstanceType
// ------------------------------------------------------------------
const InstanceType = Runtime.Tuple([
  Runtime.Const('InstanceType'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TConstructor>('Type'), 
  Runtime.Const(RAngle),
], results => T.InstanceType(results[2]))
// ------------------------------------------------------------------
// ReturnType
// ------------------------------------------------------------------
const ReturnType = Runtime.Tuple([
  Runtime.Const('ReturnType'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TFunction>('Type'), 
  Runtime.Const(RAngle),
], results => T.ReturnType(results[2]))
// ------------------------------------------------------------------
// Argument
// ------------------------------------------------------------------
const Argument = Runtime.Tuple([
  Runtime.Const('Argument'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),
], results => {
  return T.KindGuard.IsLiteralNumber(results[2])
    ? T.Argument(Math.trunc(results[2].const))
    : T.Never()
})
// ------------------------------------------------------------------
// Awaited
// ------------------------------------------------------------------
const Awaited = Runtime.Tuple([
  Runtime.Const('Awaited'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),
], results => T.Awaited(results[2]))
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
const Array = Runtime.Tuple([
  Runtime.Const('Array'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),
], results => T.Array(results[2]))
// ------------------------------------------------------------------
// Record
// ------------------------------------------------------------------
const Record = Runtime.Tuple([
  Runtime.Const('Record'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'),
  Runtime.Const(Comma), 
  Runtime.Ref<T.TSchema>('Type'),
  Runtime.Const(RAngle),  
], results => T.Record(results[2], results[4]))
// ------------------------------------------------------------------
// Promise
// ------------------------------------------------------------------
const Promise = Runtime.Tuple([
  Runtime.Const('Promise'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Promise(results[2]))
// ------------------------------------------------------------------
// Partial
// ------------------------------------------------------------------
const Partial = Runtime.Tuple([
  Runtime.Const('Partial'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Partial(results[2]))
// ------------------------------------------------------------------
// Required
// ------------------------------------------------------------------
const Required = Runtime.Tuple([
  Runtime.Const('Required'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Required(results[2]))
// ------------------------------------------------------------------
// Pick
// ------------------------------------------------------------------
const Pick = Runtime.Tuple([
  Runtime.Const('Pick'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(Comma), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Pick(results[2], results[4]))
// ------------------------------------------------------------------
// Omit
// ------------------------------------------------------------------
const Omit = Runtime.Tuple([
  Runtime.Const('Omit'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(Comma), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Omit(results[2], results[4]))
// ------------------------------------------------------------------
// Exclude
// ------------------------------------------------------------------
const Exclude = Runtime.Tuple([
  Runtime.Const('Exclude'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(Comma), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Exclude(results[2], results[4]))
// ------------------------------------------------------------------
// Extract
// ------------------------------------------------------------------
const Extract = Runtime.Tuple([
  Runtime.Const('Extract'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(Comma), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Extract(results[2], results[4]))
// ------------------------------------------------------------------
// Uppercase
// ------------------------------------------------------------------
const Uppercase = Runtime.Tuple([
  Runtime.Const('Uppercase'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Uppercase(results[2]))
// ------------------------------------------------------------------
// Lowercase
// ------------------------------------------------------------------
const Lowercase = Runtime.Tuple([
  Runtime.Const('Lowercase'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Lowercase(results[2]))
// ------------------------------------------------------------------
// Capitalize
// ------------------------------------------------------------------
const Capitalize = Runtime.Tuple([
  Runtime.Const('Capitalize'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Capitalize(results[2]))
// ------------------------------------------------------------------
// Uncapitalize
// ------------------------------------------------------------------
const Uncapitalize = Runtime.Tuple([
  Runtime.Const('Uncapitalize'), 
  Runtime.Const(LAngle), 
  Runtime.Ref<T.TSchema>('Type'), 
  Runtime.Const(RAngle),  
], results => T.Uncapitalize(results[2]))
// ------------------------------------------------------------------
// Date
// ------------------------------------------------------------------
const Date = Runtime.Const('Date', Runtime.As(T.Date()))
// ------------------------------------------------------------------
// Uint8Array
// ------------------------------------------------------------------
const Uint8Array = Runtime.Const('Uint8Array', Runtime.As(T.Uint8Array()))

// ------------------------------------------------------------------
// Module
// ------------------------------------------------------------------
export const Module = new Runtime.Module({
  GenericArgumentsList,
  GenericArguments,
  TemplateInterpolate,
  TemplateBody,
  TemplateText,
  TemplateLiteral,
  Literal,
  Keyword,
  KeyOf,
  IndexArray,
  Extends,
  Base,
  Factor,
  ExprTermTail,
  ExprTerm,
  ExprTail,
  Expr,
  Type,
  PropertyKey,
  Readonly,
  Optional,
  Property,
  PropertyDelimiter,
  PropertyList,
  Object: _Object,
  ElementList,
  Tuple,
  Parameter,
  ParameterList,
  Function,
  Constructor,
  Mapped,
  AsyncIterator,
  Iterator,
  Argument,
  Awaited,
  Array,
  Record,
  Promise,
  ConstructorParameters,
  FunctionParameters,
  InstanceType,
  ReturnType,
  Partial,
  Required,
  Pick,
  Omit,
  Exclude,
  Extract,
  Uppercase,
  Lowercase,
  Capitalize,
  Uncapitalize,
  Date,
  Uint8Array,
  GenericReferenceParameters,
  GenericReference,
  Reference,
})
