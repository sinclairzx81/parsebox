import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.Until_1')

// ------------------------------------------------------------------
// Until_1: Empty
// ------------------------------------------------------------------
Test('Should Until_1 1', () => Assert.IsExact(Token.Until_1([''], ''), []))
Test('Should Until_1 2', () => Assert.IsExact(Token.Until_1([''], 'A'), []))
Test('Should Until_1 3', () => Assert.IsExact(Token.Until_1([''], '   A'), []))

// ------------------------------------------------------------------
// Until_1: Single-Char
// ------------------------------------------------------------------
Test('Should Until_1 4', () => Assert.IsExact(Token.Until_1(['A'], 'A'), []))
Test('Should Until_1 5', () => Assert.IsExact(Token.Until_1(['A'], 'A '), []))
Test('Should Until_1 6', () => Assert.IsExact(Token.Until_1(['A'], 'AA'), []))
Test('Should Until_1 7', () => Assert.IsExact(Token.Until_1(['A'], 'AA '), []))

// ------------------------------------------------------------------
// Until_1: Multi-Char
// ------------------------------------------------------------------
Test('Should Until_1 8', () => Assert.IsExact(Token.Until_1(['AB'], 'AB'), []))
Test('Should Until_1 9', () => Assert.IsExact(Token.Until_1(['AB'], 'AB '), []))
Test('Should Until_1 10', () => Assert.IsExact(Token.Until_1(['AB'], 'ABA'), []))
Test('Should Until_1 11', () => Assert.IsExact(Token.Until_1(['AB'], 'ABA '), []))

// ------------------------------------------------------------------
// Until_1: Single-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Test('Should Until_1 12', () => Assert.IsExact(Token.Until_1(['A'], '  A'), ['  ', 'A']))
Test('Should Until_1 13', () => Assert.IsExact(Token.Until_1(['A'], '  A '), ['  ', 'A ']))
Test('Should Until_1 14', () => Assert.IsExact(Token.Until_1(['A'], '  AA'), ['  ', 'AA']))
Test('Should Until_1 15', () => Assert.IsExact(Token.Until_1(['A'], '  AA '), ['  ', 'AA ']))
Test('Should Until_1 16', () => Assert.IsExact(Token.Until_1(['A'], '\nAA '), ['\n', 'AA ']))
Test('Should Until_1 17', () => Assert.IsExact(Token.Until_1(['A'], ' \nAA '), [' \n', 'AA ']))
Test('Should Until_1 18', () => Assert.IsExact(Token.Until_1(['A'], '\n AA '), ['\n ', 'AA ']))
Test('Should Until_1 19', () => Assert.IsExact(Token.Until_1(['A'], ' \n AA '), [' \n ', 'AA ']))

// ------------------------------------------------------------------
// Until_1: Multi-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Test('Should Until_1 20', () => Assert.IsExact(Token.Until_1(['AB'], '  AB'), ['  ', 'AB']))
Test('Should Until_1 21', () => Assert.IsExact(Token.Until_1(['AB'], '  AB '), ['  ', 'AB ']))
Test('Should Until_1 22', () => Assert.IsExact(Token.Until_1(['AB'], '  ABA'), ['  ', 'ABA']))
Test('Should Until_1 23', () => Assert.IsExact(Token.Until_1(['AB'], '  ABA '), ['  ', 'ABA ']))
Test('Should Until_1 24', () => Assert.IsExact(Token.Until_1(['AB'], '\nABA '), ['\n', 'ABA ']))
Test('Should Until_1 25', () => Assert.IsExact(Token.Until_1(['AB'], ' \nABA '), [' \n', 'ABA ']))
Test('Should Until_1 26', () => Assert.IsExact(Token.Until_1(['AB'], '\n ABA '), ['\n ', 'ABA ']))
Test('Should Until_1 27', () => Assert.IsExact(Token.Until_1(['AB'], ' \n ABA '), [' \n ', 'ABA ']))

// ------------------------------------------------------------------
// Until_1: Single-Whitespace
// ------------------------------------------------------------------
Test('Should Until_1 28', () => Assert.IsExact(Token.Until_1([' '], ''), []))
Test('Should Until_1 29', () => Assert.IsExact(Token.Until_1([' '], ' '), []))
Test('Should Until_1 30', () => Assert.IsExact(Token.Until_1([' '], ' A'), []))
Test('Should Until_1 31', () => Assert.IsExact(Token.Until_1([' '], ' A '), []))
Test('Should Until_1 32', () => Assert.IsExact(Token.Until_1([' '], ' AA'), []))
Test('Should Until_1 33', () => Assert.IsExact(Token.Until_1([' '], ' AA '), []))

