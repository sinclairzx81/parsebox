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
// deno-fmt-ignore-file

import { Guard } from '../guard/index.ts'

export type IModuleProperties = Record<PropertyKey, IParser>

// ------------------------------------------------------------------
// Static
// ------------------------------------------------------------------

/** Force output static type evaluation for Arrays */
export type StaticEnsure<T> = T extends infer R ? R : never

/** Infers the Output Parameter for a Parser */
export type StaticParser<Parser extends IParser> = Parser extends IParser<infer Output extends unknown> ? Output : unknown

// ------------------------------------------------------------------
// Mapping
// ------------------------------------------------------------------
export type IMapping<Input extends unknown = any, Output extends unknown = unknown> = (input: Input, context: any) => Output

/** Maps input to output. This is the default Mapping */
export const Identity = (value: unknown) => value

/** Maps the output as the given parameter T */
export function As<T>(mapping: T): ((value: unknown) => T) {
  return (_: unknown) => mapping
}

// ------------------------------------------------------------------
// Parser
// ------------------------------------------------------------------
export interface IParser<Output extends unknown = unknown> {
  type: string
  mapping: IMapping<any, Output>
}
// ------------------------------------------------------------------
// Context
// ------------------------------------------------------------------
export type ContextParameter<_Left extends IParser, Right extends IParser> = (
  StaticParser<Right>
)
export interface IContext<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Context'
  left: IParser
  right: IParser
}
/** `[Context]` Creates a Context Parser */
export function Context<Left extends IParser, Right extends IParser, Mapping extends IMapping = IMapping<ContextParameter<Left, Right>>>(left: Left, right: Right, mapping: Mapping): IContext<ReturnType<Mapping>>
/** `[Context]` Creates a Context Parser */
export function Context<Left extends IParser, Right extends IParser>(left: Left, right: Right): IContext<ContextParameter<Left, Right>>
/** `[Context]` Creates a Context Parser */
export function Context(...args: unknown[]): never {
  const [left, right, mapping] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], args[1], Identity]
  return { type: 'Context', left, right, mapping } as never
}
/** Returns true if the value is a Context Parser */
export function IsContext(value: unknown): value is IContext {
  return Guard.IsObject(value) 
    && Guard.HasPropertyKey(value, 'type') 
    && Guard.HasPropertyKey(value, 'left') 
    && Guard.HasPropertyKey(value, 'right')
    && Guard.IsEqual(value.type, 'Context') 
    && Guard.IsObject(value.left) 
    && Guard.IsObject(value.right)
}
// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
export type ArrayParameter<Parser extends IParser> = StaticEnsure<
  StaticParser<Parser>[]
