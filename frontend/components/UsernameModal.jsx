import React from 'react';

const UsernameModal = ({ updateUsername }) => {

    const fireUpdateUsername = (e) => {
        e.preventDefault();
        //A hack to get the form element, go into the form's children, 
        //find the input element, and get the input's value
        const username = e.currentTarget.elements[0].value;
        updateUsername(username);
    };

    const logme = (e) => {
        console.log('clicked')
    }

    return ( 
        <div className="modal-wrapper">
            <div className="modal-background" onClick={logme}>
            </div>

            <div className="modal-card">
                <form className="username-form" onSubmit={fireUpdateUsername}>
                    <h6 className="username-header">Username Please</h6>
                    <input type="text" className="username-input" placeholder="Enter your username please" />
                </form>
            </div>
        </div>
     );
}
 
export default UsernameModal;