// ------------------------------------------------------------------
// Until_1: Multi-Whitespace
// ------------------------------------------------------------------
Test('Should Until_1 34', () => Assert.IsExact(Token.Until_1(['  '], ''), []))
Test('Should Until_1 35', () => Assert.IsExact(Token.Until_1(['  '], ' '), []))
Test('Should Until_1 36', () => Assert.IsExact(Token.Until_1(['  '], '  A'), []))
Test('Should Until_1 37', () => Assert.IsExact(Token.Until_1(['  '], '  A '), []))
Test('Should Until_1 38', () => Assert.IsExact(Token.Until_1(['  '], '  AA'), []))
Test('Should Until_1 39', () => Assert.IsExact(Token.Until_1(['  '], '  AA '), []))

// ------------------------------------------------------------------
// Until_1: Newline
// ------------------------------------------------------------------
Test('Should Until_1 40', () => Assert.IsExact(Token.Until_1(['\n'], ''), []))
Test('Should Until_1 41', () => Assert.IsExact(Token.Until_1(['\n'], ' '), []))
Test('Should Until_1 42', () => Assert.IsExact(Token.Until_1(['\n'], '\nA'), []))
Test('Should Until_1 43', () => Assert.IsExact(Token.Until_1(['\n'], '  \nA '), ['  ', '\nA ']))
Test('Should Until_1 44', () => Assert.IsExact(Token.Until_1(['\n'], '  \nAA'), ['  ', '\nAA']))
Test('Should Until_1 45', () => Assert.IsExact(Token.Until_1(['\n'], '  \nAA '), ['  ', '\nAA ']))

// ------------------------------------------------------------------
// Until_1: Newline-Single-Whitespace
// ------------------------------------------------------------------
Test('Should Until_1 46', () => Assert.IsExact(Token.Until_1(['\n '], ''), []))
Test('Should Until_1 47', () => Assert.IsExact(Token.Until_1(['\n '], ' '), []))
Test('Should Until_1 48', () => Assert.IsExact(Token.Until_1(['\n '], '\nA'), []))
Test('Should Until_1 49', () => Assert.IsExact(Token.Until_1(['\n '], '  \nA '), []))
Test('Should Until_1 50', () => Assert.IsExact(Token.Until_1(['\n '], '  \nAA'), []))
Test('Should Until_1 51', () => Assert.IsExact(Token.Until_1(['\n '], '  \nAA '), []))
Test('Should Until_1 52', () => Assert.IsExact(Token.Until_1(['\n '], '\n A'), []))
Test('Should Until_1 53', () => Assert.IsExact(Token.Until_1(['\n '], '  \n A '), ['  ', '\n A ']))
Test('Should Until_1 54', () => Assert.IsExact(Token.Until_1(['\n '], '  \n AA'), ['  ', '\n AA']))
Test('Should Until_1 55', () => Assert.IsExact(Token.Until_1(['\n '], '  \n AA '), ['  ', '\n AA ']))

// ------------------------------------------------------------------
// Until_1: Newline-Multi-Whitespace
// ------------------------------------------------------------------
Test('Should Until_1 56', () => Assert.IsExact(Token.Until_1(['\n  '], ''), []))
Test('Should Until_1 57', () => Assert.IsExact(Token.Until_1(['\n  '], ' '), []))
Test('Should Until_1 58', () => Assert.IsExact(Token.Until_1(['\n  '], '\nA'), []))
Test('Should Until_1 59', () => Assert.IsExact(Token.Until_1(['\n  '], '  \nA '), []))
Test('Should Until_1 60', () => Assert.IsExact(Token.Until_1(['\n  '], '  \nAA'), []))
Test('Should Until_1 61', () => Assert.IsExact(Token.Until_1(['\n  '], '  \nAA '), []))
Test('Should Until_1 62', () => Assert.IsExact(Token.Until_1(['\n  '], '\n  A'), []))
Test('Should Until_1 63', () => Assert.IsExact(Token.Until_1(['\n  '], '  \n  A '), ['  ', '\n  A ']))
Test('Should Until_1 64', () => Assert.IsExact(Token.Until_1(['\n  '], '  \n  AA'), ['  ', '\n  AA']))
Test('Should Until_1 65', () => Assert.IsExact(Token.Until_1(['\n  '], '  \n  AA '), ['  ', '\n  AA ']))

