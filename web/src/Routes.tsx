import { Router, Route, PrivateSet } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import UserLayout from 'src/layouts/UserLayout/UserLayout'
import AuthorBlogsPage from 'src/pages/AuthorBlogsPage/AuthorBlogsPage'
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage/ForgotPasswordPage'
import HomePage from 'src/pages/HomePage/HomePage'
import LoginPage from 'src/pages/LoginPage/LoginPage'
import ManageBlogPage from 'src/pages/ManageBlogPage/ManageBlogPage'
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage'
import ResetPasswordPage from 'src/pages/ResetPasswordPage/ResetPasswordPage'
import SignupPage from 'src/pages/SignupPage/SignupPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/login" page={LoginPage} name="login" />

      <PrivateSet wrap={UserLayout} unauthenticated="login">
        <Route path="/" page={HomePage} name="home" />
        <Route path="/my-blogs" page={AuthorBlogsPage} name="authorBlogs" />
        <Route path="/blog/create" page={ManageBlogPage} name="createBlog" />
        <Route path="/blog/edit/{id:Int}" page={ManageBlogPage} name="editBlog" />
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
