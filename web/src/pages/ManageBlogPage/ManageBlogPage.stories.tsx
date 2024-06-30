import type { Meta, StoryObj } from '@storybook/react'

import ManageBlogPage from './ManageBlogPage'

const meta: Meta<typeof ManageBlogPage> = {
  component: ManageBlogPage,
}

export default meta

type Story = StoryObj<typeof ManageBlogPage>

export const Primary: Story = {}
