export default function num(data) {
	
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