import { render } from '@redwoodjs/testing/web'

import ManageBlogPage from './ManageBlogPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ManageBlogPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ManageBlogPage />)
    }).not.toThrow()
  })
})
