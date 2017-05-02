import React , { Component } from  'react'

class Displaytree extends Component {
    constructor(props){
        super(props)
    }
    render(){

        let treeArray  = this.props.Nodearray.treeArray;
        let commArray = this.props.Nodearray.commArray;

        return(
            <div>
                <div>
                    {
                        treeArray.map((node) => {
                            return <div> {node} </div>
                        })
                    }
                </div>
                <hr/>
                <div>
                    {
                        commArray.map((comm) =>{
                            return<div>{comm}</div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Displaytree;
