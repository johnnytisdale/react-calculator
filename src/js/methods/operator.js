import {Decimal} from 'Decimal.js';

export default function operator(data) {
	
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