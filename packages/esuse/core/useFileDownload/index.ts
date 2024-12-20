/**
 * 下载图片到本地
 * @param {string} url - 图片的 URL 地址，可以是同源或跨域资源。
 * @param {string} [fileName="image.png"] - 下载保存的文件名（可选），默认为 "image.png"。
 * @returns {Promise<string>} 一个 Promise，在下载成功后 resolve，失败时 reject。
 * @throws {Error} 如果跨域请求图片失败，会抛出错误。
 * @example
 * // 下载同源图片
 * downloadImage('/assets/example.png', 'example.png');
 *
 * // 下载跨域图片
 * downloadImage('https://example.com/image.jpg', 'downloaded-image.jpg');
 */
export function useFileDownload(url: string, fileName: string = 'image.png'): Promise<string> {
    return new Promise((resolve, reject) => {
        const link = document.createElement('a')

        // 检测是否是跨域资源
        if (url.startsWith('http') && !url.includes(window.location.origin)) {
            // 使用 fetch 下载跨域图片
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image: ${response.statusText}`)
                    }
                    return response.blob() // 将响应转换为 Blob
                })
                .then(blob => {
                    const objectURL = URL.createObjectURL(blob) // 创建临时 URL
                    link.href = objectURL
                    link.download = fileName
                    link.click()
                    URL.revokeObjectURL(objectURL) // 释放临时 URL
                    resolve(url)
                })
                .catch(error => {
                    console.error('Image download failed:', error)
                    reject(error)
                })
        } else {
            // 同源资源直接设置 href 和 download
            link.href = url
            link.download = fileName
            link.click()
            resolve(url)
        }
    })
}
