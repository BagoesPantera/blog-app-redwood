import type { Meta, StoryObj } from '@storybook/react'

import UserLayout from './UserLayout'

const meta: Meta<typeof UserLayout> = {
  component: UserLayout,
}

export default meta

type Story = StoryObj<typeof UserLayout>

export const Primary: Story = {}
