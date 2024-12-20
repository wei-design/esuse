/**
 * useDelay
 * @returns
 */
export const useDelay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))
