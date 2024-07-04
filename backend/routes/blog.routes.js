import express from 'express'
import { isAdmin, isLoggedIn } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.js'
import { createBlog } from '../controllers/blog.controller.js'

const router = express.Router()

router.post('/', isLoggedIn, isAdmin, upload.single('file'), createBlog)

export default router
