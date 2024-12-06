import { describe, expect, it } from 'vitest'
import { useImageDownload } from '.'

describe('useImageDownload', () => {
    it('test', async () => {
        const src = 'https://www.runoob.com/try/demo_source/smiley-2.gif'
        const test = useImageDownload(src)
        await expect(test).resolves.not.toBe(undefined)
    })
})
