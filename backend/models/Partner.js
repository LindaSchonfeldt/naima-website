import mongoose from 'mongoose'

// Schema for partner contact information
const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  { _id: false }
)

// Schema for partner logo
const logoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      required: true
    }
  },
  { _id: false }
)

// Main Partner schema
const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Partner name is required'],
      trim: true,
      maxlength: [100, 'Partner name cannot exceed 100 characters']
    },
    type: {
      type: String,
      required: [true, 'Partner type is required'],
      enum: {
        values: ['served_at', 'catering_partner'],
        message: 'Type must be either served_at or catering_partner'
      }
    },
    logo: {
      type: logoSchema,
      default: () => ({ url: null, alt: '' })
    },
    website: {
      type: String,
      trim: true,
      validate: {
        validator: function (url) {
          if (!url) return true // Allow empty URLs
          return /^https?:\/\/.+/.test(url)
        },
        message: 'Website must be a valid URL starting with http:// or https://'
      }
    },
    contact: {
      type: contactSchema,
      default: () => ({})
    },
    isActive: {
      type: Boolean,
      default: true
    },
    // Additional fields for future use
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    location: {
      type: String,
      maxlength: [200, 'Location cannot exceed 200 characters']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Indexes for better query performance
partnerSchema.index({ type: 1, isActive: 1 })
partnerSchema.index({ name: 'text' }) // Text search on name

// Virtual for partner display name with type
partnerSchema.virtual('displayInfo').get(function () {
  return `${this.name} (${this.type.replace('_', ' ')})`
})

// Static methods for common queries
partnerSchema.statics.findByType = function (type, isActive = true) {
  return this.find({ type, isActive }).sort({ name: 1 })
}

partnerSchema.statics.findServedAt = function (isActive = true) {
  return this.findByType('served_at', isActive)
}

partnerSchema.statics.findCateringPartners = function (isActive = true) {
  return this.findByType('catering_partner', isActive)
}

// Instance methods
partnerSchema.methods.activate = function () {
  this.isActive = true
  return this.save()
}

partnerSchema.methods.deactivate = function () {
  this.isActive = false
  return this.save()
}

// Pre-save middleware to set default alt text if not provided
partnerSchema.pre('save', function (next) {
  if (this.logo && !this.logo.alt) {
    this.logo.alt = this.name
  }
  next()
})

export default mongoose.model('Partner', partnerSchema)
