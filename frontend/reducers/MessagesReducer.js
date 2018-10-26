import { RECEIVE_MESSAGE } from '../actions/MessageActions';
import _ from 'lodash';

const MessagesReducer = (state = { messageArray: [] }, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_MESSAGE:
            const newState = _.merge({}, state);
            newState.messageArray.push(action.message);
            return newState;
        default:
            return state;
    }
};

export default MessagesReducer;