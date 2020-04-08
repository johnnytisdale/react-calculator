import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Provider, Context} from './Context';
import {Decimal} from 'Decimal.js';
import '../style.scss';
import Display from './Display';
import Num from './Num';
import Operator from './Operator';
import Backspace from './Backspace';
import Dec from './Dec';
import Equals from './Equals';
import Clear from './Clear';

export default class Calculator extends Component {
	
	constructor(props) {
		super(props);
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
		
		//bind 'this' to methods
		let methods = [
			'addSubtract',
			'backspace',
			'clear',
			'dec',
			'display',
			'equals',
			'multiplyDivide',
			'num',
			'operate',
			'operator'
		];
		for (let i = 0; i < methods.length; i++) {
			this[methods[i]] = this[methods[i]].bind(this);
		}
	}
	
	addSubtract(operands, operators) {
		
		//loop through the operators, looking for + and -
		for (let i = 0; i < operators.length; i++) {
			if (operators[i] == "+" || operators[i] == "-") {
				
				let method = this.method(operators[i]);
				let answer = operands[i].decimal[method](operands[i+1].decimal);
				
				//replace the operands with their sum/difference and remove the operator
				operands[i] = {
					number: answer.toString(),
					display: this.display(answer.toString()),
					decimal: answer
				};
				operands.splice(i+1, 1);
				operators.splice(i, 1);
				
				//repeat until all addition/subtraction is done
				this.addSubtract(operands, operators);
			}
		}
		return operands[0];
	}
	
	backspace() {
		
		//last button should be backspace, decimal, number, or operator
		let lastButton = this.state.lastButton;
		if (['backspace', 'dec', 'number'].indexOf(lastButton) < 0) { return; }
		
		//if number is 0, do nothing
		let number = this.state.solution.number;
		if (number == '0') { return; }
		
		//if last button was operator, remove that operator and the most recent operand
		if (lastButton == 'operator') {
			
			let lastButton = 'backspace';
			let operands = this.state.operands;
			let operation = this.state.operation;
			let operators = this.state.operators;
			let solution = this.state.solution;
			
			let operand = operation.operands.pop();
			operation.operators.pop();
			operators[operators.length - 1] = operation.operators[operation.operators.length - 1];
			
			//if more than one operator (before we just popped)
			if (operation.operators.length > 0) {
				solution = operand;
				tempOperands = [];
				tempOperators = [];
				for (let i = 0; i < operation.operands.length; i++) {
					tempOperands[i] = operation.operands[i];
				}
				for (let i = 0; i < operation.operators.length; i++) {
					tempOperators[i] = operation.operators[i];
				}
				operands[operands.length - 1] = this.operate(tempOperands, tempOperators);
				lastButton = 'number';
			}
			
			this.setState({
				lastButton: lastButton,
				operands: operands,
				operation: operation,
				operators: operators,
				solution: solution
			});
			return;
		}
		
		//remove last character from string
		number = number.substring(0, number.length - 1);
		
		//if removing only character, display zero instead of empty string
		if (number == '') { number = '0'; }
		
		//update
		this.setState({
			solution: {
				number: number,
				display: this.display(number)
			},
			lastButton: 'backspace'
		});
	}
	
	clear(data) {
		this.setState({
			lastButton: null,
			operands: [],
			operation: {
				operands: [],
				operators: []
			},
			operators: [],
			solution: {
				number: '0',
				display: '0'
			},
		});
	}
	
	dec(data) {
		
		//last button should be backspace, null, or number
		let lastButton = this.state.lastButton;
		let validButtons = ['backspace', 'operator', 'number'];
		if (lastButton != null && validButtons.indexOf(lastButton) < 0) { return; }
		
		//if the number already has a decimal, do nothing
		let number = this.state.solution.number;
		if (number.indexOf('.') > -1) { return; }
		
		if (lastButton == 'operator') { number = '0'; }
		
		//add the decimal
		number = number + '.';
		
		//update
		this.setState({
			solution: {
				number: number,
				display: this.display(number)
			},
			lastButton: 'dec'
		});
	}
	
	display(number) {
		
		//catch infinity
		if (number == 'Infinity') { return number; }
		
		//cast to string so we can use string methods
		var x = new String(number);
		
		//remove negative symbol
		if (x[0] == "-") {
			var negative = true;
			x = x.substring(1);
		}
		
		//too small to need commas
		if (x.length < 4 || (x.indexOf(".") > -1 && x.indexOf(".") < 4 && x.length < 12)) { return number; }
		
		//too big... display in exponential form
		if (x.length > 9) {
			return (new Decimal((
				x.indexOf(".") > -1) ? parseFloat(x) : parseInt(x)
			)).toExponential(2, Decimal.ROUND_DOWN);
		}
		
		//if there's a decimal, split the number into pre- and post-deicmal
		if (x.indexOf(".") > -1) {
			var y = x.substring(x.indexOf(".") + 1);
			x = x.substring(0, x.indexOf("."));
		}
		
		//add commas to pre-decimal
		var z = "";
		for (let i = 0; i < x.length; i++) {
			z = x[x.length - i - 1] + z;
			if ((i + 1) % 3 === 0 && i != x.length - 1) { z = "," + z; }
		}
		
		//add post-decimal
		if (y !== undefined) { z += "." + y; }
		
		//add negative symbol
		if (negative !== undefined) { z = "-" + x; }
		
		//return that beautifully formatted number
		return z;
	}
	
