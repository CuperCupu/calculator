import React, { Component } from 'react';
import logo from '../logo.svg';
import '../themes/dark.css';
import Button from 'react-bootstrap/Button';

class Credits extends Component {

    constructor(props) {
        super(props);

        this.hello = "asd";
    }

    clicked() {
        console.log(this.hello);
    }

    render() {
        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Calculator</h1>
                <Button onClick={this.clicked.bind(this)}>Teks</Button>
            </div>
        );
    }

}

export default Credits;