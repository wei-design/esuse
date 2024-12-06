import { useFilenameDetails } from '../useFilenameDetails'
/**
 * Returns various path components.
 * Example:
 * - path: 'dir/file.txt'
 * - directory: 'dir'
 * - fullFilename: 'file.txt'
 * - filename: 'file'
 * - suffix: 'txt'
 */
export function usePathDetails(path: string) {
    const directory = path.split('/').slice(0, -1).join('/')
    const fullFilename = path.split('/').pop() ?? path
    return { directory, fullFilename, ...useFilenameDetails(fullFilename) }
}
