// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsNumber')

// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsNumber(Runtime.Const('A'))))
Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsNumber(Runtime.Number())))
