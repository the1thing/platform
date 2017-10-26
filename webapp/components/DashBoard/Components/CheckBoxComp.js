import React, { Component } from 'react';
import {Checkbox } from 'react-bootstrap';

export default class CheckBoxComp extends Component {
    constructor()
    {
        super();
        this.state={
            toggle:false
        }
    }
    handleCheckBox = (event,label)=>{
        this.props.checkboxOnClick(label);
        this.setState({
            toggle:!this.state.toggle,
        });
    }
    render() {
        return (
            <Checkbox
                 inline
                className={this.state.toggle?'checkbox-bordered':'checkbox-unbordered'}
                 //checked={this.props.checkboxChecked} 
                  onClick={(event)=>{this.handleCheckBox(event,this.props.label)
                    // this.setState({toggle:!this.state.toggle})
                    }} 
                     >
                <span style={{marginLeft:'3px'}}>{this.props.label}</span>
            </Checkbox>
        )
    }
}
