import { describe, expect, it } from 'vitest'
import { useImageDownload } from '.'

describe('useImageDownload', () => {
    it('no param', () => {
        const src = 'https://www.runoob.com/try/demo_source/smiley-2.gif'
        const test = useImageDownload(src)
        expect(test).toEqual(src)
    })
})
