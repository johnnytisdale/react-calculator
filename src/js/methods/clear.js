export default function clear(data) {
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