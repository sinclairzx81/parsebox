// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

Assert<Static.Parse<Static.BigInt, '0n'>, ['0', '']>()
Assert<Static.Parse<Static.BigInt, '00n'>, []>()
Assert<Static.Parse<Static.BigInt, '10n'>, ['10', '']>()
Assert<Static.Parse<Static.BigInt, ' 0n'>, ['0', '']>()
Assert<Static.Parse<Static.BigInt, '0n '>, ['0', ' ']>()

