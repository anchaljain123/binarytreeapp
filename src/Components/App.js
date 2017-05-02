import React,{ Component } from 'react';
import Form from './Form'
import Displaytree from './Displaytree'
import Showcomm from './Showcommission'
import SubTree from './subTree'

class App extends Component{

    constructor(){
        super();
        this.state = {
            treeArray :[],
            commArray:[],
            TreeStage: 0,
            display:false,
            getamt:false,
            commIndex:0,
            subTree:[],
            index:0,
            issubtree:false,
        }
    }
    subtree = (treeIndex) =>{
        let { subTree } = this.state,
            {index} = this.state;
        var nodeval = this.state.treeArray[treeIndex];
        subTree[index] = nodeval;
        index++;
        this.setState({index:index});
        let left = (2 * index) + 1;
        let right = (2 * index) + 2;
        if(left!=undefined){
            subTree[index] = nodeval;
            index++;
            this.setState({index:index},()=>{
                this.subtree(left)
            });

        }
        if(right!=undefined){
            subTree[index] = nodeval;
            index++;
            this.setState({index:index},()=>{
                this.subtree(right);
            });

        }
        this.setState({subTree:subTree,})
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
        console.log(commArray,"---updatecomm")

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
                commArray[l] = nodeValues.commValue;
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

        this.setState({
            getamt:true,
            commIndex:index
        })
    }

    changeGetAmt =() =>{
        this.setState({getamt:false,})
    }

    updateState =()=>{
        this.setState({issubtree:false})
    }

    render(){
        return(
            <div>
                <button onClick={(e)=>this.setState({display:true, })}>display</button>
                <button onClick={(e)=>this.setState({display:false})}>ADD</button>
                {
                    this.state.display?
                        <Displaytree Nodearray={this.state} />
                        :
                        <Form insertNode={this.insertNode} getAmount ={this.getAmount} />
                }
                {
                    this.state.getamt?
                        <Showcomm  commarray={this.state.commArray}
                                   commIndex={this.state.commIndex}
                                   changeGetAmt={this.changeGetAmt}
                        />
                        :""
                }

                <button onClick={() =>{this.setState({issubtree:true})}}>getSubtree</button>
                {
                    this.state.issubtree?
                        <SubTree calculateSubTree={this.subtree} changesubtree={this.updateState}/>
                        :""
                }

            </div>
        )
    }
}

export default App;