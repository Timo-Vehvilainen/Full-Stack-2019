import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog content', () => {

  let component

  beforeEach(() => {
    const blog = {
      title: 'Title to be tested',
      author: 'Testee',
      url:'http://www.testableurl.com',
      likes: 11,
      user: 'KSDJSDIAOASF89UHOI'
    }

    const mockLikehandler = jest.fn()
    const mockDeletehandler = jest.fn()

    component = render(
      <Blog
        blog={blog} 
        handleLikeButton={mockLikehandler}
        handleDeleteButton={mockDeletehandler}
        currentUserID={blog.user}
      />
    )
  })

  test('Renders only the title and author initially', () => {

    expect(component.container).toHaveTextContent(
      'Title to be tested'
    )
    expect(component.container).toHaveTextContent(
      'Testee'
    )
    expect(component.container).not.toHaveTextContent(
      'http://www.testableurl.com'
    )
    expect(component.container).not.toHaveTextContent(
      '11 likes'
    )
  })

  test('Clicking the title reveals url and likes', () => {

    const titleText = component.getByText('Title to be tested')
    fireEvent.click(titleText)

    expect(component.container).toHaveTextContent(
      'http://www.testableurl.com'
    )
    expect(component.container).toHaveTextContent(
      '11 likes'
    )
  })
})