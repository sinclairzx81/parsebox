import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.BigInt')

// ------------------------------------------------------------------
// Unsigned
// ------------------------------------------------------------------
Test('Should BigInt 1', () => Assert.IsExact(Token.BigInt('0n'), ['0', '']))
Test('Should BigInt 2', () => Assert.IsExact(Token.BigInt('00n'), []))
Test('Should BigInt 3', () => Assert.IsExact(Token.BigInt('10n'), ['10', '']))
Test('Should BigInt 4', () => Assert.IsExact(Token.BigInt(' 0n'), ['0', '']))
Test('Should BigInt 5', () => Assert.IsExact(Token.BigInt('0n '), ['0', ' ']))
Test('Should BigInt 6', () => Assert.IsExact(Token.BigInt(' 0n '), ['0', ' ']))
Test('Should BigInt 7', () => Assert.IsExact(Token.BigInt(' 00n'), []))
Test('Should BigInt 8', () => Assert.IsExact(Token.BigInt('00n '), []))
Test('Should BigInt 9', () => Assert.IsExact(Token.BigInt(' 00n '), []))
Test('Should BigInt 10', () => Assert.IsExact(Token.BigInt(' 10n'), ['10', '']))
Test('Should BigInt 11', () => Assert.IsExact(Token.BigInt('10n '), ['10', ' ']))
Test('Should BigInt 12', () => Assert.IsExact(Token.BigInt(' 10n '), ['10', ' ']))

// ------------------------------------------------------------------
// Signed
// ------------------------------------------------------------------
Test('Should BigInt 13', () => Assert.IsExact(Token.BigInt('-0n'), ['-0', '']))
Test('Should BigInt 14', () => Assert.IsExact(Token.BigInt('-00n'), []))
Test('Should BigInt 15', () => Assert.IsExact(Token.BigInt('-10n'), ['-10', '']))
Test('Should BigInt 16', () => Assert.IsExact(Token.BigInt(' -0n'), ['-0', '']))
Test('Should BigInt 17', () => Assert.IsExact(Token.BigInt('-0n '), ['-0', ' ']))
Test('Should BigInt 18', () => Assert.IsExact(Token.BigInt(' -0n '), ['-0', ' ']))
Test('Should BigInt 19', () => Assert.IsExact(Token.BigInt(' -00n'), []))
Test('Should BigInt 20', () => Assert.IsExact(Token.BigInt('-00n '), []))
Test('Should BigInt 21', () => Assert.IsExact(Token.BigInt(' -00n '), []))
Test('Should BigInt 22', () => Assert.IsExact(Token.BigInt(' -10n'), ['-10', '']))
Test('Should BigInt 23', () => Assert.IsExact(Token.BigInt('-10n '), ['-10', ' ']))
Test('Should BigInt 24', () => Assert.IsExact(Token.BigInt(' -10n '), ['-10', ' ']))

