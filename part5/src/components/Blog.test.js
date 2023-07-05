import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('display the blog title and author', () => {
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

  const { container } = render(<Blog blog={blog} loggedUser={loggedUser} />)

  const firstDiv = container.querySelector('.firstRender')
  const completePost = container.querySelector('.completePost')

  expect(firstDiv).not.toHaveStyle('display: none')
  expect(completePost).toHaveStyle('display: none')
  expect(firstDiv).toHaveTextContent('test blog post | Jon Doe')
})

test('The blog URL and number of likes are show', async () => {
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

  // const mockHandler = jest.fn()

  // render(<Blog blog={blog} loggedUser={loggedUser} />)

  const { container } = render(<Blog blog={blog} loggedUser={loggedUser} />)
  const user = userEvent.setup()

  const button = screen.getByText('view')

  const click = await user.click(button)
  console.log(click)

  const firstDiv = container.querySelector('.firstRender')
  const completePost = container.querySelector('.completePost')

  expect(firstDiv).toHaveStyle('display: none')
  expect(completePost).not.toHaveStyle('display: none')
  expect(completePost).toHaveTextContent('www.fcc.com 3')
})
