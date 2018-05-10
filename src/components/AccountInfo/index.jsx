import React from 'react'
import PropTypes from 'prop-types'

const AccountInfo = (props) => {
  const { btc, usd } = props
  return (
    <div className='currency'>
      <div className='flex'>
        <div className='currency__type currency__type--bold'>USD</div>
        <div className='currency__usd'>{ usd }</div>
      </div>
      <div className='flex'>
        <div className='currency__type currency__type--bold'>BTC</div>
        <div className='currency__btc'>{ btc }</div>
      </div>
    </div>
  )
}

AccountInfo.propTypes = {
  btc: PropTypes.number.isRequired,
  usd: PropTypes.number.isRequired
}

export default AccountInfo