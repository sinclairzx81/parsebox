/*--------------------------------------------------------------------------

ParseBox

The MIT License (MIT)

Copyright (c) 2024-2025 Haydn Paterson

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

// ------------------------------------------------------------------
//
// Future: Binary Numeric Decoding
//
// ------------------------------------------------------------------


type D = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type C = '0' | '1'

// ------------------------------------------------------------------
// ReverseString
// ------------------------------------------------------------------
type ReverseString<S extends string, R extends string = ''> = S extends `${infer F}${infer Rest}` ? ReverseString<Rest, `${F}${R}`> : R

// ------------------------------------------------------------------
// DoubleDigit: Double a single digit with incoming carry -> [carryOut, outDigit]
// ------------------------------------------------------------------
type DoubleDigit<DIG extends D, CarryIn extends C> = CarryIn extends '0' ? DIG extends '0' ? ['0', '0']
  : DIG extends '1' ? ['0', '2']
  : DIG extends '2' ? ['0', '4']
  : DIG extends '3' ? ['0', '6']
  : DIG extends '4' ? ['0', '8']
  : DIG extends '5' ? ['1', '0']
  : DIG extends '6' ? ['1', '2']
  : DIG extends '7' ? ['1', '4']
  : DIG extends '8' ? ['1', '6']
  : ['1', '8']
  : DIG extends '0' ? ['0', '1']
  : DIG extends '1' ? ['0', '3']
  : DIG extends '2' ? ['0', '5']
  : DIG extends '3' ? ['0', '7']
  : DIG extends '4' ? ['0', '9']
  : DIG extends '5' ? ['1', '1']
  : DIG extends '6' ? ['1', '3']
  : DIG extends '7' ? ['1', '5']
  : DIG extends '8' ? ['1', '7']
  : ['1', '9']

// ------------------------------------------------------------------
// DoubleStringLR
// ------------------------------------------------------------------
type DoubleStringLR<S extends string, CarryIn extends C = '0', R extends string = ''> = S extends `${infer F extends D}${infer Rest}`
  ? DoubleDigit<F, CarryIn> extends [infer CarryOut extends C, infer Out extends D] ? DoubleStringLR<Rest, CarryOut, `${R}${Out}`>
  : never
  : CarryIn extends '1' ? `${R}1`
  : R

// ------------------------------------------------------------------
// TrimLeadingZeros
// ------------------------------------------------------------------
type TrimLeadingZeros<S extends string> = S extends '' ? '0'
  : S extends `0${infer R}` ? TrimLeadingZeros<R>
  : S

// ------------------------------------------------------------------
// DoubleString
// ------------------------------------------------------------------
export type DoubleString<S extends string> = TrimLeadingZeros<ReverseString<DoubleStringLR<ReverseString<S>>>>

// ------------------------------------------------------------------
// DoubleString: Tests
// ------------------------------------------------------------------
type D1 = DoubleString<'0'> // "0"
type D2 = DoubleString<'1'> // "2"
type D3 = DoubleString<'9'> // "18"
type D4 = DoubleString<'10'> // "20"
type D5 = DoubleString<'99'> // "198"
type D6 = DoubleString<'123456789'> // "246913578"
type D7 = DoubleString<'0000'> // "0"
type D8 = DoubleString<'0001'> // "2"
type D9 = DoubleString<'500'> // "1000"

// ------------------------------------------------------------------
// AddOneLR
// ------------------------------------------------------------------
type AddOneLR<S extends string, Carry extends '1' | '0' = '1', R extends string = ''> = S extends `${infer F extends D}${infer Rest}` ? Carry extends '0' ? `${R}${F}${Rest}` // No carry, append rest as-is
  : F extends '0' ? AddOneLR<Rest, '0', `${R}1`>
  : F extends '1' ? AddOneLR<Rest, '0', `${R}2`>
  : F extends '2' ? AddOneLR<Rest, '0', `${R}3`>
  : F extends '3' ? AddOneLR<Rest, '0', `${R}4`>
  : F extends '4' ? AddOneLR<Rest, '0', `${R}5`>
  : F extends '5' ? AddOneLR<Rest, '0', `${R}6`>
  : F extends '6' ? AddOneLR<Rest, '0', `${R}7`>
  : F extends '7' ? AddOneLR<Rest, '0', `${R}8`>
  : F extends '8' ? AddOneLR<Rest, '0', `${R}9`>
  : /* 9 */ AddOneLR<Rest, '1', `${R}0`> // 9+1 = 10, carry
  : Carry extends '1' ? `${R}1`
  : R

// ------------------------------------------------------------------
// AddOne
// ------------------------------------------------------------------
type AddOne<S extends string> = ReverseString<AddOneLR<ReverseString<S>>>

// ------------------------------------------------------------------
// AddOne: Tests
// ------------------------------------------------------------------
type A1 = AddOne<'0'> // "1"
type A2 = AddOne<'1'> // "2"
type A3 = AddOne<'9'> // "10"
type A4 = AddOne<'99'> // "100"
type A5 = AddOne<'123'> // "124"
type A6 = AddOne<'999'> // "1000"

// ------------------------------------------------------------------
// BinaryToDecimal
// ------------------------------------------------------------------
type BinaryToDecimal<
  B extends string,
  Result extends string = '0',
> = B extends `${infer F extends '0' | '1'}${infer Rest}` 
  ? F extends '0' 
    ? BinaryToDecimal<Rest, DoubleString<Result>>
    : BinaryToDecimal<Rest, AddOne<DoubleString<Result>>>
  : Result

// ------------------------------------------------------------------
// BinaryToDecimal: Test
// ------------------------------------------------------------------
type N0 = BinaryToDecimal<'0'> // "0"
type N1 = BinaryToDecimal<'1'> // "1"
type N2 = BinaryToDecimal<'10'> // "2"
type N3 = BinaryToDecimal<'11'> // "3"
type N4 = BinaryToDecimal<'1010'> // "10"
type N5 = BinaryToDecimal<'11111111'> // "255"
type N6 = BinaryToDecimal<'11111111111111'> // "16383"

