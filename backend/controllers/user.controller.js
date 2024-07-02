import jwt from 'jsonwebtoken'

import { BadRequestError } from '../helpers/error-handler.js'
import { UserModel } from '../models/user.model.js'
import { findUser } from '../services/user.service.js'
import { sendMail } from '../utils/sendMail.js'
import {
  addExpiryHours,
  generateRandomAvatar,
  generateRandomToken,
} from '../utils/util.js'

export const registerUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  const existingUser = await UserModel.findOne({ email })
  if (existingUser) {
    throw new BadRequestError('User already registered')
  }

  const profilePicture = generateRandomAvatar()
  const emailVerificationToken = await generateRandomToken()
  const emailVerificationExpires = addExpiryHours()

  const user = await UserModel.create({
    email,
    password,
    firstName,
    lastName,
    profilePicture,
    emailVerificationToken,
    emailVerificationExpires,
  })

  const mailOptions = {
    from: 'admin@blog.com',
    to: user.email,
    subject: 'Email Verification',
    template: 'emailVerify',
    context: {
      fullName: user.fullName,
      url: `${process.env.CLIENT_URL}/verify-email/${user.emailVerificationToken}`,
    },
  }

  await sendMail(mailOptions)

  return res.status(201).json({
    message: 'User registration successful',
    user,
  })
}

export const verifyEmail = async (req, res) => {
  const { token } = req.params

  const user = await findUser({ emailVerificationToken: token })

  const currentDate = new Date()
  if (currentDate.toISOString() > user.emailVerificationExpires.toISOString()) {
    throw new BadRequestError('Email verification token expired')
  }

  user.emailVerified = true
  user.emailVerificationToken = ''
  user.emailVerificationExpires = null

  await user.save()

  return res.status(200).json({
    message: 'Email verification successful',
  })
}

// resend email verification token
/*
 * @body {email}
 * check if user exists in database
 * if email is already veiried send message to user that email is already verified
 * generate new token and expiry date
 * update user record with new token and expiry date in database
 * send email with new token
 */

// send password reset token
/*
 * @body {email}
 * check if user exists in database
 * if email is already veiried send message to user that email is already verified
 * generate new token and expiry date
 * update user record with new token and expiry date in database
 * send email with new token
 */

// reset password

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await findUser({ email })

  const matchedPassword = await user.comparePassword(password)
  if (!matchedPassword) {
    throw new BadRequestError('Invalid email or password')
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
  return res.status(200).json({
    user,
    accessToken: token,
  })
}
