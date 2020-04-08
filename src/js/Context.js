//react
import React, { Component } from 'react';

//context
const Context = React.createContext();

//methods
//import ajax from '../ajax';

//provider
class Provider extends Component {

    constructor(props) {
        super(props);

        //this.addPages = addPages.bind(this);
        
        //this.state = {};
        
    }

    render() {
        return (
            <Context.Provider
                value={{
                    //addPages: this.addPages,
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export { Context, Provider };