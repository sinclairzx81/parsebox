import { assertEquals } from 'jsr:@std/assert'

export function Assert(left: unknown, right: unknown) {
  assertEquals(left, right)
}