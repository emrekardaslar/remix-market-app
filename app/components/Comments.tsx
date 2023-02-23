import { useFetcher } from '@remix-run/react'
import { Input, List, Form, Button, Comment, Avatar, Pagination, Modal, notification } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const { TextArea } = Input

interface CommentItem {
  author: string
  avatar: string
  content: React.ReactNode
  datetime: string
}

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: () => void
  submitting: boolean
  value: string
  user: any
  setComments: () => void
}

const deleteNotification = () => {
  notification.open({
    message: 'Comment Deleted',
    description: 'Your comment is successfuly deleted.',
    onClick: () => {
      console.log('Notification Clicked!')
    },
  })
}

const CommentList = ({
  comments,
  user,
  setComments,
}: {
  comments: CommentItem[]
  user: any
  setComments: any
}) => {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(5)
  const fetcher = useFetcher()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [commentToEdit, setCommentToEdit] = useState<any>(null)
  const [editContent, setEditContent] = useState('')

  const itemPerPage = 5
  const handlePagination = (value: any) => {
    setMinValue((value - 1) * itemPerPage)
    setMaxValue(value * itemPerPage)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    let edit = commentToEdit
    edit.content = editContent
    fetcher.submit({ commentToEdit: JSON.stringify(edit) }, { method: 'post' })
    setCommentToEdit(null)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setCommentToEdit(null)
  }

  async function deleteComment(id: any) {
    fetcher.submit({ commentToDelete: id }, { method: 'delete' })

    let newComments = comments.filter((comment) => comment.id !== id)
    setComments(newComments)
    deleteNotification()
  }

  async function editComment(id: any) {
    const edit = comments.filter((comment) => comment.id === id)[0]
    setCommentToEdit(edit)
    showModal()
  }

  function commentEditHandler(event: any) {
    setEditContent(event.target.value)
  }

  const actions = [
    <span
      name='edit'
      value='edit'
      key='comment-basic-reply-to'
      onClick={(c) => {
        editComment(
          c.currentTarget.parentNode?.parentNode?.parentNode?.parentNode?.parentElement?.id,
        )
      }}
    >
      Edit
    </span>,
    <span
      name='delete'
      value='delete'
      key='comment-basic-reply-to'
      onClick={(c) => {
        deleteComment(
          c.currentTarget.parentNode?.parentNode?.parentNode?.parentNode?.parentElement?.id,
        )
      }}
    >
      Delete
    </span>,
  ]

  return (
    <>
      <List
        dataSource={comments.slice(minValue, maxValue)}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout='horizontal'
        renderItem={(props) => (
          <>
            <Comment {...props} actions={props.author == user?.username ? actions : []} />
          </>
        )}
      />
      <Pagination
        defaultCurrent={1}
        total={comments.length}
        defaultPageSize={5}
        onChange={handlePagination}
      />

      <Modal title='Edit Comment' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <TextArea
          rows={4}
          defaultValue={commentToEdit && commentToEdit.content}
          onChange={commentEditHandler}
        />
      </Modal>
    </>
  )
}

const Editor = ({ onChange, onSubmit, submitting, value, user }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <form method='post'>
        <input
          type='hidden'
          name='data'
          defaultValue={JSON.stringify({ value: value, user: user })}
        />
        <Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
          Add Comment
        </Button>
      </form>
    </Form.Item>
  </>
)

function Comments({ data, user }: any) {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    setComments(data)
  }, [])

  const handleSubmit = () => {
    if (!value) return

    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments([
        {
          author: user?.username,
          avatar:
            'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
          content: <p>{value}</p>,
          datetime: moment('2016-11-22').fromNow(),
        },
        ...comments,
      ])
    }, 0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  return (
    <>
      {comments.length > 0 && (
        <CommentList comments={comments} user={user} setComments={setComments} />
      )}
      <Comment
        avatar={
          <Avatar
            src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
            alt='User avatar'
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            user={user}
            value={value}
          />
        }
      />
    </>
  )
}

export default Comments
