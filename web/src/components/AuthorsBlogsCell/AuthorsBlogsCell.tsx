import { gql } from '@apollo/client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import type {
  BlogsQuery,
  BlogsQueryVariables,
  DeleteBlogMutation,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
  useMutation,
} from '@redwoodjs/web'

const DELETE_BLOG_MUTATION = gql`
  mutation DeleteBlogMutation($id: Int!) {
    deleteBlog(id: $id) {
      id
    }
  }
`

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
  const [open, setOpen] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState(null)

  const [deleteBlog, { loading, error }] = useMutation<DeleteBlogMutation>(
    DELETE_BLOG_MUTATION,
    {
      onCompleted: () => {
        setOpen(false)
        navigate(routes.authorBlogs())
      },
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const handleClickOpen = (id) => {
    setSelectedId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedId(null)
  }

  const handleDelete = () => {
    deleteBlog({ variables: { id: selectedId } })
  }

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
              Update
            </Button>

            <Button
              onClick={() => handleClickOpen(params.row.id)}
              variant="contained"
              color="secondary"
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
