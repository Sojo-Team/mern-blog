import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/forms/Button'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { verifyEmailService } from '../services/auth.service'

const VerifyEmail = () => {
  const params = useParams()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ['veriy-email', params.token],
    mutationFn: verifyEmailService,
    onSuccess: () => {
      toast.success('Email verified')
      navigate('/login')
    },
    onError: error => {
      toast.error(error)
    },
  })

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='p-4 w-[500px] bg-neutral-200 rounded-md'>
        <h1 className='text-xl font-medium text-center'>
          Please verify your account
        </h1>

        <Button
          onClick={() => mutation.mutate(params.token)}
          className='w-full mt-10'>
          Verify Email
        </Button>
      </div>
    </div>
  )
}
export default VerifyEmail
