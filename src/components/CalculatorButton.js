import React, { Component } from 'react';

class CalculatorButton extends Component {

    render() {
        return (<button className="btn btn-primary btn-calculator" {...this.props}>
            {this.props.children}
        </button>);
    }

}

export default CalculatorButton;