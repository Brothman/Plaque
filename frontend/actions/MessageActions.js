export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const receiveMessage = message => {
    return {
        type: RECEIVE_MESSAGE,
        message
    };
};

