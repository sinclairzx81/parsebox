import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.UnsignedNumber')

Test('Should Number 1', () => Assert.IsExact(Token.UnsignedNumber(''), []))
Test('Should Number 2', () => Assert.IsExact(Token.UnsignedNumber('01'), ['0', '1']))
Test('Should Number 3', () => Assert.IsExact(Token.UnsignedNumber(' 01'), ['0', '1']))
Test('Should Number 4', () => Assert.IsExact(Token.UnsignedNumber('01 '), ['0', '1 ']))
Test('Should Number 5', () => Assert.IsExact(Token.UnsignedNumber(' 01 '), ['0', '1 ']))
Test('Should Number 6', () => Assert.IsExact(Token.UnsignedNumber('0'), ['0', '']))
Test('Should Number 7', () => Assert.IsExact(Token.UnsignedNumber('0 '), ['0', ' ']))
Test('Should Number 8', () => Assert.IsExact(Token.UnsignedNumber(' 0'), ['0', '']))
Test('Should Number 9', () => Assert.IsExact(Token.UnsignedNumber(' 0 '), ['0', ' ']))
Test('Should Number 10', () => Assert.IsExact(Token.UnsignedNumber('100'), ['100', '']))
Test('Should Number 11', () => Assert.IsExact(Token.UnsignedNumber('100 '), ['100', ' ']))
Test('Should Number 12', () => Assert.IsExact(Token.UnsignedNumber(' 100'), ['100', '']))
Test('Should Number 13', () => Assert.IsExact(Token.UnsignedNumber(' 100 '), ['100', ' ']))
Test('Should Number 14', () => Assert.IsExact(Token.UnsignedNumber('0.1'), ['0.1', '']))
Test('Should Number 15', () => Assert.IsExact(Token.UnsignedNumber('0.1 '), ['0.1', ' ']))
Test('Should Number 16', () => Assert.IsExact(Token.UnsignedNumber(' 0.1'), ['0.1', '']))
Test('Should Number 17', () => Assert.IsExact(Token.UnsignedNumber(' 0.1 '), ['0.1', ' ']))
Test('Should Number 18', () => Assert.IsExact(Token.UnsignedNumber('100.1'), ['100.1', '']))
Test('Should Number 19', () => Assert.IsExact(Token.UnsignedNumber('100.1 '), ['100.1', ' ']))
Test('Should Number 20', () => Assert.IsExact(Token.UnsignedNumber(' 100.1'), ['100.1', '']))
Test('Should Number 21', () => Assert.IsExact(Token.UnsignedNumber(' 100.1 '), ['100.1', ' ']))
Test('Should Number 22', () => Assert.IsExact(Token.UnsignedNumber('100.1.1'), ['100.1', '.1']))
Test('Should Number 23', () => Assert.IsExact(Token.UnsignedNumber('100.1.1 '), ['100.1', '.1 ']))
Test('Should Number 24', () => Assert.IsExact(Token.UnsignedNumber(' 100.1.1'), ['100.1', '.1']))
Test('Should Number 25', () => Assert.IsExact(Token.UnsignedNumber(' 100.1.1 '), ['100.1', '.1 ']))

// ------------------------------------------------------------------
// Large numbers
// ------------------------------------------------------------------
Test('Should Number 26', () => Assert.IsExact(Token.UnsignedNumber('1234567890'), ['1234567890', '']))

// ------------------------------------------------------------------
// Decimal without leading zero
// ------------------------------------------------------------------
Test('Should Number 27', () => Assert.IsExact(Token.UnsignedNumber('.5'), ['0.5', '']))
Test('Should Number 28', () => Assert.IsExact(Token.UnsignedNumber('+.5'), []))

// ------------------------------------------------------------------
// Multiple leading zeros
// ------------------------------------------------------------------
Test('Should Number 29', () => Assert.IsExact(Token.UnsignedNumber('000123'), ['0', '00123']))

// ------------------------------------------------------------------
// Numbers next to text
// ------------------------------------------------------------------
Test('Should Number 30', () => Assert.IsExact(Token.UnsignedNumber('100abc'), ['100', 'abc']))

// ------------------------------------------------------------------
// Numbers with spaces inside (should stop at first space)
// ------------------------------------------------------------------
Test('Should Number 31', () => Assert.IsExact(Token.UnsignedNumber('123 456'), ['123', ' 456']))

// ------------------------------------------------------------------
// Just a dot (invalid number)
// ------------------------------------------------------------------
Test('Should Number 32', () => Assert.IsExact(Token.UnsignedNumber('.'), []))
Test('Should Number 33', () => Assert.IsExact(Token.UnsignedNumber(' . '), []))
