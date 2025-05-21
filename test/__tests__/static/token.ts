import { Static } from '@sinclair/parsebox'

function Assert<Left, _Right extends Left>(): void {}

// ------------------------------------------------------------------
// Const: Empty
// ------------------------------------------------------------------
Assert<Static.Token.Const<'', ''>, ['', '']>()
Assert<Static.Token.Const<'', 'A'>, ['', 'A']>()
Assert<Static.Token.Const<'', '   A'>, ['', '   A']>()

// ------------------------------------------------------------------
// Const: Single-Char
// ------------------------------------------------------------------
Assert<Static.Token.Const<'A', 'A'>, ['A', '']>()
Assert<Static.Token.Const<'A', 'A '>, ['A', ' ']>()
Assert<Static.Token.Const<'A', 'AA'>, ['A', 'A']>()
Assert<Static.Token.Const<'A', 'AA '>, ['A', 'A ']>()

// ------------------------------------------------------------------
// Const: Multi-Char
// ------------------------------------------------------------------
Assert<Static.Token.Const<'AB', 'AB'>, ['AB', '']>()
Assert<Static.Token.Const<'AB', 'AB '>, ['AB', ' ']>()
Assert<Static.Token.Const<'AB', 'ABA'>, ['AB', 'A']>()
Assert<Static.Token.Const<'AB', 'ABA '>, ['AB', 'A ']>()

// ------------------------------------------------------------------
// Const: Single-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Const<'A', '  A'>, ['A', '']>()
Assert<Static.Token.Const<'A', '  A '>, ['A', ' ']>()
Assert<Static.Token.Const<'A', '  AA'>, ['A', 'A']>()
Assert<Static.Token.Const<'A', '  AA '>, ['A', 'A ']>()
Assert<Static.Token.Const<'A', '\nAA '>, ['A', 'A ']>()
Assert<Static.Token.Const<'A', ' \nAA '>, ['A', 'A ']>()
Assert<Static.Token.Const<'A', '\n AA '>, ['A', 'A ']>()
Assert<Static.Token.Const<'A', ' \n AA '>, ['A', 'A ']>()

// ------------------------------------------------------------------
// Const: Multi-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Const<'AB', '  AB'>, ['AB', '']>()
Assert<Static.Token.Const<'AB', '  AB '>, ['AB', ' ']>()
Assert<Static.Token.Const<'AB', '  ABA'>, ['AB', 'A']>()
Assert<Static.Token.Const<'AB', '  ABA '>, ['AB', 'A ']>()
Assert<Static.Token.Const<'AB', '\nABA '>, ['AB', 'A ']>()
Assert<Static.Token.Const<'AB', ' \nABA '>, ['AB', 'A ']>()
Assert<Static.Token.Const<'AB', '\n ABA '>, ['AB', 'A ']>()
Assert<Static.Token.Const<'AB', ' \n ABA '>, ['AB', 'A ']>()

// ------------------------------------------------------------------
// Const: Single-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Const<' ', ''>, []>()
Assert<Static.Token.Const<' ', ' '>, [' ', '']>()
Assert<Static.Token.Const<' ', ' A'>, [' ', 'A']>()
Assert<Static.Token.Const<' ', ' A '>, [' ', 'A ']>()
Assert<Static.Token.Const<' ', ' AA'>, [' ', 'AA']>()
Assert<Static.Token.Const<' ', ' AA '>, [' ', 'AA ']>()

// ------------------------------------------------------------------
// Const: Multi-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Const<'  ', ''>, []>()
Assert<Static.Token.Const<'  ', ' '>, []>()
Assert<Static.Token.Const<'  ', '  A'>, ['  ', 'A']>()
Assert<Static.Token.Const<'  ', '  A '>, ['  ', 'A ']>()
Assert<Static.Token.Const<'  ', '  AA'>, ['  ', 'AA']>()
Assert<Static.Token.Const<'  ', '  AA '>, ['  ', 'AA ']>()

