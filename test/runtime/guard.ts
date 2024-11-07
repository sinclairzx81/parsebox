import { Runtime } from '@sinclair/parsebox'
import { deepStrictEqual } from 'node:assert'

function Assert(left: unknown, right: unknown) {
  deepStrictEqual(left, right)
}
// prettier-ignore
describe('Guard', () => {
  it('IsConst', () => {
    Assert(Runtime.Guard.IsConst(Runtime.Const('A')), true)
    // @ts-ignore  
    Assert(Runtime.Guard.IsConst(Runtime.Const(undefined)), false)
  })
  it('IsTuple', () => {
    Assert(Runtime.Guard.IsTuple(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsTuple(Runtime.Tuple([Runtime.Const('A')])), true)
  })
  it('IsUnion', () => {
    Assert(Runtime.Guard.IsUnion(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsUnion(Runtime.Union([Runtime.Const('A')])), true)
  })
  it('IsIdent', () => {
    Assert(Runtime.Guard.IsIdent(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsIdent(Runtime.Ident()), true)
  })
  it('IsString', () => {
    Assert(Runtime.Guard.IsString(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsString(Runtime.String(['"'])), true)
  })
  it('IsNumber', () => {
    Assert(Runtime.Guard.IsNumber(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsNumber(Runtime.Number()), true)
  })
})
