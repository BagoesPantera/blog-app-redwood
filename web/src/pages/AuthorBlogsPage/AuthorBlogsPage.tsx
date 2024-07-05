import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import AuthorsBlogsCell from 'src/components/AuthorsBlogsCell'

const AuthorBlogsPage = () => {
  return (
    <>
      <Metadata title="AuthorBlogs" description="AuthorBlogs page" />

      <h1>AuthorBlogsPage</h1>
      <AuthorsBlogsCell></AuthorsBlogsCell>
    </>
  )
}

export default AuthorBlogsPage
