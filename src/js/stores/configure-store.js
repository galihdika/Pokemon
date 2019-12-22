import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { logger } from 'redux-logger';

function configureStore() {
    const store = process.env.NODE_ENV === "development" ? 
    createStore(
        rootReducer,
        applyMiddleware(thunk, logger)
    ) : 
    createStore(
        rootReducer,
        applyMiddleware(thunk)
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
}

export default configureStore;