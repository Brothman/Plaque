import React from 'react';

const UsernameModal = ({ updateUsername }) => {

    //calls InstantMessage's updateUsername method to update the state of Instant Message
    const fireUpdateUsername = (e) => {
        e.preventDefault();
        //A hack to get the form element, go into the form's children, 
        //find the input element, and get the input's value
        const username = e.currentTarget.elements[0].value;
        updateUsername(username);
    };

    return ( 
        <div className="modal-wrapper">
            <div className="modal-background" />

            <div className="modal-card">
                <form className="username-form" onSubmit={fireUpdateUsername}>
                    <h6 className="username-header">Username Please</h6>
                    <input autoFocus={true} type="text" className="username-input" placeholder="Username" />
                </form>
            </div>
        </div>
     );
}
 
export default UsernameModal;