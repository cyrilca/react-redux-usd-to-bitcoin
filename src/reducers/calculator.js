import { createSelector } from 'reselect'
import {
  SET_BTC_VALUE,
  SET_USD_VALUE,
  SET_BTC_PRICE,
  ENABLE_SPINNER,
  DISABLE_SPINNER,
  RESET_FIELDS
} from './../constants'

import { usdBalanceSelector } from './account'

export const initialState = {
  btcPrice: null,
  usdValue: 0,
  btcValue: 0,
  loading: false
}

export const calculatorSelector = state => state.calculator
export const usdValuetSelector = state => state.calculator.usdValue
export const btcValueSelector = state => state.calculator.btcAmount
export const btcPriceSelector = state => state.calculator.btcPrice
export const loadingSelector = state => state.calculator.loading

export const blockTransactionSelector = createSelector(
  usdBalanceSelector,
  usdValuetSelector,
  (balance, usdValue) => ((balance >= usdValue) && usdValue > 0)
)

export default function calculator(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case SET_BTC_PRICE:
      newState.btcPrice = action.value
      break
    case SET_USD_VALUE:
      newState.usdValue = action.value.usdValue
      newState.btcValue = action.value.btcValue
      break
    case SET_BTC_VALUE:
      newState.btcValue = action.value.btcValue
      newState.usdValue = action.value.usdValue
      break
    case RESET_FIELDS:
      newState.btcValue = 0
      newState.usdValue = 0
      break
    case ENABLE_SPINNER:
      newState.loading = true
      break
    case DISABLE_SPINNER:
      newState.loading = false
      break
    default:
      break
  }

  return newState
}