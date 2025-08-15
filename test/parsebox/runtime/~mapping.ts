import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Mapping')

const Mapping = (_0: 'A', _1: 'B', _2: 'C') => [_2, _1, _0] as const
const Mapped = Runtime.Tuple([Runtime.Const('A'), Runtime.Const('B'), Runtime.Const('C')], (values) => Mapping(...values))

Test('Should Mapping 1', () => Assert.IsEqual(Runtime.Parse(Mapped, '  A B C '), [['C', 'B', 'A'], ' ']))
