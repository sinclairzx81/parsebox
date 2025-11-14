import { Trim } from '../../../../src/token/internal/trim.ts'
import { Assert } from 'test'

const Test = Assert.Context('Token.Internal.Trim')

Test('Should Trim 1', () => Assert.IsExact(Trim('      1'), '1'))
Test('Should Trim 2', () => Assert.IsExact(Trim('      1 '), '1 '))
Test('Should Trim 3', () => Assert.IsExact(Trim('\n\n\n1 '), '1 '))
Test('Should Trim 4', () => Assert.IsExact(Trim('\n\n\n1 '), '1 '))
Test('Should Trim 5', () => Assert.IsExact(Trim('\t\t\t1'), '1'))
Test('Should Trim 6', () => Assert.IsExact(Trim('\t\t\t1 '), '1 '))
Test('Should Trim 7', () => Assert.IsExact(Trim('\n\t 1'), '1'))
Test('Should Trim 8', () => Assert.IsExact(Trim('\n\t 1 '), '1 '))
