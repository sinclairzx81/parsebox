import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.Span')

// ------------------------------------------------------------------
// SingleLine and MultiLine should be identical with the exception
// that SingleLine will fail if it encounters a NewLine
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// SingleLine
// ------------------------------------------------------------------
Test('Should SingleLine Span 1', () => Assert.IsExact(Token.Span('(', ')', false, '  (hel\nlo) 1'), []))
Test('Should SingleLine Span 2', () => Assert.IsExact(Token.Span('(', ')', false, '  (\n) 1'), []))
Test('Should SingleLine Span 3', () => Assert.IsExact(Token.Span('(', ')', false, '()1'), ['', '1']))
Test('Should SingleLine Span 4', () => Assert.IsExact(Token.Span('(', ')', false, '() 1'), ['', ' 1']))
Test('Should SingleLine Span 5', () => Assert.IsExact(Token.Span('(', ')', false, ' () 1'), ['', ' 1']))
Test('Should SingleLine Span 6', () => Assert.IsExact(Token.Span('(', ')', false, '(hello)'), ['hello', '']))
Test('Should SingleLine Span 7', () => Assert.IsExact(Token.Span('(', ')', false, ' (hello)'), ['hello', '']))
Test('Should SingleLine Span 8', () => Assert.IsExact(Token.Span('(', ')', false, '  (hello)'), ['hello', '']))
Test('Should SingleLine Span 9', () => Assert.IsExact(Token.Span('(', ')', false, '  1(hello)'), []))
Test('Should SingleLine Span 10', () => Assert.IsExact(Token.Span('(', ')', false, '  (hello)1'), ['hello', '1']))
Test('Should SingleLine Span 11', () => Assert.IsExact(Token.Span('(', ')', false, '  (hello) 1'), ['hello', ' 1']))
Test('Should SingleLine Span 12', () => Assert.IsExact(Token.Span('((', '))', false, '((hello))'), ['hello', '']))
Test('Should SingleLine Span 13', () => Assert.IsExact(Token.Span('((', '))', false, '((hello))1'), ['hello', '1']))
Test('Should SingleLine Span 14', () => Assert.IsExact(Token.Span('((', '))', false, '((hello)) 1'), ['hello', ' 1']))
Test('Should SingleLine Span 15', () => Assert.IsExact(Token.Span('(', '))', false, '((hello))'), ['(hello', '']))
Test('Should SingleLine Span 16', () => Assert.IsExact(Token.Span('(', '))', false, '((hello))1'), ['(hello', '1']))
Test('Should SingleLine Span 17', () => Assert.IsExact(Token.Span('(', '))', false, '((hello)) 1'), ['(hello', ' 1']))
Test('Should SingleLine Span 18', () => Assert.IsExact(Token.Span('((', ')', false, '((hello))'), ['hello', ')']))
Test('Should SingleLine Span 19', () => Assert.IsExact(Token.Span('((', ')', false, '((hello))1'), ['hello', ')1']))
Test('Should SingleLine Span 20', () => Assert.IsExact(Token.Span('((', ')', false, '((hello)) 1'), ['hello', ') 1']))

// ------------------------------------------------------------------
// MultiLine
// ------------------------------------------------------------------
Test('Should MultiLine Span 1', () => Assert.IsExact(Token.Span('(', ')', true, '  (hel\nlo) 1'), ['hel\nlo', ' 1']))
Test('Should MultiLine Span 2', () => Assert.IsExact(Token.Span('(', ')', true, '  (\n) 1'), ['\n', ' 1']))
Test('Should MultiLine Span 3', () => Assert.IsExact(Token.Span('(', ')', true, '()1'), ['', '1']))
Test('Should MultiLine Span 4', () => Assert.IsExact(Token.Span('(', ')', true, '() 1'), ['', ' 1']))
Test('Should MultiLine Span 5', () => Assert.IsExact(Token.Span('(', ')', true, ' () 1'), ['', ' 1']))
Test('Should MultiLine Span 6', () => Assert.IsExact(Token.Span('(', ')', true, '(hello)'), ['hello', '']))
Test('Should MultiLine Span 7', () => Assert.IsExact(Token.Span('(', ')', true, ' (hello)'), ['hello', '']))
Test('Should MultiLine Span 8', () => Assert.IsExact(Token.Span('(', ')', true, '  (hello)'), ['hello', '']))
Test('Should MultiLine Span 9', () => Assert.IsExact(Token.Span('(', ')', true, '  1(hello)'), []))
Test('Should MultiLine Span 10', () => Assert.IsExact(Token.Span('(', ')', true, '  (hello)1'), ['hello', '1']))
Test('Should MultiLine Span 11', () => Assert.IsExact(Token.Span('(', ')', true, '  (hello) 1'), ['hello', ' 1']))
Test('Should MultiLine Span 12', () => Assert.IsExact(Token.Span('((', '))', true, '((hello))'), ['hello', '']))
Test('Should MultiLine Span 13', () => Assert.IsExact(Token.Span('((', '))', true, '((hello))1'), ['hello', '1']))
Test('Should MultiLine Span 14', () => Assert.IsExact(Token.Span('((', '))', true, '((hello)) 1'), ['hello', ' 1']))
Test('Should MultiLine Span 15', () => Assert.IsExact(Token.Span('(', '))', true, '((hello))'), ['(hello', '']))
Test('Should MultiLine Span 16', () => Assert.IsExact(Token.Span('(', '))', true, '((hello))1'), ['(hello', '1']))
Test('Should MultiLine Span 17', () => Assert.IsExact(Token.Span('(', '))', true, '((hello)) 1'), ['(hello', ' 1']))
Test('Should MultiLine Span 18', () => Assert.IsExact(Token.Span('((', ')', true, '((hello))'), ['hello', ')']))
Test('Should MultiLine Span 19', () => Assert.IsExact(Token.Span('((', ')', true, '((hello))1'), ['hello', ')1']))
Test('Should MultiLine Span 20', () => Assert.IsExact(Token.Span('((', ')', true, '((hello)) 1'), ['hello', ') 1']))
