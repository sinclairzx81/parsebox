import { Runtime } from '@sinclair/parsebox'
import { Assert } from './assert.ts'

// ----------------------------------------------------------------
// Array
// ----------------------------------------------------------------
Deno.test('Array', () => {
  Assert(Runtime.Parse(Runtime.Array(Runtime.Const('A')), ''), [[], ''])
  Assert(Runtime.Parse(Runtime.Array(Runtime.Const('A')), 'AB'), [['A'], 'B'])
  Assert(Runtime.Parse(Runtime.Array(Runtime.Const('A')), 'AAB'), [['A', 'A'], 'B'])
  Assert(Runtime.Parse(Runtime.Array(Runtime.Const('AA')), 'AAB'), [['AA'], 'B'])
  Assert(Runtime.Parse(Runtime.Array(Runtime.Const('AA')), 'AAAB'), [['AA'], 'AB'])
  Assert(Runtime.Parse(Runtime.Array(Runtime.Const('AA')), 'B'), [[], 'B'])
})
// ----------------------------------------------------------------
// Const
// ----------------------------------------------------------------
Deno.test('Const', () => {
  Assert(Runtime.Parse(Runtime.Const('A'), ''), [])
  Assert(Runtime.Parse(Runtime.Const('A'), 'A'), ['A', ''])
  Assert(Runtime.Parse(Runtime.Const('A'), '  A'), ['A', ''])
  Assert(Runtime.Parse(Runtime.Const('A'), '  A '), ['A', ' '])
})
// ----------------------------------------------------------------
// Until
// ----------------------------------------------------------------
Deno.test('Until', () => {
  Assert(Runtime.Parse(Runtime.Until('A'), ''), [])
  Assert(Runtime.Parse(Runtime.Until('A'), 'A'), ['', 'A'])
  Assert(Runtime.Parse(Runtime.Until('A'), '  A'), ['  ', 'A'])
  Assert(Runtime.Parse(Runtime.Until('A'), '  A '), ['  ', 'A '])
})
// ----------------------------------------------------------------
// Ident
// ----------------------------------------------------------------
Deno.test('Ident', () => {
  Assert(Runtime.Parse(Runtime.Ident(), ''), [])
  Assert(Runtime.Parse(Runtime.Ident(), '0'), [])
  Assert(Runtime.Parse(Runtime.Ident(), '#'), [])
  Assert(Runtime.Parse(Runtime.Ident(), '_'), ['_', ''])
  Assert(Runtime.Parse(Runtime.Ident(), ' _'), ['_', ''])
  Assert(Runtime.Parse(Runtime.Ident(), '_ '), ['_', ' '])
  Assert(Runtime.Parse(Runtime.Ident(), ' _ '), ['_', ' '])
  Assert(Runtime.Parse(Runtime.Ident(), '$'), ['$', ''])
  Assert(Runtime.Parse(Runtime.Ident(), ' $'), ['$', ''])
  Assert(Runtime.Parse(Runtime.Ident(), '$ '), ['$', ' '])
  Assert(Runtime.Parse(Runtime.Ident(), ' $ '), ['$', ' '])
  Assert(Runtime.Parse(Runtime.Ident(), 'A'), ['A', ''])
  Assert(Runtime.Parse(Runtime.Ident(), ' A'), ['A', ''])
  Assert(Runtime.Parse(Runtime.Ident(), 'A '), ['A', ' '])
  Assert(Runtime.Parse(Runtime.Ident(), ' A '), ['A', ' '])
  Assert(Runtime.Parse(Runtime.Ident(), 'A1'), ['A1', ''])
  Assert(Runtime.Parse(Runtime.Ident(), ' A1'), ['A1', ''])
  Assert(Runtime.Parse(Runtime.Ident(), 'A1 '), ['A1', ' '])
  Assert(Runtime.Parse(Runtime.Ident(), ' A1 '), ['A1', ' '])
})
// ----------------------------------------------------------------
// Number
// ----------------------------------------------------------------
Deno.test('Number', () => {
  Assert(Runtime.Parse(Runtime.Number(), ''), [])
  Assert(Runtime.Parse(Runtime.Number(), '01'), [])
  Assert(Runtime.Parse(Runtime.Number(), ' 01'), [])
  Assert(Runtime.Parse(Runtime.Number(), '01 '), [])
  Assert(Runtime.Parse(Runtime.Number(), ' 01 '), [])
  Assert(Runtime.Parse(Runtime.Number(), '0'), ['0', ''])
  Assert(Runtime.Parse(Runtime.Number(), '0 '), ['0', ' '])
  Assert(Runtime.Parse(Runtime.Number(), ' 0'), ['0', ''])
  Assert(Runtime.Parse(Runtime.Number(), ' 0 '), ['0', ' '])
  Assert(Runtime.Parse(Runtime.Number(), '-0'), ['-0', ''])
  Assert(Runtime.Parse(Runtime.Number(), '-0 '), ['-0', ' '])
  Assert(Runtime.Parse(Runtime.Number(), ' -0'), ['-0', ''])
  Assert(Runtime.Parse(Runtime.Number(), ' -0 '), ['-0', ' '])
  Assert(Runtime.Parse(Runtime.Number(), '100'), ['100', ''])
  Assert(Runtime.Parse(Runtime.Number(), '100 '), ['100', ' '])
  Assert(Runtime.Parse(Runtime.Number(), ' 100'), ['100', ''])
  Assert(Runtime.Parse(Runtime.Number(), ' 100 '), ['100', ' '])
  Assert(Runtime.Parse(Runtime.Number(), '-100'), ['-100', ''])
  Assert(Runtime.Parse(Runtime.Number(), '-100 '), ['-100', ' '])
  Assert(Runtime.Parse(Runtime.Number(), ' -100'), ['-100', ''])
  Assert(Runtime.Parse(Runtime.Number(), ' -100 '), ['-100', ' '])
  Assert(Runtime.Parse(Runtime.Number(), '0.1'), ['0.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), '0.1 '), ['0.1', ' '])
  Assert(Runtime.Parse(Runtime.Number(), ' 0.1'), ['0.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), ' 0.1 '), ['0.1', ' '])
  Assert(Runtime.Parse(Runtime.Number(), '100.1'), ['100.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), '100.1 '), ['100.1', ' '])
  Assert(Runtime.Parse(Runtime.Number(), ' 100.1'), ['100.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), ' 100.1 '), ['100.1', ' '])
  Assert(Runtime.Parse(Runtime.Number(), '-100.1'), ['-100.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), '-100.1 '), ['-100.1', ' '])
  Assert(Runtime.Parse(Runtime.Number(), ' -100.1'), ['-100.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), ' -100.1 '), ['-100.1', ' '])
  Assert(Runtime.Parse(Runtime.Number(), '100.1.1'), ['100.1', '.1'])
  Assert(Runtime.Parse(Runtime.Number(), '100.1.1 '), ['100.1', '.1 '])
  Assert(Runtime.Parse(Runtime.Number(), ' 100.1.1'), ['100.1', '.1'])
  Assert(Runtime.Parse(Runtime.Number(), ' 100.1.1 '), ['100.1', '.1 '])
  Assert(Runtime.Parse(Runtime.Number(), '-.1'), ['-.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), '-.1 '), ['-.1', ' '])
  Assert(Runtime.Parse(Runtime.Number(), ' -.1'), ['-.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), ' -.1 '), ['-.1', ' '])
  Assert(Runtime.Parse(Runtime.Number(), '-0.1'), ['-0.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), '-0.1 '), ['-0.1', ' '])
  Assert(Runtime.Parse(Runtime.Number(), ' -0.1'), ['-0.1', ''])
  Assert(Runtime.Parse(Runtime.Number(), ' -0.1 '), ['-0.1', ' '])
})
// ----------------------------------------------------------------
// Optional
// ----------------------------------------------------------------
Deno.test('Optional', () => {
  Assert(Runtime.Parse(Runtime.Optional(Runtime.Const('A')), ''), [[], ''])
  Assert(Runtime.Parse(Runtime.Optional(Runtime.Const('A')), 'A'), [['A'], ''])
  Assert(Runtime.Parse(Runtime.Optional(Runtime.Const('A')), 'AA'), [['A'], 'A'])
  Assert(Runtime.Parse(Runtime.Optional(Runtime.Const('A')), 'B'), [[], 'B'])
})
// ----------------------------------------------------------------
// String
// ----------------------------------------------------------------
Deno.test('String', () => {
  Assert(Runtime.Parse(Runtime.String(['"']), ''), [])
  Assert(Runtime.Parse(Runtime.String(['"']), '"A"'), ['A', ''])
  Assert(Runtime.Parse(Runtime.String(['"']), ' "A"'), ['A', ''])
  Assert(Runtime.Parse(Runtime.String(['"']), '"A" '), ['A', ' '])
  Assert(Runtime.Parse(Runtime.String(['"']), ' "A" '), ['A', ' '])
  Assert(Runtime.Parse(Runtime.String(['*', '"']), ''), [])
  Assert(Runtime.Parse(Runtime.String(['*', '"']), '*A*'), ['A', ''])
  Assert(Runtime.Parse(Runtime.String(['*', '"']), ' *A*'), ['A', ''])
  Assert(Runtime.Parse(Runtime.String(['*', '"']), '*A* '), ['A', ' '])
  Assert(Runtime.Parse(Runtime.String(['*', '"']), ' *A* '), ['A', ' '])
  Assert(Runtime.Parse(Runtime.String(['*', '"']), '"A"'), ['A', ''])
  Assert(Runtime.Parse(Runtime.String(['*', '"']), ' "A"'), ['A', ''])
  Assert(Runtime.Parse(Runtime.String(['*', '"']), '"A" '), ['A', ' '])
  Assert(Runtime.Parse(Runtime.String(['*', '"']), ' "A" '), ['A', ' '])
})
// ----------------------------------------------------------------
// Tuple
// ----------------------------------------------------------------
Deno.test('Tuple', () => {
  const Tuple = Runtime.Tuple([Runtime.Const('A'), Runtime.Const('B'), Runtime.Const('C')])
  Assert(Runtime.Parse(Tuple, ''), [])
  Assert(Runtime.Parse(Tuple, 'A'), [])
  Assert(Runtime.Parse(Tuple, 'A B C'), [['A', 'B', 'C'], ''])
  Assert(Runtime.Parse(Tuple, 'A B C '), [['A', 'B', 'C'], ' '])
  Assert(Runtime.Parse(Tuple, 'ABC'), [['A', 'B', 'C'], ''])
  Assert(Runtime.Parse(Tuple, '  ABC'), [['A', 'B', 'C'], ''])
  Assert(Runtime.Parse(Tuple, '  ABC '), [['A', 'B', 'C'], ' '])
})
// ----------------------------------------------------------------
// Union
// ----------------------------------------------------------------
Deno.test('Union', () => {
  const Union = Runtime.Union([Runtime.Const('A'), Runtime.Const('B'), Runtime.Const('C')])
  Assert(Runtime.Parse(Union, ''), [])
  Assert(Runtime.Parse(Union, 'A B C'), ['A', ' B C'])
  Assert(Runtime.Parse(Union, 'A B C '), ['A', ' B C '])
  Assert(Runtime.Parse(Union, 'ABC'), ['A', 'BC'])
  Assert(Runtime.Parse(Union, '  ABC'), ['A', 'BC'])
  Assert(Runtime.Parse(Union, '  ABC '), ['A', 'BC '])
  Assert(Runtime.Parse(Union, 'B B C'), ['B', ' B C'])
  Assert(Runtime.Parse(Union, 'B B C '), ['B', ' B C '])
  Assert(Runtime.Parse(Union, 'BBC'), ['B', 'BC'])
  Assert(Runtime.Parse(Union, '  BBC'), ['B', 'BC'])
  Assert(Runtime.Parse(Union, '  BBC '), ['B', 'BC '])
})
// ----------------------------------------------------------------
// Mapping
// ----------------------------------------------------------------
Deno.test('Mapping', () => {
  const Mapping = (_0: 'A', _1: 'B', _2: 'C') => [_2, _1, _0] as const
  const Mapped = Runtime.Tuple([Runtime.Const('A'), Runtime.Const('B'), Runtime.Const('C')], values => Mapping(...values))
  Assert(Runtime.Parse(Mapped, '  A B C '), [['C', 'B', 'A'], ' '])
})
// ----------------------------------------------------------------
// Context
// ----------------------------------------------------------------
Deno.test('Context: Global', () => {
  const ContextMapping = (input: 'A' | 'B' | 'C', context: Record<string, string>) => {
    return input in context 
      ? context[input] 
      : void 0
  }
  const Context = Runtime.Union([
    Runtime.Const('A'),
    Runtime.Const('B'),
    Runtime.Const('C')
  ], ContextMapping)

  Assert(Runtime.Parse(Context, 'C', {
    A: 'Matched Foo',
    B: 'Matched Bar',
    C: 'Matched Baz',
  }), ['Matched Baz', ''])
})
Deno.test('Context: Right Receive Left Context', () => {
  const A = Runtime.Const('A')
  const B = Runtime.Const('B', (value, context) => [context, value])
  const C = Runtime.Context(A, B)
  const R = Runtime.Parse(C, 'A B  E')
  Assert(R, [['A', 'B'], '  E'])
})
Deno.test('Context: Left Appends Global Context', () => {
  const A = Runtime.Const('A', (value, context) => [...context, value]) // Push ['X'] -> ['X', 'A']
  const B = Runtime.Const('B', (value, context) => [context, value])
  const C = Runtime.Context(A, B)
  const R = Runtime.Parse(C, 'A B  E', ['X']) // ['X'] is Global
  Assert(R, [ [ [ 'X', 'A' ], 'B' ], '  E' ])
})
Deno.test('Context: Context Is Mappable', () => {
  const A = Runtime.Const('A')
  const B = Runtime.Const('B', (value, context) => [context, value])
  const C = Runtime.Context(A, B, (value) => [value[1], value[0]])
  const R = Runtime.Parse(C, 'A B  E')
  Assert(R, [['B', 'A'], '  E'])
})
Deno.test('Context: Left Fail', () => {
  const A = Runtime.Const('A')
  const B = Runtime.Const('B')
  const C = Runtime.Context(A, B)
  const R = Runtime.Parse(C, 'X B')
  Assert(R, [])
})
Deno.test('Context: Right Fail', () => {
  const A = Runtime.Const('A')
  const B = Runtime.Const('B')
  const C = Runtime.Context(A, B)
  const R = Runtime.Parse(C, 'A X')
  Assert(R, [])
})
Deno.test('Context: Rest', () => {
  const A = Runtime.Const('A')
  const B = Runtime.Const('B')
  const C = Runtime.Context(A, B)
  const R = Runtime.Parse(C, 'A B C D')
  Assert(R, ['B', ' C D'])
})

