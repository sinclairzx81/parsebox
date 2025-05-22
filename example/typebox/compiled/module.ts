/*--------------------------------------------------------------------------

TypeBox

The MIT License (MIT)

Copyright (c) 2017-2025 Haydn Paterson (sinclair) 

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
const Hyphen = '-'
const Plus = '+'
const Colon = ':'
const Comma = ','
const SemiColon = ';'
const SingleQuote = "'"
const DoubleQuote = '"'
const Tilde = '`'
const Equals = '='

// ------------------------------------------------------------------
// Delimit: Generic Parser. Instanced for Sequences
// ------------------------------------------------------------------
const DelimitHead = <Element extends Runtime.IParser, Delimiter extends Runtime.IParser>(element: Element, delimiter: Delimiter) => 
  Runtime.Array(Runtime.Tuple([element, delimiter]))
const DelimitTail = <Element extends Runtime.IParser>(element: Element) => 
  Runtime.Union([Runtime.Tuple([element]), Runtime.Tuple([])])
const Delimit = <Element extends Runtime.IParser, Delimiter extends Runtime.IParser>(element: Element, delimiter: Delimiter) => 
  Runtime.Tuple([DelimitHead(element, delimiter), DelimitTail(element)])

// ------------------------------------------------------------------
// GenericArgumentExtendsEquals
// ------------------------------------------------------------------
const GenericArgumentExtendsEquals = Runtime.Tuple([
  Runtime.Ident(),
  Runtime.Const('extends'),
  Runtime.Ref('Type'),
  Runtime.Const(Equals),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// GenericArgumentExtends
// ------------------------------------------------------------------
const GenericArgumentExtends = Runtime.Tuple([
  Runtime.Ident(),
  Runtime.Const('extends'),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// GenericArgumentEquals
// ------------------------------------------------------------------
const GenericArgumentEquals = Runtime.Tuple([
  Runtime.Ident(),
  Runtime.Const(Equals),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// GenericArgumentType
// ------------------------------------------------------------------
const GenericArgumentType = Runtime.Ident()
// ------------------------------------------------------------------
// GenericArgument
// ------------------------------------------------------------------
const GenericArgument = Runtime.Union([
  Runtime.Ref('GenericArgumentExtendsEquals'),
  Runtime.Ref('GenericArgumentExtends'),
  Runtime.Ref('GenericArgumentEquals'),
  Runtime.Ref('GenericArgumentType')
])
// ------------------------------------------------------------------
// GenericArgumentList
// ------------------------------------------------------------------
const GenericArgumentList = Delimit(
  Runtime.Ref('GenericArgument'), 
  Runtime.Const(Comma)
)
// ------------------------------------------------------------------
// GenericArguments
// ------------------------------------------------------------------
const GenericArguments = Runtime.Tuple([
  Runtime.Const(LAngle),
  Runtime.Ref('GenericArgumentList'),
  Runtime.Const(RAngle),
  Runtime.Const(Equals)
])
// ------------------------------------------------------------------
// GenericReferenceParameterList
// ------------------------------------------------------------------
const GenericReferenceParameterList = Delimit(
  Runtime.Ref('Type'), 
  Runtime.Const(Comma)
)
// ------------------------------------------------------------------
// GenericReference
// ------------------------------------------------------------------
const GenericReference = Runtime.Tuple([
  Runtime.Ident(), 
  Runtime.Const(LAngle), 
  Runtime.Ref('GenericReferenceParameterList'),
  Runtime.Const(RAngle)
])
// ------------------------------------------------------------------
// Reference
// ------------------------------------------------------------------
const Reference = Runtime.Ident()
// ------------------------------------------------------------------
// TemplateSpan
// ------------------------------------------------------------------
const TemplateSpan = Runtime.Until(['`', '${'])
// ------------------------------------------------------------------
// TemplateInterpolate
// ------------------------------------------------------------------
const TemplateInterpolate = Runtime.Tuple([
  Runtime.Const('${'),
  Runtime.Ref('Type'),
  Runtime.Const('}')
])
// ------------------------------------------------------------------
// TemplateBody
// ------------------------------------------------------------------
const TemplateBody = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('TemplateSpan'), Runtime.Ref('TemplateInterpolate'), Runtime.Ref('TemplateBody')]),
  Runtime.Tuple([Runtime.Ref('TemplateSpan')]),
])
// ------------------------------------------------------------------
// TemplateLiteral
// ------------------------------------------------------------------
const TemplateLiteral = Runtime.Tuple([
  Runtime.Const('`'),
  Runtime.Ref('TemplateBody'),
  Runtime.Const('`'),
])
// ------------------------------------------------------------------
// Literal
// ------------------------------------------------------------------
const LiteralString = Runtime.String([SingleQuote, DoubleQuote])
const LiteralNumber = Runtime.Number()
const LiteralBoolean = Runtime.Union([Runtime.Const('true'), Runtime.Const('false')])
const Literal = Runtime.Union([
  Runtime.Ref('LiteralBoolean'),
  Runtime.Ref('LiteralNumber'),
  Runtime.Ref('LiteralString'),
])
// ------------------------------------------------------------------
// Keyword
// ------------------------------------------------------------------
const KeywordString = Runtime.Const('string')
const KeywordNumber = Runtime.Const('number')
const KeywordBoolean = Runtime.Const('boolean')
const KeywordUndefined = Runtime.Const('undefined')
const KeywordNull = Runtime.Const('null')
const KeywordInteger = Runtime.Const('integer')
const KeywordBigInt = Runtime.Const('bigint')
const KeywordUnknown = Runtime.Const('unknown')
const KeywordAny = Runtime.Const('any')
const KeywordObject = Runtime.Const('object')
const KeywordNever = Runtime.Const('never')
const KeywordSymbol = Runtime.Const('symbol')
const KeywordVoid = Runtime.Const('void')
const KeywordThis = Runtime.Const('this')
const Keyword = Runtime.Union([
  Runtime.Ref('KeywordString'),
  Runtime.Ref('KeywordNumber'),
  Runtime.Ref('KeywordBoolean'),
  Runtime.Ref('KeywordUndefined'),
  Runtime.Ref('KeywordNull'),
  Runtime.Ref('KeywordInteger'),
  Runtime.Ref('KeywordBigInt'),
  Runtime.Ref('KeywordUnknown'),
  Runtime.Ref('KeywordAny'),
  Runtime.Ref('KeywordObject'),
  Runtime.Ref('KeywordNever'),
  Runtime.Ref('KeywordSymbol'),
  Runtime.Ref('KeywordVoid'),
  Runtime.Ref('KeywordThis')
])
// ------------------------------------------------------------------
// KeyOf
// ------------------------------------------------------------------
const KeyOf = Runtime.Union([
  Runtime.Tuple([Runtime.Const('keyof')]), 
  Runtime.Tuple([])
])
// ------------------------------------------------------------------
// IndexArray
// ------------------------------------------------------------------
const IndexArray = Runtime.Array(Runtime.Union([
  Runtime.Tuple([Runtime.Const(LBracket), Runtime.Ref('Type'), Runtime.Const(RBracket)]),
  Runtime.Tuple([Runtime.Const(LBracket), Runtime.Const(RBracket)]),
]))
// ------------------------------------------------------------------
// Extends
// ------------------------------------------------------------------
const Extends = Runtime.Union([
  Runtime.Tuple([
    Runtime.Const('extends'), 
    Runtime.Ref('Type'), 
    Runtime.Const(Question), 
    Runtime.Ref('Type'), 
    Runtime.Const(Colon), 
    Runtime.Ref('Type')
  ]),
  Runtime.Tuple([])
])
// ------------------------------------------------------------------
// Base
// ------------------------------------------------------------------
const Base = Runtime.Union([
  Runtime.Tuple([Runtime.Const(LParen), Runtime.Ref('Type'), Runtime.Const(RParen)]),
  Runtime.Ref('Keyword'),
  Runtime.Ref('Object'),
  Runtime.Ref('Tuple'),
  Runtime.Ref('TemplateLiteral'),
  Runtime.Ref('Literal'),
  Runtime.Ref('Constructor'),
  Runtime.Ref('Function'),
  Runtime.Ref('Mapped'),
  Runtime.Ref('Options'),
  Runtime.Ref('GenericReference'),
  Runtime.Ref('Reference')
])
// ------------------------------------------------------------------
// Factor
// ------------------------------------------------------------------
const Factor = Runtime.Tuple([
  Runtime.Ref('KeyOf'), 
  Runtime.Ref('Base'),
  Runtime.Ref('IndexArray'),
  Runtime.Ref('Extends')
])
// ------------------------------------------------------------------
// Expr
// ------------------------------------------------------------------
const ExprTermTail = Runtime.Union([
  Runtime.Tuple([Runtime.Const('&'), Runtime.Ref('Factor'), Runtime.Ref('ExprTermTail')]),
  Runtime.Tuple([])
])
const ExprTerm = Runtime.Tuple([
  Runtime.Ref('Factor'), 
  Runtime.Ref('ExprTermTail')
])
const ExprTail = Runtime.Union([
  Runtime.Tuple([Runtime.Const('|'), Runtime.Ref('ExprTerm'), Runtime.Ref('ExprTail')]),
  Runtime.Tuple([])
])
const Expr = Runtime.Tuple([
  Runtime.Ref('ExprTerm'), 
  Runtime.Ref('ExprTail')
])

// ------------------------------------------------------------------
// InferType
// ------------------------------------------------------------------
const InferType = Runtime.Union([
  Runtime.Tuple([Runtime.Const('infer'), Runtime.Ident(), Runtime.Const('extends'), Runtime.Ref('Expr')]),
  Runtime.Tuple([Runtime.Const('infer'), Runtime.Ident()]),
])   
// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
const Type = Runtime.Union([
  Runtime.Ref('InferType'),
  Runtime.Ref('Expr')
])
// ------------------------------------------------------------------
// GenericType
// ------------------------------------------------------------------
const GenericType = Runtime.Tuple([
  Runtime.Ref('GenericArguments'), 
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// PropertyKeyNumber
// ------------------------------------------------------------------
const PropertyKeyNumber = Runtime.Number()
// ------------------------------------------------------------------
// PropertyKeyIdent
// ------------------------------------------------------------------
const PropertyKeyIdent = Runtime.Ident()
// ------------------------------------------------------------------
// PropertyKeyQuoted
// ------------------------------------------------------------------
const PropertyKeyQuoted = Runtime.String([SingleQuote, DoubleQuote])
// ------------------------------------------------------------------
// PropertyKey
// ------------------------------------------------------------------
const PropertyKey = Runtime.Union([
  Runtime.Ref('PropertyKeyNumber'),
  Runtime.Ref('PropertyKeyIdent'),
  Runtime.Ref('PropertyKeyQuoted'),
])
// ------------------------------------------------------------------
// Readonly
// ------------------------------------------------------------------
const Readonly = Runtime.Union([Runtime.Tuple([Runtime.Const('readonly')]), Runtime.Tuple([])], (value) => value.length > 0)
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
const Optional = Runtime.Union([Runtime.Tuple([Runtime.Const(Question)]), Runtime.Tuple([])], (value) => value.length > 0)
// ------------------------------------------------------------------
// Property
// ------------------------------------------------------------------
const Property = Runtime.Tuple([
  Runtime.Ref('Readonly'),
  Runtime.Ref('PropertyKey'),
  Runtime.Ref('Optional'),
  Runtime.Const(Colon),
  Runtime.Ref('Type'),
])
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
const PropertyList = Delimit(
  Runtime.Ref('Property'), 
  Runtime.Ref('PropertyDelimiter')
)
// ------------------------------------------------------------------
// Object
// ------------------------------------------------------------------
const _Object = Runtime.Tuple([
  Runtime.Const(LBrace),
  Runtime.Ref('PropertyList'),
  Runtime.Const(RBrace)
])
// ------------------------------------------------------------------
// ElementNamed
// ------------------------------------------------------------------
const ElementNamed = Runtime.Union([
  Runtime.Tuple([Runtime.Ident(), Runtime.Const(Question), Runtime.Const(Colon), Runtime.Ref('Type')]),
  Runtime.Tuple([Runtime.Ident(), Runtime.Const(Colon), Runtime.Ref('Type')]),
])
// ------------------------------------------------------------------
// ElementReadonlyOptional
// ------------------------------------------------------------------
const ElementReadonlyOptional = Runtime.Tuple([
  Runtime.Const('readonly'),
  Runtime.Ref('Type'),
  Runtime.Const(Question)
])
// ------------------------------------------------------------------
// ElementReadonly
// ------------------------------------------------------------------
const ElementReadonly = Runtime.Tuple([
  Runtime.Const('readonly'),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// ElementOptional
// ------------------------------------------------------------------
const ElementOptional = Runtime.Tuple([
  Runtime.Ref('Type'),
  Runtime.Const(Question)
])
// ------------------------------------------------------------------
// ElementBase
// ------------------------------------------------------------------
const ElementBase = Runtime.Union([
  Runtime.Ref('ElementNamed'),
  Runtime.Ref('ElementReadonlyOptional'),
  Runtime.Ref('ElementReadonly'),
  Runtime.Ref('ElementOptional'),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// Element
// ------------------------------------------------------------------
const Element = Runtime.Union([
  Runtime.Tuple([Runtime.Const('...'), Runtime.Ref('ElementBase')]),
  Runtime.Tuple([Runtime.Ref('ElementBase')])
])
// ------------------------------------------------------------------
// ElementList
// ------------------------------------------------------------------
const ElementList = Delimit(
  Runtime.Ref('Element'), 
  Runtime.Const(Comma)
)
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
const Tuple = Runtime.Tuple([
  Runtime.Const(LBracket),
  Runtime.Ref('ElementList'),
  Runtime.Const(RBracket)
])
// ------------------------------------------------------------------
// ParameterReadonlyOptional
// ------------------------------------------------------------------
const ParameterReadonlyOptional = Runtime.Tuple([
  Runtime.Ident(),
  Runtime.Const(Question),
  Runtime.Const(Colon),
  Runtime.Const('readonly'),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// ParameterReadonly
// ------------------------------------------------------------------
const ParameterReadonly = Runtime.Tuple([
  Runtime.Ident(),
  Runtime.Const(Colon),
  Runtime.Const('readonly'),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// ParameterOptional
// ------------------------------------------------------------------
const ParameterOptional = Runtime.Tuple([
  Runtime.Ident(),
  Runtime.Const(Question),
  Runtime.Const(Colon),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// ParameterType
// ------------------------------------------------------------------
const ParameterType = Runtime.Tuple([
  Runtime.Ident(),
  Runtime.Const(Colon),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// ParameterType
// ------------------------------------------------------------------
const ParameterBase = Runtime.Union([
  Runtime.Ref('ParameterReadonlyOptional'),
  Runtime.Ref('ParameterReadonly'),
  Runtime.Ref('ParameterOptional'),
  Runtime.Ref('ParameterType'),
])
// ------------------------------------------------------------------
// Parameter
// ------------------------------------------------------------------
const Parameter = Runtime.Union([
  Runtime.Tuple([Runtime.Const('...'), Runtime.Ref('ParameterBase')]),
  Runtime.Tuple([Runtime.Ref('ParameterBase')]),
])
// ------------------------------------------------------------------
// ParameterList
// ------------------------------------------------------------------
const ParameterList = Delimit(
  Runtime.Ref('Parameter'), 
  Runtime.Const(Comma)
)
// ------------------------------------------------------------------
// Constructor
// ------------------------------------------------------------------
const Constructor = Runtime.Tuple([
  Runtime.Const('new'), 
  Runtime.Const(LParen), 
  Runtime.Ref('ParameterList'), 
  Runtime.Const(RParen), 
  Runtime.Const('=>'), 
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// Function
// ------------------------------------------------------------------
const Function = Runtime.Tuple([
  Runtime.Const(LParen), 
  Runtime.Ref('ParameterList'), 
  Runtime.Const(RParen), 
  Runtime.Const('=>'), 
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// MappedReadonly
// ------------------------------------------------------------------
const MappedReadonly = Runtime.Union([
  Runtime.Tuple([Runtime.Const(Plus), Runtime.Const('readonly')]),
  Runtime.Tuple([Runtime.Const(Hyphen), Runtime.Const('readonly')]),
  Runtime.Tuple([Runtime.Const('readonly')]),
  Runtime.Tuple([]),
])
// ------------------------------------------------------------------
// MappedOptional
// ------------------------------------------------------------------
const MappedOptional = Runtime.Union([
  Runtime.Tuple([Runtime.Const(Plus), Runtime.Const(Question)]),
  Runtime.Tuple([Runtime.Const(Hyphen), Runtime.Const(Question)]),
  Runtime.Tuple([Runtime.Const(Question)]),
  Runtime.Tuple([]),
])
// ------------------------------------------------------------------
// MappedAs
// ------------------------------------------------------------------
const MappedAs = Runtime.Union([
  Runtime.Tuple([Runtime.Const('as'), Runtime.Ref('Type')]),
  Runtime.Tuple([]),
])
// ------------------------------------------------------------------
// Mapped
// ------------------------------------------------------------------
const Mapped = Runtime.Tuple([
  Runtime.Const(LBrace),
  Runtime.Ref('MappedReadonly'),
  Runtime.Const(LBracket), 
  Runtime.Ident(),
  Runtime.Const('in'), 
  Runtime.Ref('Type'),
  Runtime.Ref('MappedAs'),
  Runtime.Const(RBracket),
  Runtime.Ref('MappedOptional'),
  Runtime.Const(Colon), 
  Runtime.Ref('Type'), 
  Runtime.Const(RBrace)
])
// ------------------------------------------------------------------
// Options
// ------------------------------------------------------------------
const Options = Runtime.Tuple([
  Runtime.Const('Options'),
  Runtime.Const(LAngle),
  Runtime.Ref('Type'),
  Runtime.Const(Comma),
  Runtime.Ref('JsonObject'),
  Runtime.Const(RAngle),
])
// ------------------------------------------------------------------
// JsonNumber
// ------------------------------------------------------------------
const JsonNumber = Runtime.Number()
// ------------------------------------------------------------------
// JsonString
// ------------------------------------------------------------------
const JsonString = Runtime.String(['"', "'"])
// ------------------------------------------------------------------
// JsonBoolean
// ------------------------------------------------------------------
const JsonBoolean = Runtime.Union([
  Runtime.Const('true'),
  Runtime.Const('false'),
])
// ------------------------------------------------------------------
// JsonNull
// ------------------------------------------------------------------
const JsonNull = Runtime.Const('null')
// ------------------------------------------------------------------
// JsonProperty
// ------------------------------------------------------------------
const JsonProperty = Runtime.Tuple([
  Runtime.Ref('PropertyKey'), 
  Runtime.Const(':'), 
  Runtime.Ref('Json')
])
// ------------------------------------------------------------------
// JsonPropertyList
// ------------------------------------------------------------------
const JsonPropertyList = Delimit(
  Runtime.Ref('JsonProperty'), 
  Runtime.Ref('PropertyDelimiter')
)
// ------------------------------------------------------------------
// JsonObject
// ------------------------------------------------------------------
const JsonObject = Runtime.Tuple([
  Runtime.Const(LBrace),
  Runtime.Ref('JsonPropertyList'),
  Runtime.Const(RBrace)
])
// ------------------------------------------------------------------
// JsonElementList
// ------------------------------------------------------------------
const JsonElementList = Delimit(
  Runtime.Ref('Json'), 
  Runtime.Const(Comma)
)
// ------------------------------------------------------------------
// JsonArray
// ------------------------------------------------------------------
const JsonArray = Runtime.Tuple([
  Runtime.Const(LBracket), 
  Runtime.Ref('JsonElementList'), 
  Runtime.Const(RBracket)
])
// ------------------------------------------------------------------
// Json
// ------------------------------------------------------------------
const Json = Runtime.Union([
  Runtime.Ref('JsonNumber'),
  Runtime.Ref('JsonBoolean'),
  Runtime.Ref('JsonString'),
  Runtime.Ref('JsonNull'),
  Runtime.Ref('JsonObject'),
  Runtime.Ref('JsonArray')
])
// ------------------------------------------------------------------
// Script
// ------------------------------------------------------------------
const Script = Runtime.Union([
  Runtime.Ref('GenericType'),
  Runtime.Ref('Type')
])
// ------------------------------------------------------------------
// Grammar
// ------------------------------------------------------------------
export const Grammar = new Runtime.Module({
  GenericReferenceParameterList,
  GenericReference,
  GenericArgumentExtendsEquals,
  GenericArgumentExtends,
  GenericArgumentEquals,
  GenericArgumentType,
  GenericArgument,
  GenericArgumentList,
  GenericArguments,
  KeywordString,
  KeywordNumber,
  KeywordBoolean,
  KeywordUndefined,
  KeywordNull,
  KeywordInteger,
  KeywordBigInt,
  KeywordUnknown,
  KeywordAny,
  KeywordObject,
  KeywordNever,
  KeywordSymbol,
  KeywordVoid,
  KeywordThis,
  Keyword,
  TemplateInterpolate,
  TemplateSpan,
  TemplateBody,
  TemplateLiteral,
  LiteralString,
  LiteralNumber,
  LiteralBoolean,
  Literal,
  KeyOf,
  IndexArray,
  Extends,
  Base,
  Factor,
  ExprTermTail,
  ExprTerm,
  ExprTail,
  Expr,
  GenericType,
  InferType,
  Type,
  PropertyKeyNumber,
  PropertyKeyIdent,
  PropertyKeyQuoted,
  PropertyKey,
  Readonly,
  Optional,
  Property,
  PropertyDelimiter,
  PropertyList,
  Object: _Object,
  ElementNamed,
  ElementReadonlyOptional,
  ElementReadonly,
  ElementOptional,
  ElementBase,
  Element,
  ElementList,
  Tuple,
  ParameterReadonlyOptional,
  ParameterReadonly,
  ParameterOptional,
  ParameterType,
  ParameterBase,
  Parameter,
  ParameterList,
  Function,
  Constructor,
  MappedReadonly,
  MappedOptional,
  MappedAs,
  Mapped,
  Reference,
  // Json,
  Options,
  JsonNumber,
  JsonBoolean,
  JsonString,
  JsonNull,
  JsonProperty,
  JsonPropertyList,
  JsonObject,
  JsonElementList,
  JsonArray,
  Json,
  // Script
  Script
})