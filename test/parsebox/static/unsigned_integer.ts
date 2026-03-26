// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

Assert<Static.Parse<Static.UnsignedInteger, '-0'>, []>()
Assert<Static.Parse<Static.UnsignedInteger, '0'>, ['0', '']>()
Assert<Static.Parse<Static.UnsignedInteger, '00'>, ['0', '0']>()
Assert<Static.Parse<Static.UnsignedInteger, '10'>, ['10', '']>()
Assert<Static.Parse<Static.UnsignedInteger, ' 0'>, ['0', '']>()


