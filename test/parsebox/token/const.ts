import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.Const')

// ------------------------------------------------------------------
// Const: Empty
// ------------------------------------------------------------------
Test('Should Const 1', () => Assert.IsExact(Token.Const('', ''), ['', '']))
Test('Should Const 2', () => Assert.IsExact(Token.Const('', 'A'), ['', 'A']))
Test('Should Const 3', () => Assert.IsExact(Token.Const('', '   A'), ['', '   A']))

// ------------------------------------------------------------------
// Const: Single-Char
// ------------------------------------------------------------------
Test('Should Const 4', () => Assert.IsExact(Token.Const('A', 'A'), ['A', '']))
Test('Should Const 5', () => Assert.IsExact(Token.Const('A', 'A '), ['A', ' ']))
Test('Should Const 6', () => Assert.IsExact(Token.Const('A', 'AA'), ['A', 'A']))
Test('Should Const 7', () => Assert.IsExact(Token.Const('A', 'AA '), ['A', 'A ']))

// ------------------------------------------------------------------
// Const: Multi-Char
// ------------------------------------------------------------------
Test('Should Const 8', () => Assert.IsExact(Token.Const('AB', 'AB'), ['AB', '']))
Test('Should Const 9', () => Assert.IsExact(Token.Const('AB', 'AB '), ['AB', ' ']))
Test('Should Const 10', () => Assert.IsExact(Token.Const('AB', 'ABA'), ['AB', 'A']))
Test('Should Const 11', () => Assert.IsExact(Token.Const('AB', 'ABA '), ['AB', 'A ']))

// ------------------------------------------------------------------
// Const: Single-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Test('Should Const 12', () => Assert.IsExact(Token.Const('A', '  A'), ['A', '']))
Test('Should Const 13', () => Assert.IsExact(Token.Const('A', '  A '), ['A', ' ']))
Test('Should Const 14', () => Assert.IsExact(Token.Const('A', '  AA'), ['A', 'A']))
Test('Should Const 15', () => Assert.IsExact(Token.Const('A', '  AA '), ['A', 'A ']))
Test('Should Const 16', () => Assert.IsExact(Token.Const('A', '\nAA '), ['A', 'A ']))
Test('Should Const 17', () => Assert.IsExact(Token.Const('A', ' \nAA '), ['A', 'A ']))
Test('Should Const 18', () => Assert.IsExact(Token.Const('A', '\n AA '), ['A', 'A ']))
Test('Should Const 19', () => Assert.IsExact(Token.Const('A', ' \n AA '), ['A', 'A ']))

// ------------------------------------------------------------------
// Const: Multi-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Test('Should Const 20', () => Assert.IsExact(Token.Const('AB', '  AB'), ['AB', '']))
Test('Should Const 21', () => Assert.IsExact(Token.Const('AB', '  AB '), ['AB', ' ']))
Test('Should Const 22', () => Assert.IsExact(Token.Const('AB', '  ABA'), ['AB', 'A']))
Test('Should Const 23', () => Assert.IsExact(Token.Const('AB', '  ABA '), ['AB', 'A ']))
Test('Should Const 24', () => Assert.IsExact(Token.Const('AB', '\nABA '), ['AB', 'A ']))
Test('Should Const 25', () => Assert.IsExact(Token.Const('AB', ' \nABA '), ['AB', 'A ']))
Test('Should Const 26', () => Assert.IsExact(Token.Const('AB', '\n ABA '), ['AB', 'A ']))
Test('Should Const 27', () => Assert.IsExact(Token.Const('AB', ' \n ABA '), ['AB', 'A ']))

// ------------------------------------------------------------------
// Const: Single-Whitespace
// ------------------------------------------------------------------
Test('Should Const 28', () => Assert.IsExact(Token.Const(' ', ''), []))
Test('Should Const 29', () => Assert.IsExact(Token.Const(' ', ' '), [' ', '']))
Test('Should Const 30', () => Assert.IsExact(Token.Const(' ', ' A'), [' ', 'A']))
Test('Should Const 31', () => Assert.IsExact(Token.Const(' ', ' A '), [' ', 'A ']))
Test('Should Const 32', () => Assert.IsExact(Token.Const(' ', ' AA'), [' ', 'AA']))
Test('Should Const 33', () => Assert.IsExact(Token.Const(' ', ' AA '), [' ', 'AA ']))

