import { Link } from 'react-router-dom'
import Logo from './Logo'
import Button from '../forms/Button'
import { useSelector } from 'react-redux'

const Header = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <div className='fixed top-0 left-0 w-full flex items-center h-[70px] bg-black/10'>
      <div className='w-[80%] flex mx-auto items-center justify-between'>
        <div className=''>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        {user ? (
          <>
            <Button className='px-6 rounded-full'>Logout</Button>
          </>
        ) : (
          <div className='flex items-center gap-x-5'>
            <Link to='/login'>
              <Button className='px-8 rounded-full bg-gray-100 !text-black hover:bg-white hover:text-black'>
                Login
              </Button>
            </Link>
            <Link to='/register'>
              <Button className='px-6 rounded-full'>Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
export default Header
