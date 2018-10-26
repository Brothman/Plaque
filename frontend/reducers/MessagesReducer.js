import { RECEIVE_MESSAGE } from '../actions/MessageActions';

const MessagesReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_MESSAGE:
            return state;
        default:
            return state;
    }
};

export default MessagesReducer;