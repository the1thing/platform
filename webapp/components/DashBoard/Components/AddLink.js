import React, { Component } from 'react';
import '../Styles/AddLink.scss';

export class AddLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkList: [],
            buttonVisiblity: 'hidden',
            linkreadonly:false,
            defaultInputValue:'',
            readOnlyValue:'',
            myList:[],
        }
    }
    componentWillMount=()=> {
        if(this.props.defaultValue){
            //this.props.addAnotherLink(e);
            this.props.defaultValue.map((value,key)=>{
                let list = this.state.linkList;
                list = list.concat(
                    <div className="subcomponent-spacing">
                        <input className="simple-input" value={value} />
                    </div>
                );
                this.setState({
                    myList:this.props.defaultValue,
                    linkList: list,
                    buttonVisiblity: 'hidden',
                });
            }) 
        }
    }
    nkList
    validateUrl = (productArgu) => {
        let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        let checkProduct = regex.test(productArgu);
        return checkProduct;
    }
    renderLinkList = () => {
        return this.state.myList.map((v,k) => {
            return <div key={k} className="subcomponent-spacing">
                <input readOnly className={this.props.error ? "Error-input" : "simple-input"} value={v}/>
            </div>
        })
    }
    handleButtonClick = (e) => {
        let list=this.state.myList;
        list=list.concat(e.target.value)
        this.setState({
            error:false,
            buttonVisiblity: 'visible',
            readOnlyValue:e.target.value,
            defaultInputValue:e.target.value,
        })
        this.props.onclick(e,e.target.value);
        
    }
    addAnotherLink = (e) => {
        this.props.addAnotherLink(e);
        let list = this.state.myList;
        list = list.concat(
            this.state.readOnlyValue
        );
        this.setState({
            linkreadonly:true,
            linkList: list,
            defaultInputValue:'',
            myList:list,
            buttonVisiblity: 'hidden',
        });
    }
    render() {
        return (
            <div>
                
                {this.renderLinkList()}
                <input 
                    value={this.state.defaultInputValue}
                    className="simple-input" 
                    placeholder="Link(s) to scope document, if any"
                    onChange={(e) => { this.handleButtonClick(e) }}/>
                <div className="input-spacing">
                    <div  style={{ visibility: this.state.buttonVisiblity }}>
                        <AddButton onclick={(e) => { this.addAnotherLink(e) }}/>
                    </div>
                </div>
            </div>
        )
    }
}

// import React, { Component } from 'react'

export class AddButton extends Component {
    render() {
        return (
            <div 
                className={this.props.disabledClass === true ? 'add-button-disabled' : 'add-button'} 
                onClick={(e) => { this.props.onclick(e) }}/> 
        )
    }
}
