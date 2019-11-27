import { IPrismaSchemaAST } from '../types/PrismaSchemaAst'
import { parse } from './prisma-ast'

/**
 * Parses a Prisma schema and returns an AST
 * @param {string} rawSchema raw schema string
 */
export const parsePrismaSchema = (rawSchema: string): IPrismaSchemaAST =>
  parse(rawSchema) as IPrismaSchemaAST
