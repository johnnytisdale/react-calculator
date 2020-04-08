import {Decimal} from 'Decimal.js';

export default function equals(data) {
	
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