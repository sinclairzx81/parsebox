import { System } from '@sinclair/parsebox'
import { Assert } from 'test'

const Test = Assert.Context('System.Arguments')

Test('Should Arguments Match 1', () => {
  const Result = System.Arguments.Match([1], { 1: () => 'ok' })
  Assert.IsEqual(Result, 'ok')
})
Test('Should Arguments Match 2', () => {
  Assert.Throws(() => System.Arguments.Match([1, 2], { 1: () => 'ok' }))
})
