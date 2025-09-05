const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: function() {
      return !this.google && !this.github && !this.twitter;
    },
    minlength: [6, 'Password must be at least 6 characters long']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    trim: true
  },
  profilePic: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'premium'],
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  passwordResetToken: {
    type: String,
    default: null
  },
  passwordResetExpires: {
    type: Date,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // OAuth providers
  google: {
    id: {
      type: String,
      default: null
    },
    email: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    picture: {
      type: String,
      default: null
    }
  },
  github: {
    id: {
      type: String,
      default: null
    },
    username: {
      type: String,
      default: null
    },
    email: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    avatar_url: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: null
    },
    public_repos: {
      type: Number,
      default: 0
    },
    followers: {
      type: Number,
      default: 0
    },
    following: {
      type: Number,
      default: 0
    }
  },
  twitter: {
    id: {
      type: String,
      default: null
    },
    username: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    email: {
      type: String,
      default: null
    },
    profile_image_url: {
      type: String,
      default: null
    },
    followers_count: {
      type: Number,
      default: 0
    },
    following_count: {
      type: Number,
      default: 0
    },
    tweet_count: {
      type: Number,
      default: 0
    }
  },
  // Resume management
  resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }],
  // User preferences
  preferences: {
    theme: {
      type: String,
      default: 'lightMaroon'
    },
    fontFamily: {
      type: String,
      default: 'Roboto, Arial, sans-serif'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: false
      },
      marketing: {
        type: Boolean,
        default: false
      }
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'private', 'friends'],
        default: 'private'
      },
      showEmail: {
        type: Boolean,
        default: false
      },
      showSocialLinks: {
        type: Boolean,
        default: true
      }
    }
  },
  // Subscription and billing
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium', 'pro'],
      default: 'free'
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  // Activity tracking
  activity: {
    totalResumesCreated: {
      type: Number,
      default: 0
    },
    totalDownloads: {
      type: Number,
      default: 0
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance (excluding email and username because unique is inline)
userSchema.index({ 'google.id': 1 });
userSchema.index({ 'github.id': 1 });
userSchema.index({ 'twitter.id': 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  if (this.google && this.google.name) return this.google.name;
  if (this.github && this.github.name) return this.github.name;
  if (this.twitter && this.twitter.name) return this.twitter.name;
  return this.username;
});

// Virtual for profile picture URL
userSchema.virtual('profilePicture').get(function() {
  if (this.profilePic) return this.profilePic;
  if (this.google && this.google.picture) return this.google.picture;
  if (this.github && this.github.avatar_url) return this.github.avatar_url;
  if (this.twitter && this.twitter.profile_image_url) return this.twitter.profile_image_url;
  return null;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

// Static method to find user by email or username
userSchema.statics.findByEmailOrUsername = function(identifier) {
  return this.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { username: identifier }
    ]
  });
};

// Update last activity
userSchema.methods.updateLastActivity = function() {
  this.lastLogin = new Date();
  this.loginCount += 1;
  this.activity.lastActivity = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
