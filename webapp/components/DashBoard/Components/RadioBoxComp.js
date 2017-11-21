import React, { Component } from 'react';
import {Radio, FormGroup } from 'react-bootstrap';
import '../Styles/RadioBoxComp.css';

export default class RadioBoxComp extends Component {
    constructor()
    {
        super();
        this.state={
            containerClass:'radio-container',
            radioCircle:'radio-circle',
            radioText:'radio-text',
            defaultValue:'',
        }
    }
    componentWillMount = () => {
      this.setState({
        defaultValue:this.props.defaultValue,
      })
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
        defaultValue:nextProps.defaultValue,
      })
    }
    
    handleRadioClick=(value)=>{
        this.setState({
            defaultValue:value,
        })
        this.props.onclick(value)
    }
    renderClass=(value)=>{
         if(value == this.state.defaultValue){
             return 'checked-radio-container'
         }
             else{
                 return 'radio-container'
             }
         }
    renderRadioCircleClass=(value)=>{
         if(value == this.state.defaultValue){
             return 'checked-radio-circle'
         }
             else{
                 return 'radio-circle'
             }
         }
    renderRadioTextClass=(value)=>{
         if(value == this.state.defaultValue){
             return 'checked-radio-text'
         }
             else{
                 return 'radio-text'
             }
         }
    render() {
    let renderRadioList=()=>{
        return (
            this.props.radioList.map((value,key)=>{
                return <div key={key} className={this.renderClass(value)} onClick={(e)=>{this.handleRadioClick(value)}}>
                        <div className={this.renderRadioCircleClass(value)}></div>
                        <div className={this.renderRadioTextClass(value)}>{value}</div>
                    </div>
                // <Radio key={key} inline name="radioGroup" onChange={(e)=>{this.handleRadioClick(e,value,key)}}><span value={value}>{value}</span></Radio>
            })
        )
    }
        return (
            <div className="radio-group-container">
                {renderRadioList()}
            </div>
        )
    }
}