// ------------------------------------------------------------------
// Const: Newline
// ------------------------------------------------------------------
Assert<Static.Token.Const<'\n', ''>, []>()
Assert<Static.Token.Const<'\n', ' '>, []>()
Assert<Static.Token.Const<'\n', '\nA'>, ['\n', 'A']>()
Assert<Static.Token.Const<'\n', '  \nA '>, ['\n', 'A ']>()
Assert<Static.Token.Const<'\n', '  \nAA'>, ['\n', 'AA']>()
Assert<Static.Token.Const<'\n', '  \nAA '>, ['\n', 'AA ']>()

// ------------------------------------------------------------------
// Const: Newline-Single-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Const<'\n ', ''>, []>()
Assert<Static.Token.Const<'\n ', ' '>, []>()
Assert<Static.Token.Const<'\n ', '\nA'>, []>()
Assert<Static.Token.Const<'\n ', '  \nA '>, []>()
Assert<Static.Token.Const<'\n ', '  \nAA'>, []>()
Assert<Static.Token.Const<'\n ', '  \nAA '>, []>()
Assert<Static.Token.Const<'\n ', '\n A'>, ['\n ', 'A']>()
Assert<Static.Token.Const<'\n ', '  \n A '>, ['\n ', 'A ']>()
Assert<Static.Token.Const<'\n ', '  \n AA'>, ['\n ', 'AA']>()
Assert<Static.Token.Const<'\n ', '  \n AA '>, ['\n ', 'AA ']>()

// ------------------------------------------------------------------
// Const: Newline-Multi-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Const<'\n  ', ''>, []>()
Assert<Static.Token.Const<'\n  ', ' '>, []>()
Assert<Static.Token.Const<'\n  ', '\n A'>, []>()
Assert<Static.Token.Const<'\n  ', '  \n A '>, []>()
Assert<Static.Token.Const<'\n  ', '  \n AA'>, []>()
Assert<Static.Token.Const<'\n  ', '  \n AA '>, []>()
Assert<Static.Token.Const<'\n  ', '\n  A'>, ['\n  ', 'A']>()
Assert<Static.Token.Const<'\n  ', '  \n  A '>, ['\n  ', 'A ']>()
Assert<Static.Token.Const<'\n  ', '  \n  AA'>, ['\n  ', 'AA']>()
Assert<Static.Token.Const<'\n  ', '  \n  AA '>, ['\n  ', 'AA ']>()

// ------------------------------------------------------------------
// Until: Empty
// ------------------------------------------------------------------
Assert<Static.Token.Until<'', ''>, []>
Assert<Static.Token.Until<'', 'A'>, ['', 'A']>
Assert<Static.Token.Until<'', '   A'>, ['', '   A']>

// ------------------------------------------------------------------
// Until: Single-Char
// ------------------------------------------------------------------
Assert<Static.Token.Until<'A', 'A'>, ['', 'A']>
Assert<Static.Token.Until<'A', 'A '>, ['', 'A ']>
Assert<Static.Token.Until<'A', 'AA'>, ['', 'AA']>
Assert<Static.Token.Until<'A', 'AA '>, ['', 'AA ']>

// ------------------------------------------------------------------
// Until: Multi-Char
// ------------------------------------------------------------------
Assert<Static.Token.Until<'AB', 'AB'>, ['', 'AB']>
Assert<Static.Token.Until<'AB', 'AB '>, ['', 'AB ']>
Assert<Static.Token.Until<'AB', 'ABA'>, ['', 'ABA']>
Assert<Static.Token.Until<'AB', 'ABA '>, ['', 'ABA ']>

// ------------------------------------------------------------------
// Until: Single-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Until<'A', '  A'>, ['  ', 'A']>
Assert<Static.Token.Until<'A', '  A '>, ['  ', 'A ']>
Assert<Static.Token.Until<'A', '  AA'>, ['  ', 'AA']>
Assert<Static.Token.Until<'A', '  AA '>, ['  ', 'AA ']>
Assert<Static.Token.Until<'A', '\nAA '>, ['\n', 'AA ']>
Assert<Static.Token.Until<'A', ' \nAA '>, [' \n', 'AA ']>
Assert<Static.Token.Until<'A', '\n AA '>, ['\n ', 'AA ']>
Assert<Static.Token.Until<'A', ' \n AA '>, [' \n ', 'AA ']>

