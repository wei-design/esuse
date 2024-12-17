import { describe, expect, it } from 'vitest'
import { useFetch } from '.'

describe('useFetch', () => {
    it('test', () => {
        const test = useFetch()
        expect(test).not.toBe(undefined)
    })
})
