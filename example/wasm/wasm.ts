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

export function test(math: Math) {
  const a = math.$add(1, 2)
  const b = math.$sub(1, 2)
  const c = math.$mul(1, 2)
  const d = math.$div(1, 2)
  
  const expr = math.$add( // (1 - 2) + (3 + ((4 * 5) / 6))
    math.$sub(1, 2), 
    math.$add(3, 
      math.$div(
        math.$mul(4, 5), 
        6
      )
    )
  )
}

type Math = Wat<`(module
  (func $add (param $x f32) (param $y f32) (result f32)
    local.get $x
    local.get $y
    f32.add
  )
  (func $sub (param $x f32) (param $y f32) (result f32)
    local.get $x
    local.get $y
    f32.sub
  )
  (func $mul (param $x f32) (param $y f32) (result f32)
    local.get $x
    local.get $y
    f32.mul
  )
  (func $div (param $x f32) (param $y f32) (result f32)
    local.get $x
    local.get $y
    f32.div
  )
)`>

import { Static } from '@sinclair/parsebox'

// ---------------------------------------------------
// Wat: Parse
// ---------------------------------------------------
export type Wat<Code extends string, 
  Parsed extends unknown = Static.Parse<Module, Code>[0],
  Ast extends TModule = Parsed extends TModule ? Parsed : TModule<[]>,
  Exports extends Record<PropertyKey, unknown> = GetExports<Ast>
> = Exports

// ---------------------------------------------------
// Query: Exports
// ---------------------------------------------------
type GetExportsParams<Params extends TParam[], Result extends unknown[] = []> = (
  Params extends [infer _ extends TParam, ...infer Right extends TParam[]]
    ? GetExportsParams<Right, [...Result, number]> // i32, i64, f32, f64
    : Result
)
type GetExportsFunc<Func extends TFunc,
  Params extends unknown[] = GetExportsParams<Func['params']>,
  Return extends unknown = number, // single return type
  Result extends Record<PropertyKey, unknown> = {
    [K in Func['name']]: (...args: [...Params]) => Return
  }
> = Result
type GetExportsQuery<Funcs extends TFunc[], Result extends Record<PropertyKey, unknown> = {}> = (
  Funcs extends [infer Left extends TFunc, ...infer Right extends TFunc[]]
    ? GetExportsQuery<Right, Result & GetExportsFunc<Left>>
    : {[K in keyof Result]: Result[K]}
)
type GetExports<Module extends TModule> = GetExportsQuery<Module['funcs']>

// ---------------------------------------------------
// NativeType
// ---------------------------------------------------
type NativeType = Static.Union<[
  Static.Const<'i32'>,
  Static.Const<'i64'>,
  Static.Const<'f32'>,
  Static.Const<'i64'>
]>
// ---------------------------------------------------
// Param
// ---------------------------------------------------
interface TParam<Name extends string = string, Type extends string = string> {
  kind: 'Param'
  name: Name
  type: Type
}
interface ParamMapping extends Static.IMapping {
  output: this['input'] extends ['(', 'param', infer Name extends string, infer Type extends string, ')']
    ? TParam<Name, Type>
    : never
}
type Param = Static.Tuple<[
  Static.Const<'('>,
  Static.Const<'param'>,
  Static.Ident,
  NativeType,
  Static.Const<')'>
], ParamMapping>
type Params = Static.Array<Param>
// ---------------------------------------------------
// Result
// ---------------------------------------------------
interface TResult<Type extends string = string> {
  kind: 'Result'
  type: Type
}
interface ResultMapping extends Static.IMapping {
  output: this['input'] extends ['(', 'result', infer Type extends string, ')']
    ? TResult<Type>
    : never
}
type Result = Static.Tuple<[
  Static.Const<'('>,
  Static.Const<'result'>,
  NativeType,
  Static.Const<')'>,
], ResultMapping>
// ---------------------------------------------------
// Instruction
// ---------------------------------------------------
type Oprand = Static.Union<[
  Static.Ident,
  Static.Number
]>
interface TInstruction<
  Namespace extends string = string, 
  Operator extends string = string, 
  Operand extends string[] = string[]
> {
  kind: 'Instruction'
  namespace: Namespace
  operator: Operator
  operand: Operand 
}
interface InstructionMapping extends Static.IMapping {
  output: this['input'] extends [infer Namespace extends string, '.', infer Operator extends string, infer Operand extends string[]]
    ? TInstruction<Namespace, Operator, Operand>
    : never
}
type Instruction = Static.Tuple<[
  Static.Union<[NativeType, Static.Const<'local'>]>,
  Static.Const<'.'>,
  Static.Ident,
  Static.Optional<Oprand>
], InstructionMapping>
type Instructions = Static.Array<Instruction>
// ---------------------------------------------------
// Func
// ---------------------------------------------------
interface TFunc<
  Name extends string = string, 
  Params extends TParam[] = TParam[], 
  Result extends TResult = TResult, 
  Instructions extends TInstruction[] = TInstruction[]> {
  kind: 'Func'
  name: Name
  params: Params
  result: Result
  instructions: Instructions
}
interface FuncMapping extends Static.IMapping {
  output: this['input'] extends ['(', 'func', infer Name extends string, infer Params extends TParam[], infer Result extends TResult, infer Instructions extends TInstruction[], ')']
    ? TFunc<Name, Params, Result, Instructions>
    : never
}
type Func = Static.Tuple<[
  Static.Const<'('>,
  Static.Const<'func'>,
  Static.Ident,
  Params,
  Result,
  Instructions,
  Static.Const<')'>
], FuncMapping>
type Funcs = Static.Array<Func>
// ---------------------------------------------------
// Module
// ---------------------------------------------------
interface TModule<Funcs extends TFunc[] = TFunc[]> {
  kind: 'Module'
  funcs: Funcs
}
interface ModuleMapping extends Static.IMapping {
  output: this['input'] extends ['(', 'module', infer Funcs extends TFunc[], ')']
    ? TModule<Funcs>
    : never
}
type Module = Static.Tuple<[
  Static.Const<'('>,
  Static.Const<'module'>,
  Funcs,
  Static.Const<')'>
], ModuleMapping>