>
export interface IArray<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Array'
  parser: IParser
}
/** `[EBNF]` Creates an Array Parser */
export function Array<Parser extends IParser, Mapping extends IMapping = IMapping<ArrayParameter<Parser>>>(parser: Parser, mapping: Mapping): IArray<ReturnType<Mapping>>
/** `[EBNF]` Creates an Array Parser */
export function Array<Parser extends IParser>(parser: Parser): IArray<ArrayParameter<Parser>>
/** `[EBNF]` Creates an Array Parser */
export function Array(...args: unknown[]): never {
  const [parser, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity]
  return { type: 'Array', parser, mapping } as never
}
/** Returns true if the value is a Array Parser */
export function IsArray(value: unknown): value is IArray {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'parser')
    && Guard.IsEqual(value.type, 'Array')
    && Guard.IsObject(value.parser)
}
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
export interface IConst<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Const'
  value: string
}
/** `[TERM]` Creates a Const Parser */
export function Const<Value extends string, Mapping extends IMapping<Value>>(value: Value, mapping: Mapping): IConst<ReturnType<Mapping>>
/** `[TERM]` Creates a Const Parser */
export function Const<Value extends string>(value: Value): IConst<Value>
/** `[TERM]` Creates a Const Parser */
export function Const(...args: unknown[]): never {
  const [value, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity]
  return { type: 'Const', value, mapping } as never
}
/** Returns true if the value is a Const Parser */
export function IsConst(value: unknown): value is IConst {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'value')
    && Guard.IsEqual(value.type, 'Const')
    && Guard.IsString(value.value)
}
// ------------------------------------------------------------------
// Ref
// ------------------------------------------------------------------
export interface IRef<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Ref'
  ref: string
}
/** `[BNF]` Creates a Ref Parser. This Parser can only be used in the context of a Module */
export function Ref<Type extends unknown, Mapping extends IMapping<Type>>(ref: string, mapping: Mapping): IRef<ReturnType<Mapping>>
/** `[BNF]` Creates a Ref Parser. This Parser can only be used in the context of a Module */
export function Ref<Type extends unknown>(ref: string): IRef<Type>
/** `[BNF]` Creates a Ref Parser. This Parser can only be used in the context of a Module */
export function Ref(...args: unknown[]): never {
  const [ref, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity]
  return { type: 'Ref', ref, mapping } as never
}
/** Returns true if the value is a Ref Parser */
export function IsRef(value: unknown): value is IRef {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'ref')
    && Guard.IsEqual(value.type, 'Ref')
    && Guard.IsString(value.ref)
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
export interface IString<Output extends unknown = unknown> extends IParser<Output> {
  type: 'String'
  options: string[]
}
/** `[TERM]` Creates a String Parser. Options are an array of permissable quote characters */
export function String<Mapping extends IMapping<string>>(options: string[], mapping: Mapping): IString<ReturnType<Mapping>>
/** `[TERM]` Creates a String Parser. Options are an array of permissable quote characters */
export function String(options: string[]): IString<string>
/** `[TERM]` Creates a String Parser. Options are an array of permissable quote characters */
export function String(...params: unknown[]): never {
  const [options, mapping] = params.length === 2 ? [params[0], params[1]] : [params[0], Identity]
  return { type: 'String', options, mapping } as never
}
/** Returns true if the value is a String Parser */
export function IsString(value: unknown): value is IString {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.IsEqual(value.type, 'String')
    && Guard.HasPropertyKey(value, 'options')
    && Guard.IsArray(value.options)
}
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
export interface IIdent<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Ident'
}
/** `[TERM]` Creates an Ident Parser where Ident matches any valid JavaScript identifier */
export function Ident<Mapping extends IMapping<string>>(mapping: Mapping): IIdent<ReturnType<Mapping>>
/** `[TERM]` Creates an Ident Parser where Ident matches any valid JavaScript identifier */
export function Ident(): IIdent<string>
/** `[TERM]` Creates an Ident Parser where Ident matches any valid JavaScript identifier */
export function Ident(...params: unknown[]): never {
  const mapping = params.length === 1 ? params[0] : Identity
  return { type: 'Ident', mapping } as never
}
/** Returns true if the value is a Ident Parser */
export function IsIdent(value: unknown): value is IIdent {
  return Guard.IsObject(value) 
    && Guard.HasPropertyKey(value, 'type') 
    && Guard.IsEqual(value.type, 'Ident')
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
export interface INumber<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Number'
}
/** `[TERM]` Creates an Number Parser */
export function Number<Mapping extends IMapping<string>>(mapping: Mapping): INumber<ReturnType<Mapping>>
/** `[TERM]` Creates an Number Parser */
export function Number(): INumber<string>
/** `[TERM]` Creates an Number Parser */
export function Number(...params: unknown[]): never {
  const mapping = params.length === 1 ? params[0] : Identity
  return { type: 'Number', mapping } as never
}
/** Returns true if the value is a Number Parser */
export function IsNumber(value: unknown): value is INumber {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.IsEqual(value.type, 'Number')
}
// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
export type OptionalParameter<Parser extends IParser, Result extends unknown = [StaticParser<Parser>] | []> = (
  Result
)
export interface IOptional<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Optional'
  parser: IParser
}
/** `[EBNF]` Creates an Optional Parser */
export function Optional<Parser extends IParser, Mapping extends IMapping = IMapping<OptionalParameter<Parser>>>(parser: Parser, mapping: Mapping): IOptional<ReturnType<Mapping>>
/** `[EBNF]` Creates an Optional Parser */
export function Optional<Parser extends IParser>(parser: Parser): IOptional<OptionalParameter<Parser>>
/** `[EBNF]` Creates an Optional Parser */
export function Optional(...args: unknown[]): never {
  const [parser, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity]
  return { type: 'Optional', parser, mapping } as never
}
/** Returns true if the value is a Optional Parser */
export function IsOptional(value: unknown): value is IOptional {
  return Guard.IsObject(value) 
    && Guard.HasPropertyKey(value, 'type') 
    && Guard.HasPropertyKey(value, 'parser') 
    && Guard.IsEqual(value.type, 'Optional') 
    && Guard.IsObject(value.parser)
}
// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
export type TupleParameter<Parsers extends IParser[], Result extends unknown[] = []> = StaticEnsure<
  Parsers extends [infer Left extends IParser, ...infer Right extends IParser[]]
  ? TupleParameter<Right, [...Result, StaticEnsure<StaticParser<Left>>]>
  : Result
