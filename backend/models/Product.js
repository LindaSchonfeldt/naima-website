import mongoose from 'mongoose'

// Schema for nutrition information
const nutritionSchema = new mongoose.Schema(
  {
    energy: {
      type: String,
      required: false
    },
    fat: {
      type: String,
      required: false
    },
    saturatedFat: {
      type: String,
      required: false
    },
    carbohydrates: {
      type: String,
      required: false
    },
    sugars: {
      type: String,
      required: false
    },
    fiber: {
      type: String,
      required: false
    },
    protein: {
      type: String,
      required: false
    },
    salt: {
      type: String,
      required: false
    }
  },
  { _id: false }
) // Don't create separate IDs for subdocuments

// Schema for product images
const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
)

// Schema for product sizes/packaging
const sizeSchema = new mongoose.Schema(
  {
    weight: {
      type: String,
      required: true
    },
    packaging: {
      type: String,
      required: true
    }
  },
  { _id: false }
)

// Main Product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
      max: [10000, 'Price cannot exceed 10000']
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: {
        values: ['bites', 'cheezecakes', 'limited'],
        message: 'Category must be one of: bites, cheezecakes, limited'
      }
    },
    images: {
      type: [imageSchema],
      validate: {
        validator: function (images) {
          return images && images.length > 0
        },
        message: 'At least one image is required'
      }
    },
    ingredients: {
      type: [String],
      required: [true, 'Ingredients list is required'],
      validate: {
        validator: function (ingredients) {
          return ingredients && ingredients.length > 0
        },
        message: 'At least one ingredient is required'
      }
    },
    allergens: {
      type: [String],
      default: []
    },
    nutrition: {
      per34g: nutritionSchema,
      per30g: nutritionSchema,
      per55g: nutritionSchema
    },
    sizes: {
      type: [sizeSchema],
      required: [true, 'Size information is required'],
      validate: {
        validator: function (sizes) {
          return sizes && sizes.length > 0
        },
        message: 'At least one size option is required'
      }
    },
    keywords: {
      type: [String],
      default: []
    },
    featured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'limited', 'discontinued'],
        message: 'Status must be one of: active, limited, discontinued'
      },
      default: 'active'
    },
    // SEO and search optimization
    slug: {
      type: String,
      unique: true,
      sparse: true // Allow null values but ensure uniqueness when present
    },
    // Inventory tracking (for future use)
    stock: {
      type: Number,
      min: 0,
      default: 0
    },
    // Ratings (for future use)
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    ratingCount: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Indexes for better query performance
productSchema.index({ category: 1, status: 1 })
productSchema.index({ featured: 1, status: 1 })
productSchema.index({ keywords: 1 })
productSchema.index({ name: 'text', description: 'text' }) // Text search

// Virtual for getting primary image
productSchema.virtual('primaryImage').get(function () {
  const primary = this.images?.find((img) => img.isPrimary)
  return primary || this.images?.[0] || null
})

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function () {
  return `$${this.price.toFixed(2)}`
})

// Virtual for checking if product is available
productSchema.virtual('isAvailable').get(function () {
  return this.status === 'active' && this.stock > 0
})

// Pre-save middleware to generate slug
productSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }
  next()
})

// Static methods for common queries
productSchema.statics.findByCategory = function (category, status = 'active') {
  return this.find({ category, status }).sort({ createdAt: -1 })
}

productSchema.statics.findFeatured = function (status = 'active') {
  return this.find({ featured: true, status }).sort({ createdAt: -1 })
}

productSchema.statics.searchProducts = function (query, status = 'active') {
  return this.find(
    {
      $text: { $search: query },
      status
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } })
}

// Instance methods
productSchema.methods.addRating = function (rating) {
  const totalRating = this.averageRating * this.ratingCount + rating
  this.ratingCount += 1
  this.averageRating = totalRating / this.ratingCount
  return this.save()
}

productSchema.methods.updateStock = function (quantity) {
  this.stock = Math.max(0, this.stock + quantity)
  return this.save()
}

// Export the model
export default mongoose.model('Product', productSchema)
