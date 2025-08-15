// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsConst')

// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsConst(Runtime.Const(undefined))))

Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsConst(Runtime.Const('A'))))
