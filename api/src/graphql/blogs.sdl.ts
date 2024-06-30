export const schema = gql`
  type Blog {
    id: Int!
    userId: Int!
    title: String!
    slug: String!
    content: String!
    image: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  type Query {
    blogs: [Blog!]! @requireAuth
    blog(id: Int!): Blog @requireAuth
  }

  input CreateBlogInput {
    userId: Int!
    title: String!
    slug: String!
    content: String!
    image: String!
  }

  input UpdateBlogInput {
    userId: Int
    title: String
    slug: String
    content: String
    image: String
  }

  type Mutation {
    createBlog(input: CreateBlogInput!): Blog! @requireAuth
    updateBlog(id: Int!, input: UpdateBlogInput!): Blog! @requireAuth
    deleteBlog(id: Int!): Blog! @requireAuth
  }
`
