// deno-fmt-ignore-file

import { Static } from '@sinclair/parsebox'
function Assert<Left, _Right extends Left>(): void {}

interface Mapping extends Static.IMapping {
  output: this['input'] extends [infer A, infer B, infer C] ? [C, B, A] : never
}

type Mapped = Static.Tuple<[Static.Const<'A'>, Static.Const<'B'>, Static.Const<'C'>], Mapping>

Assert<Static.Parse<Mapped, '  A B C '>, [['C', 'B', 'A'], ' ']>()