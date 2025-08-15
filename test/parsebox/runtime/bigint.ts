import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.BigInt')

Test('Should BigInt 1', () => Assert.IsEqual(Runtime.Parse(Runtime.BigInt(), '0n'), ['0', '']))
Test('Should BigInt 2', () => Assert.IsEqual(Runtime.Parse(Runtime.BigInt(), '00n'), []))
Test('Should BigInt 3', () => Assert.IsEqual(Runtime.Parse(Runtime.BigInt(), '10n'), ['10', '']))
Test('Should BigInt 4', () => Assert.IsEqual(Runtime.Parse(Runtime.BigInt(), ' 0n'), ['0', '']))
Test('Should BigInt 5', () => Assert.IsEqual(Runtime.Parse(Runtime.BigInt(), '0n '), ['0', ' ']))
