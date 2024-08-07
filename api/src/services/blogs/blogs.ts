import type {
  QueryResolvers,
  MutationResolvers,
  BlogRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const blogs: QueryResolvers['blogs'] = () => {
  return db.blog.findMany()
}

export const blog: QueryResolvers['blog'] = ({ id }) => {
  return db.blog.findUnique({
    where: { id },
  })
}

export const authorsBlogs: QueryResolvers['authorsBlogs'] = (
  _obj,
  { context }
) => {
  const userId = context.currentUser.id
  return db.blog.findMany({
    where: { userId },
  })
}

export const createBlog: MutationResolvers['createBlog'] = ({ input }) => {
  return db.blog.create({
    data: input,
  })
}

export const updateBlog: MutationResolvers['updateBlog'] = ({ id, input }) => {
  return db.blog.update({
    data: input,
    where: { id },
  })
}

export const deleteBlog: MutationResolvers['deleteBlog'] = ({ id }) => {
  return db.blog.delete({
    where: { id },
  })
}

export const Blog: BlogRelationResolvers = {
  user: (_obj, { root }) => {
    return db.blog.findUnique({ where: { id: root?.id } }).user()
  },
}
