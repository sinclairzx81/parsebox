// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsRef')

// @ts-ignore
Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsRef(Runtime.Ref(1))))
Test('Should Guard 2', () => Assert.IsTrue(Runtime.IsRef(Runtime.Ref('A'))))
