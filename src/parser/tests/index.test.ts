import { readFile } from 'fs'
import { promisify } from 'util'
import { parsePrismaSchema } from '../parsePrismaSchema'
import {
  IPrismaSchemaAST,
  IPrismaSchemaASTModel,
  IPrismaSchemaASTModelFieldPrimitive,
  IPrismaSchemaASTModelFieldRelation,
  PrismaSchemaASTTypes,
} from '../../types/PrismaSchemaAst'

const readFileAsync = promisify(readFile)
const TEST_SCHEMA_PATH = `${__dirname}/test-schema.prisma`

describe('parser', () => {
  it('parses the test schema', async () => {
    const testSchemaBuffer = await readFileAsync(TEST_SCHEMA_PATH)
    const expected: IPrismaSchemaAST = {
      type: PrismaSchemaASTTypes.AST,
      nodes: [
        {
          type: 'model',
          name: 'User',
          fields: [
            {
              name: 'id',
              type: 'modeFieldPrimitive',
              fieldType: 'Int',
              isOptional: false,
              attributes: [
                {
                  type: 'attribute',
                  value: 'id',
                },
              ],
            } as IPrismaSchemaASTModelFieldPrimitive,
            {
              name: 'name',
              type: 'modeFieldPrimitive',
              fieldType: 'String',
              isOptional: false,
              attributes: [],
            } as IPrismaSchemaASTModelFieldPrimitive,
            {
              name: 'email',
              type: 'modeFieldPrimitive',
              fieldType: 'String',
              isOptional: false,
              attributes: [],
            } as IPrismaSchemaASTModelFieldPrimitive,
            {
              name: 'age',
              type: 'modeFieldPrimitive',
              fieldType: 'Int',
              isOptional: true,
              attributes: [],
            } as IPrismaSchemaASTModelFieldPrimitive,
            {
              name: 'posts',
              type: 'modelFieldRelation',
              fieldType: 'Post',
              hasMany: true,
              isOptional: false,
              attributes: [],
            } as IPrismaSchemaASTModelFieldRelation,
          ],
        },
        {
          type: 'model',
          name: 'Post',
          fields: [
            {
              name: 'id',
              type: 'modeFieldPrimitive',
              fieldType: 'Int',
              isOptional: false,
              attributes: [
                {
                  type: 'attribute',
                  value: 'id',
                },
              ],
            } as IPrismaSchemaASTModelFieldPrimitive,
            {
              name: 'title',
              type: 'modeFieldPrimitive',
              fieldType: 'String',
              isOptional: false,
              attributes: [],
            } as IPrismaSchemaASTModelFieldPrimitive,
            {
              name: 'content',
              type: 'modeFieldPrimitive',
              fieldType: 'String',
              isOptional: false,
              attributes: [],
            } as IPrismaSchemaASTModelFieldPrimitive,
            {
              name: 'author',
              type: 'modelFieldRelation',
              fieldType: 'User',
              hasMany: false,
              isOptional: false,
              attributes: [],
            } as IPrismaSchemaASTModelFieldRelation,
          ],
        },
      ] as IPrismaSchemaASTModel[],
    }
    const result = parsePrismaSchema(testSchemaBuffer.toString())
    expect(expected).toEqual(result)
  })

  it('throws on invalid schema', () => {
    expect(() => parsePrismaSchema(' THIS IS AN INVALID SCHEMA ')).toThrow()
  })
})
