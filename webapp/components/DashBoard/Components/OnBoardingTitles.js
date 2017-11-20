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
    if(this.props.view){
      this.setState({
        plus_visiblity:'none',
        minus_visiblity:'inline'
      })
    }else{
      this.setState({
        plus_visiblity:'inline',
        minus_visiblity:'none',
      })
    }
    this.setState({
      about_user_view:this.props.view,
    })
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({about_user_view:nextProps.view});
  }
  
  openPanel=(e)=>{
    //this.props.openPanel(this)
    if(this.props.active){
      // this.setState({
      //   panelClass:'active',
      //   container_class:'Rectangle-3',
      //   title_class:'-About-yourself',
      //   plus_cursor:'pointer',
      // });
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
    this.showCoords(e)  
  }
  showCoords(event) {
    var y = event.clientY;
    if(y>=628){
      window.scrollBy(0,+100);
    }
}
  
  render() {
    return (
      <div >
        <div className={this.props.active ? 'Rectangle-3' : 'unactive-title'} style={{backgroundImage:this.props.active ? this.props.color : '',borderRadius:this.props.borderRadius}} onClick={(e) => {this.openPanel(e)}}>
          <div className={this.props.active ? '-About-yourself' : '-Your-expertise'}>{this.props.title}</div>
          <div className={this.props.active ? '-About-yourself' : '-Your-expertise'} 
               style={{ cursor: this.props.active ? 'pointer' : 'not-allowed' }} 
               onClick={(e) => this.openPanel(e)}>
               <div className="date-container">
                 <div className='Done-Sep-29-740p'> {typeof this.props.date=='undefined'||this.props.date==''?'':'Done  , '+this.props.date}</div>
                 <div style={{marginLeft:'8px'}}>
                 {typeof this.props.date=='undefined'||this.props.date==''?'': <img src={require('../Images/done.svg')}/>}
                 </div>
               </div>
               <div>
                <div style={{display:this.state.plus_visiblity,marginLeft:'103px'}} className="expand-icon">
                  <img src={require('../Images/expand.svg')}/>
                </div>
                <div style={{display:this.state.minus_visiblity,marginLeft:'103px'}} className="collaps-icon">
                  <img src={require('../Images/collaps.svg')}/>
                </div>
               </div>
         </div>
        </div>
        <div className={this.props.active ? 'active' : 'unactive'}>
          <Panel collapsible expanded={this.state.about_user_view}>
            {this.props.panelContent}
          </Panel>
        </div>
      </div>
    )
  }
}
