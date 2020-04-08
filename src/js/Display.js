import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Display extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			operands: [],
			operators: []
		};
		this.display = this.display.bind(this);
	}
	
	display(data) {
		let operands = this.props.operands;
		let operators = this.oprps.operators;
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
	
	render() {
		
		return (
			<div id='display-container'>
				<div id="display">
					<div id="operation">{this.props.operation}</div>
					<div id="solution">{this.props.solution}</div>
				</div>
			</div>
		);
	}
}