	displayOperation() {
		let operands = this.state.operation.operands;
		let operators = this.state.operation.operators;
		let string = '';
		if (operators.length > 0) {
			for (let i = 0; i < operands.length; i++) {
				if (i > 0) { string += ' '; }
				string += operands[i].display;
				if (typeof operators[i] != 'undefined') {
					string += ' ' + operators[i];
				}
			}
		}
		return string;
	}
	
	equals(data) {
		
		//add displayed number to list of operands
		let operands = this.state.operands;
		let solution = this.state.solution;
		solution.decimal = new Decimal(solution.number);
		operands.push(solution);
		
		let answer = this.operate(operands, this.state.operators);
		
		this.setState({
			lastButton: null,
			operands: [],
			operation: {operands: [], operators: []},
			operators: [],
			solution: answer
		});
	}
	
	method(operator) {
		switch (operator) {
			case '+': return 'plus';
			case '-': return 'minus';
			case '×': return 'times';
			case '÷': return 'dividedBy';
		}
	}
	
	multiplyDivide(operands, operators) {
		
		//loop through the operators, looking for * and /
		for (let i = 0; i < operators.length; i++) {
			if (operators[i] == "×" || operators[i] == "÷") {
				
				let method = this.method(operators[i]);
				let answer = operands[i].decimal[method](operands[i+1].decimal);
				
				//replace the operands with their product/quotient and remove the operator
				operands[i] = {
					number: answer.toString(),
					display: this.display(answer.toString()),
					decimal: answer
				};
				operands.splice(i+1, 1);
				operators.splice(i, 1);
				
				//repeat until all multiplication/division is done
				this.multiplyDivide(operands, operators);
			}
		}
	}
	
	num(data) {
		
		//initialize variables
		let number;
		let string;
		let lastButton = this.state.lastButton;
		
		//last button should be backspace, dec, null, number, or operator
		let validButtons = ['backspace', 'dec', 'number', 'operator'];
		if (lastButton != null && validButtons.indexOf(lastButton) < 0) { return; }
		
		//if displaying zero, replace zero with number clicked
		if (
			this.state.solution.display == '0' ||
			lastButton == 'operator' ||
			lastButton == null
		) { number = data; }
		
		//otherwise, append number clicked to number displayed
		else {
			number = this.state.solution.number + data;
		}
		
		//update
		this.setState({
			solution: {
				number: number,
				display: this.display(number)
			},
			lastButton: 'number'
		});
	}
	
	operate(operands, operators) {
		
		//first do any multiplication and division
		this.multiplyDivide(operands, operators);
		
		//if there is no addition/subtraction, we already have the answer
		if (operands.length == 1) { return operands[0]; }
		
		//addition and subtraction
		return this.addSubtract(operands, operators);
	}
	
	operator(data) {
		
		//get stuff
		let operands = this.state.operands;
		let operation = this.state.operation;
		let operators = this.state.operators;
		let solution = this.state.solution;
		
		//if last button was operator, we simply want to change the last operator
		if (this.state.lastButton == 'operator') {
			operators[operators.length - 1] = data;
			operation.operators[operation.operators.length - 1] = data;
		}
		
		else {
			//add displayed number to list of operands
			solution.decimal = new Decimal(solution.number);
			operands.push(solution);
			
			//add displayed number to operation
			operation.operands.push(solution);
			
			//not observing order of operations
			if (!this.state.oop) {
				
				//there is already an operator
				if (operators.length > 0) {
					solution = this.operate(operands, operators);
					operands = [solution];
				}
				
				//this is the first operator
				else { solution = this.state.solution; }
				
				//add the operator just clicked to the array
				operators = [data];
				operation.operators.push(data);
			}
		}
		
		//update
		this.setState({
			solution: solution,
			lastButton: 'operator',
			operands: operands,
			operation: operation,
			operators: operators
		}, function() {
			let Element = document.getElementById('operation');
			Element.scrollLeft = Element.scrollWidth;
		});
		
		
	}
	
	render() {
		
		return (
			<div id='react-calculator-jt'>
				<Display
					operation={this.displayOperation()}
					solution={this.state.solution.display}
				/>
				<div className='button-row'>
					<Num callback={this.num} value='7' />
					<Num callback={this.num} value='8' />
					<Num callback={this.num} value='9' />
					<Operator callback={this.operator} value='+' />
				</div>
				<div className='button-row'>
					<Num callback={this.num} value='4' />
					<Num callback={this.num} value='5' />
					<Num callback={this.num} value='6' />
					<Operator callback={this.operator} value='-' />
				</div>
				<div className='button-row'>
					<Num callback={this.num} value='1' />
					<Num callback={this.num} value='2' />
					<Num callback={this.num} value='3' />
					<Operator callback={this.operator} value='×' />
				</div>
				<div className='button-row'>
					<Backspace callback={this.backspace} value='⌫' />
					<Num callback={this.num} value='0' />
					<Dec callback={this.dec} value='.' />
					<Operator callback={this.operator} value='÷' />
				</div>
				<div className='button-row'>
					<Equals callback={this.equals} value='=' />
					<Clear callback={this.clear} value='C' />
				</div>
			</div>
		);
	}
	
}

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Calculator />, wrapper) : false;