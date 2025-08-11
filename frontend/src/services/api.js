const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

console.log('🌐 API Base URL:', API_BASE) // ✅ Add this debug log

// Generic API function with error handling
const apiRequest = async (url, options = {}) => {
  const fullUrl = `${API_BASE}${url}`
  console.log('📡 Making API request to:', fullUrl) // ✅ Add debug log

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    console.log('📡 Response status:', response.status) // ✅ Add debug log

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('📡 Response data:', data) // ✅ Add debug log
    return data
  } catch (error) {
    console.error(`❌ API request failed for ${url}:`, error)
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
