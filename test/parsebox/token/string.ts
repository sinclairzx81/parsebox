import { Token } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Token.String')

// ------------------------------------------------------------------
// Const: Empty
// ------------------------------------------------------------------
Test('Should String 1', () => Assert.IsExact(Token.String([`'`, `"`], ''), []))

// ------------------------------------------------------------------
// DoubleQuote
// ------------------------------------------------------------------
Test('Should String 2', () => Assert.IsExact(Token.String([`'`, `"`], `"A"`), ['A', '']))
Test('Should String 3', () => Assert.IsExact(Token.String([`'`, `"`], ` "A"`), ['A', '']))
Test('Should String 4', () => Assert.IsExact(Token.String([`'`, `"`], `"A" `), ['A', ' ']))
Test('Should String 5', () => Assert.IsExact(Token.String([`'`, `"`], ` "A" `), ['A', ' ']))

// ------------------------------------------------------------------
// SingleQuote
// ------------------------------------------------------------------
Test('Should String 6', () => Assert.IsExact(Token.String([`'`, `"`], `'A'`), ['A', '']))
Test('Should String 7', () => Assert.IsExact(Token.String([`'`, `"`], ` 'A'`), ['A', '']))
Test('Should String 8', () => Assert.IsExact(Token.String([`'`, `"`], `'A' `), ['A', ' ']))
Test('Should String 9', () => Assert.IsExact(Token.String([`'`, `"`], ` 'A' `), ['A', ' ']))

// ------------------------------------------------------------------
// Embedded
// ------------------------------------------------------------------
Test('Should String 10', () => Assert.IsExact(Token.String([`'`, `"`], ` "A'" `), [`A'`, ' ']))
Test('Should String 11', () => Assert.IsExact(Token.String([`'`, `"`], ` 'A"' `), [`A"`, ' ']))

// ------------------------------------------------------------------
// Multi-Characters
// ------------------------------------------------------------------
Test('Should String 12', () => Assert.IsExact(Token.String([`'`, `"`], `"Hello"`), ['Hello', '']))
Test('Should String 13', () => Assert.IsExact(Token.String([`'`, `"`], `'World'`), ['World', '']))
Test('Should String 14', () => Assert.IsExact(Token.String([`'`, `"`], ` "Hello"`), ['Hello', '']))
Test('Should String 15', () => Assert.IsExact(Token.String([`'`, `"`], `'World' `), ['World', ' ']))

// ------------------------------------------------------------------
// Spaces
// ------------------------------------------------------------------
Test('Should String 16', () => Assert.IsExact(Token.String([`'`, `"`], `"Hello World"`), ['Hello World', '']))
Test('Should String 17', () => Assert.IsExact(Token.String([`'`, `"`], `'Hello World' `), ['Hello World', ' ']))
Test('Should String 18', () => Assert.IsExact(Token.String([`'`, `"`], ` "Hello World" `), ['Hello World', ' ']))

// ------------------------------------------------------------------
// Empty
// ------------------------------------------------------------------
Test('Should String 19', () => Assert.IsExact(Token.String([`'`, `"`], `""`), ['', '']))
Test('Should String 20', () => Assert.IsExact(Token.String([`'`, `"`], `''`), ['', '']))
Test('Should String 21', () => Assert.IsExact(Token.String([`'`, `"`], ` " "`), [' ', '']))

// ------------------------------------------------------------------
// Spaces Only
// ------------------------------------------------------------------
Test('Should String 22', () => Assert.IsExact(Token.String([`'`, `"`], `"   "`), ['   ', '']))
Test('Should String 23', () => Assert.IsExact(Token.String([`'`, `"`], `'   '`), ['   ', '']))

// ------------------------------------------------------------------
// Unclosed
// ------------------------------------------------------------------
Test('Should String 24', () => Assert.IsExact(Token.String([`'`, `"`], `"Unclosed`), []))
Test('Should String 25', () => Assert.IsExact(Token.String([`'`, `"`], `'Unclosed`), []))

// ------------------------------------------------------------------
// Adjacent quotes
// ------------------------------------------------------------------
Test('Should String 26', () => Assert.IsExact(Token.String([`'`, `"`], `""""`), ['', '""']))
Test('Should String 27', () => Assert.IsExact(Token.String([`'`, `"`], `''''`), ['', "''"]))

// ------------------------------------------------------------------
// Quotes with numbers inside
// ------------------------------------------------------------------
Test('Should String 28', () => Assert.IsExact(Token.String([`'`, `"`], `"123"`), ['123', '']))
Test('Should String 29', () => Assert.IsExact(Token.String([`'`, `"`], `'456' `), ['456', ' ']))

// ------------------------------------------------------------------
// Quotes next to other characters (should only consume first valid string)
// ------------------------------------------------------------------
Test('Should String 30', () => Assert.IsExact(Token.String([`'`, `"`], `"Hello"'World'`), ['Hello', `'World'`]))
Test('Should String 31', () => Assert.IsExact(Token.String([`'`, `"`], `'Hello'"World"`), ['Hello', `"World"`]))

// ------------------------------------------------------------------
// Only whitespace before/after quotes
// ------------------------------------------------------------------
Test('Should String 32', () => Assert.IsExact(Token.String([`'`, `"`], `    "Hi"`), ['Hi', '']))
Test('Should String 33', () => Assert.IsExact(Token.String([`'`, `"`], `'Hi'    `), ['Hi', '    ']))
Test('Should String 34', () => Assert.IsExact(Token.String([`'`, `"`], `    'Hi'    `), ['Hi', '    ']))

// ------------------------------------------------------------------
// Quotes with punctuation inside
// ------------------------------------------------------------------
Test('Should String 35', () => Assert.IsExact(Token.String([`'`, `"`], `"Hello!"`), ['Hello!', '']))
Test('Should String 36', () => Assert.IsExact(Token.String([`'`, `"`], `'Wow?!'`), ['Wow?!', '']))
