// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'

function Assert<Left, _Right extends Left>(): void {}

// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
Assert<Static.Parse<Static.Array<Static.Const<'A'>>, ''>, [[], '']>()
Assert<Static.Parse<Static.Array<Static.Const<'A'>>, 'AB'>, [['A'], 'B']>()
Assert<Static.Parse<Static.Array<Static.Const<'A'>>, 'AAB'>, [['A', 'A'], 'B']>()
Assert<Static.Parse<Static.Array<Static.Const<'AA'>>, 'AAB'>, [['AA'], 'B']>()
Assert<Static.Parse<Static.Array<Static.Const<'AA'>>, 'AAAB'>, [['AA'], 'AB']>()
Assert<Static.Parse<Static.Array<Static.Const<'AA'>>, 'B'>, [[], 'B']>()

// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
Assert<Static.Parse<Static.Const<'A'>, ''>, []>()
Assert<Static.Parse<Static.Const<'A'>, 'A'>, ['A', '']>()
Assert<Static.Parse<Static.Const<'A'>, '  A'>, ['A', '']>()
Assert<Static.Parse<Static.Const<'A'>, '  A '>, ['A', ' ']>()
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
Assert<Static.Parse<Static.Until<['A']>, ''>, []>()
Assert<Static.Parse<Static.Until<['A']>, 'A'>, ['', 'A']>()
Assert<Static.Parse<Static.Until<['A']>, '  A'>, ['  ', 'A']>()
Assert<Static.Parse<Static.Until<['A']>, '  A '>, ['  ', 'A ']>()

Assert<Static.Parse<Static.Until<['A', 'B']>, ''>, []>
Assert<Static.Parse<Static.Until<['A', 'B']>, 'BA'>, ['', 'BA']>
Assert<Static.Parse<Static.Until<['A', 'B']>, '  BA'>, ['  ', 'BA']>
Assert<Static.Parse<Static.Until<['A', 'B']>, '  BA '>, ['  ', 'BA ']>

// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
Assert<Static.Parse<Static.Ident, ''>, []>()
Assert<Static.Parse<Static.Ident, '0'>, []>()
Assert<Static.Parse<Static.Ident, '#'>, []>()
Assert<Static.Parse<Static.Ident, '_'>, ['_', '']>()
Assert<Static.Parse<Static.Ident, ' _'>, ['_', '']>()
Assert<Static.Parse<Static.Ident, '_ '>, ['_', ' ']>()
Assert<Static.Parse<Static.Ident, ' _ '>, ['_', ' ']>()
Assert<Static.Parse<Static.Ident, '$'>, ['$', '']>()
Assert<Static.Parse<Static.Ident, ' $'>, ['$', '']>()
Assert<Static.Parse<Static.Ident, '$ '>, ['$', ' ']>()
Assert<Static.Parse<Static.Ident, ' $ '>, ['$', ' ']>()
Assert<Static.Parse<Static.Ident, 'A'>, ['A', '']>()
Assert<Static.Parse<Static.Ident, ' A'>, ['A', '']>()
Assert<Static.Parse<Static.Ident, 'A '>, ['A', ' ']>()
Assert<Static.Parse<Static.Ident, ' A '>, ['A', ' ']>()
Assert<Static.Parse<Static.Ident, 'A1'>, ['A1', '']>()
Assert<Static.Parse<Static.Ident, ' A1'>, ['A1', '']>()
Assert<Static.Parse<Static.Ident, 'A1 '>, ['A1', ' ']>()
Assert<Static.Parse<Static.Ident, ' A1 '>, ['A1', ' ']>()

// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
Assert<Static.Parse<Static.Number, ''>, []>()
Assert<Static.Parse<Static.Number, '01'>, []>()
Assert<Static.Parse<Static.Number, ' 01'>, []>()
Assert<Static.Parse<Static.Number, '01 '>, []>()
Assert<Static.Parse<Static.Number, ' 01 '>, []>()
Assert<Static.Parse<Static.Number, '0'>, ['0', '']>()
Assert<Static.Parse<Static.Number, '0 '>, ['0', ' ']>()
Assert<Static.Parse<Static.Number, ' 0'>, ['0', '']>()
Assert<Static.Parse<Static.Number, ' 0 '>, ['0', ' ']>()
Assert<Static.Parse<Static.Number, '-0'>, ['-0', '']>()
Assert<Static.Parse<Static.Number, '-0 '>, ['-0', ' ']>()
Assert<Static.Parse<Static.Number, ' -0'>, ['-0', '']>()
Assert<Static.Parse<Static.Number, ' -0 '>, ['-0', ' ']>()
Assert<Static.Parse<Static.Number, '100'>, ['100', '']>()
Assert<Static.Parse<Static.Number, '100 '>, ['100', ' ']>()
Assert<Static.Parse<Static.Number, ' 100'>, ['100', '']>()
Assert<Static.Parse<Static.Number, ' 100 '>, ['100', ' ']>()
Assert<Static.Parse<Static.Number, '-100'>, ['-100', '']>()
Assert<Static.Parse<Static.Number, '-100 '>, ['-100', ' ']>()
Assert<Static.Parse<Static.Number, ' -100'>, ['-100', '']>()
Assert<Static.Parse<Static.Number, ' -100 '>, ['-100', ' ']>()
Assert<Static.Parse<Static.Number, '0.1'>, ['0.1', '']>()
Assert<Static.Parse<Static.Number, '0.1 '>, ['0.1', ' ']>()
Assert<Static.Parse<Static.Number, ' 0.1'>, ['0.1', '']>()
Assert<Static.Parse<Static.Number, ' 0.1 '>, ['0.1', ' ']>()
Assert<Static.Parse<Static.Number, '100.1'>, ['100.1', '']>()
Assert<Static.Parse<Static.Number, '100.1 '>, ['100.1', ' ']>()
Assert<Static.Parse<Static.Number, ' 100.1'>, ['100.1', '']>()
Assert<Static.Parse<Static.Number, ' 100.1 '>, ['100.1', ' ']>()
Assert<Static.Parse<Static.Number, '-100.1'>, ['-100.1', '']>()
Assert<Static.Parse<Static.Number, '-100.1 '>, ['-100.1', ' ']>()
Assert<Static.Parse<Static.Number, ' -100.1'>, ['-100.1', '']>()
Assert<Static.Parse<Static.Number, ' -100.1 '>, ['-100.1', ' ']>()
Assert<Static.Parse<Static.Number, '100.1.1'>, ['100.1', '.1']>()
Assert<Static.Parse<Static.Number, '100.1.1 '>, ['100.1', '.1 ']>()
Assert<Static.Parse<Static.Number, ' 100.1.1'>, ['100.1', '.1']>()
Assert<Static.Parse<Static.Number, ' 100.1.1 '>, ['100.1', '.1 ']>()
Assert<Static.Parse<Static.Number, '-.1'>, ['-.1', '']>()
Assert<Static.Parse<Static.Number, '-.1 '>, ['-.1', ' ']>()
Assert<Static.Parse<Static.Number, ' -.1'>, ['-.1', '']>()
Assert<Static.Parse<Static.Number, ' -.1 '>, ['-.1', ' ']>()
Assert<Static.Parse<Static.Number, '-0.1'>, ['-0.1', '']>()
Assert<Static.Parse<Static.Number, '-0.1 '>, ['-0.1', ' ']>()
Assert<Static.Parse<Static.Number, ' -0.1'>, ['-0.1', '']>()
Assert<Static.Parse<Static.Number, ' -0.1 '>, ['-0.1', ' ']>()

// ------------------------------------------------------------------
// Optional
// ------------------------------------------------------------------
Assert<Static.Parse<Static.Optional<Static.Const<'A'>>, ''>, [[], '']>()
Assert<Static.Parse<Static.Optional<Static.Const<'A'>>, 'A'>, [['A'], '']>()
Assert<Static.Parse<Static.Optional<Static.Const<'A'>>, 'AA'>, [['A'], 'A']>()
Assert<Static.Parse<Static.Optional<Static.Const<'A'>>, 'B'>, [[], 'B']>()

// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
Assert<Static.Parse<Static.String<['"']>, ''>, []>()
Assert<Static.Parse<Static.String<['"']>, '"A"'>, ['A', '']>()
Assert<Static.Parse<Static.String<['"']>, ' "A"'>, ['A', '']>()
Assert<Static.Parse<Static.String<['"']>, '"A" '>, ['A', ' ']>()
Assert<Static.Parse<Static.String<['"']>, ' "A" '>, ['A', ' ']>()
Assert<Static.Parse<Static.String<['*', '"']>, ''>, []>()
Assert<Static.Parse<Static.String<['*', '"']>, '*A*'>, ['A', '']>()
Assert<Static.Parse<Static.String<['*', '"']>, ' *A*'>, ['A', '']>()
Assert<Static.Parse<Static.String<['*', '"']>, '*A* '>, ['A', ' ']>()
Assert<Static.Parse<Static.String<['*', '"']>, ' *A* '>, ['A', ' ']>()
Assert<Static.Parse<Static.String<['*', '"']>, '"A"'>, ['A', '']>()
Assert<Static.Parse<Static.String<['*', '"']>, ' "A"'>, ['A', '']>()
Assert<Static.Parse<Static.String<['*', '"']>, '"A" '>, ['A', ' ']>()
Assert<Static.Parse<Static.String<['*', '"']>, ' "A" '>, ['A', ' ']>()

// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
type Tuple = Static.Tuple<[Static.Const<'A'>, Static.Const<'B'>, Static.Const<'C'>]>

