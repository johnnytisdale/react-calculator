export default function backspace() {
	
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