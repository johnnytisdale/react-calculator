import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from './Button.js';

export default class Num extends React.Component {
	
	render() {
		return (
			<Button callback={this.props.callback} value={this.props.value} />
		);
	}
	
	
}

