import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'
import { createStore } from 'redux'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('multiple manipulations work', () => {
    const goodAction = {
      type: 'GOOD'
    }
    const badAction = {
      type: 'BAD'
    }
    const okAction = {
      type: 'OK'
    }
    const zeroAction = {
      type: 'ZERO'
    }
    const state = initialState

    let newState = deepFreeze(state)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, zeroAction)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, goodAction)
    newState = counterReducer(newState, badAction)
    newState = counterReducer(newState, badAction)
    newState = counterReducer(newState, badAction)
    newState = counterReducer(newState, badAction)
    newState = counterReducer(newState, okAction)
    newState = counterReducer(newState, okAction)
    expect(newState).toEqual({
      good: 5,
      ok: 2,
      bad: 4
    })
  })

  test('resetting works', () => {
    const action = {
      type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('createStore and getState work', () => {
    const store = createStore(counterReducer)

    expect(store.getState()).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('dispatch works', () => {
    const store = createStore(counterReducer)

    store.dispatch({type: 'GOOD'})
    store.dispatch({type: 'OK'})

    expect(store.getState()).toEqual({
      good: 1,
      ok: 1,
      bad: 0
    })
  })

  test('subscribe works', () => {
    const store = createStore(counterReducer)

    let subscription = 'a'

    store.subscribe(() => {
      subscription = subscription.concat('a')
    })

    store.dispatch({type: 'GOOD'})
    store.dispatch({type: 'OK'})
    store.dispatch({type: 'ZERO'})
    store.dispatch({type: 'BAD'})

    expect(store.getState()).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
    expect(subscription).toBe('aaaaa')
  })
})