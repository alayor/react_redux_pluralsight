import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        reduxImmutableStateInvariant(), //function that warn us if we accidentally mutate any state in the store.
      ),
    ),
  )
}
