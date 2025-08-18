import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.Until')

// ------------------------------------------------------------------
// Until: Empty
// ------------------------------------------------------------------
Test('Should Until 1', () => Assert.IsExact(Token.Until([''], ''), []))
Test('Should Until 2', () => Assert.IsExact(Token.Until([''], 'A'), ['', 'A']))
Test('Should Until 3', () => Assert.IsExact(Token.Until([''], '   A'), ['', '   A']))

// ------------------------------------------------------------------
// Until: Single-Char
// ------------------------------------------------------------------
Test('Should Until 4', () => Assert.IsExact(Token.Until(['A'], 'A'), ['', 'A']))
Test('Should Until 5', () => Assert.IsExact(Token.Until(['A'], 'A '), ['', 'A ']))
Test('Should Until 6', () => Assert.IsExact(Token.Until(['A'], 'AA'), ['', 'AA']))
Test('Should Until 7', () => Assert.IsExact(Token.Until(['A'], 'AA '), ['', 'AA ']))

// ------------------------------------------------------------------
// Until: Multi-Char
// ------------------------------------------------------------------
Test('Should Until 8', () => Assert.IsExact(Token.Until(['AB'], 'AB'), ['', 'AB']))
Test('Should Until 9', () => Assert.IsExact(Token.Until(['AB'], 'AB '), ['', 'AB ']))
Test('Should Until 10', () => Assert.IsExact(Token.Until(['AB'], 'ABA'), ['', 'ABA']))
Test('Should Until 11', () => Assert.IsExact(Token.Until(['AB'], 'ABA '), ['', 'ABA ']))

// ------------------------------------------------------------------
// Until: Single-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Test('Should Until 12', () => Assert.IsExact(Token.Until(['A'], '  A'), ['  ', 'A']))
Test('Should Until 13', () => Assert.IsExact(Token.Until(['A'], '  A '), ['  ', 'A ']))
Test('Should Until 14', () => Assert.IsExact(Token.Until(['A'], '  AA'), ['  ', 'AA']))
Test('Should Until 15', () => Assert.IsExact(Token.Until(['A'], '  AA '), ['  ', 'AA ']))
Test('Should Until 16', () => Assert.IsExact(Token.Until(['A'], '\nAA '), ['\n', 'AA ']))
Test('Should Until 17', () => Assert.IsExact(Token.Until(['A'], ' \nAA '), [' \n', 'AA ']))
Test('Should Until 18', () => Assert.IsExact(Token.Until(['A'], '\n AA '), ['\n ', 'AA ']))
Test('Should Until 19', () => Assert.IsExact(Token.Until(['A'], ' \n AA '), [' \n ', 'AA ']))

// ------------------------------------------------------------------
// Until: Multi-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Test('Should Until 20', () => Assert.IsExact(Token.Until(['AB'], '  AB'), ['  ', 'AB']))
Test('Should Until 21', () => Assert.IsExact(Token.Until(['AB'], '  AB '), ['  ', 'AB ']))
Test('Should Until 22', () => Assert.IsExact(Token.Until(['AB'], '  ABA'), ['  ', 'ABA']))
Test('Should Until 23', () => Assert.IsExact(Token.Until(['AB'], '  ABA '), ['  ', 'ABA ']))
Test('Should Until 24', () => Assert.IsExact(Token.Until(['AB'], '\nABA '), ['\n', 'ABA ']))
Test('Should Until 25', () => Assert.IsExact(Token.Until(['AB'], ' \nABA '), [' \n', 'ABA ']))
Test('Should Until 26', () => Assert.IsExact(Token.Until(['AB'], '\n ABA '), ['\n ', 'ABA ']))
Test('Should Until 27', () => Assert.IsExact(Token.Until(['AB'], ' \n ABA '), [' \n ', 'ABA ']))

// ------------------------------------------------------------------
// Until: Single-Whitespace
// ------------------------------------------------------------------
Test('Should Until 28', () => Assert.IsExact(Token.Until([' '], ''), []))
Test('Should Until 29', () => Assert.IsExact(Token.Until([' '], ' '), ['', ' ']))
Test('Should Until 30', () => Assert.IsExact(Token.Until([' '], ' A'), ['', ' A']))
Test('Should Until 31', () => Assert.IsExact(Token.Until([' '], ' A '), ['', ' A ']))
Test('Should Until 32', () => Assert.IsExact(Token.Until([' '], ' AA'), ['', ' AA']))
Test('Should Until 33', () => Assert.IsExact(Token.Until([' '], ' AA '), ['', ' AA ']))

