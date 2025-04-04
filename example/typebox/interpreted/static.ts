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

import { Static } from '@sinclair/parsebox'
import * as T from 'npm:@sinclair/typebox'

// ------------------------------------------------------------------
// Tokens
// ------------------------------------------------------------------
type Newline = '\n'
type LBracket = '['
type RBracket = ']'
type LParen = '('
type RParen = ')'
type LBrace = '{'
type RBrace = '}'
type LAngle = '<'
type RAngle = '>'
type Question = '?'
type Colon = ':'
type Comma = ','
type SemiColon = ';'
type SingleQuote = "'"
type DoubleQuote = '"'
type Tilde = '`'
type Equals = '='

// ------------------------------------------------------------------
// Delimit
// ------------------------------------------------------------------
type DelimitHeadReduce<Elements extends unknown[], Result extends unknown[] = []> = (
  Elements extends [infer Left extends unknown, ...infer Right extends unknown[]]
    ? Left extends [infer Element, infer _Delimiter]
      ? DelimitHeadReduce<Right, [...Result, Element]>
      : DelimitHeadReduce<Right, Result>
    : Result
)
interface DelimitHeadMapping extends Static.IMapping {
  output: this['input'] extends unknown[] 
    ? DelimitHeadReduce<this['input']> 
    : []
}
type DelimitHead<Element extends Static.IParser, Delimiter extends Static.IParser> = (
  Static.Array<Static.Tuple<[Element, Delimiter]>, DelimitHeadMapping>
)
type DelimitTail<Element extends Static.IParser> = Static.Union<[
  Static.Tuple<[Element]>,
  Static.Tuple<[]>,
]>
interface DelimitMapping extends Static.IMapping {
  output: this['input'] extends [infer Left extends unknown[], infer Right extends unknown[]]
    ? [...Left, ...Right]
    : []
}
type Delimit<Element extends Static.IParser, Delimiter extends Static.IParser> = Static.Tuple<[
  DelimitHead<Element, Delimiter>,
  DelimitTail<Element>
], DelimitMapping>
// ------------------------------------------------------------------
// Dereference
// ------------------------------------------------------------------
type Dereference<Context extends T.TProperties, Ref extends string> = (
  Ref extends keyof Context ? Context[Ref] : T.TRef<Ref>
)
// ------------------------------------------------------------------
// GenericArguments
// ------------------------------------------------------------------
type GenericArgumentsContext<Args extends string[], Context extends T.TProperties, Result extends T.TProperties = {}> = (
  Args extends [...infer Left extends string[], infer Right extends string]
    ? GenericArgumentsContext<Left, Context, Result & { [_ in Right]: T.TArgument<Left['length']> }>
    : T.Evaluate<Result & Context>
)
interface GenericArgumentsMapping extends Static.IMapping {
  output: this['input'] extends [LAngle, infer Args extends string[], RAngle]
    ? this['context'] extends infer Context extends T.TProperties
        ? GenericArgumentsContext<Args, Context>
        : never
    : never
}
type GenericArgumentsList = Delimit<Static.Ident, Static.Const<Comma>>
type GenericArguments = Static.Tuple<[
  Static.Const<LAngle>,
  GenericArgumentsList,
  Static.Const<RAngle>,
], GenericArgumentsMapping>
// ------------------------------------------------------------------
// GenericReference
// ------------------------------------------------------------------
interface GenericReferenceMapping extends Static.IMapping {
  output: this['context'] extends T.TProperties
    ? this['input'] extends [infer Reference extends string, LAngle, infer Args extends T.TSchema[], RAngle]
      ? T.TInstantiate<Dereference<this['context'], Reference>, Args>
      : never
    : never  
}
type GenericReferenceParameters = Delimit<Type, Static.Const<Comma>>
type GenericReference = Static.Tuple<[
  Static.Ident,
  Static.Const<LAngle>,
  GenericReferenceParameters,
  Static.Const<RAngle>,
], GenericReferenceMapping>
// ------------------------------------------------------------------
// Reference
// ------------------------------------------------------------------
interface ReferenceMapping extends Static.IMapping {
  output: this['context'] extends T.TProperties
    ? this['input'] extends string
      ? Dereference<this['context'], this['input']>
      : never
    : never  
}
type Reference = Static.Ident<ReferenceMapping>
// ------------------------------------------------------------------
// Literal
// ------------------------------------------------------------------
interface LiteralBooleanMapping extends Static.IMapping {
  output: this['input'] extends `${infer Value extends boolean}` ? T.TLiteral<Value> : never
}
interface LiteralNumberMapping extends Static.IMapping {
  output: this['input'] extends `${infer Value extends number}` ? T.TLiteral<Value> : never
}
interface LiteralStringMapping extends Static.IMapping {
  output: this['input'] extends `${infer Value extends string}` ? T.TLiteral<Value> : never
}
type Literal = Static.Union<[
  Static.Union<[Static.Const<'true'>, Static.Const<'false'>], LiteralBooleanMapping>,
  Static.Number<LiteralNumberMapping>,
  Static.String<[DoubleQuote, SingleQuote, Tilde], LiteralStringMapping>,
]>
// ------------------------------------------------------------------
// Keyword
// ------------------------------------------------------------------
type Keyword = Static.Union<[
  Static.Const<'string', Static.As<T.TString>>,
  Static.Const<'number', Static.As<T.TNumber>>,
  Static.Const<'boolean', Static.As<T.TBoolean>>,
  Static.Const<'undefined', Static.As<T.TUndefined>>,
  Static.Const<'null', Static.As<T.TNull>>,
  Static.Const<'integer', Static.As<T.TInteger>>,
  Static.Const<'bigint', Static.As<T.TBigInt>>,
  Static.Const<'unknown', Static.As<T.TUnknown>>,
  Static.Const<'any', Static.As<T.TAny>>,
  Static.Const<'never', Static.As<T.TNever>>,
  Static.Const<'symbol', Static.As<T.TSymbol>>,
  Static.Const<'void', Static.As<T.TVoid>>,
]>
// ------------------------------------------------------------------
// KeyOf
// ------------------------------------------------------------------
interface KeyOfMapping extends Static.IMapping {
  output: this['input'] extends [] ? false : true
}
type KeyOf = Static.Union<[
  Static.Tuple<[Static.Const<'keyof'>]>,
  Static.Tuple<[]>
], KeyOfMapping>
// ------------------------------------------------------------------
// IndexArray
// ------------------------------------------------------------------
type IndexArrayReduce<Values extends unknown[], Result extends unknown[] = []> = (
  Values extends [infer Left extends unknown, ...infer Right extends unknown[]]
    ? Left extends [LBracket, infer Type extends T.TSchema, RBracket] 
      ? IndexArrayReduce<Right, [...Result, [Type]]>
      : IndexArrayReduce<Right, [...Result, []]>
    : Result
)
interface IndexArrayMapping extends Static.IMapping {
  output: this['input'] extends unknown[] 
    ? IndexArrayReduce<this['input']> 
    : []
}
type IndexArray = Static.Array<Static.Union<[
  Static.Tuple<[Static.Const<LBracket>, Type, Static.Const<RBracket>,]>,
  Static.Tuple<[Static.Const<LBracket>, Static.Const<RBracket>]>,
]>, IndexArrayMapping>
// ------------------------------------------------------------------
// Extends
// ------------------------------------------------------------------
interface ExtendsMapping extends Static.IMapping {
  output: this['input'] extends ['extends', infer Type extends T.TSchema, Question, infer True extends T.TSchema, Colon, infer False extends T.TSchema]
    ? [Type, True, False]
    : []
}
type Extends = Static.Union<[
  Static.Tuple<[Static.Const<'extends'>, Type, Static.Const<Question>, Type, Static.Const<Colon>, Type]>,
  Static.Tuple<[]>
], ExtendsMapping>
// ------------------------------------------------------------------
// Base
// ------------------------------------------------------------------
interface BaseMapping extends Static.IMapping {
  output: (
    this['input'] extends [LParen, infer Type extends T.TSchema, RParen] ? Type :
    this['input'] extends infer Type extends T.TSchema ? Type :
    never
  )
}
type Base = Static.Union<[
  Static.Tuple<[Static.Const<LParen>, Type, Static.Const<RParen>]>,
  Keyword,
  Object, 
  Tuple,
  Literal,
  Function,
  Constructor,
  Mapped,
  AsyncIterator,
  Iterator,
  ConstructorParameters,
  FunctionParameters,
  Argument,
  InstanceType,
  ReturnType,
  Awaited,
  Array,
  Record,
  Promise,
  Partial,
  Required,
  Pick,
  Omit,
  Exclude,
  Extract,
  Lowercase,
  Uppercase,
  Capitalize,
  Uncapitalize,
  Date,
  Uint8Array,
  GenericReference,
  Reference
], BaseMapping>
// ------------------------------------------------------------------
// Factor
// ------------------------------------------------------------------
type FactorExtends<Type extends T.TSchema, Extends extends unknown[]> = (
  Extends extends [infer Right extends T.TSchema, infer True extends T.TSchema, infer False extends T.TSchema] 
    ? T.TExtends<Type, Right, True, False>
    : Type
)
type FactorIndexArray<Type extends T.TSchema, IndexArray extends unknown[]> = (
  IndexArray extends [...infer Left extends unknown[], infer Right extends T.TSchema[]] ? (
    Right extends [infer Indexer extends T.TSchema] ? T.TIndex<FactorIndexArray<Type, Left>, T.TIndexPropertyKeys<Indexer>> : 
    Right extends [] ? T.TArray<FactorIndexArray<Type, Left>> :
    T.TNever
  ) : Type
)
interface FactorMapping extends Static.IMapping {
  output: this['input'] extends [infer KeyOf extends boolean, infer Type extends T.TSchema, infer IndexArray extends unknown[], infer Extends extends unknown[]]
  ? KeyOf extends true
    ? FactorExtends<T.TKeyOf<FactorIndexArray<Type, IndexArray>>, Extends>
    : FactorExtends<FactorIndexArray<Type, IndexArray>, Extends>
  : never
}
type Factor = Static.Tuple<[
  KeyOf, Base, IndexArray, Extends
], FactorMapping>
// ------------------------------------------------------------------
// Expr
// ------------------------------------------------------------------
type ExprBinaryReduce<Left extends T.TSchema, Rest extends unknown[]> = (
  Rest extends [infer Operator extends unknown, infer Right extends T.TSchema, infer Next extends unknown[]] ? (
    ExprBinaryReduce<Right, Next> extends infer Schema extends T.TSchema ? (
      Operator extends '&' ? (
        Schema extends T.TIntersect<infer Types extends T.TSchema[]>
        ? T.TIntersect<[Left, ...Types]>
        : T.TIntersect<[Left, Schema]>
      ) :
      Operator extends '|' ? (
        Schema extends T.TUnion<infer Types extends T.TSchema[]>
        ? T.TUnion<[Left, ...Types]>
        : T.TUnion<[Left, Schema]>
      ) : never
    ) : never
  ) : Left
)
interface ExprBinaryMapping extends Static.IMapping {
  output: (
    this['input'] extends [infer Left extends T.TSchema, infer Rest extends unknown[]]
    ? ExprBinaryReduce<Left, Rest>
    : []
  )
}
type ExprTermTail = Static.Union<[
  Static.Tuple<[Static.Const<'&'>, Factor, ExprTermTail]>,
  Static.Tuple<[]>
]>
type ExprTerm = Static.Tuple<[
  Factor, ExprTermTail
], ExprBinaryMapping>
type ExprTail = Static.Union<[
  Static.Tuple<[Static.Const<'|'>, ExprTerm, ExprTail]>,
  Static.Tuple<[]>
]>
type Expr = Static.Tuple<[
  ExprTerm, ExprTail
], ExprBinaryMapping>

