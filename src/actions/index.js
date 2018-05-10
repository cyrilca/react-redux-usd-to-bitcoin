import axios from 'axios'

import {
  SET_USD_VALUE,
  SET_BTC_VALUE,
  SET_BTC_PRICE,
  ADD_TRANSACTION,
  ENABLE_SPINNER,
  DISABLE_SPINNER,
  RESET_FIELDS,
  RESET_TRANSACTIONS
} from './../constants'

export function setBtcPrice(value) {
  return { type: SET_BTC_PRICE, value }
}

export function resetFields() {
  return {
    type: RESET_FIELDS
  }
}

export function resetTransactions() {
  return {
    type: RESET_TRANSACTIONS
  }
}

export function addTransaction(value) {
  return { type: ADD_TRANSACTION, value }
}

export function buyCurrency() {
  return (dispatch, getState) => {
    const { btcPrice, usdValue } = getState().calculator
    const btcPurchased = usdValue / btcPrice

    dispatch({ type: ENABLE_SPINNER })

    // Simulate API call to buy crypto
    setTimeout(() => {
      const transaction = {
        btc: Number(btcPurchased),
        usd: Number(usdValue)
      }
      dispatch(addTransaction(transaction))
      dispatch({ type: DISABLE_SPINNER })
      dispatch({ type: RESET_FIELDS })
    }, 1000)
  }
}

export function fetchApiData() {
  return (dispatch) => {
    dispatch({ type: ENABLE_SPINNER })
    return axios.get('https://api.bitfinex.com/v1/pubticker/BTCUSD')
      .then((res) => {
        const btcPrice = Number(res.data.last_price)
        dispatch(setBtcPrice(btcPrice))
        dispatch({ type: DISABLE_SPINNER })
      })
      .catch(() => {
        // Good to have some kind of error handling here
        dispatch({ type: DISABLE_SPINNER })
      })
  }
}

export function setUsdValue(value) {
  return (dispatch, getState) => {
    const valueToNum = Number(value) === 0 ? '' : Number(value)
    const { btcPrice } = getState().calculator
    return dispatch({
      type: SET_USD_VALUE,
      value: {
        usdValue: valueToNum,
        btcValue: Number((valueToNum / btcPrice).toFixed(6))
      }
    })
  }
}

export function setBtcValue(value) {
  return (dispatch, getState) => {
    const valueToNum = Number(value) === 0 ? '' : Number(value)
    const { btcPrice } = getState().calculator
    dispatch({
      type: SET_BTC_VALUE,
      value: {
        usdValue: valueToNum * btcPrice,
        btcValue: valueToNum
      }
    })
  }
}