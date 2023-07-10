import request from '../utils/request.js'

/**
 * Retrieves the technical list.
 * @returns {Promise} A promise that resolves with the response from the server.
 */
export function getTechnicalList() {
  const url = 'api/v1/technical/list'

  return request(url)
}

/**
 * Retrieves the service type.
 * @returns {Promise} A promise that resolves with the response from the server.
 */
export function getServiceType() {
  const url = 'admin/api/v1/service_type/ladderlist'

  return request(url)
}

/**
 * Retrieves the service list based on the provided data.
 * @param {Object} data - The data used for filtering the service list.
 * @param {number} data.pageNum - The page number to retrieve
 * @param {number} data.pageSize - The number of items per page
 * @param {string} data.keywords - Keywords for searching
 * @param {string} data.serviceTypeId - ID of the main service type
 * @param {string} data.serviceTypeId2 - ID of the secondary service type
 * @param {string} data.technicalId - ID of the technical type
 * @param {string} data.province - Province for filtering by location
 * @param {string} data.dataOrigin - Data source for filtering
 * @param {number} data.logicStatus - Login status indicator (1 for logged in, 0 for logged out)
 * @returns {Promise} A promise that resolves with the response from the server.
 */
export function getServiceList(data) {
  const url = 'api/v1/service/list'
  const params = new URLSearchParams()

  Object.keys(data).forEach((key) => {
    params.append(key, data[key])
  })

  return request(`${url}?${params.toString()}`)
}