>
export interface ITuple<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Tuple'
  parsers: IParser[]
}
/** `[BNF]` Creates a Tuple Parser */
export function Tuple<Parsers extends IParser[], Mapping extends IMapping = IMapping<TupleParameter<Parsers>>>(parsers: [...Parsers], mapping: Mapping): ITuple<ReturnType<Mapping>>
/** `[BNF]` Creates a Tuple Parser */
export function Tuple<Parsers extends IParser[]>(parsers: [...Parsers]): ITuple<TupleParameter<Parsers>>
/** `[BNF]` Creates a Tuple Parser */
export function Tuple(...args: unknown[]): never {
  const [parsers, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity]
  return { type: 'Tuple', parsers, mapping } as never
}
/** Returns true if the value is a Tuple Parser */
export function IsTuple(value: unknown): value is ITuple {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'parsers')
    && Guard.IsEqual(value.type, 'Tuple')
    && Guard.IsArray(value.parsers)
}
// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
export type UnionParameter<Parsers extends IParser[], Result extends unknown = never> = StaticEnsure<
  Parsers extends [infer Left extends IParser, ...infer Right extends IParser[]]
  ? UnionParameter<Right, Result | StaticParser<Left>>
  : Result
>
export interface IUnion<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Union'
  parsers: IParser[]
}
/** `[BNF]` Creates a Union parser */
export function Union<Parsers extends IParser[], Mapping extends IMapping = IMapping<UnionParameter<Parsers>>>(parsers: [...Parsers], mapping: Mapping): IUnion<ReturnType<Mapping>>
/** `[BNF]` Creates a Union parser */
export function Union<Parsers extends IParser[]>(parsers: [...Parsers]): IUnion<UnionParameter<Parsers>>
/** `[BNF]` Creates a Union parser */
export function Union(...args: unknown[]): never {
  const [parsers, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity]
  return { type: 'Union', parsers, mapping } as never
}
/** Returns true if the value is a Union Parser */
export function IsUnion(value: unknown): value is IUnion {
  return Guard.IsObject(value) 
    && Guard.HasPropertyKey(value, 'type') 
    && Guard.HasPropertyKey(value, 'parsers') 
    && Guard.IsEqual(value.type, 'Union') 
    && Guard.IsArray(value.parsers)
}
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
export interface IUntil<Output extends unknown = unknown> extends IParser<Output> {
  type: 'Until'
  value: string
}
/** `[TERM]` Creates a Until Parser */
export function Until<Mapping extends IMapping<string>>(value: string, mapping: Mapping): IUntil<string>
/** `[TERM]` Creates a Until Parser */
export function Until(value: string): IUntil<string>
/** `[TERM]` Creates a Until Parser */
export function Until(...args: unknown[]): never {
  const [value, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity]
  return { type: 'Until', value, mapping } as never
}
/** Returns true if the value is a Until Parser */
export function IsUntil(value: unknown): value is IUntil {
  return Guard.IsObject(value)
    && Guard.HasPropertyKey(value, 'type')
    && Guard.HasPropertyKey(value, 'value')
    && Guard.IsEqual(value.type, 'Until')
    && Guard.IsString(value.value)
}