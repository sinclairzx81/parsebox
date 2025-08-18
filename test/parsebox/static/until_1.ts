// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

Assert<Static.Parse<Static.Until_1<['A']>, ''>, []>
Assert<Static.Parse<Static.Until_1<['A']>, 'A'>, []>
Assert<Static.Parse<Static.Until_1<['A']>, '  A'>, ['  ', 'A']>
Assert<Static.Parse<Static.Until_1<['A']>, '  A '>, ['  ', 'A ']>

Assert<Static.Parse<Static.Until_1<['A', 'B']>, ''>, []>
Assert<Static.Parse<Static.Until_1<['A', 'B']>, 'BA'>, []>
Assert<Static.Parse<Static.Until_1<['A', 'B']>, '  BA'>, ['  ', 'BA']>
Assert<Static.Parse<Static.Until_1<['A', 'B']>, '  BA '>, ['  ', 'BA ']>