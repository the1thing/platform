import React, { Component } from 'react';
import '../Styles/Tooltip.css';

export default class Toottip extends Component {
  render() {
    return (
      <div className="layer" style={{display:'flex'}}>
        <div className="tooltip-icon">
          💡
        </div>
        <div style={{lineHeight:'26px'}}>
          {this.props.title}
        </div>
      </div>
    )
  }
}
