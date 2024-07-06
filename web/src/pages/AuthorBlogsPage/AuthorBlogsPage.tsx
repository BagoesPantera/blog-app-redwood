import { Button } from '@mui/material'

import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import AuthorsBlogsCell from 'src/components/AuthorsBlogsCell'

const AuthorBlogsPage = () => {
  return (
    <>
      <Metadata title="AuthorBlogs" description="AuthorBlogs page" />

      <div className="flex justify-between w-full">
        <h1>AuthorBlogsPage</h1>
        <Button
          onClick={() => {
            navigate(routes.createBlog())
          }}
        >
          Create
        </Button>
      </div>
      <AuthorsBlogsCell></AuthorsBlogsCell>
    </>
  )
}

export default AuthorBlogsPage
