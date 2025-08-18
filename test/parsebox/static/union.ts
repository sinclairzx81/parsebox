// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

type Union = Static.Union<[Static.Const<'A'>, Static.Const<'B'>, Static.Const<'C'>]>

Assert<Static.Parse<Union, ''>, []>()
Assert<Static.Parse<Union, 'A B C'>, ['A', ' B C']>()
Assert<Static.Parse<Union, 'A B C '>, ['A', ' B C ']>()
Assert<Static.Parse<Union, 'ABC'>, ['A', 'BC']>()
Assert<Static.Parse<Union, '  ABC'>, ['A', 'BC']>()
Assert<Static.Parse<Union, '  ABC '>, ['A', 'BC ']>()
Assert<Static.Parse<Union, 'B B C'>, ['B', ' B C']>()
Assert<Static.Parse<Union, 'B B C '>, ['B', ' B C ']>()
Assert<Static.Parse<Union, 'BBC'>, ['B', 'BC']>()
Assert<Static.Parse<Union, '  BBC'>, ['B', 'BC']>()
Assert<Static.Parse<Union, '  BBC '>, ['B', 'BC ']>()