import { describe, expect, it } from 'vitest'
import { useUuid } from '.'

describe('useUuid', () => {
    it('test', () => {
        const test = useUuid()
        expect(test).not.toBe(undefined)
    })
})
