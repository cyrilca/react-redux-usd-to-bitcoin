require('dotenv').config()
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const whitelist = ['http://localhost:8080', 'https://s3-us-west-2.amazonaws.com']

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/v1/pubticker/BTCUSD', async (req, res) => {
  const { data } = await axios.get('https://api.bitfinex.com/v1/pubticker/BTCUSD')
  return res.json(data)
})

app.listen(3001, () => {
  console.log('backend is up on 3001')
})