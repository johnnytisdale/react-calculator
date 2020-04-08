export default function addSubtract(operands, operators) {
		
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