import { readFile } from 'fs'
import { promisify } from 'util'
import { parsePrismaSchema } from '../parsePrismaSchema'

const readFileAsync = promisify(readFile)
const TEST_SCHEMA_PATH = `${__dirname}/test-schema.prisma`

describe('parser', () => {
  it('parses the test schema', async () => {
    const testSchemaBuffer = await readFileAsync(TEST_SCHEMA_PATH)
    const expected = {
      type: 'ast',
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
            },
            {
              name: 'name',
              type: 'modeFieldPrimitive',
              fieldType: 'String',
              isOptional: false,
              attributes: [],
            },
            {
              name: 'email',
              type: 'modeFieldPrimitive',
              fieldType: 'String',
              isOptional: false,
              attributes: [],
            },
            {
              name: 'age',
              type: 'modeFieldPrimitive',
              fieldType: 'Int',
              isOptional: true,
              attributes: [],
            },
            {
              name: 'posts',
              type: 'modelFieldRelation',
              fieldType: 'Post',
              hasMany: true,
              isOptional: false,
              attributes: [],
            },
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
            },
            {
              name: 'title',
              type: 'modeFieldPrimitive',
              fieldType: 'String',
              isOptional: false,
              attributes: [],
            },
            {
              name: 'content',
              type: 'modeFieldPrimitive',
              fieldType: 'String',
              isOptional: false,
              attributes: [],
            },
            {
              name: 'author',
              type: 'modelFieldRelation',
              fieldType: 'User',
              hasMany: false,
              isOptional: false,
              attributes: [],
            },
          ],
        },
      ],
    }
    const result = parsePrismaSchema(testSchemaBuffer.toString())
    expect(expected).toEqual(result)
  })
})
