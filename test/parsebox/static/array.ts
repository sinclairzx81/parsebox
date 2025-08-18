// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

// ------------------------------------------------------------------
// Array
// ------------------------------------------------------------------
Assert<Static.Parse<Static.Array<Static.Const<'A'>>, ''>, [[], '']>()
Assert<Static.Parse<Static.Array<Static.Const<'A'>>, 'AB'>, [['A'], 'B']>()
Assert<Static.Parse<Static.Array<Static.Const<'A'>>, 'AAB'>, [['A', 'A'], 'B']>()
Assert<Static.Parse<Static.Array<Static.Const<'AA'>>, 'AAB'>, [['AA'], 'B']>()
Assert<Static.Parse<Static.Array<Static.Const<'AA'>>, 'AAAB'>, [['AA'], 'AB']>()
Assert<Static.Parse<Static.Array<Static.Const<'AA'>>, 'B'>, [[], 'B']>()