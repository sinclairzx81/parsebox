import { Runtime } from '@sinclair/parsebox'
import { deepStrictEqual } from 'node:assert'

function Assert(left: unknown, right: unknown) {
  deepStrictEqual(left, right)
}
// prettier-ignore
describe('Guard', () => {
  it('IsArray', () => {
    // @ts-ignore
    Assert(Runtime.Guard.IsArray(Runtime.Array(1)), false)
    Assert(Runtime.Guard.IsArray(Runtime.Array(Runtime.Const('A'))), true)
  })

  it('IsConst', () => {
    Assert(Runtime.Guard.IsConst(Runtime.Const('A')), true)
    // @ts-ignore  
    Assert(Runtime.Guard.IsConst(Runtime.Const(undefined)), false)
  })

  it('IsIdent', () => {
    Assert(Runtime.Guard.IsIdent(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsIdent(Runtime.Ident()), true)
  })

  it('IsNumber', () => {
    Assert(Runtime.Guard.IsNumber(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsNumber(Runtime.Number()), true)
  })

  it('IsOptional', () => {
    // @ts-ignore
    Assert(Runtime.Guard.IsOptional(Runtime.Optional(1)), false)
    Assert(Runtime.Guard.IsOptional(Runtime.Optional(Runtime.Const('A'))), true)
  })

  it('IsRef', () => {
    // @ts-ignore
    Assert(Runtime.Guard.IsRef(Runtime.Ref(1)), false)
    Assert(Runtime.Guard.IsRef(Runtime.Ref('A')), true)
  })

  it('IsString', () => {
    Assert(Runtime.Guard.IsString(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsString(Runtime.String(['"'])), true)
  })

  it('IsTuple', () => {
    Assert(Runtime.Guard.IsTuple(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsTuple(Runtime.Tuple([Runtime.Const('A')])), true)
  })

  it('IsUnion', () => {
    Assert(Runtime.Guard.IsUnion(Runtime.Const('A')), false)
    Assert(Runtime.Guard.IsUnion(Runtime.Union([Runtime.Const('A')])), true)
  })
})
