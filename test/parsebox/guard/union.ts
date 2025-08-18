// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsUnion')

// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsUnion(Runtime.Const('A'))))
Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsUnion(Runtime.Union([Runtime.Const('A')]))))
