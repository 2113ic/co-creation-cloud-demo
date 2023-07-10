/* eslint-disable no-useless-escape */
import axios from 'axios'

const pendingRequests = new Map()
const service = axios.create({
  baseURL: 'https://service.test.nttcc.com.cn/',
  timeout: 1000 * 60,
  proxy: {
    host: 'localhost',
    port: 5173,
  },
})

// Interceptors for HTTP requests
service.interceptors.request.use(
  (config) => {
    // Save raw data, prevent data from being modified after the response
    config.rawData = config.data
    // Add signal to the request config
    config.signal = addPendingRequest(config)

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptors for HTTP responses
service.interceptors.response.use(
  (res) => {
    removePendingRequest(res.config)

    return handleResponse(res)
  },
  (error) => {
    removePendingRequest(error.config)

    if (axios.isCancel(error)) {
      console.log('已取消的重复请求：' + error.message)
    }
    return Promise.reject(error)
  }
)

/**
 * A function that handles the response data from a request.
 * @param {import('axios').AxiosResponse} res The response data.
 * @returns {Promise<any>|any} The processed result.
 * @throws {Error} Throws an error if the corresponding status code cannot be processed.
 */
function handleResponse(res) {
  const code = res.data.code || 200
  // const message = res.data.message || ''

  const handlers = {
    200: () => res.data,
  }
  const handler = handlers[code.toString()]

  if (handler) return handler()
  throw new Error(`处理程序不存在于 handleResponse 函数中: ${code}`)
}

/**
 * Creates an object containing an 'AbortController' instance and its associated 'signal'.
 *
 * @returns {{ controller: AbortController, signal: AbortSignal }}
 * - Object with 'AbortController' instance and its associated 'signal'.
 */
function getCancelTokenSource() {
  const controller = new AbortController()
  const { signal } = controller

  return {
    controller,
    signal,
  }
}

/**
 * Returns a unique key as a string to identify a pending request based on passed 'config' object.
 *
 * @param {import('axios').AxiosRequestConfig} config - Request configuration object.
 * @returns {string} - A unique string key to identify a pending request based on passed 'config' object.
 */
function getPendingRequestKey(config) {
  const { method, url, params, rawData } = config

  return JSON.stringify([method, url, params, rawData])
}

/**
 * Adds a new pending request with the associated 'config' object to the 'pendingRequests' map.
 * If a pending request with the same key already exists, it will be canceled.
 *
 * @param {import('axios').AxiosRequestConfig} config - Request configuration object.
 * @returns {AbortSignal} - The signal object for the newly added request.
 */
function addPendingRequest(config) {
  const key = getPendingRequestKey(config)
  const { signal, controller } = getCancelTokenSource()

  if (pendingRequests.has(key)) {
    // If there is already a pending request with the same key, cancel it
    pendingRequests.get(key).cancel()
  }
  pendingRequests.set(key, {
    cancel: () => {
      controller.abort()
    },
  })

  return signal
}

/**
 * Removes the pending request associated with the passed 'config' object from the 'pendingRequests' map.
 *
 * @param {import('axios').AxiosRequestConfig} config - Request configuration object.
 */
function removePendingRequest(config) {
  const key = getPendingRequestKey(config)

  if (pendingRequests.has(key)) {
    pendingRequests.delete(key)
  }
}

export default service
