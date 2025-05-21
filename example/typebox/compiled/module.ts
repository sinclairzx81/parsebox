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

// deno-lint-ignore-file

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
// GenericArgumentsList
// ------------------------------------------------------------------
const GenericArgumentsList = Delimit(
  Runtime.Ident(), 
  Runtime.Const(Comma)
)
// ------------------------------------------------------------------
// GenericArguments
// ------------------------------------------------------------------
const GenericArguments = Runtime.Tuple([
  Runtime.Const(LAngle),
  Runtime.Ref('GenericArgumentsList'),
  Runtime.Const(RAngle),
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
// TemplateText
// ------------------------------------------------------------------
const TemplateText = Runtime.Union([
  Runtime.Until('${'),
  Runtime.Until('`'),
])
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
  Runtime.Tuple([Runtime.Ref('TemplateText'), Runtime.Ref('TemplateInterpolate'), Runtime.Ref('TemplateBody')]),
  Runtime.Tuple([Runtime.Ref('TemplateText')]),
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
const KeywordNever = Runtime.Const('never')
const KeywordSymbol = Runtime.Const('symbol')
const KeywordVoid = Runtime.Const('void')
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
  Runtime.Ref('KeywordNever'),
  Runtime.Ref('KeywordSymbol'),
  Runtime.Ref('KeywordVoid')
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
// Type
// ------------------------------------------------------------------
const Type = Runtime.Union([
  Runtime.Context(Runtime.Ref('GenericArguments'), Runtime.Ref('Expr')), 
  Runtime.Ref('Expr')
])
// ------------------------------------------------------------------
// PropertyKey
// ------------------------------------------------------------------
const PropertyKey = Runtime.Union([Runtime.Ident(), Runtime.String([SingleQuote, DoubleQuote])])
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
// ElementList
// ------------------------------------------------------------------
const ElementList = Delimit(
  Runtime.Ref('Type'), 
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
// Parameters
// ------------------------------------------------------------------
const Parameter = Runtime.Tuple([
  Runtime.Ident(), 
  Runtime.Const(Colon), 
  Runtime.Ref('Type')
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
// Mapped (requires deferred types)
// ------------------------------------------------------------------
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
])

// ------------------------------------------------------------------
// AsyncIterator
// ------------------------------------------------------------------
const AsyncIterator = Runtime.Tuple([
  Runtime.Const('AsyncIterator'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),
])

// ------------------------------------------------------------------
// Iterator
// ------------------------------------------------------------------
const Iterator = Runtime.Tuple([
  Runtime.Const('Iterator'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),
])

// ------------------------------------------------------------------
// ConstructorParameters
// ------------------------------------------------------------------
const ConstructorParameters = Runtime.Tuple([
  Runtime.Const('ConstructorParameters'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),
])
// ------------------------------------------------------------------
// Parameters
// ------------------------------------------------------------------
const FunctionParameters = Runtime.Tuple([
  Runtime.Const('Parameters'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),
])
// ------------------------------------------------------------------
// InstanceType
// ------------------------------------------------------------------
const InstanceType = Runtime.Tuple([
  Runtime.Const('InstanceType'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),
])
// ------------------------------------------------------------------
// ReturnType
// ------------------------------------------------------------------
const ReturnType = Runtime.Tuple([
  Runtime.Const('ReturnType'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),
])
// ------------------------------------------------------------------
// Argument
// ------------------------------------------------------------------
const Argument = Runtime.Tuple([
  Runtime.Const('Argument'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),
])
// ------------------------------------------------------------------
// Awaited
// ------------------------------------------------------------------
const Awaited = Runtime.Tuple([
  Runtime.Const('Awaited'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),
])
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
const Array = Runtime.Tuple([
  Runtime.Const('Array'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),
])
// ------------------------------------------------------------------
// Record
// ------------------------------------------------------------------
const Record = Runtime.Tuple([
  Runtime.Const('Record'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'),
  Runtime.Const(Comma), 
  Runtime.Ref('Type'),
  Runtime.Const(RAngle),  
])

// ------------------------------------------------------------------
// Promise
// ------------------------------------------------------------------
const Promise = Runtime.Tuple([
  Runtime.Const('Promise'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])
// ------------------------------------------------------------------
// Partial
// ------------------------------------------------------------------
const Partial = Runtime.Tuple([
  Runtime.Const('Partial'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])
// ------------------------------------------------------------------
// Required
// ------------------------------------------------------------------
const Required = Runtime.Tuple([
  Runtime.Const('Required'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])

// ------------------------------------------------------------------
// Pick
// ------------------------------------------------------------------
const Pick = Runtime.Tuple([
  Runtime.Const('Pick'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(Comma), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])
// ------------------------------------------------------------------
// Omit
// ------------------------------------------------------------------
const Omit = Runtime.Tuple([
  Runtime.Const('Omit'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(Comma), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])

// ------------------------------------------------------------------
// Exclude
// ------------------------------------------------------------------
const Exclude = Runtime.Tuple([
  Runtime.Const('Exclude'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(Comma), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])
// ------------------------------------------------------------------
// Extract
// ------------------------------------------------------------------
const Extract = Runtime.Tuple([
  Runtime.Const('Extract'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(Comma), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])
// ------------------------------------------------------------------
// Uppercase
// ------------------------------------------------------------------
const Uppercase = Runtime.Tuple([
  Runtime.Const('Uppercase'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])
// ------------------------------------------------------------------
// Lowercase
// ------------------------------------------------------------------
const Lowercase = Runtime.Tuple([
  Runtime.Const('Lowercase'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])
// ------------------------------------------------------------------
// Capitalize
// ------------------------------------------------------------------
const Capitalize = Runtime.Tuple([
  Runtime.Const('Capitalize'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])
// ------------------------------------------------------------------
// Uncapitalize
// ------------------------------------------------------------------
const Uncapitalize = Runtime.Tuple([
  Runtime.Const('Uncapitalize'), 
  Runtime.Const(LAngle), 
  Runtime.Ref('Type'), 
  Runtime.Const(RAngle),  
])
// ------------------------------------------------------------------
// Date
// ------------------------------------------------------------------
const Date = Runtime.Const('Date')
// ------------------------------------------------------------------
// Uint8Array
// ------------------------------------------------------------------
const Uint8Array = Runtime.Const('Uint8Array')
// ------------------------------------------------------------------
// SyntaxModule
// ------------------------------------------------------------------
export const SyntaxModule = new Runtime.Module({
  GenericReferenceParameterList,
  GenericReference,
  GenericArgumentsList,
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
  KeywordNever,
  KeywordSymbol,
  KeywordVoid,
  Keyword,
  TemplateInterpolate,
  TemplateBody,
  TemplateText,
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
  Reference,
})
