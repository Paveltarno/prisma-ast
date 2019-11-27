/**
 * Indents words in a list of strings the be "column" shaped
 * i.e:
 * ```
 * - this one  is  longggg
 * - but  this one isn't
 * ```
 * @param list {string[]} list of strings to indent
 * @param numOfSpaces  {number} minimum indentation number of spaces
 */
export const autoIndentList = (list: string[], numOfSpaces: number) => {
  const maxWordLengths = list.reduce((acc, item) => {
    const words = item.split(' ')
    return words.reduce((wordAcc: number[], word: string, i: number) => {
      if (!wordAcc[i] || wordAcc[i] < word.length) {
        wordAcc[i] = word.length
      }
      return wordAcc
    }, acc)
  }, [])

  const indentedList = list.map(item => {
    const words = item.split(' ')
    const result = words.reduce(
      (acc: string, word: string, i: number) =>
        (acc += `${word.padEnd(maxWordLengths[i] + numOfSpaces)}`),
      '',
    )
    return `${' '.repeat(numOfSpaces)}${result.trimRight()}`
  })
  return indentedList.join('\n')
}
