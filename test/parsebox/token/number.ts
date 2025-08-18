import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.Number')

Test('Should Number 1', () => Assert.IsExact(Token.Number(''), []))
Test('Should Number 2', () => Assert.IsExact(Token.Number('01'), ['0', '1']))
Test('Should Number 3', () => Assert.IsExact(Token.Number(' 01'), ['0', '1']))
Test('Should Number 4', () => Assert.IsExact(Token.Number('01 '), ['0', '1 ']))
Test('Should Number 5', () => Assert.IsExact(Token.Number(' 01 '), ['0', '1 ']))
Test('Should Number 6', () => Assert.IsExact(Token.Number('0'), ['0', '']))
Test('Should Number 7', () => Assert.IsExact(Token.Number('0 '), ['0', ' ']))
Test('Should Number 8', () => Assert.IsExact(Token.Number(' 0'), ['0', '']))
Test('Should Number 9', () => Assert.IsExact(Token.Number(' 0 '), ['0', ' ']))
Test('Should Number 10', () => Assert.IsExact(Token.Number('-0'), ['-0', '']))
Test('Should Number 11', () => Assert.IsExact(Token.Number('-0 '), ['-0', ' ']))
Test('Should Number 12', () => Assert.IsExact(Token.Number(' -0'), ['-0', '']))
Test('Should Number 13', () => Assert.IsExact(Token.Number(' -0 '), ['-0', ' ']))
Test('Should Number 14', () => Assert.IsExact(Token.Number('100'), ['100', '']))
Test('Should Number 15', () => Assert.IsExact(Token.Number('100 '), ['100', ' ']))
Test('Should Number 16', () => Assert.IsExact(Token.Number(' 100'), ['100', '']))
Test('Should Number 17', () => Assert.IsExact(Token.Number(' 100 '), ['100', ' ']))
Test('Should Number 18', () => Assert.IsExact(Token.Number('-100'), ['-100', '']))
Test('Should Number 19', () => Assert.IsExact(Token.Number('-100 '), ['-100', ' ']))
Test('Should Number 20', () => Assert.IsExact(Token.Number(' -100'), ['-100', '']))
Test('Should Number 21', () => Assert.IsExact(Token.Number(' -100 '), ['-100', ' ']))
Test('Should Number 22', () => Assert.IsExact(Token.Number('0.1'), ['0.1', '']))
Test('Should Number 23', () => Assert.IsExact(Token.Number('0.1 '), ['0.1', ' ']))
Test('Should Number 24', () => Assert.IsExact(Token.Number(' 0.1'), ['0.1', '']))
Test('Should Number 25', () => Assert.IsExact(Token.Number(' 0.1 '), ['0.1', ' ']))
Test('Should Number 26', () => Assert.IsExact(Token.Number('100.1'), ['100.1', '']))
Test('Should Number 27', () => Assert.IsExact(Token.Number('100.1 '), ['100.1', ' ']))
Test('Should Number 28', () => Assert.IsExact(Token.Number(' 100.1'), ['100.1', '']))
Test('Should Number 29', () => Assert.IsExact(Token.Number(' 100.1 '), ['100.1', ' ']))
Test('Should Number 30', () => Assert.IsExact(Token.Number('-100.1'), ['-100.1', '']))
Test('Should Number 31', () => Assert.IsExact(Token.Number('-100.1 '), ['-100.1', ' ']))
Test('Should Number 32', () => Assert.IsExact(Token.Number(' -100.1'), ['-100.1', '']))
Test('Should Number 33', () => Assert.IsExact(Token.Number(' -100.1 '), ['-100.1', ' ']))
Test('Should Number 34', () => Assert.IsExact(Token.Number('100.1.1'), ['100.1', '.1']))
Test('Should Number 35', () => Assert.IsExact(Token.Number('100.1.1 '), ['100.1', '.1 ']))
Test('Should Number 36', () => Assert.IsExact(Token.Number(' 100.1.1'), ['100.1', '.1']))
Test('Should Number 37', () => Assert.IsExact(Token.Number(' 100.1.1 '), ['100.1', '.1 ']))
Test('Should Number 38', () => Assert.IsExact(Token.Number('-.1'), ['-0.1', '']))
Test('Should Number 39', () => Assert.IsExact(Token.Number('-.1 '), ['-0.1', ' ']))
Test('Should Number 40', () => Assert.IsExact(Token.Number(' -.1'), ['-0.1', '']))
Test('Should Number 41', () => Assert.IsExact(Token.Number(' -.1 '), ['-0.1', ' ']))
Test('Should Number 42', () => Assert.IsExact(Token.Number('-0.1'), ['-0.1', '']))
Test('Should Number 43', () => Assert.IsExact(Token.Number('-0.1 '), ['-0.1', ' ']))
Test('Should Number 44', () => Assert.IsExact(Token.Number(' -0.1'), ['-0.1', '']))
Test('Should Number 45', () => Assert.IsExact(Token.Number(' -0.1 '), ['-0.1', ' ']))
Test('Should Number 46', () => Assert.IsExact(Token.Number(' -00.1'), ['-0', '0.1']))
Test('Should Number 47', () => Assert.IsExact(Token.Number(' -00.1 '), ['-0', '0.1 ']))

// ------------------------------------------------------------------
// Large numbers
// ------------------------------------------------------------------
Test('Should Number 48', () => Assert.IsExact(Token.Number('1234567890'), ['1234567890', '']))
Test('Should Number 49', () => Assert.IsExact(Token.Number('-9876543210 '), ['-9876543210', ' ']))

// ------------------------------------------------------------------
// Decimal without leading zero
// ------------------------------------------------------------------
Test('Should Number 50', () => Assert.IsExact(Token.Number('.5'), ['0.5', '']))
Test('Should Number 51', () => Assert.IsExact(Token.Number(' -.5 '), ['-0.5', ' ']))
Test('Should Number 52', () => Assert.IsExact(Token.Number('+.5'), []))

// ------------------------------------------------------------------
// Multiple leading zeros
// ------------------------------------------------------------------
Test('Should Number 53', () => Assert.IsExact(Token.Number('000123'), ['0', '00123']))
Test('Should Number 54', () => Assert.IsExact(Token.Number('-000.5'), ['-0', '00.5']))

// ------------------------------------------------------------------
// Numbers next to text
// ------------------------------------------------------------------
Test('Should Number 55', () => Assert.IsExact(Token.Number('100abc'), ['100', 'abc']))
Test('Should Number 56', () => Assert.IsExact(Token.Number('-0.1xyz'), ['-0.1', 'xyz']))

// ------------------------------------------------------------------
// Numbers with spaces inside (should stop at first space)
// ------------------------------------------------------------------
Test('Should Number 57', () => Assert.IsExact(Token.Number('123 456'), ['123', ' 456']))
Test('Should Number 58', () => Assert.IsExact(Token.Number('-78.9 0'), ['-78.9', ' 0']))

// ------------------------------------------------------------------
// Just a dot (invalid number)
// ------------------------------------------------------------------
Test('Should Number 59', () => Assert.IsExact(Token.Number('.'), []))
Test('Should Number 60', () => Assert.IsExact(Token.Number(' . '), []))
