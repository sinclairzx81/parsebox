import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.Integer')

// ------------------------------------------------------------------
// Unsigned
// ------------------------------------------------------------------
Test('Should Integer 1', () => Assert.IsExact(Token.Integer('0'), ['0', '']))
Test('Should Integer 2', () => Assert.IsExact(Token.Integer('00'), ['0', '0']))
Test('Should Integer 3', () => Assert.IsExact(Token.Integer('10'), ['10', '']))
Test('Should Integer 4', () => Assert.IsExact(Token.Integer(' 0'), ['0', '']))
Test('Should Integer 5', () => Assert.IsExact(Token.Integer('0 '), ['0', ' ']))
Test('Should Integer 6', () => Assert.IsExact(Token.Integer(' 0 '), ['0', ' ']))
Test('Should Integer 7', () => Assert.IsExact(Token.Integer(' 00'), ['0', '0']))
Test('Should Integer 8', () => Assert.IsExact(Token.Integer('00 '), ['0', '0 ']))
Test('Should Integer 9', () => Assert.IsExact(Token.Integer(' 00 '), ['0', '0 ']))
Test('Should Integer 10', () => Assert.IsExact(Token.Integer(' 10'), ['10', '']))
Test('Should Integer 11', () => Assert.IsExact(Token.Integer('10 '), ['10', ' ']))
Test('Should Integer 12', () => Assert.IsExact(Token.Integer(' 10 '), ['10', ' ']))

// ------------------------------------------------------------------
// Signed
// ------------------------------------------------------------------
Test('Should Integer 13', () => Assert.IsExact(Token.Integer('-0'), ['-0', '']))
Test('Should Integer 14', () => Assert.IsExact(Token.Integer('-00'), ['-0', '0']))
Test('Should Integer 15', () => Assert.IsExact(Token.Integer('-10'), ['-10', '']))
Test('Should Integer 16', () => Assert.IsExact(Token.Integer(' -0'), ['-0', '']))
Test('Should Integer 17', () => Assert.IsExact(Token.Integer('-0 '), ['-0', ' ']))
Test('Should Integer 18', () => Assert.IsExact(Token.Integer(' -0 '), ['-0', ' ']))
Test('Should Integer 19', () => Assert.IsExact(Token.Integer(' -00'), ['-0', '0']))
Test('Should Integer 20', () => Assert.IsExact(Token.Integer('-00 '), ['-0', '0 ']))
Test('Should Integer 21', () => Assert.IsExact(Token.Integer(' -00 '), ['-0', '0 ']))
Test('Should Integer 22', () => Assert.IsExact(Token.Integer(' -10'), ['-10', '']))
Test('Should Integer 23', () => Assert.IsExact(Token.Integer('-10 '), ['-10', ' ']))
Test('Should Integer 24', () => Assert.IsExact(Token.Integer(' -10 '), ['-10', ' ']))

