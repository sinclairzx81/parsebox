// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

Assert<Static.Parse<Static.Optional<Static.Const<'A'>>, ''>, [[], '']>()
Assert<Static.Parse<Static.Optional<Static.Const<'A'>>, 'A'>, [['A'], '']>()
Assert<Static.Parse<Static.Optional<Static.Const<'A'>>, 'AA'>, [['A'], 'A']>()
Assert<Static.Parse<Static.Optional<Static.Const<'A'>>, 'B'>, [[], 'B']>()