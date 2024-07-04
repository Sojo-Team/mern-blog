import { deleteImage, uploadImage } from '../helpers/cloudinary.js'
import { BadRequestError, UnauthorizedError } from '../helpers/error-handler.js'
import { BlogModel } from '../models/blog.model.js'
import { findBlogById } from '../services/blog.service.js'

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

  return res.status(201).json({
    message: 'Blog created successfully',
    blog,
  })
}

export const updateBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body
    const blog = await findBlogById(req.params.id)

    if (blog.author.toString() !== req.user.id) {
      throw new UnauthorizedError(
        'Unauthorized. Only the author can update the blog'
      )
    }

    let imageResult

    if (req.file) {
      await deleteImage(blog.coverImage.publicId)

      imageResult = await uploadImage(req.file)
      if (!imageResult.public_id) {
        throw new BadRequestError('Error while uploading image')
      }
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blog._id,
      {
        $set: {
          title,
          content,
          tags,
          ...(imageResult && {
            coverImage: {
              publicId: imageResult.public_id,
              url: imageResult.secure_url,
            },
          }),
        },
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Blog updated successfully',
      blog: updatedBlog,
    })
  } catch (error) {
    console.log(error)
    throw new BadRequestError('Error updating blog')
  }
}

export const deleteBlog = async (req, res) => {
  const blog = await findBlogById(req.params.id)

  if (blog.author.toString() !== req.user.id) {
    throw new UnauthorizedError(
      'Unauthorized. Only the author can delete the blog'
    )
  }

  await deleteImage(blog.coverImage.publicId)
  await BlogModel.findByIdAndDelete(blog._id)

  return res.status(200).json({
    message: 'Blog deleted successfully',
  })
}

export const fetchSingleBlog = async (req, res) => {
  try {
    const blog = await findBlogById(req.params.id)

    await blog.populate('author', 'email profilePicture firstName lastName')

    return res.status(200).json({
      message: 'Blog fetched successfully',
      blog,
    })
  } catch (error) {
    console.log(error)
    throw new BadRequestError('Error fetching blog')
  }
}
