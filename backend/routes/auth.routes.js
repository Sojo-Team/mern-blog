import express from 'express'
import {
  forgotPassword,
  loginUser,
  registerUser,
  resendEmailVerificationToken,
  resetPassword,
  verifyEmail,
} from '../controllers/auth.controller.js'
import {
  loginUserValidator,
  registerUserValidator,
} from '../validations/auth.validator.js'
import { isAdmin, isLoggedIn } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerUserValidator, registerUser)
router.post('/login', loginUserValidator, loginUser)
router.put('/forgot-password', forgotPassword)
router.put('/resend-email', resendEmailVerificationToken)
router.put('/verify-email/:token', verifyEmail)
router.put('/reset-password/:token', resetPassword)

router.get('/test', isLoggedIn, isAdmin, (req, res) => {
  res.json({ message: 'test' })
})

export default router