// ------------------------------------------------------------------
// Until: Multi-Whitespace
// ------------------------------------------------------------------
Test('Should Until 34', () => Assert.IsExact(Token.Until(['  '], ''), []))
Test('Should Until 35', () => Assert.IsExact(Token.Until(['  '], ' '), []))
Test('Should Until 36', () => Assert.IsExact(Token.Until(['  '], '  A'), ['', '  A']))
Test('Should Until 37', () => Assert.IsExact(Token.Until(['  '], '  A '), ['', '  A ']))
Test('Should Until 38', () => Assert.IsExact(Token.Until(['  '], '  AA'), ['', '  AA']))
Test('Should Until 39', () => Assert.IsExact(Token.Until(['  '], '  AA '), ['', '  AA ']))

// ------------------------------------------------------------------
// Until: Newline
// ------------------------------------------------------------------
Test('Should Until 40', () => Assert.IsExact(Token.Until(['\n'], ''), []))
Test('Should Until 41', () => Assert.IsExact(Token.Until(['\n'], ' '), []))
Test('Should Until 42', () => Assert.IsExact(Token.Until(['\n'], '\nA'), ['', '\nA']))
Test('Should Until 43', () => Assert.IsExact(Token.Until(['\n'], '  \nA '), ['  ', '\nA ']))
Test('Should Until 44', () => Assert.IsExact(Token.Until(['\n'], '  \nAA'), ['  ', '\nAA']))
Test('Should Until 45', () => Assert.IsExact(Token.Until(['\n'], '  \nAA '), ['  ', '\nAA ']))

// ------------------------------------------------------------------
// Until: Newline-Single-Whitespace
// ------------------------------------------------------------------
Test('Should Until 46', () => Assert.IsExact(Token.Until(['\n '], ''), []))
Test('Should Until 47', () => Assert.IsExact(Token.Until(['\n '], ' '), []))
Test('Should Until 48', () => Assert.IsExact(Token.Until(['\n '], '\nA'), []))
Test('Should Until 49', () => Assert.IsExact(Token.Until(['\n '], '  \nA '), []))
Test('Should Until 50', () => Assert.IsExact(Token.Until(['\n '], '  \nAA'), []))
Test('Should Until 51', () => Assert.IsExact(Token.Until(['\n '], '  \nAA '), []))
Test('Should Until 52', () => Assert.IsExact(Token.Until(['\n '], '\n A'), ['', '\n A']))
Test('Should Until 53', () => Assert.IsExact(Token.Until(['\n '], '  \n A '), ['  ', '\n A ']))
Test('Should Until 54', () => Assert.IsExact(Token.Until(['\n '], '  \n AA'), ['  ', '\n AA']))
Test('Should Until 55', () => Assert.IsExact(Token.Until(['\n '], '  \n AA '), ['  ', '\n AA ']))

// ------------------------------------------------------------------
// Until: Newline-Multi-Whitespace
// ------------------------------------------------------------------
Test('Should Until 56', () => Assert.IsExact(Token.Until(['\n  '], ''), []))
Test('Should Until 57', () => Assert.IsExact(Token.Until(['\n  '], ' '), []))
Test('Should Until 58', () => Assert.IsExact(Token.Until(['\n  '], '\nA'), []))
Test('Should Until 59', () => Assert.IsExact(Token.Until(['\n  '], '  \nA '), []))
Test('Should Until 60', () => Assert.IsExact(Token.Until(['\n  '], '  \nAA'), []))
Test('Should Until 61', () => Assert.IsExact(Token.Until(['\n  '], '  \nAA '), []))
Test('Should Until 62', () => Assert.IsExact(Token.Until(['\n  '], '\n  A'), ['', '\n  A']))
Test('Should Until 63', () => Assert.IsExact(Token.Until(['\n  '], '  \n  A '), ['  ', '\n  A ']))
Test('Should Until 64', () => Assert.IsExact(Token.Until(['\n  '], '  \n  AA'), ['  ', '\n  AA']))
Test('Should Until 65', () => Assert.IsExact(Token.Until(['\n  '], '  \n  AA '), ['  ', '\n  AA ']))

