import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Array')

Test('Should Array 1', () => Assert.IsEqual(Runtime.Parse(Runtime.Array(Runtime.Const('A')), ''), [[], '']))
Test('Should Array 2', () => Assert.IsEqual(Runtime.Parse(Runtime.Array(Runtime.Const('A')), 'AB'), [['A'], 'B']))
Test('Should Array 3', () => Assert.IsEqual(Runtime.Parse(Runtime.Array(Runtime.Const('A')), 'AAB'), [['A', 'A'], 'B']))
Test('Should Array 4', () => Assert.IsEqual(Runtime.Parse(Runtime.Array(Runtime.Const('AA')), 'AAB'), [['AA'], 'B']))
Test('Should Array 5', () => Assert.IsEqual(Runtime.Parse(Runtime.Array(Runtime.Const('AA')), 'AAAB'), [['AA'], 'AB']))
Test('Should Array 6', () => Assert.IsEqual(Runtime.Parse(Runtime.Array(Runtime.Const('AA')), 'B'), [[], 'B']))
