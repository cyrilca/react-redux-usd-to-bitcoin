import React from 'react'
import PropTypes from 'prop-types'

import { Input, Select } from './../../components'

const Calculator = (props) => {
  const {
    btcValue,
    usdValue,
    setUsdValue,
    setBtcValue
  } = props

  return (
    <div className='calculator'>
      <div className='calculator__block'>
        <div className='calculator__label-block'>
          <label htmlFor='trade_from'>Trade</label>
        </div>
        <div className='calculator__form-item'>
          <Select>
            <option>USD</option>
          </Select>
        </div>
        <div className='calculator__form-item'>
          <Input
            onChange={(e) => {
              setUsdValue(e.target.value)
            }}
            onKeyPress={(e) => {
              if (e.which === 45 || e.which === 189) {
                e.preventDefault()
              }
            }}
            value={usdValue}
            type='number'
            id='trade_from'
            min='0'
            className='input input--wide'
            placeholder='USD'
          />
        </div>
      </div>
      <div className='trade__block'>
        <div className='calculator__label-block'>
          <label htmlFor='trade_to'>For</label>
        </div>
        <div className='calculator__form-item'>
          <Select>
            <option>BTC</option>
          </Select>
        </div>
        <Input
          onChange={(e) => {
            setBtcValue(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.which === 45 || e.which === 189) {
              e.preventDefault()
            }
          }}
          value={btcValue}
          type='number'
          id='trade_to'
          min='0'
          placeholder='Quote'
        />
      </div>
    </div>
  )
}

Calculator.propTypes = {
  btcValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  usdValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setUsdValue: PropTypes.func.isRequired,
  setBtcValue: PropTypes.func.isRequired
}

Calculator.defaultProps = {
  btcValue: 0,
  usdValue: 0
}

export default Calculator