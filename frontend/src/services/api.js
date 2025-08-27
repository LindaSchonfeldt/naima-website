const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// ✅ Add generic get method
const apiRequest = async (url, options = {}) => {
  const fullUrl = `${API_BASE}${url}`
  console.log('📡 Making API request to:', fullUrl)

  try {
    // build final options so headers/body aren't accidentally overwritten
    const requestOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }

    console.log('📡 Request options:', requestOptions) // <-- new: log what will be sent

    const response = await fetch(fullUrl, requestOptions)

    console.log('📡 Response status:', response.status)

    if (!response.ok) {
      // attempt to parse error body for more info
      let errBody = null
      try {
        errBody = await response.json()
      } catch (e) {
        /* ignore */
      }
      console.error('📡 Response error body:', errBody)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('📡 Response data:', data)
    return data
  } catch (error) {
    console.error(`❌ API request failed for ${url}:`, error)
    throw error
  }
}

export const api = {
  // ✅ Generic get method
  get: apiRequest,

  // Products API
  products: {
    // Get all products with optional filters
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString()
      const url = queryString ? `/products?${queryString}` : '/products'
      return apiRequest(url)
    },

    // Get single product by ID
    getById: async (id) => {
      return apiRequest(`/products/${id}`)
    },

    // Get featured products
    getFeatured: async () => {
      return apiRequest('/products/featured/list')
    },

    // Get products by category
    getByCategory: async (category) => {
      return apiRequest(`/products/category/${category}`)
    },

    // Search products
    search: async (query) => {
      return apiRequest(`/products?search=${encodeURIComponent(query)}`)
    }
  },

  // Partners API
  partners: {
    // Get all partners with optional type filter
    getAll: async (type = null) => {
      const url = type ? `/partners?type=${type}` : '/partners'
      return apiRequest(url)
    },

    // Get served-at partners
    getServedAt: async () => {
      return apiRequest('/partners/served-at')
    },

    // Get catering partners
    getCatering: async () => {
      return apiRequest('/partners/catering')
    }
  },

  // Orders API
  orders: {
    // Get all orders
    getAll: async () => {
      return apiRequest('/orders')
    },

    // Submit a new order
    submitOrder: async (orderData, token) => {
      return apiRequest('/orders', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      })
    }
  },

  // Companies API
  companies: {
    // Login method
    login: async (data) => {
      const response = await fetch(`${API_BASE}/companies/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error('Login failed')
      return response.json()
    },
    logout: async () => {
      const response = await fetch(`${API_BASE}/companies/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) throw new Error('Logout failed')
      return response.json()
    },

    // Fetch current company profile using token
    getProfile: async (token) => {
      return apiRequest('/companies/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    }
  }
}
