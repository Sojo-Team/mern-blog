import { model, Schema } from 'mongoose'

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  coverImage: {
    publicId: { type: String, default: '' },
    url: { type: String, default: '' },
  },
  likesCount: { type: String, default: 0 },
  commentCount: { type: String, default: 0 },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export const BlogModel = model('Blog', blogSchema)
