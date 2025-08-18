import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Until_1')

Test('Should Until_1 1', () => Assert.IsEqual(Runtime.Parse(Runtime.Until_1(['A']), ''), []))
Test('Should Until_1 2', () => Assert.IsEqual(Runtime.Parse(Runtime.Until_1(['A']), 'A'), []))
Test('Should Until_1 3', () => Assert.IsEqual(Runtime.Parse(Runtime.Until_1(['A']), '  A'), ['  ', 'A']))
Test('Should Until_1 4', () => Assert.IsEqual(Runtime.Parse(Runtime.Until_1(['A']), '  A '), ['  ', 'A ']))
Test('Should Until_1 5', () => Assert.IsEqual(Runtime.Parse(Runtime.Until_1(['A', 'B']), ''), []))
Test('Should Until_1 6', () => Assert.IsEqual(Runtime.Parse(Runtime.Until_1(['A', 'B']), 'BA'), []))
Test('Should Until_1 7', () => Assert.IsEqual(Runtime.Parse(Runtime.Until_1(['A', 'B']), '  BA'), ['  ', 'BA']))
Test('Should Until_1 8', () => Assert.IsEqual(Runtime.Parse(Runtime.Until_1(['A', 'B']), '  BA '), ['  ', 'BA ']))
