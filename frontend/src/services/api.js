const API_BASE = "/api"

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  // Some error responses have no JSON body, so don't let parsing crash
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status})`)
  }

  return data
}

export const loginUser = (email, password) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const registerUser = (firstName, lastName, email, password) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
  })

export const getProducts = (page = 0, size = 10) =>
  request(`/products?page=${page}&size=${size}&sortBy=createdAt`)

export function authenticatedFetch(path, options = {}) {
  const token = localStorage.getItem('token')
  return request(path, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
}