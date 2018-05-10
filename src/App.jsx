import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'

import { fetchApiData, setUsdValue, setBtcValue, buyCurrency, resetFields, resetTransactions } from './actions'

import {
  blockTransactionSelector,
  calculatorSelector,
  loadingSelector
} from './reducers/calculator'

import { btcBalanceSelector, usdBalanceSelector } from './reducers/account'

import {
  AccountInfo,
  Calculator,
  Button,
  Spinner
} from './components'

class App extends Component {
  componentDidMount() {
    this.props.getBitcoinData()
  }

  componentWillUnmount() {
    // Errase input fields
    this.props.resetFields()
  }

  render() {
    const {
      blockTransaction,
      btcBalance,
      buyCurrencyAction,
      calculator,
      loading,
      setUsdValueAction,
      setBtcValueAction,
      usdBalance,
      resetTransactionsAction
    } = this.props

    const accountProps = { usd: usdBalance, btc: btcBalance }

    const spinner = loading ? (
      <div className='loading--area'>
        <Spinner center large />
      </div>
    ) : null

    return (
      <div className='exchanger animated fadeInUp'>
        { spinner }
        <div className='exchanger__container'>
          <div className='exchanger__title'>Account Balance</div>
          <AccountInfo {...accountProps} />
          <Calculator
            {...calculator}
            setUsdValue={setUsdValueAction}
            setBtcValue={setBtcValueAction}
          />
          <div className='exchanger__submit'>
            <Button onClick={buyCurrencyAction} disabled={!blockTransaction}>
              Trade
            </Button>
          </div>
          <div className='exchanger__reset'>
            <button className='btn--reset' onClick={resetTransactionsAction}>Reset transactions</button>
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  usdBalance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  btcBalance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  calculator: PropTypes.shape({
    btcPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    usdValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    btcValue: PropTypes.number
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  blockTransaction: PropTypes.bool.isRequired,
  getBitcoinData: PropTypes.func.isRequired,
  resetFields: PropTypes.func.isRequired,
  buyCurrencyAction: PropTypes.func.isRequired,
  setUsdValueAction: PropTypes.func.isRequired,
  setBtcValueAction: PropTypes.func.isRequired,
  resetTransactionsAction: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    loading: loadingSelector(state),
    calculator: calculatorSelector(state),
    usdBalance: usdBalanceSelector(state),
    btcBalance: btcBalanceSelector(state),
    blockTransaction: blockTransactionSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUsdValueAction: (value) => { dispatch(setUsdValue(value)) },
    setBtcValueAction: (value) => { dispatch(setBtcValue(value)) },
    getBitcoinData: () => { dispatch(fetchApiData()) },
    buyCurrencyAction: () => { dispatch(buyCurrency()) },
    resetFields: () => { dispatch(resetFields()) },
    resetTransactionsAction: () => { dispatch(resetTransactions()) }
  }
}

/* eslint-disable */
let AppWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
/* eslint-enable */

if (module.hot) {
  AppWithRedux = hot(module)(AppWithRedux)
}

export default AppWithRedux