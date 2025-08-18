// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

Assert<Static.Parse<Static.Const<'A'>, ''>, []>()
Assert<Static.Parse<Static.Const<'A'>, 'A'>, ['A', '']>()
Assert<Static.Parse<Static.Const<'A'>, '  A'>, ['A', '']>()
Assert<Static.Parse<Static.Const<'A'>, '  A '>, ['A', ' ']>()