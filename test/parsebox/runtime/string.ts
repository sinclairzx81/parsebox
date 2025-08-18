import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.String')

Test('Should String 1', () => Assert.IsEqual(Runtime.Parse(Runtime.String([`'`, `"`]), ''), []))
Test('Should String 2', () => Assert.IsEqual(Runtime.Parse(Runtime.String([`'`, `"`]), '"A"'), ['A', '']))
Test('Should String 3', () => Assert.IsEqual(Runtime.Parse(Runtime.String([`'`, `"`]), ' "A"'), ['A', '']))
Test('Should String 4', () => Assert.IsEqual(Runtime.Parse(Runtime.String([`'`, `"`]), '"A" '), ['A', ' ']))
Test('Should String 5', () => Assert.IsEqual(Runtime.Parse(Runtime.String([`'`, `"`]), ' "A" '), ['A', ' ']))
