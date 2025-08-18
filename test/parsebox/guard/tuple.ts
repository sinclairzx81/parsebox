// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsTuple')

// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsTuple(Runtime.Const('A'))))
Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsTuple(Runtime.Tuple([Runtime.Const('A')]))))
