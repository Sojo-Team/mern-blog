import express from 'express'
import {
  loginUser,
  registerUser,
  verifyEmail,
} from '../controllers/user.controller.js'
import {
  loginUserValidator,
  registerUserValidator,
} from '../validations/auth.validator.js'
import { isAdmin, isLoggedIn } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerUserValidator, registerUser)
router.post('/login', loginUserValidator, loginUser)
router.put('/verify-email/:token', verifyEmail)

router.get('/test', isLoggedIn, isAdmin, (req, res) => {
  res.json({ message: 'test' })
})

export default router
