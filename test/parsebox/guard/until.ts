// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsUntil')

// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsUntil(Runtime.Until_1(['A']))))
Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsUntil(Runtime.Until(['A']))))
