import React, { Component } from 'react';
import '../Styles/Tooltip.scss';

export default class Toottip extends Component {
  render() {
    return (
      <div className="layer" style={{display:'flex'}}>
        <div className="tooltip-icon">
          💡
        </div>
        <div style={{lineHeight:'26px'}}>
          Right after you are done with these 3 steps, we'll share a proposal with you in next 48 hours.
        </div>
      </div>
    )
  }
}
