// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from './assert.ts'

Deno.test('IsArray', () => {
  // @ts-ignore
  Assert(Runtime.IsArray(Runtime.Array(1)), false)
  Assert(Runtime.IsArray(Runtime.Array(Runtime.Const('A'))), true)
})

Deno.test('IsConst', () => {
  Assert(Runtime.IsConst(Runtime.Const('A')), true)
  // @ts-ignore  
  Assert(Runtime.IsConst(Runtime.Const(undefined)), false)
})

Deno.test('IsContext', () => {
  Assert(Runtime.IsContext(Runtime.Context(Runtime.Const('A'), Runtime.Const('B'))), true)
  // @ts-ignore  
  Assert(Runtime.IsContext(Runtime.Const(undefined)), false)
})

Deno.test('IsIdent', () => {
  Assert(Runtime.IsIdent(Runtime.Const('A')), false)
  Assert(Runtime.IsIdent(Runtime.Ident()), true)
})

Deno.test('IsNumber', () => {
  Assert(Runtime.IsNumber(Runtime.Const('A')), false)
  Assert(Runtime.IsNumber(Runtime.Number()), true)
})

Deno.test('IsOptional', () => {
  // @ts-ignore
  Assert(Runtime.IsOptional(Runtime.Optional(1)), false)
  Assert(Runtime.IsOptional(Runtime.Optional(Runtime.Const('A'))), true)
})

Deno.test('IsRef', () => {
  // @ts-ignore
  Assert(Runtime.IsRef(Runtime.Ref(1)), false)
  Assert(Runtime.IsRef(Runtime.Ref('A')), true)
})

Deno.test('IsString', () => {
  Assert(Runtime.IsString(Runtime.Const('A')), false)
  Assert(Runtime.IsString(Runtime.String(['"'])), true)
})

Deno.test('IsTuple', () => {
  Assert(Runtime.IsTuple(Runtime.Const('A')), false)
  Assert(Runtime.IsTuple(Runtime.Tuple([Runtime.Const('A')])), true)
})

Deno.test('IsUnion', () => {
  Assert(Runtime.IsUnion(Runtime.Const('A')), false)
  Assert(Runtime.IsUnion(Runtime.Union([Runtime.Const('A')])), true)
})

