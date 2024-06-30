// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import UserLayout from 'src/layouts/UserLayout/UserLayout'
import ForgotPasswordPage from 'src/pages/ForgotPasswordPage/ForgotPasswordPage'
import ManageBlogPage from 'src/pages/ManageBlogPage/ManageBlogPage'
import ResetPasswordPage from 'src/pages/ResetPasswordPage/ResetPasswordPage'
import SignupPage from 'src/pages/SignupPage/SignupPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/manage-blog" page={ManageBlogPage} name="manageBlog" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/login" page={LoginPage} name="login" />

      <PrivateSet wrap={UserLayout} unauthenticated="login">
        <Route path="/" page={HomePage} name="home" />
        <Route path="/blog/create" page={ManageBlogPage} name="createBlog" />
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
