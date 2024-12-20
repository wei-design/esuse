/**
 * useUuid
 * @returns
 */
export const useUuid = (length: number = 10) => {
    return Math.random().toString(16).substring(2, length)
}
