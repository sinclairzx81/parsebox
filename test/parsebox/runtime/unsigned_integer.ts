import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.UnsignedInteger')

Test('Should UnsignedInteger 1', () => Assert.IsEqual(Runtime.Parse(Runtime.UnsignedInteger(), '-0'), []))
Test('Should UnsignedInteger 2', () => Assert.IsEqual(Runtime.Parse(Runtime.UnsignedInteger(), '0'), ['0', '']))
Test('Should UnsignedInteger 3', () => Assert.IsEqual(Runtime.Parse(Runtime.UnsignedInteger(), '00'), ['0', '0']))
Test('Should UnsignedInteger 4', () => Assert.IsEqual(Runtime.Parse(Runtime.UnsignedInteger(), '10'), ['10', '']))
Test('Should UnsignedInteger 5', () => Assert.IsEqual(Runtime.Parse(Runtime.UnsignedInteger(), ' 0'), ['0', '']))