// ------------------------------------------------------------------
// Type
// ------------------------------------------------------------------
export type Type = Static.Union<[
  Static.Context<GenericArguments, Expr>, 
  Expr
]>
// ------------------------------------------------------------------
// Property
// ------------------------------------------------------------------
interface PropertyKeyStringMapping extends Static.IMapping {
  output: this['input']
}
type PropertyKeyString = Static.String<[SingleQuote, DoubleQuote], PropertyKeyStringMapping>
type PropertyKey = Static.Union<[Static.Ident, PropertyKeyString]>
interface ReadonlyMapping extends Static.IMapping {
  output: this['input'] extends ['readonly'] ? true : false
}
type Readonly = Static.Union<[Static.Tuple<[Static.Const<'readonly'>]>, Static.Tuple<[]>], ReadonlyMapping>
interface OptionalMapping extends Static.IMapping {
  output: this['input'] extends [Question] ? true : false
}
type Optional = Static.Union<[Static.Tuple<[Static.Const<Question>]>, Static.Tuple<[]>], OptionalMapping>
interface PropertyMapping extends Static.IMapping {
  output: this['input'] extends [infer IsReadonly extends boolean, infer Key extends string, infer IsOptional extends boolean, string, infer Type extends T.TSchema]
  ? { 
    [_ in Key]: (
      [IsReadonly, IsOptional] extends [true, true] ? T.TReadonlyOptional<Type> :
      [IsReadonly, IsOptional] extends [true, false] ? T.TReadonly<Type> :
      [IsReadonly, IsOptional] extends [false, true] ? T.TOptional<Type> :
      Type 
    ) 
  } : never
}
type Property = Static.Tuple<[Readonly, PropertyKey, Optional, Static.Const<Colon>, Type], PropertyMapping>
// ------------------------------------------------------------------
// PropertyDelimiter
// ------------------------------------------------------------------
type PropertyDelimiter = Static.Union<[
  Static.Tuple<[Static.Const<Comma>, Static.Const<Newline>]>,
  Static.Tuple<[Static.Const<SemiColon>, Static.Const<Newline>]>,
  Static.Tuple<[Static.Const<Comma>]>,
  Static.Tuple<[Static.Const<SemiColon>]>,
  Static.Tuple<[Static.Const<Newline>]>,
]>
// ------------------------------------------------------------------
// PropertyList
// ------------------------------------------------------------------
type PropertyList = Delimit<Property, PropertyDelimiter>
// ------------------------------------------------------------------
// Object
// ------------------------------------------------------------------
type ObjectReduce<PropertiesList extends T.TProperties[], Result extends T.TProperties = {}> = (
  PropertiesList extends [infer Left extends T.TProperties, ...infer Right extends T.TProperties[]]
  ? ObjectReduce<Right, Result & Left>
  : T.Evaluate<Result>
)
interface ObjectMapping extends Static.IMapping {
  output: this['input'] extends [LBrace, infer PropertyList extends T.TProperties[], RBrace] 
    ? T.TObject<ObjectReduce<PropertyList>> 
    : never
}
type Object = Static.Tuple<[
  Static.Const<LBrace>,
  PropertyList, 
  Static.Const<RBrace>
], ObjectMapping>

