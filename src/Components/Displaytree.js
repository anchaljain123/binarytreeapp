import React , { Component } from  'react'

class Displaytree extends Component {
    constructor(props){
        super(props)
    }
    render(){

        let treeArray  = this.props.Nodearray;

        return(
            <div>
                {

                    treeArray.map((node) => {
                        return <div> {node} </div>
                    })
                }
            </div>
        )
    }
}

export default Displaytree;
