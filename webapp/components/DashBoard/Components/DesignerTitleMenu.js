import React, { Component } from "react";
import "../Styles/TitleMenu.scss";
import { OverlayTrigger, Popover } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import {browserHistory,Link} from 'react-router/es6';


export default class DesignerTitleMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // onboarding:false,
      // requirements:false,
      // assignment:false,
      // pricing:false,
      // aboard:false,
      toggleMenu:false,
    };
  }
  renderDesignerMenu=()=>{
    let title=this.props.title.toLowerCase();
    if(title=='onboarding' ||title=='assignment' ||title=='pricing & bandwidth' ||title=='welcome aboard'  ){
      return 'block'
    }else{
      return 'none'
    }
  }
  renderClientMenu=()=>{
    let title=this.props.title.toLowerCase();
    if(title=='requirements' ||title=='proposal' ||title=='design' ||title=='feedback'  ){
      return 'block'
    }else{
      return 'none'
    }
  }
  popoverRight = (
  <Popover
    className={"menu_container"}
  >
    <div>
      <b>
        <ul 
          className="icon_list" 
          style={{ borderRadius: "4px 4px 0px 0px",display:this.renderDesignerMenu() }} 
          >
          <li className="hoverlinkblock hoverlink1">
          <Link to='/' className={"menu_links "}>ONBOARDING</Link></li>
          <li className="hoverlinkblock hoverlink1">
          <Link to='/assignment' className={"menu_links "}>ASSIGNMENT</Link></li>
          <li className="hoverlinkblock hoverlink1">
          <Link to='/pricing' className={"menu_links "}>PRICING & BANDWIDTH</Link></li>
          <li className="hoverlinkblock hoverlink1">
          <Link to='/aboard' className={"menu_links "}>WELCOME ABOARD</Link></li>
        </ul>
        <ul 
          className="icon_list" 
          style={{ borderRadius: "4px 4px 0px 0px",display:this.renderClientMenu() }} 
          >
          <li className="hoverlinkblock hoverlink1">
          <Link to='/' className={"menu_links "}>REQUIREMENTS</Link></li>
          <li className="hoverlinkblock hoverlink1">
          <Link to='/proposal' className={"menu_links "}>PROPOSAL</Link></li>
          <li className="hoverlinkblock hoverlink1">
          <Link to='/design' className={"menu_links "}>DESIGN</Link></li>
          <li className="hoverlinkblock hoverlink1">
          <Link to='/feedback' className={"menu_links "}>FEEDBACK</Link></li>
        </ul>
      </b>
    </div>
  </Popover>
);
  renderColor=()=>{
    if(this.props.title){
      let title=this.props.title.toLowerCase();
      switch(title){
        case 'onboarding':return '#ffbc00';
        break;
        case 'assignment':return '#118bf3';
        break;
        case 'pricing & bandwidth': return '#36cb3b';
        break;
        case 'welcome aboard': return '#7560fd';
        break;
        case 'requirements': return '#ffbc00';
        break;
        case "proposal": return '#118bf3';
        break;
        case "design": return '#36cb3b';
        break;
        case "feedback": return '#7560fd';
        break;
      }
    }
  }
  render() {
    return (
      <div style={{ display: "flex", cursor: "pointer" }}>
        <OverlayTrigger
          trigger="click"
          placement="right" rootClose
          overlay={this.popoverRight}
        >
          <span className={this.state.toggleMenu?'cross_menu_img':'menu-image'} onClick={(e)=>this.setState({toggleMenu:!this.state.toggleMenu})} />
        </OverlayTrigger>
        <span
          className='selected_menu_class'
          style={{
            textTransform: "uppercase",
            color: this.renderColor()
          }}
        >
          {this.props.title}
        </span>
      </div>
    );
  }
}
