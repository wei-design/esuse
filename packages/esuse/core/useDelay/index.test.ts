import { describe, expect, it } from 'vitest'
import { useDelay } from '.'

describe('useDelay', () => {
    it('test', () => {
        const test = useDelay()
        expect(test).not.toBe(undefined)
    })
})
