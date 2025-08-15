// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsOptional')

// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsOptional(Runtime.Optional(1))))
Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsOptional(Runtime.Optional(Runtime.Const('A')))))
