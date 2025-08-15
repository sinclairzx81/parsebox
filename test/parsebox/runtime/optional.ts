import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Optional')

Test('Should Optional 1', () => Assert.IsEqual(Runtime.Parse(Runtime.Optional(Runtime.Const('A')), ''), [[], '']))
Test('Should Optional 2', () => Assert.IsEqual(Runtime.Parse(Runtime.Optional(Runtime.Const('A')), 'A'), [['A'], '']))
Test('Should Optional 3', () => Assert.IsEqual(Runtime.Parse(Runtime.Optional(Runtime.Const('A')), 'AA'), [['A'], 'A']))
Test('Should Optional 4', () => Assert.IsEqual(Runtime.Parse(Runtime.Optional(Runtime.Const('A')), 'B'), [[], 'B']))
