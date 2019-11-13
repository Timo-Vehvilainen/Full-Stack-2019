import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitForElement } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import { prettyDOM } from '@testing-library/dom'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('If no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Log in')
    )
    //console.log(prettyDOM(component.container))
    expect(component.container).not.toHaveTextContent(
      'Blogs'
    )

    expect(component.container).not.toHaveTextContent(
      'Create new blog'
    )

    expect(component.container).not.toHaveTextContent(
      'New Blog'
    )

    expect(component.container).not.toHaveTextContent(
      'First Title'
    )
  })
  test('When logged in, the blogs are displayed', async () => {

    const user = {
      username: 'vehvilt1',
      token: '1231231214',
      name: 'Timo Vehvilainen'
    }
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    //console.log(prettyDOM(component.container))
    expect(component.container).toHaveTextContent(
      'Blogs'
    )

    expect(component.container).toHaveTextContent(
      'New Blog'
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)
  })
})