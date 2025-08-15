// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

Assert<Static.Parse<Static.String<[`'`, `"`]>, ''>, []>()
Assert<Static.Parse<Static.String<[`'`, `"`]>, '"A"'>, ['A', '']>()
Assert<Static.Parse<Static.String<[`'`, `"`]>, ' "A"'>, ['A', '']>()
Assert<Static.Parse<Static.String<[`'`, `"`]>, '"A" '>, ['A', ' ']>()
Assert<Static.Parse<Static.String<[`'`, `"`]>, ' "A" '>, ['A', ' ']>()