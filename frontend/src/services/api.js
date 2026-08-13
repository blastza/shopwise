const API_BASE_USRL = "http://localhost:8081/api"

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

export async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('token')

    const headers = {
        ...options.headers,
        'Content-Type': 'appliction/json',
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return fetch(url, {
        ...options,
        headers,
    })
}