/**
 * check image type
 * @param type
 * @param types
 */
function isValidImageList(type: string, types: string[]) {
    return types.includes(type.replace(/image\//, ''))
}

/**
 * @description get uuid
 * @returns {string}
 */
function getUUID(): string {
    const timestamp = Date.now().toString(36)
    const randomString = Math.random().toString(36).substring(2, 8)
    return timestamp + '-' + randomString
}

export interface Options {
    accepts?: string[] // accept file types
    success?: (file: File[] | null) => void
    uploadClass?: string // upload class name
}

export interface Result {
    isSupported: boolean
    getImage: () => Promise<File[] | null>
}

/**
 * @description get image from clipboard
 */
export const imageClipboard = (options: Options = {}): Result => {
    /**
     * @description isSupported
     * navigator.clipboard can only be used in https
     */
    const isSupported = !!navigator.clipboard
    /**
     * @description get image from clipboard
     */
    const getImage = async () => {
        try {
            if (!isSupported) {
                console.warn('navigator.clipboard can only be used in https')
                return null
            }
            const clipboardData = await navigator.clipboard.read()
            const imageRes: File[] = []
            for (const clipboardItem of clipboardData) {
                const types = clipboardItem.types
                for (const type of types) {
                    // filter image
                    if (type.startsWith('image/')) {
                        if (options.accepts && !isValidImageList(type, options.accepts)) {
                            const tips = `clipboard data is not your image, ${type}`
                            console.warn(`${tips}`)
                            return Promise.reject(tips)
                        }
                        // get blob
                        const blob = await clipboardItem.getType(type)
                        // get file name
                        const fileName = `clipboard.${getUUID()}.${blob.type.split('/')[1]}`
                        const file = new File([blob], fileName, { type: blob.type })
                        file && imageRes.push(file)
                    }
                }
            }
            options.success && options.success(imageRes.length ? imageRes : null)
            return Promise.resolve(imageRes.length ? imageRes : null)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    return {
        isSupported,
        getImage
    }
}

/**
 * @description get image from paste
 */
export const imagePaste = (options: Options = {}) => {
    function isValidImageList(files: FileList | undefined) {
        const accepts = options.accepts
        if (accepts) {
            // filter custom types
            return files && files?.length === 1 && accepts.includes(files[0].type.replace(/image\//, ''))
        } else {
            // filter image
            return files && files?.length === 1 && files[0].type.startsWith('image/')
        }
    }

    function dropReplaceImage(imgWrap: Element, files: any) {
        const tmpFile: File = files[0]
        const callback = () => {
            const fileInput: Element | any = imgWrap.querySelector('input[type="file"]')
            if (fileInput) {
                if (files.length === 0) {
                    files = new DataTransfer()
                    files.items.add(tmpFile)
                    fileInput.files = files.files
                } else {
                    fileInput.files = files
                }
                fileInput.dispatchEvent(new Event('change'))
                options.success && options.success(files?.length ? files : null)
            }
        }
        window.requestAnimationFrame(() => callback())
    }

    /**
     * checks that a UI element is not in another hidden element or tab content
     */
    function uiElementIsVisible(el: Element | any): boolean {
        if (el === document) {
            return true
        }

        const computedStyle = getComputedStyle(el)
        const isVisible = computedStyle.display !== 'none'

        if (!isVisible) return false
        return uiElementIsVisible(el.parentNode)
    }

    /**
     * check if element is in view
     * @param el
     */
    function uiElementInSight(el: Element): number {
        const clRect = el.getBoundingClientRect()
        const windowHeight = window.innerHeight
        return (clRect.bottom > 0 && clRect.top < windowHeight) as any
    }

    /**
     * paste listener
     * @param event
     */
    const pasteListener = (event: ClipboardEvent) => {
        const files: FileList | undefined = event.clipboardData?.files
        if (!files || !isValidImageList(files)) {
            console.warn('image is empty or not image', files)
            return
        }

        const selector = options.uploadClass || '.image-upload'
        const visibleImageFields = [...document.querySelectorAll(selector)]
            .filter(el => uiElementIsVisible(el))
            .sort((a: Element, b: Element) => uiElementInSight(b) - uiElementInSight(a))

        if (!visibleImageFields.length) {
            return
        }

        const firstFreeImageField: Element = visibleImageFields.filter(el => !el.querySelector('img'))?.[0]

        // set empty input
        firstFreeImageField && dropReplaceImage(firstFreeImageField, files)
    }

    const addEvent = () => {
        document.addEventListener('paste', pasteListener)
    }
    const removeEvent = () => {
        document.removeEventListener('paste', pasteListener)
    }
    return {
        addEvent,
        removeEvent
    }
}
