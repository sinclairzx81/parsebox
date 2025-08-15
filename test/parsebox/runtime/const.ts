import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Const')

Test('Should Const 1', () => Assert.IsEqual(Runtime.Parse(Runtime.Const('A'), ''), []))
Test('Should Const 2', () => Assert.IsEqual(Runtime.Parse(Runtime.Const('A'), 'A'), ['A', '']))
Test('Should Const 3', () => Assert.IsEqual(Runtime.Parse(Runtime.Const('A'), '  A'), ['A', '']))
Test('Should Const 4', () => Assert.IsEqual(Runtime.Parse(Runtime.Const('A'), '  A '), ['A', ' ']))
