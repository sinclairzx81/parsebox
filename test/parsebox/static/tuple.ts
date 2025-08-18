// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

type Tuple = Static.Tuple<[Static.Const<'A'>, Static.Const<'B'>, Static.Const<'C'>]>
Assert<Static.Parse<Tuple, ''>, []>()
Assert<Static.Parse<Tuple, 'A'>, []>()
Assert<Static.Parse<Tuple, 'A B C'>, [['A', 'B', 'C'], '']>()
Assert<Static.Parse<Tuple, 'A B C '>, [['A', 'B', 'C'], ' ']>()
Assert<Static.Parse<Tuple, 'ABC'>, [['A', 'B', 'C'], '']>()
Assert<Static.Parse<Tuple, '  ABC'>, [['A', 'B', 'C'], '']>()
Assert<Static.Parse<Tuple, '  ABC '>, [['A', 'B', 'C'], ' ']>()