import { Build } from '@sinclair/parsebox'
import { Assert } from 'test'

import { JsonModule } from './json.ts'

const Test = Assert.Context('Build.Project')

Test('Should Build 1', () => {
  const R = Build.Project(JsonModule)
  Assert.IsTrue(typeof R.mapping === 'string')
  Assert.IsTrue(typeof R.parser === 'string')
})
