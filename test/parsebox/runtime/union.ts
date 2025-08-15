import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Union')

const Union = Runtime.Union([Runtime.Const('A'), Runtime.Const('B'), Runtime.Const('C')])
Test('Should Union 1', () => Assert.IsEqual(Runtime.Parse(Union, ''), []))
Test('Should Union 2', () => Assert.IsEqual(Runtime.Parse(Union, 'A B C'), ['A', ' B C']))
Test('Should Union 3', () => Assert.IsEqual(Runtime.Parse(Union, 'A B C '), ['A', ' B C ']))
Test('Should Union 4', () => Assert.IsEqual(Runtime.Parse(Union, 'ABC'), ['A', 'BC']))
Test('Should Union 5', () => Assert.IsEqual(Runtime.Parse(Union, '  ABC'), ['A', 'BC']))
Test('Should Union 6', () => Assert.IsEqual(Runtime.Parse(Union, '  ABC '), ['A', 'BC ']))
Test('Should Union 7', () => Assert.IsEqual(Runtime.Parse(Union, 'B B C'), ['B', ' B C']))
Test('Should Union 8', () => Assert.IsEqual(Runtime.Parse(Union, 'B B C '), ['B', ' B C ']))
Test('Should Union 9', () => Assert.IsEqual(Runtime.Parse(Union, 'BBC'), ['B', 'BC']))
Test('Should Union 10', () => Assert.IsEqual(Runtime.Parse(Union, '  BBC'), ['B', 'BC']))
Test('Should Union 11', () => Assert.IsEqual(Runtime.Parse(Union, '  BBC '), ['B', 'BC ']))
