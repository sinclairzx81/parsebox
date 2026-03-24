import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Rest')

Test('Should Rest 1', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), ''), []))
Test('Should Rest 2', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), '0'), ['0', '']))
Test('Should Rest 3', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), '00'), ['00', '']))
Test('Should Rest 4', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), '000'), ['000', '']))
Test('Should Rest 5', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), ' 000'), [' 000', '']))
Test('Should Rest 6', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), ' 00'), [' 00', '']))
Test('Should Rest 7', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), ' 0'), [' 0', '']))
Test('Should Rest 8', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), '000 '), ['000 ', '']))
Test('Should Rest 9', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), '00 '), ['00 ', '']))
Test('Should Rest 10', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), '0 '), ['0 ', '']))
Test('Should Rest 11', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), ' 000 '), [' 000 ', '']))
Test('Should Rest 12', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), ' 00 '), [' 00 ', '']))
Test('Should Rest 13', () => Assert.IsEqual(Runtime.Parse(Runtime.Rest(), ' 0 '), [' 0 ', '']))
