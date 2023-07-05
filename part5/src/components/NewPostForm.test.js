import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import NewPostForm from './NewPostForm'

test('<NewPostForm /> calls event handler it received as props with the right details ', async () => {
  const createPost = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<NewPostForm createPost={createPost} />)
  const inputTitle = container.querySelector('#title')
  const authorTitle = container.querySelector('#author')
  const urlTitle = container.querySelector('#url')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'New blog post')
  await user.type(authorTitle, 'Jon Doe')
  await user.type(urlTitle, 'www.fcc.com')
  await user.click(sendButton)

  let arr = createPost.mock.calls
  expect(createPost.mock.calls).toHaveLength(1)
  expect(arr[0][0]).toBe('New blog post')
})
