import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AdminLayout'
import AdminLayout from './layouts/AdminLayout'

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const NotifyEmailPage = lazy(() => import('./pages/NotifyEmail'))
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmail'))

// Admin Pages
const AdminCreateBlogPage = lazy(() => import('./pages/admin/CreateBlogPage'))
const AdminPublishBlogPage = lazy(() => import('./pages/admin/PublishBlogPage'))
// const AdminEditBlogPage = lazy(() => import('./pages/admin/EditBlogPage'))
// const AdminBlogsPage = lazy(() => import('./pages/admin/BlogsPage'))

const App = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route
            path='/register'
            element={<RegisterPage />}
          />
          <Route
            path='/notify-email'
            element={<NotifyEmailPage />}
          />
          <Route
            path='/verify-email/:token'
            element={<VerifyEmailPage />}
          />

          <Route
            path='/admin/*'
            element={<AdminLayout />}>
            <Route
              path='create'
              element={<AdminCreateBlogPage />}
            />
            <Route
              path='publish'
              element={<AdminPublishBlogPage />}
            />
          </Route>
        </Routes>
      </Suspense>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
    </>
  )
}
export default App
