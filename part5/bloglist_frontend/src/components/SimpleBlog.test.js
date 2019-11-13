import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Title to be tested',
    author: 'Testee',
    url:'http://www.testableurl.com',
    likes: 11,
    user: 'KSDJSDIAOASF89UHOI'
  }

  const component = render(
    <SimpleBlog
      blog={blog} 
      onClick = {() => {}}
    />
  )

  expect(component.container).toHaveTextContent(
    'Title to be tested'
  )
  expect(component.container).toHaveTextContent(
    'Testee'
  )
  expect(component.container).toHaveTextContent('11')
})

test('clicking the button twice calls event handler twice', () => {
  const blog = {
    title: 'Title to be tested',
    author: 'Testee',
    url:'http://www.testableurl.com',
    likes: 11,
    user: 'KSDJSDIAOASF89UHOI'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})