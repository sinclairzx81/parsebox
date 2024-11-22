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

ParseBox is a parsing library designed to embed domain-specific languages (DSLs) within the TypeScript type system. It provides a set of runtime and type-level combinators that enable EBNF notation to be encoded as types within TypeScript's type system. These combinators can then be used to parse content at runtime or interactively in editor via static type inference.

This project was originally developed as a parsing system for the [TypeBox](https://github.com/sinclairzx81/typebox) project, where it facilitates parsing TypeScript syntax into runtime types. It offers a robust, standalone system for type-level parsing within TypeScript's type system.

License: MIT

## Contents

- [Combinators](#Combinators)
  - [Const](#Const)
  - [Tuple](#Tuple)
  - [Union](#Union)
  - [Array](#Array)
  - [Optional](#Optional)
- [Terminals](#Terminals)
  - [Number](#Number)
  - [String](#String)
  - [Ident](#Ident)
- [Extended](#Extended)
- [Mapping](#Mapping)
- [Context](#Context)
- [Modules](#Modules)
- [Extended](#Extended)
- [Advanced](#Advanced)
- [Contribute](#Contribute)

## Combinators

ParseBox provides a minimal set of combinators that map to structures expressible in BNF (Backus-Naur Form). These combinators serve as building blocks for constructing parsers.

### Const

The Const combinator parses for the next occurrence of the specified string. Whitespace and newline characters are ignored during parsing, unless the specified string explicitly matches those characters.

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

The Tuple parser matches a sequence of interior parsers. An empty tuple can be used to represent Epsilon (the empty production).

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

The Union combinator parses using one of the interior parsers, attempting each in sequence until one matches.

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

The Array combinator will parse for zero or more the interior parser. This combinator will always return a result with an empty array given for no matches.

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

### Optional

The Optional combinator will parse for zero or one of the interior parser. This combinator always succeeds, returning either a tuple with one element, or zero elements for no match.

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

## Terminals

ParseBox provides combinators that can be used to parse common terminals.

### Number

The Number combinator will parse a numeric literal.  

```typescript
const T = Runtime.Number()

// ...

const R1 = Runtime.Parse(T, '1')                    // const R1 = ['1', '']

const R2 = Runtime.Parse(T, '3.14')                 // const R2 = ['3.14', '']

const R3 = Runtime.Parse(T, '.1')                   // const R3 = ['.1', '']

const E = Runtime.Parse(T, '01')                    // const E = []
```

### String

The String combinator will parse for quoted string literals. Thgit is combinator accepts an array of permissable quote characters. The result of this parser is the interior wrapped string.

```typescript
const T = Runtime.String(['"'])

// ...

const R = Runtime.Parse(T, '"hello"')              // const R = ['hello', '']
```

### Ident

The Ident combinator will parse for a valid JavaScript identifiers. The following parses a let statement.

```bnf
<T> ::= "let" <ident> "=" <number>
```

```typescript
const Let = Runtime.Tuple([                         //  const Let = {
  Runtime.Const('let'),                             //    type: 'Tuple',
  Runtime.Ident(),                                  //    parsers: [
  Runtime.Const('='),                               //      { type: 'Const', value: 'let' },
  Runtime.Number()                                  //      { type: 'Ident' },
])                                                  //      { type: 'Const', value: '=' },
                                                    //      { type: 'Number' },
                                                    //    ]
                                                    //  }

const R = Runtime.Parse(Let, 'let n = 10')          // const R = [[ 'let', 'n', '=', '10'], '' ]

```


## Mapping

ParseBox supports semantic actions (i.e., mapping) for both Static and Runtime parsing. These actions allow parsed content to be transformed into complex structures, such as abstract syntax trees (ASTs). Below is an explanation of how mapping works in both Runtime and Static environments.

### Runtime

In Runtime parsing, combinators can accept an optional callback function as their last argument. This callback receives the parsed elements, which can then be mapped to arbitrary return values. The following example demonstrates how a let statement is parsed and how a mapping function is used to transform the result into a syntax node.

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

const R = Runtime.Parse(Let, 'let value = 10')      // const R = [{
                                                    //   type: 'Let',
                                                    //   ident: 'value',
                                                    //   value: 10
                                                    // }, '' ]
```

### Static

In Static combinators, an optional type of IMapping is provided as the last generic argument. Unlike Runtime callbacks, which receive parsed values directly as parameters, Static actions use the `this['input']` property to access input values, and they store the mapped results in the `output` property. The following example demonstrates how to implement the Let parser using Static actions.

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

type R = Static.Parse<Let, 'let value = 10'>        // type R = [{
                                                    //   type: 'Let',
                                                    //   ident: 'value',
                                                    //   value: 10
                                                    // }, '' ]
```

## Context

ParseBox provides a context mechanism that allows parsed content to interact with the host environment. A context value can be passed as the last argument to the Parse function, and ParseBox will propagate the context to each mapping function, enabling more dynamic parsing behavior.

### Runtime

In Runtime parsing, the context is passed as the second argument to the mapping functions. This allows the parser to access external data or state during the parsing process.

```typescript
import { Runtime } from '@sinclair/parsebox'

// use matched input as indexer on context
const OptionMapping = (input: 'A' | 'B' | 'C', context: Record<string, string>) => {
  return input in context 
    ? context[input] 
    : void 0
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

In Static combinators, the context is accessible via the `this['context']` property within the mapping action type.

```typescript
import { Static } from '@sinclair/parsebox'

// use input as indexer on context
interface OptionMapping extends Static.IMapping {
  output: this['input'] extends keyof this['context']
    ? this['context'][this['input']]
    : never
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

ParseBox modules serve as containers for parsers, enabling recursive and mutually recursive parsing. When designing parsers, one common challenge is the order in which parsers are defined—particularly when parsers need to reference each other but haven’t been defined yet. This creates topological ordering issues. Modules resolve this problem by allowing parsers to reference each other within a contained scope, enabling mutual recursion or recursion within a single parser, even when the parsers are defined in an arbitrary order.

Modules are only applicable for Runtime parsers only as Static parsers do not encounter topological ordering issues, this is because TypeScript types are non order dependent.

### Recursive List Parsing

In the following example, we define a List parser that can recursively parse sequences of Value elements. The List parser is defined as either a tuple of a Value followed by another List (recursive) or an empty tuple (base case, representing an empty list). The Value parser is a simple union of strings, and the recursive nature of List is achieved by referencing the Value and List parsers within the same module.

```typescript
import { Runtime } from '@sinclair/parsebox'

const Module = new Runtime.Module({
  Value: Runtime.Union([
    Runtime.Const('X'),
    Runtime.Const('Y'),
    Runtime.Const('Z'),
  ]),

  // List: Will match Value then try to match another via a recursive ref to
  // List. This will repeat until no Value can be matched. When no Value can
  // be matched, the fall through [] (or Epsilon) will match. 
  List: Runtime.Union([
    Runtime.Tuple([Runtime.Ref('Value'), Runtime.Ref('List')]),
    Runtime.Tuple([])
  ], values => values.flat())
})

const R = Module.Parse('List', 'X Y Z Y X E')       // const R = [['X', 'Y', 'Z', 'Y', 'X'], ' E']
```

## Advanced

ParseBox is an LL(1) parser. When building parsers for complex grammars, care must be taken to avoid infinite left recursion, which can occur if a recursive grammar refers back to itself in a way that causes the parser to enter an infinite loop. This is particularly common in expression parsers. 

### Expression Parsing

The following shows a reference expression parser using LL(1) techniques to avoid left recursion. The following parser respects operator precedence and grouping.

```typescript
import { Static } from '@sinclair/parsebox'

// BinaryMapping: Reduces matched Term and Expr into binary expression node
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
// FactorMapping: Map either grouped Expr or Operand
interface FactorMapping extends Static.IMapping {
  output: ( 
    this['input'] extends ['(', infer Expr, ')'] ? Expr :
    this['input'] extends [infer Operand] ? Operand :
    never
  )
}

// ...

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

// ...

type R = Static.Parse<Expr, 'x * (y + z)'>          // type R = [{
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
