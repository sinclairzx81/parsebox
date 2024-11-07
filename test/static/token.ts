import { Static } from '@sinclair/parsebox'

declare function Assert<Left, _Right extends Left>(): void

// ------------------------------------------------------------------
// Empty
// ------------------------------------------------------------------
Assert<Static.Token.Const<'', ''>, ['', '']>()
Assert<Static.Token.Const<'', 'A'>, ['', 'A']>()
Assert<Static.Token.Const<'', '   A'>, ['', '   A']>()

// ------------------------------------------------------------------
// Single-Char
// ------------------------------------------------------------------
Assert<Static.Token.Const<'A', 'A'>, ['A', '']>()
Assert<Static.Token.Const<'A', 'A '>, ['A', ' ']>()
Assert<Static.Token.Const<'A', 'AA'>, ['A', 'A']>()
Assert<Static.Token.Const<'A', 'AA '>, ['A', 'A ']>()

// ------------------------------------------------------------------
// Multi-Char
// ------------------------------------------------------------------
Assert<Static.Token.Const<'AB', 'AB'>, ['AB', '']>()
Assert<Static.Token.Const<'AB', 'AB '>, ['AB', ' ']>()
Assert<Static.Token.Const<'AB', 'ABA'>, ['AB', 'A']>()
Assert<Static.Token.Const<'AB', 'ABA '>, ['AB', 'A ']>()

// ------------------------------------------------------------------
// Single-Char -> Ignore-Whitespace
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
// Multi-Char -> Ignore-Whitespace
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
// Single-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Const<' ', ''>, []>()
Assert<Static.Token.Const<' ', ' '>, [' ', '']>()
Assert<Static.Token.Const<' ', ' A'>, [' ', 'A']>()
Assert<Static.Token.Const<' ', ' A '>, [' ', 'A ']>()
Assert<Static.Token.Const<' ', ' AA'>, [' ', 'AA']>()
Assert<Static.Token.Const<' ', ' AA '>, [' ', 'AA ']>()

// ------------------------------------------------------------------
// Multi-Whitespace
// ------------------------------------------------------------------
Assert<Static.Token.Const<'  ', ''>, []>()
Assert<Static.Token.Const<'  ', ' '>, []>()
Assert<Static.Token.Const<'  ', '  A'>, ['  ', 'A']>()
Assert<Static.Token.Const<'  ', '  A '>, ['  ', 'A ']>()
Assert<Static.Token.Const<'  ', '  AA'>, ['  ', 'AA']>()
Assert<Static.Token.Const<'  ', '  AA '>, ['  ', 'AA ']>()

// ------------------------------------------------------------------
// Newline
// ------------------------------------------------------------------
Assert<Static.Token.Const<'\n', ''>, []>()
Assert<Static.Token.Const<'\n', ' '>, []>()
Assert<Static.Token.Const<'\n', '\nA'>, ['\n', 'A']>()
Assert<Static.Token.Const<'\n', '  \nA '>, ['\n', 'A ']>()
Assert<Static.Token.Const<'\n', '  \nAA'>, ['\n', 'AA']>()
Assert<Static.Token.Const<'\n', '  \nAA '>, ['\n', 'AA ']>()

// ------------------------------------------------------------------
// Newline-Single-Whitespace
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

// Newline-Multi-Whitespace
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
