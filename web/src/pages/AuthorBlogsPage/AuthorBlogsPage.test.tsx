import { render } from '@redwoodjs/testing/web'

import AuthorBlogsPage from './AuthorBlogsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AuthorBlogsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthorBlogsPage />)
    }).not.toThrow()
  })
})
