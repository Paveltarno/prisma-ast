import { autoIndentList } from './autoIndentList'

describe('autoIndentList', () => {
  it('indents one line', () => {
    const params = [`a bc def `]
    const expected = ` a bc def`

    expect(autoIndentList(params, 1)).toEqual(expected)
  })

  it('indents two lines where one is longer', () => {
    const params = [`a bc def `, `a bc def gh`]
    const expected = ' a bc def\n a bc def gh'

    expect(autoIndentList(params, 1)).toEqual(expected)
  })

  it('indents three lines with different words and lengths', () => {
    const params = ['1 22 333', '1 333 4444 22', '333 22']

    // Strings in js are a mess
    const expected = ` 1   22  333
 1   333 4444 22
 333 22`
    expect(autoIndentList(params, 1)).toEqual(expected)
  })
})