Assert<Static.Parse<Tuple, ''>, []>()
Assert<Static.Parse<Tuple, 'A'>, []>()
Assert<Static.Parse<Tuple, 'A B C'>, [['A', 'B', 'C'], '']>()
Assert<Static.Parse<Tuple, 'A B C '>, [['A', 'B', 'C'], ' ']>()
Assert<Static.Parse<Tuple, 'ABC'>, [['A', 'B', 'C'], '']>()
Assert<Static.Parse<Tuple, '  ABC'>, [['A', 'B', 'C'], '']>()
Assert<Static.Parse<Tuple, '  ABC '>, [['A', 'B', 'C'], ' ']>()

// ------------------------------------------------------------------
// Union
// ------------------------------------------------------------------
type Union = Static.Union<[Static.Const<'A'>, Static.Const<'B'>, Static.Const<'C'>]>

Assert<Static.Parse<Union, ''>, []>()
Assert<Static.Parse<Union, 'A B C'>, ['A', ' B C']>()
Assert<Static.Parse<Union, 'A B C '>, ['A', ' B C ']>()
Assert<Static.Parse<Union, 'ABC'>, ['A', 'BC']>()
Assert<Static.Parse<Union, '  ABC'>, ['A', 'BC']>()
Assert<Static.Parse<Union, '  ABC '>, ['A', 'BC ']>()
Assert<Static.Parse<Union, 'B B C'>, ['B', ' B C']>()
Assert<Static.Parse<Union, 'B B C '>, ['B', ' B C ']>()
Assert<Static.Parse<Union, 'BBC'>, ['B', 'BC']>()
Assert<Static.Parse<Union, '  BBC'>, ['B', 'BC']>()
Assert<Static.Parse<Union, '  BBC '>, ['B', 'BC ']>()

// ------------------------------------------------------------------
// Mapping
// ------------------------------------------------------------------
interface Mapping extends Static.IMapping {
  output: this['input'] extends [infer A, infer B, infer C] ? [C, B, A] : never
}

type Mapped = Static.Tuple<[Static.Const<'A'>, Static.Const<'B'>, Static.Const<'C'>], Mapping>

Assert<Static.Parse<Mapped, '  A B C '>, [['C', 'B', 'A'], ' ']>()

// ------------------------------------------------------------------
// Context
// ------------------------------------------------------------------
// 'Context: Global'
{
  interface ContextMapping extends Static.IMapping {
    output: this['input'] extends keyof this['context'] ? this['context'][this['input']] : never
  }
  
  type Context = Static.Union<[Static.Const<'A'>, Static.Const<'B'>, Static.Const<'C'>], ContextMapping>

  Assert<
    Static.Parse<
      Context,
      'C',
      {
        A: 'Matched Foo'
        B: 'Matched Bar'
        C: 'Matched Baz'
      }
    >,
    ['Matched Baz', '']
  >()
}
// 'Context: Right Receive Left Context'
{
  interface B_Mapping extends Static.IMapping {
    output: [this['context'], this['input']] extends [infer Context, infer Value] ? [Context, Value] : never
  }
  type A = Static.Const<'A'>
  type B = Static.Const<'B', B_Mapping>
  type C = Static.Context<A, B>
  type R = Static.Parse<C, 'A B  E'>
  Assert<R, [['A', 'B'], '  E']>
}
// 'Context: Left Appends Global Context'
{
  interface A_Mapping extends Static.IMapping {
    output: [this['context'], this['input']] extends [infer Context extends unknown[], infer Value] ? [...Context, Value] : never
  }
  interface B_Mapping extends Static.IMapping {
    output: [this['context'], this['input']] extends [infer Context, infer Value] ? [Context, Value] : never
  }
  type A = Static.Const<'A', A_Mapping>
  type B = Static.Const<'B', B_Mapping>
  type C = Static.Context<A, B>
  type R = Static.Parse<C, 'A B  E', ['X']>
  Assert<R, [[['X', 'A'], 'B'], '  E']>
}
// 'Context: Context Is Mappable'
{
  interface B_Mapping extends Static.IMapping {
    output: [this['context'], this['input']] extends [infer Context, infer Value] ? [Context, Value] : never
  }
  interface C_Mapping extends Static.IMapping {
    output: this['input'] extends [infer Left, infer Right] ? [Right, Left] : never
  }
  type A = Static.Const<'A'>
  type B = Static.Const<'B', B_Mapping>
  type C = Static.Context<A, B, C_Mapping>
  type R = Static.Parse<C, 'A B  E'>
  Assert<R, [['B', 'A'], '  E']>
}
// 'Context: Left Fail'
{
  type A = Static.Const<'A'>
  type B = Static.Const<'B'>
  type C = Static.Context<A, B>
  type R = Static.Parse<C, 'X B'>
  Assert<R, []>
}
// 'Context: Right Fail'
{
  type A = Static.Const<'A'>
  type B = Static.Const<'B'>
  type C = Static.Context<A, B>
  type R = Static.Parse<C, 'A X'>
  Assert<R, []>
}
// 'Context: Rest'
{
  type A = Static.Const<'A'>
  type B = Static.Const<'B'>
  type C = Static.Context<A, B>
  type R = Static.Parse<C, 'A B C D'>
  Assert<R, ['B', ' C D']>
}
