import { TrixEditor } from 'react-trix'

import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import 'trix/dist/trix.css'
import 'trix/dist/trix.esm'
import 'trix/dist/trix.umd'
import { toast } from '@redwoodjs/web/toast'

import { useState } from 'react'

import slugify from 'slugify'

import { useAuth } from 'src/auth'
import { getCurrentUser } from 'src/lib/auth'

const CREATE_BLOG_MUTATION = gql`
  mutation CreateBlogMutation($input: CreateBlogInput!) {
    createBlog(input: $input) {
      id
      userId
      title
      slug
      content
      image
    }
  }
`

const ManageBlogPage = () => {
  const [content, setContent] = useState('')

  const { currentUser } = useAuth()

  function handleEditorReady(editor) {
    // this is a reference back to the editor if you want to
    // do editing programatically
    editor.insertString('')
  }
  function handleChange(html, text) {
    // html is the new html content
    // text is the new text content
    setContent(html)
  }
  const mergeTags = []

  const [createBlog, { loading: creating, error: createError }] = useMutation(
    CREATE_BLOG_MUTATION,
    {
      onCompleted: () => {
        toast.success('Success')
      },
    }
  )

  const onSubmit = async (data) => {
    data.content = content
    // https://stackoverflow.com/a/33146982/13079820
    data.slug = `${slugify(data.title)}-${Math.random().toString(36).slice(-5)}`
    data.userId = currentUser.id
    data.image = 'empty'
    console.log(data)
    await createBlog({ variables: { input: data } })
  }
  return (
    <>
      <Metadata title="ManageBlog" description="ManageBlog page" />

      <h1 className="font-bold text-2xl">Create Blog</h1>
      <Form className="rw-form-wrapper" onSubmit={onSubmit}>
        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-lavel-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="title" className="rw-field-error" />

        <Label
          name="content"
          className="rw-label"
          errorClassName="rw-label rw-lavel-error"
        >
          Content
        </Label>
        <TrixEditor
          onChange={handleChange}
          onEditorReady={handleEditorReady}
          mergeTags={mergeTags}
        />
        <Submit className="rw-button rw-button-blue mt-2">Save</Submit>
      </Form>
      {createError && (
        <div className="mt-5 text-red-500">Error: {createError?.message}</div>
      )}
    </>
  )
}

export default ManageBlogPage
