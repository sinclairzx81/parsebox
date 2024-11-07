import { Runtime } from '@sinclair/parsebox'
import { deepStrictEqual } from 'node:assert'

function Assert(left: unknown, right: unknown) {
  deepStrictEqual(left, right)
}
// prettier-ignore
describe('Parse', () => {
  it('Const', () => {
    Assert(Runtime.Parse(Runtime.Const('A'), ''), [])
    Assert(Runtime.Parse(Runtime.Const('A'), 'A'), ['A', ''])
    Assert(Runtime.Parse(Runtime.Const('A'), '  A'), ['A', ''])
    Assert(Runtime.Parse(Runtime.Const('A'), '  A '), ['A', ' '])
  })
  it('Tuple', () => {
    const Tuple = Runtime.Tuple([Runtime.Const('A'), Runtime.Const('B'), Runtime.Const('C')])
    Assert(Runtime.Parse(Tuple, ''), [])
    Assert(Runtime.Parse(Tuple, 'A'), [])
    Assert(Runtime.Parse(Tuple, 'A B C'), [['A', 'B', 'C'], ''])
    Assert(Runtime.Parse(Tuple, 'A B C '), [['A', 'B', 'C'], ' '])
    Assert(Runtime.Parse(Tuple, 'ABC'), [['A', 'B', 'C'], ''])
    Assert(Runtime.Parse(Tuple, '  ABC'), [['A', 'B', 'C'], ''])
    Assert(Runtime.Parse(Tuple, '  ABC '), [['A', 'B', 'C'], ' '])
  })
  it('Union', () => {
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
  it('Number', () => {
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
  it('String', () => {
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
  it('Ident', () => {
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
  it('Mapping', () => {
    const Mapping = (_0: 'A', _1: 'B', _2: 'C') => [_2, _1, _0] as const
    const Mapped = Runtime.Tuple([Runtime.Const('A'), Runtime.Const('B'), Runtime.Const('C')], values => Mapping(...values))
    Assert(Runtime.Parse(Mapped, '  A B C '), [['C', 'B', 'A'], ' '])
  })
  it('Context', () => {
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
})
