// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsBigInt')

// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsBigInt(Runtime.Const('A'))))
Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsBigInt(Runtime.BigInt())))
