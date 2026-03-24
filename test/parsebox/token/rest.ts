import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.Rest')

Test('Should Rest 1', () => Assert.IsExact(Token.Rest(''), []))
Test('Should Rest 2', () => Assert.IsExact(Token.Rest('0'), ['0', '']))
Test('Should Rest 3', () => Assert.IsExact(Token.Rest('00'), ['00', '']))
Test('Should Rest 4', () => Assert.IsExact(Token.Rest('000'), ['000', '']))
Test('Should Rest 5', () => Assert.IsExact(Token.Rest(' 000'), [' 000', '']))
Test('Should Rest 6', () => Assert.IsExact(Token.Rest(' 00'), [' 00', '']))
Test('Should Rest 7', () => Assert.IsExact(Token.Rest(' 0'), [' 0', '']))
Test('Should Rest 8', () => Assert.IsExact(Token.Rest('000 '), ['000 ', '']))
Test('Should Rest 9', () => Assert.IsExact(Token.Rest('00 '), ['00 ', '']))
Test('Should Rest 10', () => Assert.IsExact(Token.Rest('0 '), ['0 ', '']))
Test('Should Rest 11', () => Assert.IsExact(Token.Rest(' 000 '), [' 000 ', '']))
Test('Should Rest 12', () => Assert.IsExact(Token.Rest(' 00 '), [' 00 ', '']))
Test('Should Rest 13', () => Assert.IsExact(Token.Rest(' 0 '), [' 0 ', '']))
