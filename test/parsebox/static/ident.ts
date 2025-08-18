// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

Assert<Static.Parse<Static.Ident, ''>, []>()
Assert<Static.Parse<Static.Ident, '0'>, []>()
Assert<Static.Parse<Static.Ident, '#'>, []>()
Assert<Static.Parse<Static.Ident, '_'>, ['_', '']>()
Assert<Static.Parse<Static.Ident, ' _'>, ['_', '']>()
Assert<Static.Parse<Static.Ident, '_ '>, ['_', ' ']>()
Assert<Static.Parse<Static.Ident, ' _ '>, ['_', ' ']>()
Assert<Static.Parse<Static.Ident, '$'>, ['$', '']>()
Assert<Static.Parse<Static.Ident, ' $'>, ['$', '']>()
Assert<Static.Parse<Static.Ident, '$ '>, ['$', ' ']>()
Assert<Static.Parse<Static.Ident, ' $ '>, ['$', ' ']>()
Assert<Static.Parse<Static.Ident, 'A'>, ['A', '']>()
Assert<Static.Parse<Static.Ident, ' A'>, ['A', '']>()
Assert<Static.Parse<Static.Ident, 'A '>, ['A', ' ']>()
Assert<Static.Parse<Static.Ident, ' A '>, ['A', ' ']>()
Assert<Static.Parse<Static.Ident, 'A1'>, ['A1', '']>()
Assert<Static.Parse<Static.Ident, ' A1'>, ['A1', '']>()
Assert<Static.Parse<Static.Ident, 'A1 '>, ['A1', ' ']>()
Assert<Static.Parse<Static.Ident, ' A1 '>, ['A1', ' ']>()