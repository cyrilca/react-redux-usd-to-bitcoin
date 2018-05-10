import React from 'react'
import { mount, render, shallow } from 'enzyme'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import AccountInfo from './../src/components/AccountInfo'

import {
  fetchApiData,
  addTransaction,
  resetTransactions
} from './../src/actions'

import { ADD_TRANSACTION } from './../src/constants'

import { initialState, usdBalanceSelector } from './../src/reducers/account'

const mockStore = configureStore()

describe('AccountInfo', () => {

  let AccountInfoComponent, store
  const props = { btc: 1, usd: 9100 }
  const extraTranscation = {
    usd: 50,
    btc: 0.000543
  }

  beforeEach(() => {
    // Add some transactions
    const modifiedInitialStore = Object.assign(
      {},
      initialState,
      { transactions: [ extraTranscation, ...initialState.transactions ] }
    )
    store = mockStore(modifiedInitialStore)
    AccountInfoComponent = shallow(
      <AccountInfo {...props} />
    )
  })

  it('should have BTC value', () => {
    const btc = AccountInfoComponent.find('.currency__btc')
    expect(btc.text()).toBe('1')
  })

  it('should have USD value', () => {
    const usd = AccountInfoComponent.find('.currency__usd')
    expect(usd.text()).toBe('9100')
  })

  it('should add transaction', () => {
    const transaction = {
      usd: 10,
      btc: 0.000543
    }

    // Add transaction to the store
    store.dispatch(addTransaction(transaction))

    const actions = store.getActions()
    const expectedPayload = { type: ADD_TRANSACTION, value: transaction }

    expect(actions).toEqual([ expectedPayload ])
  })

  it('should calculate new USD balance (test selector)', () => {
    const state = { account: store.getState() }
    const newBalance = usdBalanceSelector(state)
    expect(newBalance).toEqual(106.12)
  })

})