// ------------------------------------------------------------------
// Digits
// ------------------------------------------------------------------
Test('Should Integer 25', () => Assert.IsExact(Token.Integer('0'), ['0', '']))
Test('Should Integer 26', () => Assert.IsExact(Token.Integer('1'), ['1', '']))
Test('Should Integer 27', () => Assert.IsExact(Token.Integer('2'), ['2', '']))
Test('Should Integer 28', () => Assert.IsExact(Token.Integer('3'), ['3', '']))
Test('Should Integer 29', () => Assert.IsExact(Token.Integer('4'), ['4', '']))
Test('Should Integer 30', () => Assert.IsExact(Token.Integer('5'), ['5', '']))
Test('Should Integer 31', () => Assert.IsExact(Token.Integer('6'), ['6', '']))
Test('Should Integer 32', () => Assert.IsExact(Token.Integer('7'), ['7', '']))
Test('Should Integer 33', () => Assert.IsExact(Token.Integer('8'), ['8', '']))
Test('Should Integer 34', () => Assert.IsExact(Token.Integer('9'), ['9', '']))
Test('Should Integer 35', () => Assert.IsExact(Token.Integer('-0'), ['-0', '']))
Test('Should Integer 36', () => Assert.IsExact(Token.Integer('-1'), ['-1', '']))
Test('Should Integer 37', () => Assert.IsExact(Token.Integer('-2'), ['-2', '']))
Test('Should Integer 38', () => Assert.IsExact(Token.Integer('-3'), ['-3', '']))
Test('Should Integer 39', () => Assert.IsExact(Token.Integer('-4'), ['-4', '']))
Test('Should Integer 40', () => Assert.IsExact(Token.Integer('-5'), ['-5', '']))
Test('Should Integer 41', () => Assert.IsExact(Token.Integer('-6'), ['-6', '']))
Test('Should Integer 42', () => Assert.IsExact(Token.Integer('-7'), ['-7', '']))
Test('Should Integer 43', () => Assert.IsExact(Token.Integer('-8'), ['-8', '']))
Test('Should Integer 44', () => Assert.IsExact(Token.Integer('-9'), ['-9', '']))
Test('Should Integer 45', () => Assert.IsExact(Token.Integer('10'), ['10', '']))
Test('Should Integer 46', () => Assert.IsExact(Token.Integer('11'), ['11', '']))
Test('Should Integer 47', () => Assert.IsExact(Token.Integer('12'), ['12', '']))
Test('Should Integer 48', () => Assert.IsExact(Token.Integer('13'), ['13', '']))
Test('Should Integer 49', () => Assert.IsExact(Token.Integer('14'), ['14', '']))
Test('Should Integer 50', () => Assert.IsExact(Token.Integer('15'), ['15', '']))
Test('Should Integer 51', () => Assert.IsExact(Token.Integer('16'), ['16', '']))
Test('Should Integer 52', () => Assert.IsExact(Token.Integer('17'), ['17', '']))
Test('Should Integer 53', () => Assert.IsExact(Token.Integer('18'), ['18', '']))
Test('Should Integer 54', () => Assert.IsExact(Token.Integer('19'), ['19', '']))
Test('Should Integer 55', () => Assert.IsExact(Token.Integer('-10'), ['-10', '']))
Test('Should Integer 56', () => Assert.IsExact(Token.Integer('-11'), ['-11', '']))
Test('Should Integer 57', () => Assert.IsExact(Token.Integer('-12'), ['-12', '']))
Test('Should Integer 58', () => Assert.IsExact(Token.Integer('-13'), ['-13', '']))
Test('Should Integer 59', () => Assert.IsExact(Token.Integer('-14'), ['-14', '']))
Test('Should Integer 60', () => Assert.IsExact(Token.Integer('-15'), ['-15', '']))
Test('Should Integer 61', () => Assert.IsExact(Token.Integer('-16'), ['-16', '']))
Test('Should Integer 62', () => Assert.IsExact(Token.Integer('-17'), ['-17', '']))
Test('Should Integer 63', () => Assert.IsExact(Token.Integer('-18'), ['-18', '']))
Test('Should Integer 64', () => Assert.IsExact(Token.Integer('-19'), ['-19', '']))

// ------------------------------------------------------------------
// Invariant
// ------------------------------------------------------------------
Test('Should Integer 65', () => Assert.IsExact(Token.Integer('x'), []))
Test('Should Integer 66', () => Assert.IsExact(Token.Integer(''), []))

// ------------------------------------------------------------------
// Additional
// ------------------------------------------------------------------
Test('Should Integer 67', () => Assert.IsExact(Token.Integer('000'), ['0', '00']))
Test('Should Integer 68', () => Assert.IsExact(Token.Integer('0000'), ['0', '000']))
Test('Should Integer 69', () => Assert.IsExact(Token.Integer('1000'), ['1000', '']))
Test('Should Integer 70', () => Assert.IsExact(Token.Integer('1000x'), ['1000', 'x']))

// ------------------------------------------------------------------
// Underscore: We support multiple underscore (should we?)
// ------------------------------------------------------------------
Test('Should Integer 71', () => Assert.IsExact(Token.Integer('10_000_000'), ['10000000', '']))
Test('Should Integer 72', () => Assert.IsExact(Token.Integer('10_000 _000'), ['10000', ' _000']))
Test('Should Integer 73', () => Assert.IsExact(Token.Integer('10_000_ 000'), ['10000', ' 000']))
Test('Should Integer 74', () => Assert.IsExact(Token.Integer('10__000 000'), ['10000', ' 000']))
Test('Should Integer 75', () => Assert.IsExact(Token.Integer('10__000__ 000'), ['10000', ' 000']))
Test('Should Integer 76', () => Assert.IsExact(Token.Integer('10__000 __000'), ['10000', ' __000']))
