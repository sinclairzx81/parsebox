// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsUntil_1')

// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsUntil_1(Runtime.Until(['A']))))
Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsUntil_1(Runtime.Until_1(['A']))))
