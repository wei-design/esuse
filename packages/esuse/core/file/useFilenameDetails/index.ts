/**
 * Returns various filename components.
 * Example:
 * - fullFilename: 'file.txt'
 * - filename: 'file'
 * - suffix: 'txt'
 */
export function useFilenameDetails(fullFilename: string) {
    if (fullFilename.includes('.')) {
        return {
            filename: fullFilename.split('.').slice(0, -1).join('.'),
            suffix: fullFilename.split('.').pop() ?? null
        }
    } else {
        return { filename: fullFilename, suffix: null }
    }
}
