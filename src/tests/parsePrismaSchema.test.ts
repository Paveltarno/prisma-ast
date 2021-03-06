import { parsePrismaSchema } from '../parsePrismaSchema'
import {
  IPrismaSchemaAST,
  IPrismaSchemaASTModel,
  IPrismaSchemaASTModelFieldPrimitive,
  IPrismaSchemaASTModelFieldRelation,
  PrismaSchemaASTTypes,
} from '../types/PrismaSchemaAst'
import { getTestSchema } from './helpers'

describe('parser', () => {
  it('parses the test schema', async () => {
    const testSchema = await getTestSchema()
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
    const result = parsePrismaSchema(testSchema)
    expect(expected).toEqual(result)
  })

  it('throws on invalid schema', () => {
    expect(() => parsePrismaSchema(' THIS IS AN INVALID SCHEMA ')).toThrow()
  })
})
