const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Generic API function with error handling
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API request failed for ${url}:`, error)
    throw error
  }
}

export const api = {
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
  }
}
