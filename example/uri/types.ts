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

// ------------------------------------------------------------------
// Expression
// ------------------------------------------------------------------
export interface TExpression {
  kind: string
}
export function IsExpression(value: unknown, kind: string): value is TReserved {
  return typeof value === 'object' && value !== null && 'kind' in value && value.kind === kind
}
// ------------------------------------------------------------------
// Literal
// ------------------------------------------------------------------
export interface TLiteral<Text extends string = string> extends TExpression {
  kind: 'Literal'
  text: Text
}
export function Literal<Text extends string>(text: Text): TLiteral<Text> {
  return { kind: 'Literal', text }
}
export function IsLiteral(value: unknown): value is TLiteral {
  return IsExpression(value, 'Literal')
}
// ------------------------------------------------------------------
// Param
// ------------------------------------------------------------------
export interface TParam<Name extends string = string, Type extends string = string, Explode extends boolean = boolean> extends TExpression {
  kind: 'Param'
  name: Name
  type: Type
  explode: Explode
}
export function Param<Name extends string, Type extends string, Explode extends boolean>(name: Name, type: Type, explode: Explode): TParam<Name, Type> {
  return { kind: 'Param', name, type, explode }
}
export function IsParam(value: unknown): value is TParam {
  return IsExpression(value, 'Param')
}
// ------------------------------------------------------------------
// Simple
// ------------------------------------------------------------------
export interface TSimple<Params extends TParam[] = TParam[]> extends TExpression {
  kind: 'Simple'
  params: Params
}
export function Simple<Params extends TParam[]>(params: [...Params]): TSimple<Params> {
  return { kind: 'Simple', params }
}
export function IsSimple(value: unknown): value is TSimple {
  return IsExpression(value, 'Simple')
}
// ------------------------------------------------------------------
// Fragment
// ------------------------------------------------------------------
export interface TFragment<Params extends TParam[] = TParam[]> extends TExpression {
  kind: 'Fragment'
  param: Params
}
export function Fragment<Params extends TParam[]>(param: [...Params]): TFragment<Params> {
  return { kind: 'Fragment', param }
}
export function IsFragment(value: unknown): value is TFragment {
  return IsExpression(value, 'Fragment')
}
// ------------------------------------------------------------------
// Query
// ------------------------------------------------------------------
export interface TQuery<Params extends TParam[] = TParam[]> extends TExpression {
  kind: 'Query'
  param: Params
}
export function Query<Params extends TParam[]>(param: [...Params]): TQuery<Params> {
  return { kind: 'Query', param }
}
export function IsQuery(value: unknown): value is TQuery {
  return IsExpression(value, 'Query')
}
// ------------------------------------------------------------------
// Reserved
// ------------------------------------------------------------------
export interface TReserved<Params extends TParam[] = TParam[]> extends TExpression {
  kind: 'Reserved'
  params: Params
}
export function Reserved<Params extends TParam[]>(params: [...Params]): TReserved<Params> {
  return { kind: 'Reserved', params }
}
export function IsReserved(value: unknown): value is TReserved {
  return IsExpression(value, 'Reserved')
}
// ------------------------------------------------------------------
// Label
// ------------------------------------------------------------------
export interface TLabel<Params extends TParam[] = TParam[]> extends TExpression {
  kind: 'Label'
  params: Params
}
export function Label<Params extends TParam[]>(params: [...Params]): TLabel<Params> {
  return { kind: 'Label', params }
}
export function IsLabel(value: unknown): value is TLabel {
  return IsExpression(value, 'Label')
}
// ------------------------------------------------------------------
// Path
// ------------------------------------------------------------------
export interface TPath<Params extends TParam[] = TParam[]> extends TExpression {
  kind: 'Path'
  params: Params
}
export function Path<Params extends TParam[]>(params: [...Params]): TPath<Params> {
  return { kind: 'Path', params }
}
export function IsPath(value: unknown): value is TPath {
  return IsExpression(value, 'Path')
}
// ------------------------------------------------------------------
// Matrix
// ------------------------------------------------------------------
export interface TMatrix<Params extends TParam[] = TParam[]> extends TExpression {
  kind: 'Matrix'
  params: Params
}
export function Matrix<Params extends TParam[]>(params: [...Params]): TMatrix<Params> {
  return { kind: 'Matrix', params }
}
export function IsMatrix(value: unknown): value is TMatrix {
  return IsExpression(value, 'Matrix')
}
// ------------------------------------------------------------------
// Continuation
// ------------------------------------------------------------------
export interface TContinuation<Params extends TParam[] = TParam[]> extends TExpression {
  kind: 'Continuation'
  params: Params
}
export function Continuation<Params extends TParam[]>(params: [...Params]): TContinuation<Params> {
  return { kind: 'Continuation', params }
}
export function IsContinuation(value: unknown): value is TContinuation {
  return IsExpression(value, 'Continuation')
}