// ------------------------------------------------------------------
// Digits
// ------------------------------------------------------------------
Test('Should BigInt 25', () => Assert.IsExact(Token.BigInt('0n'), ['0', '']))
Test('Should BigInt 26', () => Assert.IsExact(Token.BigInt('1n'), ['1', '']))
Test('Should BigInt 27', () => Assert.IsExact(Token.BigInt('2n'), ['2', '']))
Test('Should BigInt 28', () => Assert.IsExact(Token.BigInt('3n'), ['3', '']))
Test('Should BigInt 29', () => Assert.IsExact(Token.BigInt('4n'), ['4', '']))
Test('Should BigInt 30', () => Assert.IsExact(Token.BigInt('5n'), ['5', '']))
Test('Should BigInt 31', () => Assert.IsExact(Token.BigInt('6n'), ['6', '']))
Test('Should BigInt 32', () => Assert.IsExact(Token.BigInt('7n'), ['7', '']))
Test('Should BigInt 33', () => Assert.IsExact(Token.BigInt('8n'), ['8', '']))
Test('Should BigInt 34', () => Assert.IsExact(Token.BigInt('9n'), ['9', '']))
Test('Should BigInt 35', () => Assert.IsExact(Token.BigInt('-0n'), ['-0', '']))
Test('Should BigInt 36', () => Assert.IsExact(Token.BigInt('-1n'), ['-1', '']))
Test('Should BigInt 37', () => Assert.IsExact(Token.BigInt('-2n'), ['-2', '']))
Test('Should BigInt 38', () => Assert.IsExact(Token.BigInt('-3n'), ['-3', '']))
Test('Should BigInt 39', () => Assert.IsExact(Token.BigInt('-4n'), ['-4', '']))
Test('Should BigInt 40', () => Assert.IsExact(Token.BigInt('-5n'), ['-5', '']))
Test('Should BigInt 41', () => Assert.IsExact(Token.BigInt('-6n'), ['-6', '']))
Test('Should BigInt 42', () => Assert.IsExact(Token.BigInt('-7n'), ['-7', '']))
Test('Should BigInt 43', () => Assert.IsExact(Token.BigInt('-8n'), ['-8', '']))
Test('Should BigInt 44', () => Assert.IsExact(Token.BigInt('-9n'), ['-9', '']))
Test('Should BigInt 45', () => Assert.IsExact(Token.BigInt('10n'), ['10', '']))
Test('Should BigInt 46', () => Assert.IsExact(Token.BigInt('11n'), ['11', '']))
Test('Should BigInt 47', () => Assert.IsExact(Token.BigInt('12n'), ['12', '']))
Test('Should BigInt 48', () => Assert.IsExact(Token.BigInt('13n'), ['13', '']))
Test('Should BigInt 49', () => Assert.IsExact(Token.BigInt('14n'), ['14', '']))
Test('Should BigInt 50', () => Assert.IsExact(Token.BigInt('15n'), ['15', '']))
Test('Should BigInt 51', () => Assert.IsExact(Token.BigInt('16n'), ['16', '']))
Test('Should BigInt 52', () => Assert.IsExact(Token.BigInt('17n'), ['17', '']))
Test('Should BigInt 53', () => Assert.IsExact(Token.BigInt('18n'), ['18', '']))
Test('Should BigInt 54', () => Assert.IsExact(Token.BigInt('19n'), ['19', '']))
Test('Should BigInt 55', () => Assert.IsExact(Token.BigInt('-10n'), ['-10', '']))
Test('Should BigInt 56', () => Assert.IsExact(Token.BigInt('-11n'), ['-11', '']))
Test('Should BigInt 57', () => Assert.IsExact(Token.BigInt('-12n'), ['-12', '']))
Test('Should BigInt 58', () => Assert.IsExact(Token.BigInt('-13n'), ['-13', '']))
Test('Should BigInt 59', () => Assert.IsExact(Token.BigInt('-14n'), ['-14', '']))
Test('Should BigInt 60', () => Assert.IsExact(Token.BigInt('-15n'), ['-15', '']))
Test('Should BigInt 61', () => Assert.IsExact(Token.BigInt('-16n'), ['-16', '']))
Test('Should BigInt 62', () => Assert.IsExact(Token.BigInt('-17n'), ['-17', '']))
Test('Should BigInt 63', () => Assert.IsExact(Token.BigInt('-18n'), ['-18', '']))
Test('Should BigInt 64', () => Assert.IsExact(Token.BigInt('-19n'), ['-19', '']))

// ------------------------------------------------------------------
// Invariant
// ------------------------------------------------------------------
Test('Should BigInt 65', () => Assert.IsExact(Token.BigInt('x'), []))
Test('Should BigInt 66', () => Assert.IsExact(Token.BigInt(''), []))

// ------------------------------------------------------------------
// Additional
// ------------------------------------------------------------------
Test('Should BigInt 67', () => Assert.IsExact(Token.BigInt('000n'), []))
Test('Should BigInt 68', () => Assert.IsExact(Token.BigInt('0000n'), []))
Test('Should BigInt 69', () => Assert.IsExact(Token.BigInt('1000n'), ['1000', '']))
Test('Should BigInt 70', () => Assert.IsExact(Token.BigInt('1000nx'), ['1000', 'x']))

// ------------------------------------------------------------------
// Underscore: We support multiple underscore
// ------------------------------------------------------------------
Test('Should BigInt 71', () => Assert.IsExact(Token.BigInt('10_000_000n'), ['10000000', '']))
Test('Should BigInt 72', () => Assert.IsExact(Token.BigInt('10_000n _000'), ['10000', ' _000']))
Test('Should BigInt 73', () => Assert.IsExact(Token.BigInt('10_000_n 000'), ['10000', ' 000']))
Test('Should BigInt 74', () => Assert.IsExact(Token.BigInt('10__000n 000'), ['10000', ' 000']))
Test('Should BigInt 75', () => Assert.IsExact(Token.BigInt('10__000__n 000'), ['10000', ' 000']))
Test('Should BigInt 76', () => Assert.IsExact(Token.BigInt('10__000n __000'), ['10000', ' __000']))
