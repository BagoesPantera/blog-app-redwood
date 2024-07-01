import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import BlogsCell from 'src/components/BlogsCell'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <BlogsCell />
    </>
  )
}

export default HomePage
