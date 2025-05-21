<div align='center'>

<h1>ParseBox</h1>

<p>Parser Combinators in the TypeScript Type System</p>

<img src="https://raw.githubusercontent.com/sinclairzx81/parsebox/refs/heads/main/parsebox.png" />

<br />
<br />

[![npm version](https://badge.fury.io/js/%40sinclair%2Fparsebox.svg)](https://badge.fury.io/js/%40sinclair%2Fparsebox)
[![Build](https://github.com/sinclairzx81/parsebox/actions/workflows/build.yml/badge.svg)](https://github.com/sinclairzx81/parsebox/actions/workflows/build.yml) 
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## Install

```bash
$ npm install @sinclair/parsebox
```

## Example

ParseBox provides combinators for parsing in Runtime and Static environments.

### Runtime

```typescript
import { Runtime } from '@sinclair/parsebox'

const T = Runtime.Tuple([
  Runtime.Const('X'),
  Runtime.Const('Y'),
  Runtime.Const('Z')
])

const R = Runtime.Parse(T, 'X Y Z W')               // const R = [['X', 'Y', 'Z'], ' W']
```

### Static

```typescript
import { Static } from '@sinclair/parsebox'

type T = Static.Tuple<[
  Static.Const<'X'>,
  Static.Const<'Y'>,
  Static.Const<'Z'>
]>

type R = Static.Parse<T, 'X Y Z W'>                 // type R = [['X', 'Y', 'Z'], ' W']
```


## Overview

ParseBox is a parsing library designed to embed domain-specific languages (DSLs) within the TypeScript type system. It provides a set of runtime and type-level combinators that enable EBNF notation to be encoded as TypeScript types. These combinators can then be used to parse content at runtime or interactively in editor via static type inference.

This project was developed as a generalized parsing solution for the [TypeBox](https://github.com/sinclairzx81/typebox) project, where it is currently used to parse TypeScript syntax into runtime types. This project seeks to provide a robust foundation for parsing a variety of domain-specific languages, with information encoded in each language able to be reconciled with TypeScript's type system.

License: MIT

## Contents

- [Combinators](#Combinators)
  - [Const](#Const)
  - [Tuple](#Tuple)
  - [Union](#Union)
  - [Array](#Array)
  - [Until](#Until)
  - [Optional](#Optional)
  - [Epsilon](#Epsilon)
- [Terminals](#Terminals)
  - [Number](#Number)
  - [String](#String)
  - [Ident](#Ident)
- [Mapping](#Mapping)
- [Context](#Context)
- [Modules](#Modules)
- [Advanced](#Advanced)
- [Contribute](#Contribute)

## Combinators

ParseBox offers combinators for runtime and static environments, with each combinator based on EBNF constructs. These combinators produce schema fragments that define parse operations, which ParseBox interprets during parsing. As schematics, the fragments can also be reflected as EBNF or remapped to other tools. The following section examines the Runtime combinators and their relation to EBNF.

### Const

The Const combinator parses the next occurrence of a specified string, ignoring whitespace and newline characters unless explicitly specified as parameters.

**BNF**

```bnf
<T> ::= "X"
```

**TypeScript**

```typescript
const T = Runtime.Const('X')                        // const T = {
                                                    //   type: 'Const',
                                                    //   value: 'X'
                                                    // }

const R = Runtime.Parse(T, 'X Y Z')                 // const R = ['X', ' Y Z']
```

### Tuple

The Tuple parser matches a sequence of parsers, with an empty tuple representing Epsilon (the empty production).

**BNF**

```bnf
<T> ::= "X" "Y" "Z"
```

**TypeScript**

```typescript
const T = Runtime.Tuple([                           // const T = {
  Runtime.Const('X'),                               //   type: 'Tuple',
  Runtime.Const('Y'),                               //   parsers: [
  Runtime.Const('Z'),                               //     { type: 'Const', value: 'X' },
])                                                  //     { type: 'Const', value: 'Y' },
                                                    //     { type: 'Const', value: 'Z' },
                                                    //   ]
                                                    // }


const R = Runtime.Parse(T, 'X Y Z W')               // const R = [['X', 'Y', 'Z'], ' W']
```

### Union

The Union combinator tries each interior parser in sequence until one matches

**BNF**

```bnf
<T> ::= "X" | "Y" | "Z"
```

**TypeScript**

```typescript
const T = Runtime.Union([                           // const T = {
  Runtime.Const('X'),                               //   type: 'Union',
  Runtime.Const('Y'),                               //   parsers: [
  Runtime.Const('Z')                                //     { type: 'Const', value: 'X' },
])                                                  //     { type: 'Const', value: 'Y' },
                                                    //     { type: 'Const', value: 'Z' }
                                                    //   ]
                                                    // }

const R1 = Runtime.Parse(T, 'X E')                  // const R1 = ['X', ' E']

const R2 = Runtime.Parse(T, 'Y E')                  // const R2 = ['Y', ' E']

const R3 = Runtime.Parse(T, 'Z E')                  // const R3 = ['Z', ' E']
```

### Array

The Array combinator parses zero or more occurrences of the interior parser, returning an empty array if there are no matches.

**EBNF**

```
<T> ::= { "X" }
```

**TypeScript**

```typescript
const T = Runtime.Array(                             // const T = {
  Runtime.Const('X')                                 //   type: 'Array',
)                                                    //   parser: { type: 'Const', value: 'X' } 
                                                     // }

const R1 = Runtime.Parse(T, 'X Y Z')                 // const R1 = [['X'], ' Y Z']

const R2 = Runtime.Parse(T, 'X X X Y Z')             // const R2 = [['X', 'X', 'X'], ' Y Z']

const R3 = Runtime.Parse(T, 'Y Z')                   // const R3 = [[], 'Y Z']
```

### Until

The Until combinator parses all characters up to (but not including) the specified string. The specified string remains unconsumed in the input. If the string is not found, parsing fails.

**BNF**

```bnf
<T> ::= ? any character until 'Z' ?
```

**TypeScript**

```typescript
const T = Runtime.Until('Z')                        // const T = {
                                                    //   type: 'Until',
                                                    //   value: 'Z'
                                                    // }

const R = Runtime.Parse(T, 'X Y Z')                 // const R = ['X Y ', 'Z']
```

### Optional

The Optional combinator parses zero or one occurrence of the interior parser, returning a tuple with one element or an empty tuple if there is no match.

**EBNF**

```
<T> ::= [ "X" ]
```

**TypeScript**

```typescript
const T = Runtime.Optional(                         // const T = {
  Runtime.Const('X')                                //   type: 'Optional',
)                                                   //   parser: { type: 'Const', value: 'X' }
                                                    // }

const R1 = Runtime.Parse(T, 'X Y Z')                // const R1 = [['X'], ' Y Z']

const R2 = Runtime.Parse(T, 'Y Z')                  // const R2 = [[], 'Y Z']
```

### Epsilon

ParseBox does not have a dedicated combinator for Epsilon; instead, it can be represented using an empty Tuple combinator. Epsilon is typically used as a fall-through case in sequence matching.

**EBNF**

```
<T> ::= "X" "Y" | ε
```

**TypeScript**

```typescript
const T = Runtime.Union([

  Runtime.Tuple([Runtime.Const('X'), Runtime.Const('Y')]),

  Runtime.Tuple([])                                 // ε - fall-through case

])
const R1 = Runtime.Parse(T, 'X Y Z')                // const R1 = [['X', 'Y'], ' Z']

const R2 = Runtime.Parse(T, 'Y Z')                  // const R2 = [[], 'Y Z']
```

## Terminals

ParseBox provides combinators for parsing common lexical tokens, such as numbers, identifiers, and strings, enabling static, optimized parsing of typical JavaScript constructs.

### Number

Parses numeric literals, including integers, decimals, and floating-point numbers. Invalid formats, like leading zeroes, are not matched.

```typescript
const T = Runtime.Number()

// ...

const R1 = Runtime.Parse(T, '1')                    // const R1 = ['1', '']

const R2 = Runtime.Parse(T, '3.14')                 // const R2 = ['3.14', '']

const R3 = Runtime.Parse(T, '.1')                   // const R3 = ['.1', '']

const E = Runtime.Parse(T, '01')                    // const E = []
```

### String

The String combinator parses quoted string literals, accepting an array of permissible quote characters. The result is the interior string.

```typescript
const T = Runtime.String(['"'])

// ...

const R = Runtime.Parse(T, '"hello"')              // const R = ['hello', '']
```

### Ident

Parses valid JavaScript identifiers, typically used to extract variable or function names. The following example demonstrates parsing a `let` statement.

```bnf
<let> ::= "let" <ident> "=" <number>
```

```typescript
const Expression = Runtime.Number()                 //  const Expression = { type: 'Number' }

const Let = Runtime.Tuple([                         //  const Let = {
  Runtime.Const('let'),                             //    type: 'Tuple',
  Runtime.Ident(),                                  //    parsers: [
  Runtime.Const('='),                               //      { type: 'Const', value: 'let' },
  Expression                                        //      { type: 'Ident' },
])                                                  //      { type: 'Const', value: '=' },
                                                    //      { type: 'Number' },
                                                    //    ]
                                                    //  }

const R = Runtime.Parse(Let, 'let n = 10')          // const R = [[ 'let', 'n', '=', '10'], '' ]

```


## Mapping

ParseBox supports semantic actions (i.e., mappings) for both static and runtime parsing, enabling parsed content to be transformed into complex structures like abstract syntax trees (ASTs). Below is an explanation of how mapping works in both environments.

### Runtime

Runtime combinators can accept an optional callback as their last argument, which receives the parsed elements and maps them to arbitrary return values. The following example shows how a let statement is parsed and mapped into a syntax node.

```typescript
const LetMapping = (_0: 'let', _1: string, _2: '=', _3: string) => {
  return {
    type: 'Let',
    ident: _1,
    value: parseFloat(_3)
  }
}
const Let = Runtime.Tuple([                           
  Runtime.Const('let'), // _0
  Runtime.Ident(),      // _1
  Runtime.Const('='),   // _2
  Runtime.Number()      // _3
], values => LetMapping(...values)) 

const R = Runtime.Parse(Let, 'let n = 10')          // const R = [{
                                                    //   type: 'Let',
                                                    //   ident: 'n',
                                                    //   value: 10
                                                    // }, '' ]
```

### Static

Static combinators accept an optional higher-kinded type, IMapping, as the last generic argument. Static mapping uses the `this['input']` property to read input values, assigning the mapping to the `output` property. The following example demonstrates implementing the Let parser using static actions.

```typescript
type ParseFloat<Value extends string> = (
  Value extends `${infer Value extends number}` ? Value : never
)
interface LetMapping extends Static.IMapping {
  output: this['input'] extends ['let', infer Ident, '=', infer Value extends string] ? {
    type: 'Let',
    ident: Ident
    value: ParseFloat<Value>
  } : never
}

type Let = Static.Tuple<[
  Static.Const<'let'>, 
  Static.Ident,     
  Static.Const<'='>, 
  Static.Number
], LetMapping>

type R = Static.Parse<Let, 'let n = 10'>            // type R = [{
                                                    //   type: 'Let',
                                                    //   ident: 'n',
                                                    //   value: 10
                                                    // }, '' ]
```

## Context

ParseBox allows exterior values to be passed into and referenced within semantic actions. A context is passed as the last argument to the Static and Runtime parse types/functions, and is propagated into each action. The following demonstrates its usage.

### Runtime

The Runtime Parse function accepts a context as the last argument, which is received as the second argument to the OptionMapping function.

```typescript
import { Runtime } from '@sinclair/parsebox'

// Context Received as Second Argument
const OptionMapping = (input: 'A' | 'B' | 'C', context: Record<ProeprtyKey, string>) => {
  return (
    input in context 
      ? context[input] 
      : undefined
  )
}
const Option = Runtime.Union([
  Runtime.Const('A'),
  Runtime.Const('B'),
  Runtime.Const('C')
], OptionMapping)

const R = Runtime.Parse(Option, 'A', {              // const R = ['Matched Foo', '']
  A: 'Matched Foo',
  B: 'Matched Bar',
  C: 'Matched Baz',
})
```

### Static

The Static Parse type accepts a context as the last generic argument, which is received via the `this['context']` property on the OptionMapping type.

```typescript
import { Static } from '@sinclair/parsebox'

// Context Received on Context Property
interface OptionMapping extends Static.IMapping {
  output: (
    this['input'] extends keyof this['context'] 
      ? this['context'][this['input']] 
      : undefined
  )
}
type Option = Static.Union<[
  Static.Const<'A'>,
  Static.Const<'B'>,
  Static.Const<'C'>
], OptionMapping>

type R = Static.Parse<Option, 'A', {                // type R = ['Matched Foo', '']
  A: 'Matched Foo',
  B: 'Matched Bar',
  C: 'Matched Baz',
}>
```

## Modules

ParseBox modules act as containers for Runtime parsers, enabling recursion and mutual recursion by allowing parsers to reference each other via string keys. They are only for Runtime parsers, as Static parsers don’t have ordering issues due to TypeScript’s non-order-dependent types.

### List Parsing

In this example, we define a List parser that recursively parses sequences of Item elements. The List parser is either a tuple of a Value followed by another List (recursive) or an empty tuple (base case). Recursion is achieved by referencing both Item and List parsers within the same module.

```typescript
import { Runtime } from '@sinclair/parsebox'

// Item ::= "X" "Y" "Z"

const Item = Runtime.Union([
  Runtime.Const('X'),
  Runtime.Const('Y'),
  Runtime.Const('Z'),
])

// List ::= Item List | ε

const List = Runtime.Union([
  Runtime.Tuple([Runtime.Ref('Item'), Runtime.Ref('List')]), // Recursive Self
  Runtime.Tuple([])                                          // Epsilon
], values => values.flat())

// Embed inside Module

const Module = new Runtime.Module({ 
  Item, 
  List 
})

// Use Module.Parse 

const R = Module.Parse('List', 'X Y Z Y X E')       // const R = [['X', 'Y', 'Z', 'Y', 'X'], ' E']
```

## Advanced

The following example demonstrates using ParseBox to parse a mathematical expression with LL(1) parsing techniques, avoiding left recursion and respecting operator precedence rules.

```typescript
import { Static } from '@sinclair/parsebox'

// Static Mapping Actions to remap Productions

type BinaryReduce<Left extends unknown, Right extends unknown[]> = (
  Right extends [infer Operator, infer Right, infer Rest extends unknown[]]
    ? { left: Left, operator: Operator, right: BinaryReduce<Right, Rest> }
    : Left
)
interface BinaryMapping extends Static.IMapping {
  output: this['input'] extends [infer Left, infer Right extends unknown[]]
    ? BinaryReduce<Left, Right>
    : never
}
interface FactorMapping extends Static.IMapping {
  output: ( 
    this['input'] extends ['(', infer Expr, ')'] ? Expr :
    this['input'] extends [infer Operand] ? Operand :
    never
  )
}

// Expression Grammar

type Operand = Static.Ident

type Factor = Static.Union<[
  Static.Tuple<[Static.Const<'('>, Expr, Static.Const<')'>]>,
  Static.Tuple<[Operand]>,
], FactorMapping>

type TermTail = Static.Union<[
  Static.Tuple<[Static.Const<'*'>, Factor, TermTail]>,
  Static.Tuple<[Static.Const<'/'>, Factor, TermTail]>,
  Static.Tuple<[]>,
]>

type ExprTail = Static.Union<[
  Static.Tuple<[Static.Const<'+'>, Term, ExprTail]>,
  Static.Tuple<[Static.Const<'-'>, Term, ExprTail]>,
  Static.Tuple<[]>,
]>

type Term = Static.Tuple<[Factor, TermTail], BinaryMapping>

type Expr = Static.Tuple<[Term, ExprTail], BinaryMapping>

// Parse!

type Result = Static.Parse<Expr, 'x * (y + z)'>     // type R = [{
                                                    //   left: "x";
                                                    //   operator: "*";
                                                    //   right: {
                                                    //       left: "y";
                                                    //       operator: "+";
                                                    //       right: "z";
                                                    //   };
                                                    // }, ""]
```

## Contribute

ParseBox is open to community contribution. Please ensure you submit an open issue before submitting your pull request. The ParseBox project prefers open community discussion before accepting new features.
