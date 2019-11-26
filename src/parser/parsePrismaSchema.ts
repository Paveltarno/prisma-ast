import { IPrismaSchemaAST } from '../types/PrismaSchemaAst'
import { parse } from './prisma-ast'

export const parsePrismaSchema = (rawSchema: string): IPrismaSchemaAST => parse(rawSchema) as IPrismaSchemaAST
