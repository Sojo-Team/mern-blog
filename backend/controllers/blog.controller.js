import { uploadImage } from '../helpers/cloudinary.js'
import { BadRequestError } from '../helpers/error-handler.js'
import { BlogModel } from '../models/blog.model.js'

export const createBlog = async (req, res) => {
  const { title, content, tags } = req.body

  if (!req.file) {
    throw new BadRequestError('Cover image is required')
  }

  const result = await uploadImage(req.file)
  if (!result.public_id) {
    throw new BadRequestError('Error while uploading image')
  }

  const blog = new BlogModel({
    title,
    content,
    tags,
    author: req.user.id,
    coverImage: {
      publicId: result.public_id,
      url: result.secure_url,
    },
  })

  await blog.save()

  return res.status(200).json({
    message: 'Blog created successfully',
    blog,
  })
}
