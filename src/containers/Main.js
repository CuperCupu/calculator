import React, { Component } from 'react';
import Calculator from './Calculator'
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
            <div>
                <Calculator/>
            </div>
        );
    }

}

export default Main;