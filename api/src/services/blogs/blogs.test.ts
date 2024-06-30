import type { Blog } from '@prisma/client'

import { blogs, blog, createBlog, updateBlog, deleteBlog } from './blogs'
import type { StandardScenario } from './blogs.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('blogs', () => {
  scenario('returns all blogs', async (scenario: StandardScenario) => {
    const result = await blogs()

    expect(result.length).toEqual(Object.keys(scenario.blog).length)
  })

  scenario('returns a single blog', async (scenario: StandardScenario) => {
    const result = await blog({ id: scenario.blog.one.id })

    expect(result).toEqual(scenario.blog.one)
  })

  scenario('creates a blog', async (scenario: StandardScenario) => {
    const result = await createBlog({
      input: {
        userId: scenario.blog.two.userId,
        title: 'String',
        slug: 'String',
        content: 'String',
        image: 'String',
        updatedAt: '2024-06-30T07:37:18.619Z',
      },
    })

    expect(result.userId).toEqual(scenario.blog.two.userId)
    expect(result.title).toEqual('String')
    expect(result.slug).toEqual('String')
    expect(result.content).toEqual('String')
    expect(result.image).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2024-06-30T07:37:18.619Z'))
  })

  scenario('updates a blog', async (scenario: StandardScenario) => {
    const original = (await blog({ id: scenario.blog.one.id })) as Blog
    const result = await updateBlog({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a blog', async (scenario: StandardScenario) => {
    const original = (await deleteBlog({ id: scenario.blog.one.id })) as Blog
    const result = await blog({ id: original.id })

    expect(result).toEqual(null)
  })
})
