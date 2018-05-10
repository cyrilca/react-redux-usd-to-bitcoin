import logger from 'redux-logger'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

const persistConfig = {
  key: 'store',
  storage
}

const createAppStore = composeWithDevTools(
  applyMiddleware(logger, thunk)
)(createStore)

const persistedReducer = persistReducer(persistConfig, reducers)

const configureStore = (initialState = {}) => {
  const store = createAppStore(persistedReducer, initialState)
  const persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers'))
    )
  }

  return { store, persistor }
}

export default configureStore