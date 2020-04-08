export default function displayOperation() {
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