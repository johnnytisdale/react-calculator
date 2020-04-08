//react
import React, { Component } from "react";
import ReactDOM from "react-dom";

//style
import '../style.scss';

//dependencies
import {Decimal} from 'Decimal.js';

//components
import Display from './Display';
import Button from './Button';

//methods
import addSubtract from './methods/addSubtract';
import backspace from './methods/backspace';
import clear from './methods/clear';
import dec from './methods/dec';
import display from './methods/display';
import displayOperation from './methods/displayOperation';
import equals from './methods/equals';
import method from './methods/method';
import multiplyDivide from './methods/multiplyDivide';
import num from './methods/num';
import operate from './methods/operate';
import operator from './methods/operator';

export default class Calculator extends Component {
	
	constructor(props) {
		super(props);

		//state
		this.state = {
			
			//last button clicked
			lastButton: null,
			
			//operands (the numbers being operated upon)
			operands: [],
			
			//the operands & operators being displayed in the top half of the display window
			operation: {
				operands: [],
				operators: []
			},
			
			//operators (+, -, *, /)
			operators: [],
			
			//preserve order of operations?
			oop: false,
			
			//the number being displayed in the bottom half of the display window
			solution: {
				number: '0',
				display: '0'
			},
		};
		
		//methods
		this.addSubtract = addSubtract.bind(this);
		this.backspace = backspace.bind(this);
		this.clear = clear.bind(this);
		this.dec = dec.bind(this);
		this.display = display;
		this.displayOperation = displayOperation.bind(this);
		this.equals = equals.bind(this);
		this.method = method;
		this.multiplyDivide = multiplyDivide.bind(this);
		this.num = num.bind(this);
		this.operate = operate.bind(this);
		this.operator = operator.bind(this);
	}
	
	render() {
		
		return (
			<div id='react-calculator'>
				<Display
					operation={this.displayOperation()}
					solution={this.state.solution.display}
				/>
				<div className='button-row'>
					<Button value='7' callback={this.num} />
					<Button value='8' callback={this.num} />
					<Button value='9' callback={this.num} />
					<Button value='+' callback={this.operator} />
				</div>
				<div className='button-row'>
					<Button value='4' callback={this.num} />
					<Button value='5' callback={this.num} />
					<Button value='6' callback={this.num} />
					<Button value='-' callback={this.operator} />
				</div>
				<div className='button-row'>
					<Button value='1' callback={this.num} />
					<Button value='2' callback={this.num} />
					<Button value='3' callback={this.num} />
					<Button value='×' callback={this.operator} />
				</div>
				<div className='button-row'>
					<Button value='⌫' callback={this.backspace} />
					<Button value='0' callback={this.num} />
					<Button value='.' callback={this.dec} />
					<Button value='÷' callback={this.operator} />
				</div>
				<div className='button-row'>
					<Button value='=' callback={this.equals} />
					<Button value='C' callback={this.clear} />
				</div>
			</div>
		);
	}
	
}

const wrapper = document.getElementById('app');
wrapper ? ReactDOM.render(<Calculator />, wrapper) : false;