import { createSelector } from 'reselect'
import { ADD_TRANSACTION, RESET_TRANSACTIONS } from './../constants'

export const initialUsdBalanceSelector = state => state.account.usdBalance
export const transactionsSelector = state => state.account.transactions

export const btcBalanceSelector = createSelector(
  transactionsSelector,
  transactions =>
    Number((transactions.reduce((prev, current) => (prev + current.btc), 0)).toFixed(6))
)

export const usdBalanceSelector = createSelector(
  initialUsdBalanceSelector,
  transactionsSelector,
  (usdBalance, transactions) =>
    Number(transactions.reduce((prev, current) => (prev - current.usd), usdBalance).toFixed(2))
)

export const initialState = {
  usdBalance: 156.12,
  transactions: []
}

export default function account(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case 'persist/REHYDRATE':
      newState.transactions = action.payload && action.payload.account ?
        action.payload.account.transactions : initialState.transactions
      break
    case ADD_TRANSACTION:
      newState.transactions = [action.value, ...newState.transactions]
      break
    case RESET_TRANSACTIONS:
      newState.transactions = []
      break
    default:
      break
  }

  return newState
}