// ------------------------------------------------------------------
// Until_1: Multi Sentinal Test
// ------------------------------------------------------------------
Test('Should Until_1 66', () => Assert.IsExact(Token.Until_1(['A', 'B'], ''), []))
Test('Should Until_1 67', () => Assert.IsExact(Token.Until_1(['A', 'B'], 'A'), []))
Test('Should Until_1 68', () => Assert.IsExact(Token.Until_1(['A', 'B'], 'B'), []))
Test('Should Until_1 69', () => Assert.IsExact(Token.Until_1(['A', 'B'], 'AB'), []))
Test('Should Until_1 70', () => Assert.IsExact(Token.Until_1(['A', 'B'], 'BA'), []))
Test('Should Until_1 71', () => Assert.IsExact(Token.Until_1(['A', 'B'], '   AB'), ['   ', 'AB']))
Test('Should Until_1 72', () => Assert.IsExact(Token.Until_1(['A', 'B'], '   BA'), ['   ', 'BA']))
Test('Should Until_1 73', () => Assert.IsExact(Token.Until_1(['A', ' B'], '   BA'), ['  ', ' BA']))
Test('Should Until_1 74', () => Assert.IsExact(Token.Until_1([' A', 'B'], '   BA'), ['   ', 'BA']))
Test('Should Until_1 75', () => Assert.IsExact(Token.Until_1(['B', 'A'], '   AB'), ['   ', 'AB']))
Test('Should Until_1 76', () => Assert.IsExact(Token.Until_1(['B', 'A'], '   BA'), ['   ', 'BA']))
Test('Should Until_1 77', () => Assert.IsExact(Token.Until_1(['B', ' A'], '   BA'), ['   ', 'BA']))
Test('Should Until_1 78', () => Assert.IsExact(Token.Until_1([' B', 'A'], '   BA'), ['  ', ' BA']))

// ------------------------------------------------------------------
// Until_1: Empty-String Variants
// ------------------------------------------------------------------
Test('Should Until_1 79', () => Assert.IsExact(Token.Until_1([''], '  '), []))
Test('Should Until_1 80', () => Assert.IsExact(Token.Until_1([''], '\n'), []))
Test('Should Until_1 81', () => Assert.IsExact(Token.Until_1([''], '\n\n'), []))

// ------------------------------------------------------------------
// Until_1: Mixed Characters & Whitespace
// ------------------------------------------------------------------
Test('Should Until_1 82', () => Assert.IsExact(Token.Until_1(['A'], ' \n A'), [' \n ', 'A']))
Test('Should Until_1 83', () => Assert.IsExact(Token.Until_1(['A'], '\tA'), ['\t', 'A']))
Test('Should Until_1 84', () => Assert.IsExact(Token.Until_1(['AB'], '\tAB '), ['\t', 'AB ']))
Test('Should Until_1 85', () => Assert.IsExact(Token.Until_1(['AB'], ' \tAB '), [' \t', 'AB ']))
Test('Should Until_1 86', () => Assert.IsExact(Token.Until_1(['AB'], ' \t AB'), [' \t ', 'AB']))

// ------------------------------------------------------------------
// Until_1: Multiple Sentinels with Overlaps
// ------------------------------------------------------------------
Test('Should Until_1 87', () => Assert.IsExact(Token.Until_1(['A', 'AB'], 'AB'), []))
Test('Should Until_1 88', () => Assert.IsExact(Token.Until_1(['AB', 'A'], 'AB'), []))
Test('Should Until_1 89', () => Assert.IsExact(Token.Until_1(['A', 'AB'], 'AAB'), []))
Test('Should Until_1 90', () => Assert.IsExact(Token.Until_1(['AB', 'A'], 'AAB'), []))
Test('Should Until_1 91', () => Assert.IsExact(Token.Until_1(['AB', 'B'], 'ABB'), []))

// ------------------------------------------------------------------
// Until_1: Only Whitespace with Multi-Sentinels
// ------------------------------------------------------------------
Test('Should Until_1 92', () => Assert.IsExact(Token.Until_1([' ', '\n'], ' \nA'), []))
Test('Should Until_1 93', () => Assert.IsExact(Token.Until_1(['  ', '\n'], '  \nA'), []))
Test('Should Until_1 94', () => Assert.IsExact(Token.Until_1(['\n', ' '], ' \nA'), []))
Test('Should Until_1 95', () => Assert.IsExact(Token.Until_1(['\n', ' '], '\n A'), []))

// ------------------------------------------------------------------
// Until_1: Leading/Trailing Whitespace with Multiple Sentinels
// ------------------------------------------------------------------
Test('Should Until_1 96', () => Assert.IsExact(Token.Until_1(['A', 'B'], '   A B'), ['   ', 'A B']))
Test('Should Until_1 97', () => Assert.IsExact(Token.Until_1(['A', 'B'], '   B A'), ['   ', 'B A']))
Test('Should Until_1 98', () => Assert.IsExact(Token.Until_1(['AB', 'BA'], '  AB BA '), ['  ', 'AB BA ']))
Test('Should Until_1 99', () => Assert.IsExact(Token.Until_1(['AB', 'BA'], '  BA AB '), ['  ', 'BA AB ']))
Test('Should Until_1 100', () => Assert.IsExact(Token.Until_1(['AB', 'BA'], '\nAB BA'), ['\n', 'AB BA']))
