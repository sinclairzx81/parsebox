import { Runtime } from '@sinclair/parsebox'
import { Assert } from './assert.ts'

// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
Deno.test('Const: Empty', () => {
  Assert(Runtime.Token.Const('', ''), ['', ''])
  Assert(Runtime.Token.Const('', 'A'), ['', 'A'])
  Assert(Runtime.Token.Const('', '   A'), ['', '   A'])
})
Deno.test('Const: Single-Char', () => {
  Assert(Runtime.Token.Const('A', 'A'), ['A', ''])
  Assert(Runtime.Token.Const('A', 'A '), ['A', ' '])
  Assert(Runtime.Token.Const('A', 'AA'), ['A', 'A'])
  Assert(Runtime.Token.Const('A', 'AA '), ['A', 'A '])
})
Deno.test('Const: Multi-Char', () => {
  Assert(Runtime.Token.Const('AB', 'AB'), ['AB', ''])
  Assert(Runtime.Token.Const('AB', 'AB '), ['AB', ' '])
  Assert(Runtime.Token.Const('AB', 'ABA'), ['AB', 'A'])
  Assert(Runtime.Token.Const('AB', 'ABA '), ['AB', 'A '])
})
Deno.test('Const: Single-Char -> Ignore-Whitespace', () => {
  Assert(Runtime.Token.Const('A', '  A'), ['A', ''])
  Assert(Runtime.Token.Const('A', '  A '), ['A', ' '])
  Assert(Runtime.Token.Const('A', '  AA'), ['A', 'A'])
  Assert(Runtime.Token.Const('A', '  AA '), ['A', 'A '])
  Assert(Runtime.Token.Const('A', '\nAA '), ['A', 'A '])
  Assert(Runtime.Token.Const('A', ' \nAA '), ['A', 'A '])
  Assert(Runtime.Token.Const('A', '\n AA '), ['A', 'A '])
  Assert(Runtime.Token.Const('A', ' \n AA '), ['A', 'A '])
})
Deno.test('Const: Multi-Char -> Ignore-Whitespace', () => {
  Assert(Runtime.Token.Const('AB', '  AB'), ['AB', ''])
  Assert(Runtime.Token.Const('AB', '  AB '), ['AB', ' '])
  Assert(Runtime.Token.Const('AB', '  ABA'), ['AB', 'A'])
  Assert(Runtime.Token.Const('AB', '  ABA '), ['AB', 'A '])
  Assert(Runtime.Token.Const('AB', '\nABA '), ['AB', 'A '])
  Assert(Runtime.Token.Const('AB', ' \nABA '), ['AB', 'A '])
  Assert(Runtime.Token.Const('AB', '\n ABA '), ['AB', 'A '])
  Assert(Runtime.Token.Const('AB', ' \n ABA '), ['AB', 'A '])
})
Deno.test('Const: Single-Whitespace', () => {
  Assert(Runtime.Token.Const(' ', ''), [])
  Assert(Runtime.Token.Const(' ', ' '), [' ', ''])
  Assert(Runtime.Token.Const(' ', ' A'), [' ', 'A'])
  Assert(Runtime.Token.Const(' ', ' A '), [' ', 'A '])
  Assert(Runtime.Token.Const(' ', ' AA'), [' ', 'AA'])
  Assert(Runtime.Token.Const(' ', ' AA '), [' ', 'AA '])
})
Deno.test('Const: Multi-Whitespace', () => {
  Assert(Runtime.Token.Const('  ', ''), [])
  Assert(Runtime.Token.Const('  ', ' '), [])
  Assert(Runtime.Token.Const('  ', '  A'), ['  ', 'A'])
  Assert(Runtime.Token.Const('  ', '  A '), ['  ', 'A '])
  Assert(Runtime.Token.Const('  ', '  AA'), ['  ', 'AA'])
  Assert(Runtime.Token.Const('  ', '  AA '), ['  ', 'AA '])
})
Deno.test('Const: Newline', () => {
  Assert(Runtime.Token.Const('\n', ''), [])
  Assert(Runtime.Token.Const('\n', ' '), [])
  Assert(Runtime.Token.Const('\n', '\nA'), ['\n', 'A'])
  Assert(Runtime.Token.Const('\n', '  \nA '), ['\n', 'A '])
  Assert(Runtime.Token.Const('\n', '  \nAA'), ['\n', 'AA'])
  Assert(Runtime.Token.Const('\n', '  \nAA '), ['\n', 'AA '])
})
Deno.test('Const: Newline-Single-Whitespace', () => {
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
Deno.test('Const: Newline-Multi-Whitespace', () => {
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
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
Deno.test('Until: Empty', () => {
  Assert(Runtime.Token.Until([''], ''), [])
  Assert(Runtime.Token.Until([''], 'A'), ['', 'A'])
  Assert(Runtime.Token.Until([''], '   A'), ['', '   A'])
})
Deno.test('Until: Single-Char', () => {
  Assert(Runtime.Token.Until(['A'], 'A'), ['', 'A'])
  Assert(Runtime.Token.Until(['A'], 'A '), ['', 'A '])
  Assert(Runtime.Token.Until(['A'], 'AA'), ['', 'AA'])
  Assert(Runtime.Token.Until(['A'], 'AA '), ['', 'AA '])
})
Deno.test('Until: Multi-Char', () => {
  Assert(Runtime.Token.Until(['AB'], 'AB'), ['', 'AB'])
  Assert(Runtime.Token.Until(['AB'], 'AB '), ['', 'AB '])
  Assert(Runtime.Token.Until(['AB'], 'ABA'), ['', 'ABA'])
  Assert(Runtime.Token.Until(['AB'], 'ABA '), ['', 'ABA '])
})
Deno.test('Until: Single-Char -> Ignore-Whitespace', () => {
  Assert(Runtime.Token.Until(['A'], '  A'), ['  ', 'A'])
  Assert(Runtime.Token.Until(['A'], '  A '), ['  ', 'A '])
  Assert(Runtime.Token.Until(['A'], '  AA'), ['  ', 'AA'])
  Assert(Runtime.Token.Until(['A'], '  AA '), ['  ', 'AA '])
  Assert(Runtime.Token.Until(['A'], '\nAA '), ['\n', 'AA '])
  Assert(Runtime.Token.Until(['A'], ' \nAA '), [' \n', 'AA '])
  Assert(Runtime.Token.Until(['A'], '\n AA '), ['\n ', 'AA '])
  Assert(Runtime.Token.Until(['A'], ' \n AA '), [' \n ', 'AA '])
})
Deno.test('Until: Multi-Char -> Ignore-Whitespace', () => {
  Assert(Runtime.Token.Until(['AB'], '  AB'), ['  ', 'AB'])
  Assert(Runtime.Token.Until(['AB'], '  AB '), ['  ', 'AB '])
  Assert(Runtime.Token.Until(['AB'], '  ABA'), ['  ', 'ABA'])
  Assert(Runtime.Token.Until(['AB'], '  ABA '), ['  ', 'ABA '])
  Assert(Runtime.Token.Until(['AB'], '\nABA '), ['\n', 'ABA '])
  Assert(Runtime.Token.Until(['AB'], ' \nABA '), [' \n', 'ABA '])
  Assert(Runtime.Token.Until(['AB'], '\n ABA '), ['\n ', 'ABA '])
  Assert(Runtime.Token.Until(['AB'], ' \n ABA '), [' \n ', 'ABA '])
})
Deno.test('Until: Single-Whitespace', () => {
  Assert(Runtime.Token.Until([' '], ''), [])
  Assert(Runtime.Token.Until([' '], ' '), ['', ' '])
  Assert(Runtime.Token.Until([' '], ' A'), ['', ' A'])
  Assert(Runtime.Token.Until([' '], ' A '), ['', ' A '])
  Assert(Runtime.Token.Until([' '], ' AA'), ['', ' AA'])
  Assert(Runtime.Token.Until([' '], ' AA '), ['', ' AA '])
})
Deno.test('Until: Multi-Whitespace', () => {
  Assert(Runtime.Token.Until(['  '], ''), [])
  Assert(Runtime.Token.Until(['  '], ' '), [])
  Assert(Runtime.Token.Until(['  '], '  A'), ['', '  A'])
  Assert(Runtime.Token.Until(['  '], '  A '), ['', '  A '])
  Assert(Runtime.Token.Until(['  '], '  AA'), ['', '  AA'])
  Assert(Runtime.Token.Until(['  '], '  AA '), ['', '  AA '])
})
Deno.test('Until: Newline', () => {
  Assert(Runtime.Token.Until(['\n'], ''), [])
  Assert(Runtime.Token.Until(['\n'], ' '), [])
  Assert(Runtime.Token.Until(['\n'], '\nA'), ['', '\nA'])
  Assert(Runtime.Token.Until(['\n'], '  \nA '), ['  ', '\nA '])
  Assert(Runtime.Token.Until(['\n'], '  \nAA'), ['  ', '\nAA'])
  Assert(Runtime.Token.Until(['\n'], '  \nAA '), ['  ', '\nAA '])
})
Deno.test('Until: Newline-Single-Whitespace', () => {
  Assert(Runtime.Token.Until(['\n '], ''), [])
  Assert(Runtime.Token.Until(['\n '], ' '), [])
  Assert(Runtime.Token.Until(['\n '], '\nA'), [])
  Assert(Runtime.Token.Until(['\n '], '  \nA '), [])
  Assert(Runtime.Token.Until(['\n '], '  \nAA'), [])
  Assert(Runtime.Token.Until(['\n '], '  \nAA '), [])
  Assert(Runtime.Token.Until(['\n '], '\n A'), ['', '\n A'])
  Assert(Runtime.Token.Until(['\n '], '  \n A '), ['  ', '\n A '])
  Assert(Runtime.Token.Until(['\n '], '  \n AA'), ['  ', '\n AA'])
  Assert(Runtime.Token.Until(['\n '], '  \n AA '), ['  ', '\n AA '])
})
Deno.test('Until: Newline-Multi-Whitespace', () => {
  Assert(Runtime.Token.Until(['\n  '], ''), [])
  Assert(Runtime.Token.Until(['\n  '], ' '), [])
  Assert(Runtime.Token.Until(['\n  '], '\nA'), [])
  Assert(Runtime.Token.Until(['\n  '], '  \nA '), [])
  Assert(Runtime.Token.Until(['\n  '], '  \nAA'), [])
  Assert(Runtime.Token.Until(['\n  '], '  \nAA '), [])
  Assert(Runtime.Token.Until(['\n  '], '\n  A'), ['', '\n  A'])
  Assert(Runtime.Token.Until(['\n  '], '  \n  A '), ['  ', '\n  A '])
  Assert(Runtime.Token.Until(['\n  '], '  \n  AA'), ['  ', '\n  AA'])
  Assert(Runtime.Token.Until(['\n  '], '  \n  AA '), ['  ', '\n  AA '])
})

Deno.test('Until: Multi Sentinal Test', () => {
  Assert(Runtime.Token.Until(['A', 'B'], ''), [])
  Assert(Runtime.Token.Until(['A', 'B'], 'A'), ['', 'A'])
  Assert(Runtime.Token.Until(['A', 'B'], 'B'), ['', 'B'])
  Assert(Runtime.Token.Until(['A', 'B'], 'AB'), ['', 'AB'])
  Assert(Runtime.Token.Until(['A', 'B'], 'BA'), ['', 'BA'])
  Assert(Runtime.Token.Until(['A', 'B'], '   AB'), ['   ', 'AB'])
  Assert(Runtime.Token.Until(['A', 'B'], '   BA'), ['   ', 'BA'])
  Assert(Runtime.Token.Until(['A', ' B'], '   BA'), ['  ', ' BA'])
  Assert(Runtime.Token.Until([' A', 'B'], '   BA'), ['   ', 'BA'])
  Assert(Runtime.Token.Until(['B', 'A'], '   AB'), ['   ', 'AB'])
  Assert(Runtime.Token.Until(['B', 'A'], '   BA'), ['   ', 'BA'])
  Assert(Runtime.Token.Until(['B', ' A'], '   BA'), ['   ', 'BA'])
  Assert(Runtime.Token.Until([' B', 'A'], '   BA'), ['  ', ' BA'])
})