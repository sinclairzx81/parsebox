/*--------------------------------------------------------------------------

ParseBox

The MIT License (MIT)

Copyright (c) 2024-2026 Haydn Paterson

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

import { Static } from '@sinclair/parsebox'
import { TExpression, TSimple, TParam, TQuery, TFragment, TReserved, TLiteral, TLabel, TPath, TMatrix, TContinuation } from './types.ts'

// -------------------------------------------------------------------
// URI Template Parser (Type Level)
//
// Parses URI Template strings into a typed AST at compile time.
// Supports all Level 1-4 expressions defined in RFC 6570,
// including simple, reserved, fragment, label, path, matrix,
// query and continuation expressions, along with typed parameter
// extensions for use in type-safe routing.
//
// Specification
//   RFC 6570 URI Template (March 2012)
//   https://datatracker.ietf.org/doc/html/rfc6570
//
// -------------------------------------------------------------------

type Result = Static.Parse<Template, '/foo/{/bar*}{#x, y, z}{?a, b, c}'>[0]

// -------------------------------------------------------------------
// ParamList
// -------------------------------------------------------------------
interface ParamListMapping extends Static.IMapping {
  output: (
    this['input'] extends [infer Param extends TParam, ',', infer Rest extends TParam[]] ? [Param, ...Rest] :
    this['input'] extends [infer Param extends TParam] ? [Param] :
    []
  )
}
type ParamList = Static.Union<[
  Static.Tuple<[Param, Static.Const<','>, ParamList]>,
  Static.Tuple<[Param]>,
  Static.Tuple<[]>
], ParamListMapping>
// -------------------------------------------------------------------
// Param
// -------------------------------------------------------------------
interface ParamMapping extends Static.IMapping {
  output: (
    this['input'] extends [infer Name extends string, ':', infer Type extends string, '*'] ? TParam<Name, Type, true> :
    this['input'] extends [infer Name extends string, ':', infer Type extends string] ? TParam<Name, Type, false> :
    this['input'] extends [infer Name extends string, '*'] ? TParam<Name, 'string', true> :
    this['input'] extends [infer Name extends string] ? TParam<Name, 'string', false> :
    never
  )
}
type Param = Static.Union<[
  Static.Tuple<[Static.Ident, Static.Const<':'>, Static.Ident, Static.Const<'*'>]>,
  Static.Tuple<[Static.Ident, Static.Const<':'>, Static.Ident]>,
  Static.Tuple<[Static.Ident, Static.Const<'*'>]>,
  Static.Tuple<[Static.Ident]>
], ParamMapping>
// -------------------------------------------------------------------
// Expression
// -------------------------------------------------------------------
export interface ExpressionMapping extends Static.IMapping {
  output: (
    this['input'] extends ['{', '+', infer Params extends TParam[], '}'] ? TReserved<Params> :
    this['input'] extends ['{', '#', infer Params extends TParam[], '}'] ? TFragment<Params> :
    this['input'] extends ['{', '.', infer Params extends TParam[], '}'] ? TLabel<Params> :
    this['input'] extends ['{', '/', infer Params extends TParam[], '}'] ? TPath<Params> :
    this['input'] extends ['{', ';', infer Params extends TParam[], '}'] ? TMatrix<Params> :
    this['input'] extends ['{', '?', infer Params extends TParam[], '}'] ? TQuery<Params> :
    this['input'] extends ['{', '&', infer Params extends TParam[], '}'] ? TContinuation<Params> :
    this['input'] extends ['{', infer Params extends TParam[], '}'] ? TSimple<Params> :
    this['input'] extends [infer Literal extends TLiteral] ? Literal :
    never
  )
}
type Expression = Static.Union<[
  Static.Tuple<[Static.Const<'{'>, Static.Const<'+'>, ParamList, Static.Const<'}'>]>,
  Static.Tuple<[Static.Const<'{'>, Static.Const<'#'>, ParamList, Static.Const<'}'>]>,
  Static.Tuple<[Static.Const<'{'>, Static.Const<'.'>, ParamList, Static.Const<'}'>]>,
  Static.Tuple<[Static.Const<'{'>, Static.Const<'/'>, ParamList, Static.Const<'}'>]>,
  Static.Tuple<[Static.Const<'{'>, Static.Const<';'>, ParamList, Static.Const<'}'>]>,
  Static.Tuple<[Static.Const<'{'>, Static.Const<'?'>, ParamList, Static.Const<'}'>]>,
  Static.Tuple<[Static.Const<'{'>, Static.Const<'&'>, ParamList, Static.Const<'}'>]>,
  Static.Tuple<[Static.Const<'{'>, ParamList, Static.Const<'}'>]>,
  Static.Tuple<[Literal]>
], ExpressionMapping>
// -------------------------------------------------------------------
// Literal
// -------------------------------------------------------------------
interface LiteralMapping extends Static.IMapping {
  output: this['input'] extends infer Text extends string ? TLiteral<Text> : never
}
type Literal = Static.Union<[
  Static.Until_1<['{']>,
  Static.Rest
], LiteralMapping>
// -------------------------------------------------------------------
// Template
// -------------------------------------------------------------------
interface TemplateMapping extends Static.IMapping {
  output: this['input'] extends [infer Left extends TExpression, infer Right extends TExpression[]]
    ? [Left, ...Right]
    : []
}
type Template = Static.Union<[
  Static.Tuple<[Expression, Template]>,
  Static.Tuple<[]>
], TemplateMapping>