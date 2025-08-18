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

export type IProperties = Record<PropertyKey, IParser>

// ------------------------------------------------------------------
// Mapping
// ------------------------------------------------------------------
export type IMapping<Input extends unknown = any, Output extends unknown = unknown> = (input: Input) => Output

/** Maps input to output. This is the default Mapping */
export const Identity = (value: unknown) => value

/** Maps the output as the given parameter T */
export function As<T>(mapping: T): ((value: unknown) => T) {
  return (_: unknown) => mapping
}
// ------------------------------------------------------------------
// Parser
// ------------------------------------------------------------------
export interface IParser<Output extends unknown = unknown> {
  type: string
  mapping: IMapping<any, Output>
}