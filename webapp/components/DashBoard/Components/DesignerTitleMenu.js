import React, { Component } from 'react';
import '../Styles/TitleMenu.scss';

export default class DisignerTitleMenu extends Component {
    constructor(props){
        super(props);
        this.state={
            menu_hover_class_requirements:'',
            menu_hover_class_design:'',
            menu_hover_class_analysis:'',
            menu_hover_class_feedback:'',
            menu_requirements_visiblity:'visible',
            menu_design_visiblity:'hidden',
            menu_analysis_visiblity:'hidden',
            menu_feedback_visiblity:'hidden',
            requirement_width:'24px',
            design_width:'8px',
            analysis_width:'8px',
            feedback_width:'8px',
            menu_title_visiblity:'block',
            menu_list:'none',
            
        }
    }
    openMenuTitle=(e,title)=>{
        this.props.openMenuTitle;
        this.setState({
          menu_title_visiblity:'block',
          menu_list:'none'
        })
        switch(title){
          case 'requirements':this.setState({menu_requirements_visiblity:'visible',requirement_width:'24px'});
          break;
          case 'design':this.setState({menu_design_visiblity:'visible',design_width:'24px'})
          break;
          case 'analysis':this.setState({menu_analysis_visiblity:'visible',analysis_width:'24px'})
          break;
          case 'feedback':this.setState({menu_feedback_visiblity:'visible',feedback_width:'24px'})
        }
    
      }
      openMenuList=(e)=>{
        // this.props.openMenuList;
        // this.setState({
        //   menu_list:'block',
        //   menu_title_visiblity:'none',
        //   menu_requirements_visiblity:'hidden',
        //   menu_analysis_visiblity:'hidden',
        //   menu_design_visiblity:'hidden',
        //   menu_feedback_visiblity:'hidden',
        //   requirement_width:'8px',
        //   design_width:'8px',
        //   analysis_width:'8px',
        //   feedback_width:'8px',
        // })
      }
      
  render() {
    return (
        <div>
          {/* <li style={{ color: '#ffbc00'}}>
            <div className="menu-top-border" style={{background:'#ffbc00'}}></div>
            <span className="menu-title" style={{ visibility: this.state.menu_requirements_visiblity }}>REQUIREMENTS</span>
          </li> */}
          <ul className="menu" onClick={(e)=>this.openMenuList(e)} style={{display:this.state.menu_title_visiblity}}>
            <li style={{color:'#ffbc00'}}>
              <div className="menu-top-border" style={{background:'#ffbc00'}}></div>
              <span className="menu-title" style={{visibility:this.state.menu_requirements_visiblity}}>ONBOARDING</span>
            </li>
            {/* <li style={{color:'#118bf3'}}>
              <div className="menu-top-border" style={{background:'#118bf3'}}></div>
              <span className="menu-title" style={{visibility:this.state.menu_design_visiblity}}>ASSIGNMENT</span>
            </li>
            <li style={{color:'#36cb3b'}}>
              <div className="menu-top-border" style={{background:'#36cb3b'}}></div>
              <span className="menu-title" style={{visibility:this.state.menu_analysis_visiblity}}>PRICING & BANDWIDTH</span>
            </li>
            <li style={{color:'#7560fd'}}>
              <div className="menu-top-border" style={{background:'#7560fd'}}></div>
              <span className="menu-title" style={{visibility:this.state.menu_feedback_visiblity}}>WELCOME ABOARD</span>
            </li> */}
          </ul>
          {/* <ul className="menu-list" style={{display:this.state.menu_list}}>
          <li onClick={this.props.getOnboarding} onMouseEnter={()=>{this.setState({menu_hover_class_requirements:'menu-list-hover'})}} onMouseOut={()=>{this.setState({menu_hover_class_requirements:''})}} className={this.state.menu_hover_class_requirements}>
            <div style={{borderTop:'1px solid #ffbc00',color:'#ffbc00',width:this.state.requirement_width,display:'inline-block'}}></div>
            <span className="menu-title" style={{color:"#ffbc00"}} onClick={(e)=>this.openMenuTitle(e,'requirements')}>ONBOARDING</span>
          </li>
          <li  onClick={this.props.getAssignment} onMouseEnter={()=>{this.setState({menu_hover_class_design:'menu-list-hover'})}} onMouseOut={()=>{this.setState({menu_hover_class_design:''})}} className={this.state.menu_hover_class_design}>
            <div style={{borderTop:'1px solid #118bf3',color:'#118bf3',width:this.state.design_width,display:'inline-block'}}></div>
            <span className="menu-title" style={{color:"#118bf3"}} onClick={(e)=>this.openMenuTitle(e,'design')}>ASSIGNMENT</span>
          </li>
          <li  onClick={this.props.getPricing_bandwidth} onMouseEnter={()=>{this.setState({menu_hover_class_analysis:'menu-list-hover'})}} onMouseOut={()=>{this.setState({menu_hover_class_analysis:''})}} className={this.state.menu_hover_class_analysis}>
            <div style={{borderTop:'1px solid #36cb3b',color:'#36cb3b',width:this.state.analysis_width,display:'inline-block'}}></div>
            <span className="menu-title" style={{color:"#36cb3b"}} onClick={(e)=>this.openMenuTitle(e,'analysis')}>PRICING & BANDWIDTH</span>
          </li>
          <li onClick={this.props.getWelAboard} onMouseEnter={()=>{this.setState({menu_hover_class_feedback:'menu-list-hover'})}} onMouseOut={()=>{this.setState({menu_hover_class_feedback:''})}} className={this.state.menu_hover_class_feedback}>
            <div style={{borderTop:'1px solid #7560fd',color:'#7560fd',width:this.state.feedback_width,display:'inline-block'}}></div>
            <span className="menu-title" style={{color:"#7560fd"}} onClick={(e)=>this.openMenuTitle(e,'feedback')}>WELCOME ABOARD</span>
          </li>
          </ul> */}
        </div>  
    )
  }
}
