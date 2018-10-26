import React from 'react';
import UsernameModal from './UsernameModal';

class InstantMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
        };
        this.updateUsername = this.updateUsername.bind(this);
    }

    componentDidMount() {
        // setTimeout(() => this.setState({username: "Benji"}), 2000);
    }

    updateUsername(username){
        this.setState({
            username,
        });
    }

    render() {
        const loggedIn = this.state.username !== "";

        return ( 
            <div>

                { loggedIn ? <h1> Welcome Friend </h1> : <UsernameModal updateUsername={this.updateUsername} /> }
            </div>
        );
    }
}
 
export default InstantMessage;