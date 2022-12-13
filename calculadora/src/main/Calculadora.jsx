import React, { Component } from "react";
import './Calculadora.css'

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculadora extends Component {

    state = { ...initialState}

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState})
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true }) // a partir dessa linha e feito a divisao das partes sendo calculadas ao apertar uma operaçao
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) // eval pode ser substituido por um swtich
            } catch(e) {
                values[0] = this.state.values[0]
            }
            
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) { //regra para evitar dois pontos na calculadora
            return 
        }

        const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false }) // essa linha coloca o numero no Display, ponto importante verificar no PC

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values) // ponto importante testar no PC em caso de erro 
        }
    }


    render() {
        return (
           <div className="calculadora">
           <Display value={this.state.displayValue} /> 
           <Button label="AC" click={this.clearMemory} triple />
           <Button label="/" click={this.setOperation} operation />
           <Button label="7" click={this.addDigit} />
           <Button label="8" click={this.addDigit} />
           <Button label="9" click={this.addDigit} />
           <Button label="*" click={this.setOperation} operation />
           <Button label="4" click={this.addDigit} />
           <Button label="5" click={this.addDigit} />
           <Button label="6" click={this.addDigit} />
           <Button label="-" click={this.setOperation} operation />
           <Button label="1" click={this.addDigit} />
           <Button label="2" click={this.addDigit} />
           <Button label="3" click={this.addDigit} />
           <Button label="+" click={this.setOperation} operation />
           <Button label="0" click={this.addDigit} double />
           <Button label="." click={this.addDigit} />
           <Button label="=" click={this.setOperation} operation />
           </div>
        )
    }
}