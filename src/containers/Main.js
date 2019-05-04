import React, { Component } from 'react';
import Calculator from '../controllers/Calculator'
import '../themes/dark.css';
import Button from 'react-bootstrap/Button';

class Main extends Component {

    constructor(props) {
        super(props);

    }

    clicked() {
    }

    render() {
        return (
            <div className="App">
                <h1>Calculator</h1>
                <Button onClick={this.clicked.bind(this)}>Teks</Button>
            </div>
        );
    }

}

export default Main;