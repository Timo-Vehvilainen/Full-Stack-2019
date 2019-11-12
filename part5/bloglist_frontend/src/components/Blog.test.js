import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,  fireEvent } from '@testing-library/react'
import { prettyDom } from '@testing-library/dom'
import Blog from './Blog'

test('renders content and clicking the title works', () => {
  const blog = {
    title: 'Title to be tested',
    author: 'Testee',
    url:'http://www.testableurl.com',
    likes: 11,
    user: 'KSDJSDIAOASF89UHOI'
  }

  const mockLikehandler = jest.fn()
  const mockDeletehandler = jest.fn()

  const { container } = render(
    <Blog
      blog={blog} 
      handleLikeButton={mockLikehandler}
      handleDeleteButton={mockDeletehandler}
      currentUserID={blog.user}
    />
  )

  expect(container).toHaveTextContent(
    'Title to be tested'
  )
  expect(container).toHaveTextContent(
    'Testee'
  )
  expect(container).not.toHaveTextContent(
    'http://www.testableurl.com'
  )
  expect(container).not.toHaveTextContent(
    '11 likes'
  )
})

test('Clicking the title works', () => {
  const blog = {
    title: 'Title to be tested',
    author: 'Testee',
    url:'http://www.testableurl.com',
    likes: 11,
    user: 'KSDJSDIAOASF89UHOI'
  }

  const mockLikehandler = jest.fn()
  const mockDeletehandler = jest.fn()

  const { container, getByText } = render(
    <Blog
      blog={blog} 
      handleLikeButton={mockLikehandler}
      handleDeleteButton={mockDeletehandler}
      currentUserID={blog.user}
    />
  )

  const titleText = getByText('Title to be tested')
  fireEvent.click(titleText)

  expect(container).toHaveTextContent(
    'http://www.testableurl.com'
  )
  expect(container).toHaveTextContent(
    '11 likes'
  )
})