// ------------------------------------------------------------------
// Until: Multi Sentinal Test
// ------------------------------------------------------------------
Test('Should Until 66', () => Assert.IsExact(Token.Until(['A', 'B'], ''), []))
Test('Should Until 67', () => Assert.IsExact(Token.Until(['A', 'B'], 'A'), ['', 'A']))
Test('Should Until 68', () => Assert.IsExact(Token.Until(['A', 'B'], 'B'), ['', 'B']))
Test('Should Until 69', () => Assert.IsExact(Token.Until(['A', 'B'], 'AB'), ['', 'AB']))
Test('Should Until 70', () => Assert.IsExact(Token.Until(['A', 'B'], 'BA'), ['', 'BA']))
Test('Should Until 71', () => Assert.IsExact(Token.Until(['A', 'B'], '   AB'), ['   ', 'AB']))
Test('Should Until 72', () => Assert.IsExact(Token.Until(['A', 'B'], '   BA'), ['   ', 'BA']))
Test('Should Until 73', () => Assert.IsExact(Token.Until(['A', ' B'], '   BA'), ['  ', ' BA']))
Test('Should Until 74', () => Assert.IsExact(Token.Until([' A', 'B'], '   BA'), ['   ', 'BA']))
Test('Should Until 75', () => Assert.IsExact(Token.Until(['B', 'A'], '   AB'), ['   ', 'AB']))
Test('Should Until 76', () => Assert.IsExact(Token.Until(['B', 'A'], '   BA'), ['   ', 'BA']))
Test('Should Until 77', () => Assert.IsExact(Token.Until(['B', ' A'], '   BA'), ['   ', 'BA']))
Test('Should Until 78', () => Assert.IsExact(Token.Until([' B', 'A'], '   BA'), ['  ', ' BA']))

// ------------------------------------------------------------------
// Until: Empty-String Variants
// ------------------------------------------------------------------
Test('Should Until 79', () => Assert.IsExact(Token.Until([''], '  '), ['', '  ']))
Test('Should Until 80', () => Assert.IsExact(Token.Until([''], '\n'), ['', '\n']))
Test('Should Until 81', () => Assert.IsExact(Token.Until([''], '\n\n'), ['', '\n\n']))

// ------------------------------------------------------------------
// Until: Mixed Characters & Whitespace
// ------------------------------------------------------------------
Test('Should Until 82', () => Assert.IsExact(Token.Until(['A'], ' \n A'), [' \n ', 'A']))
Test('Should Until 83', () => Assert.IsExact(Token.Until(['A'], '\tA'), ['\t', 'A']))
Test('Should Until 84', () => Assert.IsExact(Token.Until(['AB'], '\tAB '), ['\t', 'AB ']))
Test('Should Until 85', () => Assert.IsExact(Token.Until(['AB'], ' \tAB '), [' \t', 'AB ']))
Test('Should Until 86', () => Assert.IsExact(Token.Until(['AB'], ' \t AB'), [' \t ', 'AB']))

// ------------------------------------------------------------------
// Until: Multiple Sentinels with Overlaps
// ------------------------------------------------------------------
Test('Should Until 87', () => Assert.IsExact(Token.Until(['A', 'AB'], 'AB'), ['', 'AB']))
Test('Should Until 88', () => Assert.IsExact(Token.Until(['AB', 'A'], 'AB'), ['', 'AB']))
Test('Should Until 89', () => Assert.IsExact(Token.Until(['A', 'AB'], 'AAB'), ['', 'AAB']))
Test('Should Until 90', () => Assert.IsExact(Token.Until(['AB', 'A'], 'AAB'), ['', 'AAB']))
Test('Should Until 91', () => Assert.IsExact(Token.Until(['AB', 'B'], 'ABB'), ['', 'ABB']))

// ------------------------------------------------------------------
// Until: Only Whitespace with Multi-Sentinels
// ------------------------------------------------------------------
Test('Should Until 92', () => Assert.IsExact(Token.Until([' ', '\n'], ' \nA'), ['', ' \nA']))
Test('Should Until 93', () => Assert.IsExact(Token.Until(['  ', '\n'], '  \nA'), ['', '  \nA']))
Test('Should Until 94', () => Assert.IsExact(Token.Until(['\n', ' '], ' \nA'), ['', ' \nA']))
Test('Should Until 95', () => Assert.IsExact(Token.Until(['\n', ' '], '\n A'), ['', '\n A']))

// ------------------------------------------------------------------
// Until: Leading/Trailing Whitespace with Multiple Sentinels
// ------------------------------------------------------------------
Test('Should Until 96', () => Assert.IsExact(Token.Until(['A', 'B'], '   A B'), ['   ', 'A B']))
Test('Should Until 97', () => Assert.IsExact(Token.Until(['A', 'B'], '   B A'), ['   ', 'B A']))
Test('Should Until 98', () => Assert.IsExact(Token.Until(['AB', 'BA'], '  AB BA '), ['  ', 'AB BA ']))
Test('Should Until 99', () => Assert.IsExact(Token.Until(['AB', 'BA'], '  BA AB '), ['  ', 'BA AB ']))
Test('Should Until 100', () => Assert.IsExact(Token.Until(['AB', 'BA'], '\nAB BA'), ['\n', 'AB BA']))
