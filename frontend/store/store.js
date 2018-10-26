import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import MessagesReducer from '../reducers/MessagesReducer';

const configureStore = ( preloadedState={} ) => {
    return createStore(
        MessagesReducer,
        preloadedState,
        applyMiddleware(thunk, logger)
    );
};

export default configureStore;