import { readFile } from 'fs'
import { promisify } from 'util'
const readFileAsync = promisify(readFile)
const TEST_SCHEMA_PATH = `${__dirname}/test-schema.prisma`

export const getTestSchema = async () => {
  const buffer = await readFileAsync(TEST_SCHEMA_PATH);
  return buffer.toString('utf-8');
}