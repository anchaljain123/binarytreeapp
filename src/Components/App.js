import React,{ Component } from 'react';
import Form from './Form'
import Displaytree from './Displaytree'
class App extends Component{

    constructor(){
        super();
        this.state = {
            treeArray :[],
            commArray:[],
            TreeStage: 0,
            display:false,
            insert:false,
        }
    }

    iscompleteTree = (n)  =>{
        var isComplete = (Math.pow(2, n + 1) - 2);
        if (isComplete % 2 == 0) {
            return true;
        }
        else
            return false;
    }

    calculateParent = (levelIndex) => {
        var parentPosition = Math.round((levelIndex - 2) / 2);
        return parseInt(parentPosition);
    }

    updateCommision = (i) =>{
        let {commArray}  = this.state;

        if (this.iscompleteTree(i)) {
            var nodeIndex = i;
            while (nodeIndex >= 0) {
                var r = 2 * nodeIndex + 2;
                var l = 2 * nodeIndex + 1;


                if ((commArray[r] == commArray[l] ) && this.iscompleteTree(nodeIndex)) {
                    if(commArray[nodeIndex] == undefined){
                        commArray[nodeIndex] = 0
                    }

                    commArray[nodeIndex] += 1500;
                    this.setState({commArray:commArray});

                    console.log("commarry after update",commArray)
                }
                else {
                    break;
                }
                var parentIndex = this.calculateParent(nodeIndex);
                nodeIndex = parentIndex
            }
        }
    }

    insertNode = (nodeValues)  => {


        let i = this.state.TreeStage,
            { treeArray } = this.state,
            { commArray } = this.state,
            value = nodeValues.nodeValue,
            commValue = nodeValues.commValue;


        if (treeArray[i] != null)
        {
            let l = (2 * i) + 1;
            if (treeArray[l] != null)
            {
                let  r = (2 * i) + 2;
                if (treeArray[r] != null) {
                    i++;
                    this.setState({TreeStage:i},()=>{

                        this.insertNode(nodeValues);
                    });

                }
                else {
                    treeArray[r] = value;
                    commArray[r] = commValue;
                    this.setState({treeArray:treeArray,commArray : commArray});
                    this.updateCommision(i);
                }
            }
            else {

                treeArray[l] = nodeValues.nodeValue;
                commArray[l] = nodeValues.commValue;;
                this.setState({treeArray:treeArray , commArray : commArray});
            }
        }
        else {

            treeArray[i] = nodeValues.nodeValue;
            commArray[i] = nodeValues.commValue;

            this.setState({treeArray:treeArray,commArray:commArray });

        }
    }

    getAmount = (index) =>{

        let { commArray } = this.state;
            console.log(commArray[index],"********commArray")

    }



    render(){
        return(
            <div>
                <button onClick={(e)=>this.setState({display:true, insert:false,})}>display</button>
                <button onClick={(e)=>this.setState({insert:true, display:false})}>ADD</button>

                {
                    this.state.display?
                        <Displaytree Nodearray={this.state.treeArray}/>
                        :
                        <Form insertNode={this.insertNode} getAmount ={this.getAmount} />
                }

            </div>
        )
    }
}

export default App;