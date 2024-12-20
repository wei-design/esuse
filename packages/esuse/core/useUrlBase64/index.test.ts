import { describe, expect, it } from 'vitest'
import { useUrlBase64 } from '.'

describe('useUrlBase64', () => {
    it('test', () => {
        const test = useUrlBase64()
        expect(test).not.toBe(undefined)
    })
})
