import { describe, expect, it } from 'vitest'
import { useFileInfo } from '.'

describe('useFileInfo', () => {
    it('test', () => {
        const test = useFileInfo()
        expect(test).not.toBe(undefined)
    })
})
