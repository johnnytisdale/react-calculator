import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Button extends React.Component {
	
	constructor(props) {
		super(props);
		this.value = props.value;
		this.id = this.value == '=' ? 'react-calculator-equals' : null;
		this.click = this.click.bind(this);
	}
	
	click() {
		this.props.callback(this.value);
	}
	
	render() {
		return (
			<div id={this.id} className={'button'} onClick={this.click}>{this.value}</div>
		);
	}
	
	
}

