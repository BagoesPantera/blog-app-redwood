import type { BlogsQuery, BlogsQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<BlogsQuery, BlogsQueryVariables> = gql`
  query BlogsQuery {
    authorsBlogs {
      id
      title
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ authorsBlogs }: CellSuccessProps<BlogsQuery>) => {
  return (
    <ul>
      {authorsBlogs.map((item) => (
        <li key={item.id}>{JSON.stringify(item)}</li>
      ))}
    </ul>
  )
}
