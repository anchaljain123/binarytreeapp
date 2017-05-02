import React , { Component } from 'react'
class subTree extends Component{

    constructor(){
        super();
        this.state={index:0}
    }

    calculateSubtree = () =>{
        this.props.calculateSubTree(this.state.index);
    }
    stateChange = () =>{
        this.props.changesubtree();
    }

    render(){
        return(
            <div>
                <label> Enter Index </label>
                <input type="text"
                       value={this.state.index}
                       onChange={(event)=> this.setState({ index: event.target.value })}
                />
                <button onClick={this.calculateSubtree}>Get Subtree</button>
                <button onClick={this.stateChange}>clear</button>
            </div>
        )
    }
}

export default subTree;