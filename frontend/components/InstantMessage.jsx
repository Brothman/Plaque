import React from 'react';

class InstantMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({username: "Benji"}), 2000);
    }

    render() {
        const loggedIn = this.state.username !== "";

        return ( 
            <div>

                { loggedIn ? <h1> Welcome Friend </h1> : null }
            </div>
        );
    }
}
 
export default InstantMessage;