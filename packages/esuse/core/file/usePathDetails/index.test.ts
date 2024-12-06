import { describe, expect, it } from 'vitest'
import { usePathDetails } from '.'

describe('usePathDetails', () => {
    it('no param', () => {
        const test = usePathDetails('https://www.runoob.com/try/demo_source/smiley-2.gif')
        expect(test).toEqual(undefined)
    })
})
