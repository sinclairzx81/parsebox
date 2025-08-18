// deno-lint-ignore-file

import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Guard.IsString')

Test('Should Guard 1', () => Assert.IsFalse(Runtime.IsString(Runtime.Const('A'))))
// @ts-ignore
Test('Should Guard 2', () => Assert.IsFalse(Runtime.IsString(Runtime.String([1]))))
Test('Should Guard 3', () => Assert.IsTrue(Runtime.IsString(Runtime.String(['"']))))
