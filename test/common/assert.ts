import * as assert from 'node:assert'

// ------------------------------------------------------------------
// Runtime
// ------------------------------------------------------------------
export type Test = (name: string, callback: (context: Deno.TestContext) => void) => any

export function Context(context: string): Test {
  return (name: string, callback: (context: Deno.TestContext) => void) => {
    Deno.test(`${context}: ${name}`, callback)
  }
}
export function HasPropertyKey<K extends PropertyKey>(value: unknown, key: K): asserts value is Record<K, unknown> {
  if (typeof value === 'object' && value !== null && key in value) return
  throw new Error(`Expected value to have property '${key as string}'`)
}
export function NotHasPropertyKey<K extends PropertyKey>(value: unknown, key: K): asserts value is Record<K, unknown> {
  if (typeof value === 'object' && value !== null && !(key in value)) return
  throw new Error(`Expected value not to have property '${key as string}'`)
}
export function IsTrue(value: boolean): asserts value is true {
  return assert.strictEqual(value, true)
}
export function IsFalse(value: boolean): asserts value is false {
  return assert.strictEqual(value, false)
}
export function IsEqual(actual: unknown, expect: unknown) {
  if (actual instanceof Uint8Array && expect instanceof Uint8Array) {
    assert.equal(actual.length, expect.length)
    for (let i = 0; i < actual.length; i++) assert.equal(actual[i], expect[i])
  }
  return assert.deepStrictEqual(actual, expect)
}
export function Throws(callback: Function) {
  try {
    callback()
  } catch {
    return
  }
  throw Error('Expected throw')
}
// ------------------------------------------------------------------
// IsExact
// ------------------------------------------------------------------
export function IsExact<Left, Right extends Left>(left: Left, right: Right): void {
  IsEqual(left, right)
}
