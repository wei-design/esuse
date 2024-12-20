import { describe, expect, it } from 'vitest'
import { useFileBase64 } from '.'

describe('useFileBase64', () => {
    it('test', () => {
        const test = useFileBase64()
        expect(test).not.toBe(undefined)
    })
})
