import { Runtime } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('Runtime.Parse.Integer')

Test('Should Integer 1', () => Assert.IsEqual(Runtime.Parse(Runtime.Integer(), '0'), ['0', '']))
Test('Should Integer 2', () => Assert.IsEqual(Runtime.Parse(Runtime.Integer(), '00'), ['0', '0']))
Test('Should Integer 3', () => Assert.IsEqual(Runtime.Parse(Runtime.Integer(), '10'), ['10', '']))
Test('Should Integer 4', () => Assert.IsEqual(Runtime.Parse(Runtime.Integer(), ' 0'), ['0', '']))
