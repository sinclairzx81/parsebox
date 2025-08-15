// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsArray')
// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsArray(Runtime.Array(1))))
Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsArray(Runtime.Array(Runtime.Const('A')))))
