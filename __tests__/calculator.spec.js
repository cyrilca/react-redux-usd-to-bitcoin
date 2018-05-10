import React from 'react'
import { mount, render, shallow } from 'enzyme'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Calculator from './../src/components/Calculator'

import {
  fetchApiData,
  setBtcPrice,
  setUsdValue
} from './../src/actions'

import {
  SET_BTC_PRICE,
  SET_USD_VALUE
} from './../src/constants'

import { initialState } from './../src/reducers/calculator'

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

describe('Calculator', () => {

  let CalculatorComponent, store

  beforeEach(() => {
    // Update bitcoin price transactions
    const modifiedInitialStore = Object.assign(
      {},
      initialState,
      {
        btcPrice: 9100,
        usdValue: 100
      }
    )
    store = mockStore({ calculator: modifiedInitialStore })
    CalculatorComponent = shallow(
      <Calculator
        {...store}
        setUsdValue={() => {}}
        setBtcValue={() => {}}
      />
    )
  })

  it('should get bitcoin price from the api', async () => {
    await store.dispatch(fetchApiData())
    const actions = store.getActions()
    expect(typeof actions[1].value).toEqual('number')
  })

  it('should set bitcoin price', () => {
    store.dispatch(setBtcPrice(9100))
    const actions = store.getActions()
    const expectedPayload = { type: SET_BTC_PRICE, value: 9100 }
    expect(actions).toEqual([ expectedPayload ])
  })

  it('should convert usd to btc', async () => {
    await store.dispatch(setUsdValue(300))
    const actions = store.getActions()
    const expectedPayload = { type: SET_USD_VALUE, value: {
      usdValue: 300,
      btcValue: 0.032967
    }}
    expect(actions).toEqual([ expectedPayload ])
  })

})