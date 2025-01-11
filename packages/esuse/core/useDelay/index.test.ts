import { describe, expect, it } from 'vitest'
import { useDelay } from '.'

describe('useDelay', () => {
    it('test', () => {
        const test = useDelay(10)
        expect(test).not.toBe(undefined)
    })
})
