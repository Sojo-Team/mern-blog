import { model, Schema } from 'mongoose'

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likesCount: { type: String, default: 0 },
  commentCount: { type: String, default: 0 },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export const BlogModel = model('Blog', blogSchema)
