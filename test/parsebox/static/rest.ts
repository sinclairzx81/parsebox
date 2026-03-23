// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

Assert<Static.Parse<Static.Rest, ''>, []>()
Assert<Static.Parse<Static.Rest, '0'>, ['0', '']>()
Assert<Static.Parse<Static.Rest, '00'>, ['00', '']>()
Assert<Static.Parse<Static.Rest, '000'>, ['000', '']>()
Assert<Static.Parse<Static.Rest, ' 000'>, [' 000', '']>()
Assert<Static.Parse<Static.Rest, ' 00'>, [' 00', '']>()
Assert<Static.Parse<Static.Rest, ' 0'>, [' 0', '']>()
Assert<Static.Parse<Static.Rest, '000 '>, ['000 ', '']>()
Assert<Static.Parse<Static.Rest, '00 '>, ['00 ', '']>()
Assert<Static.Parse<Static.Rest, '0 '>, ['0 ', '']>()
Assert<Static.Parse<Static.Rest, ' 000 '>, [' 000 ', '']>()
Assert<Static.Parse<Static.Rest, ' 00 '>, [' 00 ', '']>()
Assert<Static.Parse<Static.Rest, ' 0 '>, [' 0 ', '']>()