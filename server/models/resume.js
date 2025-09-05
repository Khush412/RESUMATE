const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  type: { type: String, enum: ['text', 'image', 'signature'], required: true },
  content: mongoose.Schema.Types.Mixed, // e.g., text HTML, image URL, or signature data
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  size: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  style: {
    fontFamily: String,
    fontSize: Number,
    fontWeight: String,
    color: String,
    alignment: String,
    // Add any other rich-text or styling info you need
  },
  layerIndex: { type: Number, default: 0 }
});

const pageSchema = new mongoose.Schema({
  blocks: [blockSchema],
  backgroundPattern: { type: String, default: null } // URL or pattern identifier
});

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner reference
  title: { type: String, required: true, trim: true },
  template: { type: String, required: true },
  pages: [pageSchema],
  isPublic: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
