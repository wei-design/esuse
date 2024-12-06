import { describe, expect, it } from 'vitest'
import { useFilenameDetails } from '.'

describe('useFilenameDetails', () => {
    it('test', () => {
        const test = useFilenameDetails('smiley-2.gif')
        expect(test).not.toBe(undefined)
    })
})
