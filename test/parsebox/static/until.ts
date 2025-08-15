// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

Assert<Static.Parse<Static.Until<['A']>, ''>, []>()
Assert<Static.Parse<Static.Until<['A']>, 'A'>, ['', 'A']>()
Assert<Static.Parse<Static.Until<['A']>, '  A'>, ['  ', 'A']>()
Assert<Static.Parse<Static.Until<['A']>, '  A '>, ['  ', 'A ']>()

Assert<Static.Parse<Static.Until<['A', 'B']>, ''>, []>
Assert<Static.Parse<Static.Until<['A', 'B']>, 'BA'>, ['', 'BA']>
Assert<Static.Parse<Static.Until<['A', 'B']>, '  BA'>, ['  ', 'BA']>
Assert<Static.Parse<Static.Until<['A', 'B']>, '  BA '>, ['  ', 'BA ']>