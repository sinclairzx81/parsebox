import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Until')

Test('Should Until 1', () => Assert.IsEqual(Runtime.Parse(Runtime.Until(['A']), ''), []))
Test('Should Until 2', () => Assert.IsEqual(Runtime.Parse(Runtime.Until(['A']), 'A'), ['', 'A']))
Test('Should Until 3', () => Assert.IsEqual(Runtime.Parse(Runtime.Until(['A']), '  A'), ['  ', 'A']))
Test('Should Until 4', () => Assert.IsEqual(Runtime.Parse(Runtime.Until(['A']), '  A '), ['  ', 'A ']))
Test('Should Until 5', () => Assert.IsEqual(Runtime.Parse(Runtime.Until(['A', 'B']), ''), []))
Test('Should Until 6', () => Assert.IsEqual(Runtime.Parse(Runtime.Until(['A', 'B']), 'BA'), ['', 'BA']))
Test('Should Until 7', () => Assert.IsEqual(Runtime.Parse(Runtime.Until(['A', 'B']), '  BA'), ['  ', 'BA']))
Test('Should Until 8', () => Assert.IsEqual(Runtime.Parse(Runtime.Until(['A', 'B']), '  BA '), ['  ', 'BA ']))
