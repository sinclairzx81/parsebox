import { Static } from '@sinclair/parsebox'
import { Parse } from './typebox'

// ------------------------------------------------------------------
// Example: TypeBox
// ------------------------------------------------------------------

const T = Parse(`{
  x: number,
  y: number,
  z: number
}`)

console.dir(T, { depth: 100 })

// ------------------------------------------------------------------
// Example: Expression Parser
// ------------------------------------------------------------------

type Result = Static.Parse<Expr, 'x * (y + z)'> // hover

// prettier-ignore
type BinaryReduce<Left extends unknown, Right extends unknown[]> = (
  Right extends [infer Operator, infer Right, infer Rest extends unknown[]] 
    ? { left: Left; operator: Operator; right: BinaryReduce<Right, Rest> } 
    : Left
)

// prettier-ignore
interface BinaryMapping extends Static.IMapping {
  output: this['input'] extends [infer Left, infer Right extends unknown[]] 
    ? BinaryReduce<Left, Right> 
    : never
}

// prettier-ignore
interface FactorMapping extends Static.IMapping {
  output: (
    this['input'] extends ['(', infer Expr, ')'] ? Expr : 
    this['input'] extends [infer Operand] ? Operand : 
    never
  )
}

type Operand = Static.Ident

// prettier-ignore
type Factor = Static.Union<[
  Static.Tuple<[Static.Const<'('>, Expr, Static.Const<')'>]>, 
  Static.Tuple<[Operand]>
], FactorMapping>

// prettier-ignore
type TermTail = Static.Union<[
  Static.Tuple<[Static.Const<'*'>, Factor, TermTail]>, 
  Static.Tuple<[Static.Const<'/'>, Factor, TermTail]>, 
  Static.Tuple<[]>
]>

// prettier-ignore
type ExprTail = Static.Union<[
  Static.Tuple<[Static.Const<'+'>, Term, ExprTail]>, 
  Static.Tuple<[Static.Const<'-'>, Term, ExprTail]>, 
  Static.Tuple<[]>
]>

// prettier-ignore
type Term = Static.Tuple<[Factor, TermTail], BinaryMapping>

// prettier-ignore
type Expr = Static.Tuple<[Term, ExprTail], BinaryMapping>
