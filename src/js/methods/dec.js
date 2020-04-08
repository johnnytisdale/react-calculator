export default function dec(data) {
	
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