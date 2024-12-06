import { describe, expect, it } from 'vitest'
import { useFilenameDetails } from '.'

describe('useFilenameDetails', () => {
    it('no param', () => {
        const test = useFilenameDetails('smiley-2.gif')
        expect(test).toEqual(undefined)
    })
})
