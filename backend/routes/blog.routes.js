import express from 'express'
import { isAdmin, isLoggedIn } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.js'
import {
  createBlog,
  createComment,
  deleteBlog,
  fetchBlogs,
  fetchSingleBlog,
  likeBlog,
  updateBlog,
} from '../controllers/blog.controller.js'

const router = express.Router()

router.get('/', fetchBlogs)
router.post('/', isLoggedIn, isAdmin, upload.single('file'), createBlog)
router.get('/:id', fetchSingleBlog)
router.put('/:id', isLoggedIn, isAdmin, upload.single('file'), updateBlog)
router.delete('/:id', isLoggedIn, isAdmin, deleteBlog)

router.put('/like/:id', isLoggedIn, likeBlog)
router.put('/comment/:id', isLoggedIn, createComment)

export default router
