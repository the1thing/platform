import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import '../Styles/OnBoardingTitles.css';

export default class OnboardingTitles extends Component {
  constructor(props){
    super(props);
    this.state={
      about_user_view:false,
      container_class:'',
      title_class:'',
      plus_cursor:'',
      plus_visiblity:'inline',
      minus_visiblity:'none',
      panelClass:'active'
    }
  }
  componentWillMount = () => {
    if(this.props.active){
      this.setState({
        panelClass:'active',
        container_class:'Rectangle-3',
        title_class:'-About-yourself',
        plus_cursor:'pointer',
      });
    }
    else{
      this.setState({
        panelClass:'unactive',
        container_class:'unactive-title',
        title_class:'-Your-expertise',
        plus_cursor:'not-allowed'
      });
    }
  }
  
  openPanel=(e)=>{
    this.props.openPanel(this)
    if(this.props.active){
      if(this.state.about_user_view){
        this.setState({
          plus_visiblity:'inline',
          minus_visiblity:'none',
          about_user_view:false,
        });
      }
      else{
        this.setState({
          plus_visiblity:'none',
          minus_visiblity:'inline',
          about_user_view:true,
        });
      }
    }
  }
  
  render() {
    return (
      <div>
        <div className={this.state.container_class} style={{backgroundImage:this.props.color,borderRadius:this.props.borderRadius}} onClick={(e) => {this.openPanel(e)}}>
          <div className={this.state.title_class}>{this.props.title}</div>
          <div className={this.state.title_class} 
               style={{ cursor: this.state.plus_cursor }} 
               onClick={(e) => this.openPanel(e)}>
               <div style={{display:'inline-flex'}} className="date-container">
                 <div className='Done-Sep-29-740p'> {typeof this.props.date=='undefined'||this.props.date==''?'':'Done  , '+this.props.date}</div>
                 <div style={{marginLeft:'8px'}}>
                 {typeof this.props.date=='undefined'||this.props.date==''?'': <img src={require('../Images/done.svg')}/>}
                 </div>
               </div>
               <div>
                <div style={{display:this.state.plus_visiblity,marginLeft:'103px'}}>
                  <img src={require('../Images/expand.svg')}/>
                </div>
                <div style={{display:this.state.minus_visiblity,marginLeft:'103px'}}>
                  <img src={require('../Images/collaps.svg')}/>
                </div>
               </div>
         </div>
        </div>
        <div className={this.state.panelClass}>
          <Panel collapsible expanded={this.state.about_user_view}>
            {this.props.panelContent}
          </Panel>
        </div>
      </div>
    )
  }
}
