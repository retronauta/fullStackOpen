import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog renders', () => {
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
