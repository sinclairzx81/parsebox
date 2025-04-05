import { Runtime } from '@sinclair/parsebox'
import { Assert } from './assert.ts'

Deno.test('Empty', () => {
  Assert(Runtime.Token.Const('', ''), ['', ''])
  Assert(Runtime.Token.Const('', 'A'), ['', 'A'])
  Assert(Runtime.Token.Const('', '   A'), ['', '   A'])
})
Deno.test('Single-Char', () => {
  Assert(Runtime.Token.Const('A', 'A'), ['A', ''])
  Assert(Runtime.Token.Const('A', 'A '), ['A', ' '])
  Assert(Runtime.Token.Const('A', 'AA'), ['A', 'A'])
  Assert(Runtime.Token.Const('A', 'AA '), ['A', 'A '])
})
Deno.test('Multi-Char', () => {
  Assert(Runtime.Token.Const('AB', 'AB'), ['AB', ''])
  Assert(Runtime.Token.Const('AB', 'AB '), ['AB', ' '])
  Assert(Runtime.Token.Const('AB', 'ABA'), ['AB', 'A'])
  Assert(Runtime.Token.Const('AB', 'ABA '), ['AB', 'A '])
})
Deno.test('Single-Char -> Ignore-Whitespace', () => {
  Assert(Runtime.Token.Const('A', '  A'), ['A', ''])
  Assert(Runtime.Token.Const('A', '  A '), ['A', ' '])
  Assert(Runtime.Token.Const('A', '  AA'), ['A', 'A'])
  Assert(Runtime.Token.Const('A', '  AA '), ['A', 'A '])
  Assert(Runtime.Token.Const('A', '\nAA '), ['A', 'A '])
  Assert(Runtime.Token.Const('A', ' \nAA '), ['A', 'A '])
  Assert(Runtime.Token.Const('A', '\n AA '), ['A', 'A '])
  Assert(Runtime.Token.Const('A', ' \n AA '), ['A', 'A '])
})
Deno.test('Multi-Char -> Ignore-Whitespace', () => {
  Assert(Runtime.Token.Const('AB', '  AB'), ['AB', ''])
  Assert(Runtime.Token.Const('AB', '  AB '), ['AB', ' '])
  Assert(Runtime.Token.Const('AB', '  ABA'), ['AB', 'A'])
  Assert(Runtime.Token.Const('AB', '  ABA '), ['AB', 'A '])
  Assert(Runtime.Token.Const('AB', '\nABA '), ['AB', 'A '])
  Assert(Runtime.Token.Const('AB', ' \nABA '), ['AB', 'A '])
  Assert(Runtime.Token.Const('AB', '\n ABA '), ['AB', 'A '])
  Assert(Runtime.Token.Const('AB', ' \n ABA '), ['AB', 'A '])
})
Deno.test('Single-Whitespace', () => {
  Assert(Runtime.Token.Const(' ', ''), [])
  Assert(Runtime.Token.Const(' ', ' '), [' ', ''])
  Assert(Runtime.Token.Const(' ', ' A'), [' ', 'A'])
  Assert(Runtime.Token.Const(' ', ' A '), [' ', 'A '])
  Assert(Runtime.Token.Const(' ', ' AA'), [' ', 'AA'])
  Assert(Runtime.Token.Const(' ', ' AA '), [' ', 'AA '])
})
Deno.test('Multi-Whitespace', () => {
  Assert(Runtime.Token.Const('  ', ''), [])
  Assert(Runtime.Token.Const('  ', ' '), [])
  Assert(Runtime.Token.Const('  ', '  A'), ['  ', 'A'])
  Assert(Runtime.Token.Const('  ', '  A '), ['  ', 'A '])
  Assert(Runtime.Token.Const('  ', '  AA'), ['  ', 'AA'])
  Assert(Runtime.Token.Const('  ', '  AA '), ['  ', 'AA '])
})
Deno.test('Newline', () => {
  Assert(Runtime.Token.Const('\n', ''), [])
  Assert(Runtime.Token.Const('\n', ' '), [])
  Assert(Runtime.Token.Const('\n', '\nA'), ['\n', 'A'])
  Assert(Runtime.Token.Const('\n', '  \nA '), ['\n', 'A '])
  Assert(Runtime.Token.Const('\n', '  \nAA'), ['\n', 'AA'])
  Assert(Runtime.Token.Const('\n', '  \nAA '), ['\n', 'AA '])
})
Deno.test('Newline-Single-Whitespace', () => {
  Assert(Runtime.Token.Const('\n ', ''), [])
  Assert(Runtime.Token.Const('\n ', ' '), [])
  Assert(Runtime.Token.Const('\n ', '\nA'), [])
  Assert(Runtime.Token.Const('\n ', '  \nA '), [])
  Assert(Runtime.Token.Const('\n ', '  \nAA'), [])
  Assert(Runtime.Token.Const('\n ', '  \nAA '), [])
  Assert(Runtime.Token.Const('\n ', '\n A'), ['\n ', 'A'])
  Assert(Runtime.Token.Const('\n ', '  \n A '), ['\n ', 'A '])
  Assert(Runtime.Token.Const('\n ', '  \n AA'), ['\n ', 'AA'])
  Assert(Runtime.Token.Const('\n ', '  \n AA '), ['\n ', 'AA '])
})
Deno.test('Newline-Multi-Whitespace', () => {
  Assert(Runtime.Token.Const('\n  ', ''), [])
  Assert(Runtime.Token.Const('\n  ', ' '), [])
  Assert(Runtime.Token.Const('\n  ', '\nA'), [])
  Assert(Runtime.Token.Const('\n  ', '  \nA '), [])
  Assert(Runtime.Token.Const('\n  ', '  \nAA'), [])
  Assert(Runtime.Token.Const('\n  ', '  \nAA '), [])
  Assert(Runtime.Token.Const('\n  ', '\n  A'), ['\n  ', 'A'])
  Assert(Runtime.Token.Const('\n  ', '  \n  A '), ['\n  ', 'A '])
  Assert(Runtime.Token.Const('\n  ', '  \n  AA'), ['\n  ', 'AA'])
  Assert(Runtime.Token.Const('\n  ', '  \n  AA '), ['\n  ', 'AA '])
})
