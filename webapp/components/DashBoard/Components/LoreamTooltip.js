import React, { Component } from 'react';
import '../Styles/LoreamTooltip.css';

export default class LoreamTooltip extends Component {
    constructor(props){
        super(props);
        this.state={
            toggleVisiblity:false,
        }
    }
  render() {
    return (
      <div className="tooltip-container">
        <div className="my-tooltip">aaaaaaa</div>
        {this.props.title}
        
      </div>
    )
  }
}
