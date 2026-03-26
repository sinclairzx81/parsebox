import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.UnsignedInteger')

// ------------------------------------------------------------------
// Unsigned
// ------------------------------------------------------------------
Test('Should Integer 1', () => Assert.IsExact(Token.UnsignedInteger('0'), ['0', '']))
Test('Should Integer 2', () => Assert.IsExact(Token.UnsignedInteger('00'), ['0', '0']))
Test('Should Integer 3', () => Assert.IsExact(Token.UnsignedInteger('10'), ['10', '']))
Test('Should Integer 4', () => Assert.IsExact(Token.UnsignedInteger(' 0'), ['0', '']))
Test('Should Integer 5', () => Assert.IsExact(Token.UnsignedInteger('0 '), ['0', ' ']))
Test('Should Integer 6', () => Assert.IsExact(Token.UnsignedInteger(' 0 '), ['0', ' ']))
Test('Should Integer 7', () => Assert.IsExact(Token.UnsignedInteger(' 00'), ['0', '0']))
Test('Should Integer 8', () => Assert.IsExact(Token.UnsignedInteger('00 '), ['0', '0 ']))
Test('Should Integer 9', () => Assert.IsExact(Token.UnsignedInteger(' 00 '), ['0', '0 ']))
Test('Should Integer 10', () => Assert.IsExact(Token.UnsignedInteger(' 10'), ['10', '']))
Test('Should Integer 11', () => Assert.IsExact(Token.UnsignedInteger('10 '), ['10', ' ']))
Test('Should Integer 12', () => Assert.IsExact(Token.UnsignedInteger(' 10 '), ['10', ' ']))

// ------------------------------------------------------------------
// Digits
// ------------------------------------------------------------------
Test('Should Integer 13', () => Assert.IsExact(Token.UnsignedInteger('0'), ['0', '']))
Test('Should Integer 14', () => Assert.IsExact(Token.UnsignedInteger('1'), ['1', '']))
Test('Should Integer 15', () => Assert.IsExact(Token.UnsignedInteger('2'), ['2', '']))
Test('Should Integer 16', () => Assert.IsExact(Token.UnsignedInteger('3'), ['3', '']))
Test('Should Integer 17', () => Assert.IsExact(Token.UnsignedInteger('4'), ['4', '']))
Test('Should Integer 18', () => Assert.IsExact(Token.UnsignedInteger('5'), ['5', '']))
Test('Should Integer 19', () => Assert.IsExact(Token.UnsignedInteger('6'), ['6', '']))
Test('Should Integer 20', () => Assert.IsExact(Token.UnsignedInteger('7'), ['7', '']))
Test('Should Integer 21', () => Assert.IsExact(Token.UnsignedInteger('8'), ['8', '']))
Test('Should Integer 22', () => Assert.IsExact(Token.UnsignedInteger('9'), ['9', '']))

Test('Should Integer 23', () => Assert.IsExact(Token.UnsignedInteger('10'), ['10', '']))
Test('Should Integer 24', () => Assert.IsExact(Token.UnsignedInteger('11'), ['11', '']))
Test('Should Integer 25', () => Assert.IsExact(Token.UnsignedInteger('12'), ['12', '']))
Test('Should Integer 26', () => Assert.IsExact(Token.UnsignedInteger('13'), ['13', '']))
Test('Should Integer 27', () => Assert.IsExact(Token.UnsignedInteger('14'), ['14', '']))
Test('Should Integer 28', () => Assert.IsExact(Token.UnsignedInteger('15'), ['15', '']))
Test('Should Integer 29', () => Assert.IsExact(Token.UnsignedInteger('16'), ['16', '']))
Test('Should Integer 30', () => Assert.IsExact(Token.UnsignedInteger('17'), ['17', '']))
Test('Should Integer 31', () => Assert.IsExact(Token.UnsignedInteger('18'), ['18', '']))
Test('Should Integer 32', () => Assert.IsExact(Token.UnsignedInteger('19'), ['19', '']))

// ------------------------------------------------------------------
// Invariant
// ------------------------------------------------------------------
Test('Should Integer 33', () => Assert.IsExact(Token.UnsignedInteger('x'), []))
Test('Should Integer 34', () => Assert.IsExact(Token.UnsignedInteger(''), []))

// ------------------------------------------------------------------
// Additional
// ------------------------------------------------------------------
Test('Should Integer 35', () => Assert.IsExact(Token.UnsignedInteger('000'), ['0', '00']))
Test('Should Integer 36', () => Assert.IsExact(Token.UnsignedInteger('0000'), ['0', '000']))
Test('Should Integer 37', () => Assert.IsExact(Token.UnsignedInteger('1000'), ['1000', '']))
Test('Should Integer 38', () => Assert.IsExact(Token.UnsignedInteger('1000x'), ['1000', 'x']))

// ------------------------------------------------------------------
// Underscore: We support multiple underscore (should we?)
// ------------------------------------------------------------------
Test('Should Integer 39', () => Assert.IsExact(Token.UnsignedInteger('10_000_000'), ['10000000', '']))
Test('Should Integer 40', () => Assert.IsExact(Token.UnsignedInteger('10_000 _000'), ['10000', ' _000']))
Test('Should Integer 41', () => Assert.IsExact(Token.UnsignedInteger('10_000_ 000'), ['10000', ' 000']))
Test('Should Integer 42', () => Assert.IsExact(Token.UnsignedInteger('10__000 000'), ['10000', ' 000']))
Test('Should Integer 43', () => Assert.IsExact(Token.UnsignedInteger('10__000__ 000'), ['10000', ' 000']))
Test('Should Integer 44', () => Assert.IsExact(Token.UnsignedInteger('10__000 __000'), ['10000', ' __000']))
