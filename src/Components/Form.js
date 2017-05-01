import React , {Component} from 'react'
class Form extends Component{
    constructor(){
        super();
        this.state = {
            nodeValue : 0,
            commValue :0,
            index:0,
        }
    }

    changeHandler = (event) =>{
        let { nodeValue } = this.state.nodeValue;
        this.setState({ nodeValue:event.target.value })
    }

    insertNode = () => {
        this.props.insertNode(this.state)
    }

    getAmountNode = () =>{

        this.props.getAmount(this.state.index)
    }

    render(){
        return(

            <div >

                    <div>
                        <label>Enter Node Value:</label>
                        <input
                            type="text" name="name"
                            value={this.state.nodeValue}
                            onChange={(event) =>this.setState({ nodeValue: event.target.value })}
                        />
                    </div>
                    <button onClick={ this.insertNode }>INSERT</button>
                    <div className="form-group">
                        <label>Enter Index:</label>
                        <input type="text" value={this.state.index}
                               onChange={(event)=> this.setState({ index: event.target.value })}
                        />
                    </div>
                    <button onClick={ this.getAmountNode }>Get Amount</button>
                    <br/>

            </div>
        )
    }
}

export default Form;