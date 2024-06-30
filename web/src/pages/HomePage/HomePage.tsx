import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import BlogsCell from 'src/components/BlogsCell'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      
      <BlogsCell />
    </>
  )
}

export default HomePage
