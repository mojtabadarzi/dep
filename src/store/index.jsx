import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  blacklist: [],
}

export const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}
const composedEnhancers = compose(applyMiddleware(...middleware))
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, composedEnhancers)
// export const state = () => store.getState()
export const persistor = persistStore(store)
