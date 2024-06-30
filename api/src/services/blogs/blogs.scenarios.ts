import type { Prisma, Blog } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BlogCreateArgs>({
  blog: {
    one: {
      data: {
        title: 'String',
        slug: 'String',
        content: 'String',
        image: 'String',
        updatedAt: '2024-06-30T07:37:18.637Z',
        user: {
          create: {
            email: 'String7701559',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        slug: 'String',
        content: 'String',
        image: 'String',
        updatedAt: '2024-06-30T07:37:18.637Z',
        user: {
          create: {
            email: 'String3117560',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Blog, 'blog'>
