// deno-fmt-ignore-file

import { Static, Runtime, Compile } from '@sinclair/parsebox'
import { Syntax } from './typebox/compiled/index.ts'
import { ParseJson } from './json/index.ts'
import { ParseEbnf } from './ebnf/index.ts'

// ------------------------------------------------------------------
//
// Example: TypeBox | Compiled
//
// ParseBox is the working project for developing the TypeBox syntax
// parsers. You can test TypeBox inference here. Check the TypeBox
// directory for Compiled and Interpreted variants.
//
// ------------------------------------------------------------------
const Type = Syntax(`{
  x: number,
  y: number,
  z: number
}`)

console.dir(Type, { depth: 100 })

// ------------------------------------------------------------------
//
// Example: Ebnf | Interpreted
//
// ------------------------------------------------------------------
const Ebnf = ParseEbnf(`

  Operand ::= Ident ;

  Factor ::= "(" Expr ")"
              | Operand ;

  TermTail ::= ("*" Factor TermTail)
             | ("/" Factor TermTail)
             | e ;

  ExprTail ::= ("+" Term ExprTail) 
             | ("-" Term ExprTail)
             | e ;

  Term ::= Factor TermTail ;

  Expr ::= Term ExprTail ;

`)

const Result = Ebnf.Parse('Expr', `X * (Y + Z)`)

console.dir(Result, { depth: 100 })

// ------------------------------------------------------------------
//
// Example: Json | Interpreted
//
// ------------------------------------------------------------------
const Json = ParseJson(`{ 
  "x": 1, 
  "y": 2, 
  "z": 3 
}`)

console.log(Json)

// ------------------------------------------------------------------
//
// Example: Expression | Interpreted
//
// ------------------------------------------------------------------
{
  type Result = Static.Parse<Expr, 'x * (y + z)'> // hover

  type BinaryReduce<Left extends unknown, Right extends unknown[]> = (
    Right extends [infer Operator, infer Right, infer Rest extends unknown[]] 
      ? { left: Left; operator: Operator; right: BinaryReduce<Right, Rest> } 
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
  type Operand = Static.Ident
  type Factor = Static.Union<[
    Static.Tuple<[Static.Const<'('>, Expr, Static.Const<')'>]>, 
    Static.Tuple<[Operand]>
  ], FactorMapping>

  type TermTail = Static.Union<[
    Static.Tuple<[Static.Const<'*'>, Factor, TermTail]>, 
    Static.Tuple<[Static.Const<'/'>, Factor, TermTail]>, 
    Static.Tuple<[]>
  ]>
  type ExprTail = Static.Union<[
    Static.Tuple<[Static.Const<'+'>, Term, ExprTail]>, 
    Static.Tuple<[Static.Const<'-'>, Term, ExprTail]>, 
    Static.Tuple<[]>
  ]>
  type Term = Static.Tuple<[Factor, TermTail], BinaryMapping>
  type Expr = Static.Tuple<[Term, ExprTail], BinaryMapping>
}
// ------------------------------------------------------------------
//
// Example: Compiled Parser
//
// ParseBox supports module compilation, generating optimized parsers
// for JavaScript and TypeScript. The compilation process produces
// two files:
//
// 1. A parser file derived from the grammar.
// 2. A semantic mapping file.
//
// While compilation ensures valid code and a functional parser,
// semantic actions must be implemented manually.
//
// ------------------------------------------------------------------
{
  const ListModule = new Runtime.Module({
    List: Runtime.Union([
      Runtime.Tuple([Runtime.Ident(), Runtime.Const(','), Runtime.Ref('List')]),
      Runtime.Tuple([Runtime.Ident(), Runtime.Const(',')]),
      Runtime.Tuple([Runtime.Ident()]),
      Runtime.Tuple([]),
    ])
  })
  const project = Compile.Project(ListModule, {
    contextDefault: '{}',
    contextType: 'unknown',
    mappingPath: './mapping',
    mappingImports: [],
    parserImports: []
  })
  console.log(project.parser)   // parser file content
  console.log(project.mapping)  // semantic mapping file content
}
