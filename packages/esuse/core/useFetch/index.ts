/**
 * A wrapper around the Fetch API to provide functionality similar to Axios.
 * Supports request and response interceptors, default configurations, and error handling.
 */

// Types for the configuration and interceptors
interface FetchConfig {
    baseURL?: string
    headers?: Record<string, string>
    timeout?: number // Timeout in milliseconds
}

interface Interceptor<T = any> {
    onFulfilled?: (value: T) => T | Promise<T>
    onRejected?: (error: any) => any
}

interface FetchOptions extends RequestInit {
    params?: Record<string, any> // Query parameters
    timeout?: number
}

class FetchWrapper {
    private baseURL: string
    private headers: Record<string, string>
    private timeout: number

    private requestInterceptors: Interceptor<FetchOptions>[] = []
    private responseInterceptors: Interceptor<Response>[] = []

    /**
     * Constructor to initialize default configurations.
     * @param config The default configuration for the fetch wrapper.
     */
    constructor(config: FetchConfig = {}) {
        this.baseURL = config.baseURL || ''
        this.headers = config.headers || {}
        this.timeout = config.timeout || 0
    }

    /**
     * Add a request interceptor.
     * @param interceptor The request interceptor.
     */
    addRequestInterceptor(interceptor: Interceptor<FetchOptions>) {
        this.requestInterceptors.push(interceptor)
    }

    /**
     * Add a response interceptor.
     * @param interceptor The response interceptor.
     */
    addResponseInterceptor(interceptor: Interceptor<Response>) {
        this.responseInterceptors.push(interceptor)
    }

    /**
     * Perform a fetch request with the given options.
     * @param url The URL for the request.
     * @param options Fetch options including method, headers, body, etc.
     * @returns A promise resolving to the response.
     */
    async request<T>(
        url: string,
        options: FetchOptions & { method: 'GET' | 'POST' | 'PUT' | 'DELETE' } = { method: 'GET' }
    ): Promise<T> {
        let fullUrl = this.baseURL + url

        // Merge headers
        options.headers = {
            ...this.headers,
            ...options.headers
        }

        // Apply query parameters
        if (options.params) {
            const query = new URLSearchParams(options.params).toString()
            fullUrl += (fullUrl.includes('?') ? '&' : '?') + query
        }

        // Apply request interceptors
        for (const interceptor of this.requestInterceptors) {
            if (interceptor.onFulfilled) {
                options = await interceptor.onFulfilled(options)
            }
        }

        // Timeout handling
        const controller = new AbortController()
        const timeout = options.timeout || this.timeout
        if (timeout) {
            setTimeout(() => controller.abort(), timeout)
            options.signal = controller.signal
        }

        let response: Response
        try {
            response = await fetch(fullUrl, options)
        } catch (error) {
            // Apply request error interceptors
            for (const interceptor of this.requestInterceptors) {
                if (interceptor.onRejected) {
                    interceptor.onRejected(error)
                }
            }
            throw error
        }

        // Apply response interceptors
        for (const interceptor of this.responseInterceptors) {
            if (interceptor.onFulfilled) {
                response = await interceptor.onFulfilled(response)
            }
        }

        if (!response.ok) {
            // Handle HTTP errors
            const error = new Error(`HTTP Error: ${response.status}`)
            for (const interceptor of this.responseInterceptors) {
                if (interceptor.onRejected) {
                    interceptor.onRejected(error)
                }
            }
            throw error
        }

        return response.json()
    }
}

/**
 * Factory function to create a useFetch instance with predefined configurations.
 * @param config The configuration for the fetch instance.
 * @returns An object with a `request` method for making API calls.
 */
export function useFetch(config: FetchConfig = {}) {
    const fetchWrapper = new FetchWrapper(config)

    return {
        request: <T>(
            url: string,
            options: FetchOptions & { method: 'GET' | 'POST' | 'PUT' | 'DELETE' } = { method: 'GET' }
        ): Promise<T> => {
            return fetchWrapper.request<T>(url, options)
        },
        addRequestInterceptor: fetchWrapper.addRequestInterceptor.bind(fetchWrapper),
        addResponseInterceptor: fetchWrapper.addResponseInterceptor.bind(fetchWrapper)
    }
}
