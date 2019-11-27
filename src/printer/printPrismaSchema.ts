import { map } from 'ramda'
import { codeBlock } from 'common-tags'
import {
  IPrismaSchemaAST,
  IPrismaSchemaASTNode,
  PrismaSchemaASTTypes,
  IPrismaSchemaASTModel,
  IPrismaSchemaASTModelFieldPrimitive,
  IPrismaSchemaASTModelFieldAttribute,
  IPrismaSchemaASTModelFieldRelation,
} from '../types/PrismaSchemaAst'

type IPrismaSchemaPrinter<T = IPrismaSchemaASTNode> = (node: T) => string

const printAST: IPrismaSchemaPrinter<IPrismaSchemaAST> = astNode =>
  map(printPrismaNode, astNode.nodes).join('\n\n')

const printModel: IPrismaSchemaPrinter<IPrismaSchemaASTModel> = modelNode =>
  codeBlock`${PrismaSchemaASTTypes.MODEL} ${modelNode.name} {
    ${map(printPrismaNode, modelNode.fields)}
}
`

const printFieldPrimitive: IPrismaSchemaPrinter<IPrismaSchemaASTModelFieldPrimitive> = ({
  name,
  fieldType,
  isOptional,
  attributes,
}) =>
  `${name} ${fieldType}${printIsOptional(isOptional)} ${map(
    printPrismaNode,
    attributes,
  )}`

const printFieldRelation: IPrismaSchemaPrinter<IPrismaSchemaASTModelFieldRelation> = ({
  name,
  fieldType,
  isOptional,
  attributes,
  hasMany,
}) =>
  `${name} ${fieldType}${printHasMany(hasMany)}${printIsOptional(
    isOptional,
  )} ${map(printPrismaNode, attributes)}`

const printAttribute: IPrismaSchemaPrinter<IPrismaSchemaASTModelFieldAttribute> = ({
  value,
}) => `@${value}`

const printHasMany = (hasMany: boolean) => (hasMany ? `[]` : ``)

const printIsOptional = (isOptional: boolean) => (isOptional ? `?` : ``)

const NODE_TO_PRINTER_MAP: {
  [key in PrismaSchemaASTTypes]: IPrismaSchemaPrinter
} = {
  [PrismaSchemaASTTypes.AST]: printAST,
  [PrismaSchemaASTTypes.MODEL]: printModel,
  [PrismaSchemaASTTypes.ATTRIBUTE]: printAttribute,
  [PrismaSchemaASTTypes.MODEL_FIELD_PRIMITIVE]: printFieldPrimitive,
  [PrismaSchemaASTTypes.MODEL_FIELD_RELATION]: printFieldRelation,
}

// Factory method for dispatching an AST node to it's appropriate printer
const printPrismaNode = (node: IPrismaSchemaASTNode) =>
  NODE_TO_PRINTER_MAP[node.type](node)

/**
 * Pretty prints the given AST into a string
 * @param {Object} ast An AST nested object
 */
export const printPrismaSchema = (ast: IPrismaSchemaAST) => printPrismaNode(ast)
