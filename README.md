# React-Redux USD to Bitcoin converter
Simple React based USD to Bitcoin converter.
This app is using Bitnex API to fetch up-to-date Bitcoin price.

Demo: https://s3-us-west-2.amazonaws.com/react-redux-btc-trade/index.html

<img src="https://user-images.githubusercontent.com/9072649/39899286-0a0e14d4-5489-11e8-8e86-ac8b7e0c83c3.gif" width="300">

### What is used:
- React
- Redux
- Webpack
- ESLint
- Babel
- PostCSS
- Redux-persist
- Redux-thunk
- Reselect

#### Usage 
Clone this repo
```
$ git clone https://github.com/cyrilca/react-redux-usd-to-bitcoin.git
```

Install dependencies
```
$ npm install
```

Rename .env.example to .env

Run dev server
```
$ npm run dev
```

You might need [CORS Toggle](https://chrome.google.com/webstore/detail/cors-toggle/jioikioepegflmdnbocfhgmpmopmjkim?hl=en) extension installed to enable cross-origin resource sharing.

#### Build
Run tests and build the project
```
$ npm run build
```

#### Test
Runs Jest tests
```
$ npm run test
```

### Style Guide
This project is using [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb) with minor overwrites
