const API_BASE_USRL = "http://localhost:8081/api"
const PRODUCT_API_URL = 'http://localhost:8082/api'


export async function loginUser(email, password) {
    const response = await fetch(`${API_BASE_USRL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Login failed')
    }

    return data
}

export async function registerUser(firstName, lastName, email, password) {
    const response = await fetch(`${API_BASE_USRL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
        }),
    })
    
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed') 
    }

    return data
}

export async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('token')

    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return fetch(url, {
        ...options,
        headers,
    })
}

export async function getProducts(page = 0, size = 10) {
  const response = await fetch(
    `${PRODUCT_API_URL}/products?page=${page}&size=${size}&sortBy=createdAt`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}