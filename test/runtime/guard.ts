import { Runtime } from '@sinclair/parsebox'
import { deepStrictEqual } from 'node:assert'

function Assert(left: unknown, right: unknown) {
  deepStrictEqual(left, right)
}
// prettier-ignore
describe('Guard', () => {
  it('IsArray', () => {
    // @ts-ignore
    Assert(Runtime.IsArray(Runtime.Array(1)), false)
    Assert(Runtime.IsArray(Runtime.Array(Runtime.Const('A'))), true)
  })

  it('IsConst', () => {
    Assert(Runtime.IsConst(Runtime.Const('A')), true)
    // @ts-ignore  
    Assert(Runtime.IsConst(Runtime.Const(undefined)), false)
  })

  it('IsContext', () => {
    Assert(Runtime.IsContext(Runtime.Context(Runtime.Const('A'), Runtime.Const('B'))), true)
    // @ts-ignore  
    Assert(Runtime.IsContext(Runtime.Const(undefined)), false)
  })

  it('IsIdent', () => {
    Assert(Runtime.IsIdent(Runtime.Const('A')), false)
    Assert(Runtime.IsIdent(Runtime.Ident()), true)
  })

  it('IsNumber', () => {
    Assert(Runtime.IsNumber(Runtime.Const('A')), false)
    Assert(Runtime.IsNumber(Runtime.Number()), true)
  })

  it('IsOptional', () => {
    // @ts-ignore
    Assert(Runtime.IsOptional(Runtime.Optional(1)), false)
    Assert(Runtime.IsOptional(Runtime.Optional(Runtime.Const('A'))), true)
  })

  it('IsRef', () => {
    // @ts-ignore
    Assert(Runtime.IsRef(Runtime.Ref(1)), false)
    Assert(Runtime.IsRef(Runtime.Ref('A')), true)
  })

  it('IsString', () => {
    Assert(Runtime.IsString(Runtime.Const('A')), false)
    Assert(Runtime.IsString(Runtime.String(['"'])), true)
  })

  it('IsTuple', () => {
    Assert(Runtime.IsTuple(Runtime.Const('A')), false)
    Assert(Runtime.IsTuple(Runtime.Tuple([Runtime.Const('A')])), true)
  })

  it('IsUnion', () => {
    Assert(Runtime.IsUnion(Runtime.Const('A')), false)
    Assert(Runtime.IsUnion(Runtime.Union([Runtime.Const('A')])), true)
  })
})
