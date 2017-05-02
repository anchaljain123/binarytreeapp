import React , {Component } from 'react'

class Showcommission extends Component{
    constructor(props){
        super(props)
    }

    stateChange = () =>{
    this.props.changeGetAmt();
    }

    render(){

        let { commIndex }  =  this.props;
        let  commArray = this.props.commarray;
        return(
            <div>
              Commission Value : {commArray[commIndex]}
              <button onClick={this.stateChange}>Clear</button>
            </div>
        )
    }
}

export default Showcommission;