import React from 'react';
import { Provider } from 'react-redux';
import InstantMessage from './InstantMessage';

const AppWrapper = ( { store } ) => {
    return ( 
        <Provider store={store}>
            <InstantMessage />
        </Provider>
     );
};
 
export default AppWrapper; 