// ------------------------------------------------------------------
// ElementList
// ------------------------------------------------------------------
type ElementList = Delimit<Type, Static.Const<Comma>>
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
interface TupleMapping extends Static.IMapping {
  output: this['input'] extends [unknown, infer ElementList extends T.TSchema[], unknown] 
    ? T.TTuple<ElementList> 
    : never
}
type Tuple = Static.Tuple<[
  Static.Const<LBracket>, ElementList, Static.Const<RBracket>
], TupleMapping>
// ------------------------------------------------------------------
// Parameter
// ------------------------------------------------------------------
interface ParameterMapping extends Static.IMapping {
  output: this['input'] extends [string, Colon, infer Type extends T.TSchema] ? Type : never
}
type Parameter = Static.Tuple<[
  Static.Ident, Static.Const<Colon>, Type
], ParameterMapping>
// ------------------------------------------------------------------
// ParameterList
// ------------------------------------------------------------------
type ParameterList = Delimit<Parameter, Static.Const<Comma>>
// ------------------------------------------------------------------
// Function
// ------------------------------------------------------------------
interface FunctionMapping extends Static.IMapping {
  output: this['input'] extends [LParen, infer ParameterList extends T.TSchema[], RParen, '=>', infer ReturnType extends T.TSchema]
    ? T.TFunction<ParameterList, ReturnType>
    : never
}
type Function = Static.Tuple<[
  Static.Const<LParen>, ParameterList, Static.Const<RParen>, Static.Const<'=>'>, Type
], FunctionMapping>
// ------------------------------------------------------------------
// Constructor
// ------------------------------------------------------------------
interface ConstructorMapping extends Static.IMapping {
  output: this['input'] extends ['new', LParen, infer ParameterList extends T.TSchema[], RParen, '=>', infer InstanceType extends T.TSchema]
    ? T.TConstructor<ParameterList, InstanceType>
    : never
}
type Constructor = Static.Tuple<[
  Static.Const<'new'>, Static.Const<LParen>, ParameterList, Static.Const<RParen>, Static.Const<'=>'>, Type
], ConstructorMapping>
// ------------------------------------------------------------------
// Mapped (requires deferred types)
// ------------------------------------------------------------------
interface MappedMapping extends Static.IMapping {
  output: this['input'] extends [LBrace, LBracket, infer _Key extends string, 'in', infer _Right extends T.TSchema, RBracket, Colon, infer Type extends T.TSchema, RBrace]
    ? T.TLiteral<'Mapped types not supported'>
    : this['input']
}
type Mapped = Static.Tuple<[
  Static.Const<LBrace>, Static.Const<LBracket>, Static.Ident, Static.Const<'in'>, Type, Static.Const<RBracket>, Static.Const<Colon>, Type, Static.Const<RBrace>
], MappedMapping>
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
interface ArrayMapping extends Static.IMapping {
  output: this['input'] extends ['Array', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TArray<Type>
    : never
}
type Array = Static.Tuple<[
  Static.Const<'Array'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], ArrayMapping>
// ------------------------------------------------------------------
// AsyncIterator
// ------------------------------------------------------------------
interface AsyncIteratorMapping extends Static.IMapping {
  output: this['input'] extends ['AsyncIterator', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TAsyncIterator<Type>
    : never
}
type AsyncIterator = Static.Tuple<[
  Static.Const<'AsyncIterator'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], AsyncIteratorMapping>
// ------------------------------------------------------------------
// Iterator
// ------------------------------------------------------------------
interface IteratorMapping extends Static.IMapping {
  output: this['input'] extends ['Iterator', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TIterator<Type>
    : never
}
type Iterator = Static.Tuple<[
  Static.Const<'Iterator'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], IteratorMapping>
// ------------------------------------------------------------------
// ConstructorParameters
// ------------------------------------------------------------------
interface ConstructorParametersMapping extends Static.IMapping {
  output: this['input'] extends ['ConstructorParameters', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TConstructorParameters<Type>
    : never
}
type ConstructorParameters = Static.Tuple<[
  Static.Const<'ConstructorParameters'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], ConstructorParametersMapping>
// ------------------------------------------------------------------
// FunctionParameters
// ------------------------------------------------------------------
interface FunctionParametersMapping extends Static.IMapping {
  output: this['input'] extends ['Parameters', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TParameters<Type>
    : never
}
type FunctionParameters = Static.Tuple<[
  Static.Const<'Parameters'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], FunctionParametersMapping>
// ------------------------------------------------------------------
// InstanceType
// ------------------------------------------------------------------
interface InstanceTypeMapping extends Static.IMapping {
  output: this['input'] extends ['InstanceType', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TInstanceType<Type>
    : never
}
type InstanceType = Static.Tuple<[
  Static.Const<'InstanceType'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], InstanceTypeMapping>
// ------------------------------------------------------------------
// ReturnType
// ------------------------------------------------------------------
interface ReturnTypeMapping extends Static.IMapping {
  output: this['input'] extends ['ReturnType', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TReturnType<Type>
    : never
}
type ReturnType = Static.Tuple<[
  Static.Const<'ReturnType'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], ReturnTypeMapping>
// ------------------------------------------------------------------
// Argument
// ------------------------------------------------------------------
interface ArgumentMapping extends Static.IMapping {
  output: this['input'] extends ['Argument', LAngle, infer Type extends T.TSchema, RAngle]
    ? Type extends T.TLiteral<infer Index extends number>
      ? T.TArgument<Index>
      : T.TNever
    : never
}
type Argument = Static.Tuple<[
  Static.Const<'Argument'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], ArgumentMapping>
// ------------------------------------------------------------------
// Awaited
// ------------------------------------------------------------------
interface AwaitedMapping extends Static.IMapping {
  output: this['input'] extends ['Awaited', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TAwaited<Type>
    : never
}
type Awaited = Static.Tuple<[
  Static.Const<'Awaited'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], AwaitedMapping>
// ------------------------------------------------------------------
// Promise
// ------------------------------------------------------------------
interface PromiseMapping extends Static.IMapping {
  output: this['input'] extends ['Promise', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TPromise<Type>
    : never
}
type Promise = Static.Tuple<[
  Static.Const<'Promise'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], PromiseMapping>
// ------------------------------------------------------------------
// Record
// ------------------------------------------------------------------
interface RecordMapping extends Static.IMapping {
  output: this['input'] extends ['Record', LAngle, infer Key extends T.TSchema, Comma, infer Type extends T.TSchema,  RAngle]
    ? T.TRecord<Key, Type>
    : never
}
type Record = Static.Tuple<[
  Static.Const<'Record'>, Static.Const<LAngle>, Type, Static.Const<Comma>, Type, Static.Const<RAngle>,
], RecordMapping>
// ------------------------------------------------------------------
// Partial
// ------------------------------------------------------------------
interface PartialMapping extends Static.IMapping {
  output: this['input'] extends ['Partial', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TPartial<Type>
    : never
}
type Partial = Static.Tuple<[
  Static.Const<'Partial'>, Static.Const<LAngle>, Type, Static.Const<RAngle>,
], PartialMapping>
// ------------------------------------------------------------------
// Required
// ------------------------------------------------------------------
interface RequiredMapping extends Static.IMapping {
  output: this['input'] extends ['Required', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TRequired<Type>
    : never
}
type Required = Static.Tuple<[
  Static.Const<'Required'>,  Static.Const<LAngle>, Type, Static.Const<RAngle>,
], RequiredMapping>
// ------------------------------------------------------------------
// Pick
// ------------------------------------------------------------------
interface PickMapping extends Static.IMapping {
  output: this['input'] extends ['Pick', LAngle, infer Type extends T.TSchema, Comma, infer Key extends T.TSchema, RAngle]
    ? T.TPick<Type, Key>
    : never
}
type Pick = Static.Tuple<[
  Static.Const<'Pick'>, Static.Const<LAngle>, Type, Static.Const<Comma>, Type, Static.Const<RAngle>,
], PickMapping>
// ------------------------------------------------------------------
// Omit
// ------------------------------------------------------------------
interface OmitMapping extends Static.IMapping {
  output: this['input'] extends ['Omit', LAngle, infer Type extends T.TSchema, Comma, infer Key extends T.TSchema, RAngle]
    ? T.TOmit<Type, Key>
    : never
}
type Omit = Static.Tuple<[
  Static.Const<'Omit'>, Static.Const<LAngle>, Type, Static.Const<Comma>, Type, Static.Const<RAngle>
], OmitMapping>
// ------------------------------------------------------------------
// Exclude
// ------------------------------------------------------------------
interface ExcludeMapping extends Static.IMapping {
  output: this['input'] extends ['Exclude', LAngle, infer Type extends T.TSchema, Comma, infer PropertyKey extends T.TSchema, RAngle]
    ? T.TExclude<Type, PropertyKey>
    : never
}
type Exclude = Static.Tuple<[
  Static.Const<'Exclude'>, Static.Const<LAngle>, Type, Static.Const<Comma>, Type, Static.Const<RAngle>
], ExcludeMapping>
// ------------------------------------------------------------------
// Extract
// ------------------------------------------------------------------
interface ExtractMapping extends Static.IMapping {
  output: this['input'] extends ['Extract', LAngle, infer Type extends T.TSchema, Comma, infer PropertyKey extends T.TSchema, RAngle]
    ? T.TExtract<Type, PropertyKey>
    : never
}
type Extract = Static.Tuple<[
  Static.Const<'Extract'>, Static.Const<LAngle>, Type, Static.Const<Comma>, Type, Static.Const<RAngle>
], ExtractMapping>
// ------------------------------------------------------------------
// Uppercase
// ------------------------------------------------------------------
interface UppercaseMapping extends Static.IMapping {
  output: this['input'] extends ['Uppercase', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TUppercase<Type>
    : never
}
type Uppercase = Static.Tuple<[
  Static.Const<'Uppercase'>,  Static.Const<LAngle>, Type, Static.Const<RAngle>,
], UppercaseMapping>
// ------------------------------------------------------------------
// Lowercase
// ------------------------------------------------------------------
interface LowercaseMapping extends Static.IMapping {
  output: this['input'] extends ['Lowercase', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TLowercase<Type>
    : never
}
type Lowercase = Static.Tuple<[
  Static.Const<'Lowercase'>,  Static.Const<LAngle>, Type, Static.Const<RAngle>,
], LowercaseMapping>
// ------------------------------------------------------------------
// Capitalize
// ------------------------------------------------------------------
interface CapitalizeMapping extends Static.IMapping {
  output: this['input'] extends ['Capitalize', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TCapitalize<Type>
    : never
}
type Capitalize = Static.Tuple<[
  Static.Const<'Capitalize'>,  Static.Const<LAngle>, Type, Static.Const<RAngle>,
], CapitalizeMapping>
// ------------------------------------------------------------------
// Uncapitalize
// ------------------------------------------------------------------
interface UncapitalizeMapping extends Static.IMapping {
  output: this['input'] extends ['Uncapitalize', LAngle, infer Type extends T.TSchema, RAngle]
    ? T.TUncapitalize<Type>
    : never
}
type Uncapitalize = Static.Tuple<[
  Static.Const<'Uncapitalize'>,  Static.Const<LAngle>, Type, Static.Const<RAngle>,
], UncapitalizeMapping>
// ------------------------------------------------------------------
// Date
// ------------------------------------------------------------------
type Date = Static.Const<'Date', Static.As<T.TDate>>
// ------------------------------------------------------------------
// Uint8Array
// ------------------------------------------------------------------
type Uint8Array = Static.Const<'Uint8Array', Static.As<T.TUint8Array>>