// ------------------------------------------------------------------
// Const: Multi-Whitespace
// ------------------------------------------------------------------
Test('Should Const 34', () => Assert.IsExact(Token.Const('  ', ''), []))
Test('Should Const 35', () => Assert.IsExact(Token.Const('  ', ' '), []))
Test('Should Const 36', () => Assert.IsExact(Token.Const('  ', '  A'), ['  ', 'A']))
Test('Should Const 37', () => Assert.IsExact(Token.Const('  ', '  A '), ['  ', 'A ']))
Test('Should Const 38', () => Assert.IsExact(Token.Const('  ', '  AA'), ['  ', 'AA']))
Test('Should Const 39', () => Assert.IsExact(Token.Const('  ', '  AA '), ['  ', 'AA ']))

// ------------------------------------------------------------------
// Const: Newline
// ------------------------------------------------------------------
Test('Should Const 40', () => Assert.IsExact(Token.Const('\n', ''), []))
Test('Should Const 41', () => Assert.IsExact(Token.Const('\n', ' '), []))
Test('Should Const 42', () => Assert.IsExact(Token.Const('\n', '\nA'), ['\n', 'A']))
Test('Should Const 43', () => Assert.IsExact(Token.Const('\n', '  \nA '), ['\n', 'A ']))
Test('Should Const 44', () => Assert.IsExact(Token.Const('\n', '  \nAA'), ['\n', 'AA']))
Test('Should Const 45', () => Assert.IsExact(Token.Const('\n', '  \nAA '), ['\n', 'AA ']))

// ------------------------------------------------------------------
// Const: Newline-Single-Whitespace
// ------------------------------------------------------------------
Test('Should Const 46', () => Assert.IsExact(Token.Const('\n ', ''), []))
Test('Should Const 47', () => Assert.IsExact(Token.Const('\n ', ' '), []))
Test('Should Const 48', () => Assert.IsExact(Token.Const('\n ', '\nA'), []))
Test('Should Const 49', () => Assert.IsExact(Token.Const('\n ', '  \nA '), []))
Test('Should Const 50', () => Assert.IsExact(Token.Const('\n ', '  \nAA'), []))
Test('Should Const 51', () => Assert.IsExact(Token.Const('\n ', '  \nAA '), []))
Test('Should Const 52', () => Assert.IsExact(Token.Const('\n ', '\n A'), ['\n ', 'A']))
Test('Should Const 53', () => Assert.IsExact(Token.Const('\n ', '  \n A '), ['\n ', 'A ']))
Test('Should Const 54', () => Assert.IsExact(Token.Const('\n ', '  \n AA'), ['\n ', 'AA']))
Test('Should Const 55', () => Assert.IsExact(Token.Const('\n ', '  \n AA '), ['\n ', 'AA ']))

// ------------------------------------------------------------------
// Const: Newline-Multi-Whitespace
// ------------------------------------------------------------------
Test('Should Const 56', () => Assert.IsExact(Token.Const('\n  ', ''), []))
Test('Should Const 57', () => Assert.IsExact(Token.Const('\n  ', ' '), []))
Test('Should Const 58', () => Assert.IsExact(Token.Const('\n  ', '\n A'), []))
Test('Should Const 59', () => Assert.IsExact(Token.Const('\n  ', '  \n A '), []))
Test('Should Const 60', () => Assert.IsExact(Token.Const('\n  ', '  \n AA'), []))
Test('Should Const 61', () => Assert.IsExact(Token.Const('\n  ', '  \n AA '), []))
Test('Should Const 62', () => Assert.IsExact(Token.Const('\n  ', '\n  A'), ['\n  ', 'A']))
Test('Should Const 63', () => Assert.IsExact(Token.Const('\n  ', '  \n  A '), ['\n  ', 'A ']))
Test('Should Const 64', () => Assert.IsExact(Token.Const('\n  ', '  \n  AA'), ['\n  ', 'AA']))
Test('Should Const 65', () => Assert.IsExact(Token.Const('\n  ', '  \n  AA '), ['\n  ', 'AA ']))