// ------------------------------------------------------------------
// Until: Multi-Char -> Ignore-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Until<'AB', '  AB'>, ['  ', 'AB']>
Assert<Static.Token.Until<'AB', '  AB '>, ['  ', 'AB ']>
Assert<Static.Token.Until<'AB', '  ABA'>, ['  ', 'ABA']>
Assert<Static.Token.Until<'AB', '  ABA '>, ['  ', 'ABA ']>
Assert<Static.Token.Until<'AB', '\nABA '>, ['\n', 'ABA ']>
Assert<Static.Token.Until<'AB', ' \nABA '>, [' \n', 'ABA ']>
Assert<Static.Token.Until<'AB', '\n ABA '>, ['\n ', 'ABA ']>
Assert<Static.Token.Until<'AB', ' \n ABA '>, [' \n ', 'ABA ']>

// ------------------------------------------------------------------
// Until: Single-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Until<' ', ''>, []>
Assert<Static.Token.Until<' ', ' '>, ['', ' ']>
Assert<Static.Token.Until<' ', ' A'>, ['', ' A']>
Assert<Static.Token.Until<' ', ' A '>, ['', ' A ']>
Assert<Static.Token.Until<' ', ' AA'>, ['', ' AA']>
Assert<Static.Token.Until<' ', ' AA '>, ['', ' AA ']>

// ------------------------------------------------------------------
// Until: Multi-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Until<'  ', ''>, []>
Assert<Static.Token.Until<'  ', ' '>, []>
Assert<Static.Token.Until<'  ', '  A'>, ['', '  A']>
Assert<Static.Token.Until<'  ', '  A '>, ['', '  A ']>
Assert<Static.Token.Until<'  ', '  AA'>, ['', '  AA']>
Assert<Static.Token.Until<'  ', '  AA '>, ['', '  AA ']>

// ------------------------------------------------------------------
// Until: Newline
// ------------------------------------------------------------------
Assert<Static.Token.Until<'\n', ''>, []>
Assert<Static.Token.Until<'\n', ' '>, []>
Assert<Static.Token.Until<'\n', '\nA'>, ['', '\nA']>
Assert<Static.Token.Until<'\n', '  \nA '>, ['  ', '\nA ']>
Assert<Static.Token.Until<'\n', '  \nAA'>, ['  ', '\nAA']>
Assert<Static.Token.Until<'\n', '  \nAA '>, ['  ', '\nAA ']>

// ------------------------------------------------------------------
// Until: Newline-Single-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Until<'\n ', ''>, []>
Assert<Static.Token.Until<'\n ', ' '>, []>
Assert<Static.Token.Until<'\n ', '\nA'>, []>
Assert<Static.Token.Until<'\n ', '  \nA '>, []>
Assert<Static.Token.Until<'\n ', '  \nAA'>, []>
Assert<Static.Token.Until<'\n ', '  \nAA '>, []>
Assert<Static.Token.Until<'\n ', '\n A'>, ['', '\n A']>
Assert<Static.Token.Until<'\n ', '  \n A '>, ['  ', '\n A ']>
Assert<Static.Token.Until<'\n ', '  \n AA'>, ['  ', '\n AA']>
Assert<Static.Token.Until<'\n ', '  \n AA '>, ['  ', '\n AA ']>

// ------------------------------------------------------------------
// Until: Newline-Multi-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Until<'\n  ', ''>, []>
Assert<Static.Token.Until<'\n  ', ' '>, []>
Assert<Static.Token.Until<'\n  ', '\nA'>, []>
Assert<Static.Token.Until<'\n  ', '  \nA '>, []>
Assert<Static.Token.Until<'\n  ', '  \nAA'>, []>
Assert<Static.Token.Until<'\n  ', '  \nAA '>, []>
Assert<Static.Token.Until<'\n  ', '\n  A'>, ['', '\n  A']>
Assert<Static.Token.Until<'\n  ', '  \n  A '>, ['  ', '\n  A ']>
Assert<Static.Token.Until<'\n  ', '  \n  AA'>, ['  ', '\n  AA']>
Assert<Static.Token.Until<'\n  ', '  \n  AA '>, ['  ', '\n  AA ']>