import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'test blog post',
    author: 'Jon Doe',
    url: 'www.fcc.com',
    likes: 3,
    user: {
      id: '648b36c04cca5f6ffbe54aab',
      name: 'Jose Madero',
      username: 'pepito',
    },
  }

  const loggedUser = {
    name: 'Jose Madero',
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} loggedUser={loggedUser} updateLikes={mockHandler} />
    ).container
  })

  test('display the blog title and author', () => {
    const firstDiv = container.querySelector('.firstRender')
    const completePost = container.querySelector('.completePost')

    expect(firstDiv).not.toHaveStyle('display: none')
    expect(completePost).toHaveStyle('display: none')
    expect(firstDiv).toHaveTextContent('test blog post | Jon Doe')
  })

  test('The blog URL and number of likes are show', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('view')

    await user.click(button)

    const firstDiv = container.querySelector('.firstRender')
    const completePost = container.querySelector('.completePost')

    expect(firstDiv).toHaveStyle('display: none')
    expect(completePost).not.toHaveStyle('display: none')
    expect(completePost).toHaveTextContent('www.fcc.com 3')
  })

  test('like button is called twice', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('like')

    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
