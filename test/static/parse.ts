import { Static } from '@sinclair/parsebox'

declare function Assert<Left, _Right extends Left>(): void

// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
// prettier-ignore
Assert<Static.Parse<Static.Const<'A'>, ''>, []>()
Assert<Static.Parse<Static.Const<'A'>, 'A'>, ['A', '']>()
Assert<Static.Parse<Static.Const<'A'>, '  A'>, ['A', '']>()
Assert<Static.Parse<Static.Const<'A'>, '  A '>, ['A', ' ']>()

// ------------------------------------------------------------------
// Tuple
// ------------------------------------------------------------------
// prettier-ignore
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
// prettier-ignore
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
// Mapping
// ------------------------------------------------------------------
interface Mapping extends Static.IMapping {
  output: this['input'] extends [infer A, infer B, infer C] ? [C, B, A] : never
}
// prettier-ignore
type Mapped = Static.Tuple<[Static.Const<'A'>, Static.Const<'B'>, Static.Const<'C'>], Mapping>

Assert<Static.Parse<Mapped, '  A B C '>, [['C', 'B', 'A'], ' ']>()

// ------------------------------------------------------------------
// Context
// ------------------------------------------------------------------
interface ContextMapping extends Static.IMapping {
  output: this['input'] extends keyof this['context'] ? this['context'][this['input']] : never
}
// prettier-ignore
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
