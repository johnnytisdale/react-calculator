export default function operate(operands, operators) {
	
	//first do any multiplication and division
	this.multiplyDivide(operands, operators);
	
	//if there is no addition/subtraction, we already have the answer
	if (operands.length == 1) { return operands[0]; }
	
	//addition and subtraction
	return this.addSubtract(operands, operators);
}