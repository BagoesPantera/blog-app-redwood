import { useEffect, useState } from 'react'

import { TrixEditor } from 'react-trix'
import slugify from 'slugify'

import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata, useMutation, useQuery } from '@redwoodjs/web'
import 'trix/dist/trix.css'
import 'trix/dist/trix.esm'
import 'trix/dist/trix.umd'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const CREATE_BLOG_MUTATION = gql`
  mutation CreateBlogMutation($input: CreateBlogInput!) {
    createBlog(input: $input) {
      id
      userId
      title
      slug
      htmlContent
      textContent
      image
    }
  }
`

const UPDATE_BLOG_MUTATION = gql`
  mutation UpdateBlogMutation($id: Int!, $input: UpdateBlogInput!) {
    updateBlog(id: $id, input: $input) {
      id
      userId
      title
      slug
      htmlContent
      textContent
      image
    }
  }
`

const GET_BLOG_QUERY = gql`
  query GetBlogQuery($id: Int!) {
    blog(id: $id) {
      id
      userId
      title
      slug
      htmlContent
      textContent
      image
    }
  }
`

const ManageBlogPage = () => {
  const { id } = useParams()
  const isEditMode = !!id
  const [htmlContent, setHtmlContent] = useState('')
  const [textContent, setTextContent] = useState('')

  const { currentUser } = useAuth()

  const { data, loading } = useQuery(GET_BLOG_QUERY, {
    variables: { id: parseInt(id) },
    skip: !isEditMode,
  })

  useEffect(() => {
    if (data && data.blog) {
      setHtmlContent(data.blog.htmlContent)
      setTextContent(data.blog.textContent)
    }
  }, [data])

  function handleEditorReady(editor) {
    editor.insertString(htmlContent)
  }
  function handleChange(html, text) {
    setHtmlContent(html)
    setTextContent(text)
  }
  const mergeTags = []

  const [createBlog, { loading: creating, error: createError }] = useMutation(
    CREATE_BLOG_MUTATION,
    {
      onCompleted: () => {
        toast.success('Berhasil menambah data')
        navigate(routes.home())
      },
    }
  )

  const [updateBlog, { loading: updating, error: updateError }] = useMutation(
    UPDATE_BLOG_MUTATION,
    {
      onCompleted: () => {
        toast.success('Berhasil memperbarui data')
        navigate(routes.home())
      },
    }
  )

  const onSubmit = async (data) => {
    data.htmlContent = htmlContent
    data.textContent = textContent
    data.slug = `${slugify(data.title)}-${Math.random().toString(36).slice(-5)}`
    data.userId = currentUser.id
    data.image = 'empty'

    if (isEditMode) {
      await updateBlog({ variables: { id: parseInt(id), input: data } })
    } else {
      await createBlog({ variables: { input: data } })
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      <Metadata title="ManageBlog" description="ManageBlog page" />

      <h1 className="font-bold text-2xl">
        {isEditMode ? 'Edit Blog' : 'Create Blog'}
      </h1>
      <Form className="rw-form-wrapper" onSubmit={onSubmit}>
        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          defaultValue={data?.blog?.title}
        />
        <FieldError name="title" className="rw-field-error" />

        <Label
          name="content"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Content
        </Label>
        <TrixEditor
          onChange={handleChange}
          onEditorReady={handleEditorReady}
          mergeTags={mergeTags}
          value={htmlContent}
        />
        <Submit className="rw-button rw-button-blue mt-2">
          {isEditMode ? 'Update' : 'Save'}
        </Submit>
      </Form>
      {(createError || updateError) && (
        <div className="mt-5 text-red-500">
          Error: {createError?.message || updateError?.message}
        </div>
      )}
    </>
  )
}

export default ManageBlogPage
