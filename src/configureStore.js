import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./Reducers/IndexReducer";
import * as actionCreators from "./Actions/index";
import invariant from "redux-immutable-state-invariant";
export default function configureStore(preloadedState) {
  const composeEnhancers = composeWithDevTools({
    actionCreators,
    trace: true,
    traceLimit: 25,
  });
  const store = createStore(
    RootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(invariant(), thunk))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./Reducers/IndexReducer", () => {
      store.replaceReducer("./Reducers/IndexReducer");
    });
  }

  return store;
}
