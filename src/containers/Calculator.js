import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import CalculatorButton from '../components/CalculatorButton';

class OperatorToken {

    operate(left, right) {
        throw new TypeError('Not implemented.');
    }

}

class AdditionToken extends OperatorToken {

    operate(left, right) {
        return left + right;
    }

    toString() {
        return '+';
    }

}

class SubtractionToken extends OperatorToken {

    operate(left, right) {
        return left - right;
    }

    toString() {
        return '-';
    }

}

class MultiplyToken extends OperatorToken {

    operate(left, right) {
        return left * right;
    }

    toString() {
        return '*';
    }

}

class DivisionToken extends OperatorToken {

    operate(left, right) {
        return left / right;
    }

    toString() {
        return '/';
    }

}

class Calculator extends Component {

    constructor(props) {
        super(props);

        this.stack = [];
        this.buffer = 0;
        this.buffered = null;
        this.operator = null;
        this.last_operator = null;
        this.last_buffered = null;
        this.clearing = false;
        this.commaSymbol = ',';
        this.comma = false;
        this.commaPos = 0;

        this.state = {
            buffer: 0
        };

        this.buttons = [
            [
                <CalculatorButton onClick={this.back.bind(this)}>C</CalculatorButton>,
                <CalculatorButton onClick={this.clear.bind(this)}>AC</CalculatorButton>,
                <CalculatorButton onClick={this.negate.bind(this)}>±</CalculatorButton>,
                <CalculatorButton onClick={this.operatorAdd.bind(this)}>+</CalculatorButton>,
            ],
            [
                this.createDigitButton(1),
                this.createDigitButton(2),
                this.createDigitButton(3),
                <CalculatorButton onClick={this.operatorSub.bind(this)}>-</CalculatorButton>,
            ],
            [
                this.createDigitButton(4),
                this.createDigitButton(5),
                this.createDigitButton(6),
                <CalculatorButton onClick={this.operatorMult.bind(this)}>×</CalculatorButton>,
            ],
            [
                this.createDigitButton(7),
                this.createDigitButton(8),
                this.createDigitButton(9),
                <CalculatorButton onClick={this.operatorDiv.bind(this)}>÷</CalculatorButton>,
            ],
            [
                [2, this.createDigitButton(0)],
                <CalculatorButton onClick={this.startComma.bind(this)}>,</CalculatorButton>,
                <CalculatorButton onClick={this.operatorEqual.bind(this)}>=</CalculatorButton>,
            ]
        ]
    }

    createDigitButton(digit) {
        return (<CalculatorButton onClick={
            (function () {
                this.appendDigit(digit);
            }).bind(this)
        }>
            {digit}
        </CalculatorButton>);
    };

    clear(update = false) {
        this.buffer = 0;
        this.buffered = null;
        this.operator = null;
        this.clearing = false;
        this.comma = false;
        this.commaPos = 0;
        if (update) {
            this.updateText(this.buffer);
        }
    }

    negate() {
        this.buffer *= -1;
        this.updateText(this.buffer);
    }

    startComma() {
        this.comma = true;
    }

    appendDigit(digit) {
        if (this.clearing) {
            this.clear(true);
        }
        if (this.comma) {
            if (this.buffer < 0) {
                digit = 10 - digit;
            }
            this.commaPos++;
            this.buffer += digit / Math.pow(10, this.commaPos);
        } else {
            if (this.buffer < 0) {
                digit = -digit;
            }
            this.buffer = this.buffer * 10 + digit;
        }
        this.updateText(this.buffer);
    }

    operatorEqual() {
        if (this.operator != null) {
            this.last_operator = this.operator;
            this.last_buffered = this.buffer;
        } else {
            this.operator = this.last_operator;
            this.buffer = this.last_buffered;
        }
        this.push();
        this.clearing = true;
    }

    operatorAdd() {
        this.push();
        this.operator = new AdditionToken();
        this.clearing = false;
    }

    operatorSub() {
        this.push();
        this.operator = new SubtractionToken();
        this.clearing = false;
    }

    operatorMult() {
        this.push();
        this.operator = new MultiplyToken();
        this.clearing = false;
    }

    operatorDiv() {
        this.push();
        this.operator = new DivisionToken();
        this.clearing = false;
    }

    push() {
        if (this.operator == null) {
            if (this.buffered == null) {
                this.buffered = this.buffer;
            }
        } else {
            this.buffered = this.operator.operate(this.buffered, this.buffer);
            this.operator = null;
        }
        this.buffer = 0;
        this.comma = false;
        this.commaPos = 0;
        this.updateText(this.buffered);
    }

    updateText(num) {
        if (this.comma) {
            this.setState({
                buffer: num.toFixed(this.commaPos)
            });
        } else {
            this.setState({
                buffer: num
            });
        }
    }

    back() {
        this.buffer = 0;
        this.comma = false;
        this.commaPos = 0;
        this.updateText(this.buffer);
    }

    tabelize(matrix) {
        var k = 0;
        var rows = [];
        for (var i in matrix) {
            var row = []
            for (var j in matrix[i]) {
                if (Array.isArray(matrix[i][j])) {
                    var len = matrix[i][j][0];
                    var content = matrix[i][j][1];
                    row.push(<td className="btn-cell" colSpan={len} key={k++}>{content}</td>);
                } else {
                    row.push(<td className="btn-cell" key={k++}>{matrix[i][j]}</td>);
                }
            }
            rows.push((<tr key={k++}>{row}</tr>));
        }
        return (<tbody>{rows}</tbody>)
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>
                            <div id="text-container">
                                {this.state.buffer}
                            </div>
                        </th>
                    </tr>
                </thead>
                {this.tabelize(this.buttons)}
            </table>
        );
    }

}

export default Calculator;