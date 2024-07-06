import { gql } from '@apollo/client'
import { Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import type { BlogsQuery, BlogsQueryVariables } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

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
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title' },
    { field: 'createdAt', headerName: 'CreatedAt' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                navigate(routes.editBlog({ id: params.row.id }))
              }}
              variant="contained"
            >
              update
            </Button>

            <Button
              onClick={() => {
                console.log(params.row)
              }}
              variant="contained"
            >
              Delete
            </Button>
          </>
        )
      },
    },
  ]
  return (
    <>
      <div className="">
        <DataGrid
          rows={authorsBlogs}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </>
  )
}
