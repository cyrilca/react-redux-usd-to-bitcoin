import { combineReducers } from 'redux'
import account from './account'
import calculator from './calculator'

const mainReducer = combineReducers({
  account,
  calculator
})

export default mainReducer