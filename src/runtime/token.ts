/*--------------------------------------------------------------------------

@sinclair/parsebox

The MIT License (MIT)

Copyright (c) 2024-2025 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

// deno-fmt-ignore-file
// deno-lint-ignore-file

// ------------------------------------------------------------------
// Chars
// ------------------------------------------------------------------
/** Returns true if the char code is a whitespace */
export function IsWhitespace(charCode: number): boolean {
  return charCode === 32
}
/** Returns true if the char code is a newline */
export function IsNewline(charCode: number): boolean {
  return charCode === 10
}
/** Returns true if the char code is a alpha  */
export function IsAlpha(charCode: number): boolean {
  return (
    (charCode >= 65 && charCode <= 90) || // A-Z 
    (charCode >= 97 && charCode <= 122)   // a-z
  )
}
/** Returns true if the char code is zero */
export function IsZero(charCode: number): boolean {
  return charCode === 48
}
/** Returns true if the char code is non-zero */
export function IsNonZero(charCode: number): boolean {
  return charCode >= 49 && charCode <= 57
}
/** Returns true if the char code is a digit */
export function IsDigit(charCode: number): boolean {
  return (
    IsNonZero(charCode) ||
    IsZero(charCode)
  )
}
/** Returns true if the char code is a dot */
export function IsDot(charCode: number): boolean {
  return charCode === 46
}
/** Returns true if this char code is a underscore */
export function IsUnderscore(charCode: number): boolean {
  return charCode === 95
}
/** Returns true if this char code is a dollar sign */
export function IsDollarSign(charCode: number): boolean {
  return charCode === 36
}

// ------------------------------------------------------------------
// Trim
// ------------------------------------------------------------------
/** Trims Whitespace and retains Newline, Tabspaces, etc. */
export function TrimWhitespaceOnly(input: string): string {
  for (let i = 0; i < input.length; i++) {
    if (IsWhitespace(input.charCodeAt(i))) continue
    return input.slice(i)
  }
  return input
}
/** Trims Whitespace including Newline, Tabspaces, etc. */
export function TrimAll(input: string): string {
  return input.trimStart()
}
// ------------------------------------------------------------------
// Const
// ------------------------------------------------------------------
/** Checks the value matches the next string  */
function NextTokenCheck(value: string, input: string): boolean {
  if (value.length > input.length) return false
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) !== input.charCodeAt(i)) return false
  }
  return true
}
/** Gets the next constant string value or empty if no match */
function NextConst(value: string, input: string, ): [] | [string, string] {
  return NextTokenCheck(value, input)
    ? [input.slice(0, value.length), input.slice(value.length)]
    : []
}
/** Takes the next constant string value skipping any whitespace */
export function Const(value: string, input: string): [] | [string, string] {
  if(value.length === 0) return ['', input]
  const char_0 = value.charCodeAt(0)
  return (
    IsNewline(char_0) ? NextConst(value, TrimWhitespaceOnly(input)) :
    IsWhitespace(char_0) ? NextConst(value, input) :
    NextConst(value, TrimAll(input))
  )
}
// ------------------------------------------------------------------
// Ident
// ------------------------------------------------------------------
function IdentIsFirst(charCode: number) {
  return (
    IsAlpha(charCode) ||
    IsDollarSign(charCode) ||
    IsUnderscore(charCode)
  )
}
function IdentIsRest(charCode: number) {
  return (
    IsAlpha(charCode) ||
    IsDigit(charCode) ||
    IsDollarSign(charCode) ||
    IsUnderscore(charCode)
  )
}
function NextIdent(input: string): [] | [string, string] {
  if (!IdentIsFirst(input.charCodeAt(0))) return []
  for (let i = 1; i < input.length; i++) {
    const char = input.charCodeAt(i)
    if (IdentIsRest(char)) continue
    const slice = input.slice(0, i)
    const rest = input.slice(i)
    return [slice, rest]
  }
  return [input, '']
}
/** Scans for the next Ident token */
export function Ident(input: string): [] | [string, string] {
  return NextIdent(TrimAll(input))
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
/** Checks that the next number is not a leading zero */
function NumberLeadingZeroCheck(input: string, index: number) {
  const char_0 = input.charCodeAt(index + 0)
  const char_1 = input.charCodeAt(index + 1)
  return (
    ( 
      // 1-9
      IsNonZero(char_0)
    ) || ( 
      // 0
      IsZero(char_0) &&
      !IsDigit(char_1)
    )  || ( 
      // 0.
      IsZero(char_0) &&
      IsDot(char_1)
    ) || ( 
      // .0
      IsDot(char_0) &&
      IsDigit(char_1)
    )
  )
}
/** Gets the next number token */
function NextNumber(input: string): [] | [string, string] {
  const negated = input.charAt(0) === '-'
  const index = negated ? 1 : 0
  if (!NumberLeadingZeroCheck(input, index)) {
    return []
  }
  const dash = negated ? '-' : ''
  let hasDot = false
  for (let i = index; i < input.length; i++) {
    const char_i = input.charCodeAt(i)
    if (IsDigit(char_i)) {
      continue
    }
    if (IsDot(char_i)) {
      if (hasDot) {
        const slice = input.slice(index, i)
        const rest = input.slice(i)
        return [`${dash}${slice}`, rest]
      }
      hasDot = true
      continue
    }
    const slice = input.slice(index, i)
    const rest = input.slice(i)
    return [`${dash}${slice}`, rest]
  }
  return [input, '']
}
/** Scans for the next number token */
export function Number(code: string) {
  return NextNumber(TrimAll(code))
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function NextString(options: string[], input: string): [] | [string, string] {
  const first = input.charAt(0)
  if(!options.includes(first)) return []
  const quote = first
  for(let i = 1; i < input.length; i++) {
    const char = input.charAt(i)
    if(char === quote) {
      const slice = input.slice(1, i)
      const rest = input.slice(i + 1)
      return [slice, rest]
    }
  }
  return []
}
/** Scans the next Literal String value */
export function String(options: string[], input: string) {
  return NextString(options, TrimAll(input))
}
// ------------------------------------------------------------------
// Until
// ------------------------------------------------------------------
function UntilStartsWith(value: string[], input: string): boolean {
  const [left, ...right] = value
  return (typeof left === 'string')
    ? input.startsWith(left)
      ? true
      : UntilStartsWith(right, input)
    : false
}
export function Until(value: string[], input: string, result: string = ''): [] | [string, string] {
  return (
    input === '' ? [] : 
    UntilStartsWith(value, input)
      ? [result, input]
      : (() => {
        const [left, right] = [input.slice(0, 1), input.slice(1)]
        return Until(value, right, `${result}${left}`)
    })()
  )
}