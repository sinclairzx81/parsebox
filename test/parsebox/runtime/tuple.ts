import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Tuple')

const Tuple = Runtime.Tuple([Runtime.Const('A'), Runtime.Const('B'), Runtime.Const('C')])
Test('Should Tuple 1', () => Assert.IsEqual(Runtime.Parse(Tuple, ''), []))
Test('Should Tuple 2', () => Assert.IsEqual(Runtime.Parse(Tuple, 'A'), []))
Test('Should Tuple 3', () => Assert.IsEqual(Runtime.Parse(Tuple, 'A B C'), [['A', 'B', 'C'], '']))
Test('Should Tuple 4', () => Assert.IsEqual(Runtime.Parse(Tuple, 'A B C '), [['A', 'B', 'C'], ' ']))
Test('Should Tuple 5', () => Assert.IsEqual(Runtime.Parse(Tuple, 'ABC'), [['A', 'B', 'C'], '']))
Test('Should Tuple 6', () => Assert.IsEqual(Runtime.Parse(Tuple, '  ABC'), [['A', 'B', 'C'], '']))
Test('Should Tuple 7', () => Assert.IsEqual(Runtime.Parse(Tuple, '  ABC '), [['A', 'B', 'C'], ' ']))
