import type { Meta, StoryObj } from '@storybook/react'

import AuthorBlogsPage from './AuthorBlogsPage'

const meta: Meta<typeof AuthorBlogsPage> = {
  component: AuthorBlogsPage,
}

export default meta

type Story = StoryObj<typeof AuthorBlogsPage>

export const Primary: Story = {}
