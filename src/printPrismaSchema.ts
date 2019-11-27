import { autoIndentList } from './utils/autoIndentList'
import {
  IPrismaSchemaAST,
  IPrismaSchemaASTNode,
  PrismaSchemaASTTypes,
  IPrismaSchemaASTModel,
  IPrismaSchemaASTModelFieldPrimitive,
  IPrismaSchemaASTModelFieldAttribute,
  IPrismaSchemaASTModelFieldRelation,
} from './types/PrismaSchemaAst'

const NUM_OF_SPACES_IN_GAP = 2

type IPrismaSchemaPrinter<T = IPrismaSchemaASTNode> = (node: T) => string

const printAST: IPrismaSchemaPrinter<IPrismaSchemaAST> = astNode =>
  `${astNode.nodes.map(printPrismaNode).join('\n\n')}`

const printModel: IPrismaSchemaPrinter<IPrismaSchemaASTModel> = modelNode =>
  `${PrismaSchemaASTTypes.MODEL} ${modelNode.name} {
${autoIndentList(modelNode.fields.map(printPrismaNode), NUM_OF_SPACES_IN_GAP)}
}`

const printFieldPrimitive: IPrismaSchemaPrinter<IPrismaSchemaASTModelFieldPrimitive> = ({
  name,
  fieldType,
  isOptional,
  attributes,
}) =>
  `${name} ${fieldType}${printIsOptional(isOptional)} ${attributes.map(
    printPrismaNode,
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
  )} ${attributes.map(printPrismaNode)}`

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
