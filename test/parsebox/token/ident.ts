import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.Ident')

Test('Should Ident 1', () => Assert.IsExact(Token.Ident(''), []))
Test('Should Ident 2', () => Assert.IsExact(Token.Ident('0'), []))
Test('Should Ident 3', () => Assert.IsExact(Token.Ident('#'), []))
Test('Should Ident 4', () => Assert.IsExact(Token.Ident('_'), ['_', '']))
Test('Should Ident 5', () => Assert.IsExact(Token.Ident(' _'), ['_', '']))
Test('Should Ident 6', () => Assert.IsExact(Token.Ident('_ '), ['_', ' ']))
Test('Should Ident 7', () => Assert.IsExact(Token.Ident(' _ '), ['_', ' ']))
Test('Should Ident 8', () => Assert.IsExact(Token.Ident('$'), ['$', '']))
Test('Should Ident 9', () => Assert.IsExact(Token.Ident(' $'), ['$', '']))
Test('Should Ident 10', () => Assert.IsExact(Token.Ident('$ '), ['$', ' ']))
Test('Should Ident 11', () => Assert.IsExact(Token.Ident(' $ '), ['$', ' ']))
Test('Should Ident 12', () => Assert.IsExact(Token.Ident('A'), ['A', '']))
Test('Should Ident 13', () => Assert.IsExact(Token.Ident(' A'), ['A', '']))
Test('Should Ident 14', () => Assert.IsExact(Token.Ident('A '), ['A', ' ']))
Test('Should Ident 15', () => Assert.IsExact(Token.Ident(' A '), ['A', ' ']))
Test('Should Ident 16', () => Assert.IsExact(Token.Ident('A1'), ['A1', '']))
Test('Should Ident 17', () => Assert.IsExact(Token.Ident(' A1'), ['A1', '']))
Test('Should Ident 18', () => Assert.IsExact(Token.Ident('A1 '), ['A1', ' ']))
Test('Should Ident 19', () => Assert.IsExact(Token.Ident(' A1 '), ['A1', ' ']))
