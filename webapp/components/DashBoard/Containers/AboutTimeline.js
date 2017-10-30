import React, { Component } from 'react';
import '../Styles/AboutTimeline.css';
import { Row, Col, MenuItem, DropdownButton, FormGroup, Checkbox} from 'react-bootstrap';
import {Selection,SelectMultiple} from '../Components/Selection'; 
import {basepath} from '../utils/constant';
import axios from 'axios';
import RadioBoxComp from '../Components/RadioBoxComp';
import {validateUrl, numberOnly} from '../utils/Methods';

export default class AboutTimeline extends Component {
  constructor(props){
    super(props);
    this.state={
      time:'',
      timeline:'',
      budgetRange:'',
      timeClass:false,
      timelineClass:false,
      budgetRangeClass:false,
      defaultRange:'',
      timeList:['In a Week','In 2 Week','In a Month','Later'],
      timeLineList:['Immediate','4 Weeks','6 Weeks','8 Weeks','12 Weeks','Long term'],
      radioImageClass:'',
      containerClass:'radio-container',
      radioCircle:'radio-circle',
      radioText:'radio-text',
      defaultValue:'',
      loading:true,
      edit:true,

    }
  }
  componentWillMount = () => {
    //console.log("getting uuuuuuuuuuuuuu",localStorage.getItem('userName'));
    //console.log("getting uuuuuuuuuuuuuu",localStorage.getItem('userId'));

  setTimeout(()=> {
    this.getTimeLineData();  
  }, 1000);
    
}
getTimeLineData=()=>{
   
    if(localStorage.getItem("projectId"))
    {
        this.setState({loading:true});
  axios({
      method: 'get',
      url: basepath + 'project/getProjectByIds/' + localStorage.getItem('projectId')+'?stage=3',
  }).then((response) => {
     
    //  console.log('get about timeline*********', response.data);
      var _tempUserPropsal=response.data.userProposal;
         this.setState({
                 time:_tempUserPropsal.startTime,
                 timeline:_tempUserPropsal.timeline,
                 loading:false
            });
            if(_tempUserPropsal.budgetRange =='Later' || _tempUserPropsal.budgetRange == "I'm here for top quality" ){
                this.setState({
                    budgetRange:_tempUserPropsal.budgetRange,
                    defaultValue:_tempUserPropsal.budgetRange,
                    budgetRange:_tempUserPropsal.budgetRange,
                })
            }
            else{
                this.setState({
                    defaultRange:_tempUserPropsal.budgetRange,
                })
            }

  }).catch((error) => {
      console.log('get project error stage 3', error.response);
       this.setState({loading:false})
  });
}
}

  setStateMethod=(label,value)=>{
        this.setState({
            [label]:value,
            edit:false,
        })
    }
    
  createRadio=(label)=>{
    return (
        <Checkbox 
          inline onChange={(e)=>{
            this.setStateMethod('budgetRange',label);
            this.setStateMethod('defaultRange','')}}
          >
            <span style={{color:'#7f7f7f'}}>{label}</span>
        </Checkbox>
    )
  }
  dropdownList = (title,field,comClass,list)=>{
    return (
      <div className="input-spacing">
        <Selection
          error={comClass}
          placeholder={title}
          optionList={list}
          onclick={(value,key)=>{
            this.setState({
              [field]:value,
            })
          }}/>
      
        {/* <DropdownButton
            id="input-dropdown-addon"
            title={<span style={{color:'#7f7f7f',opacity:'0.5'}}>{title}</span>}
        >
            <MenuItem key="New Product">New Product</MenuItem>
            <MenuItem key="Existing Product">Existing Product</MenuItem>
        </DropdownButton> */}
    </div>
    );
  }  
  renderClass=()=>{
    if(this.state.time && this.state.timeline && ( this.state.budgetRange || this.state.defaultRange)){
            return "Rectangle-4"
        }
    else{
        return "button-block-class"
    }
  }
  
  goTo=()=>{
    if(!this.state.time){
      this.setStateMethod('timeClass',true);
    }
    else if(!this.state.timeline){
      this.setStateMethod('timelineClass',true)
    }
    else if(!this.state.budgetRange){
      this.setStateMethod('budgetRangeClass',true)
    }
    else{
      axios({
                method:'put',
                url:basepath+'project/updateTimelineForWorkspace',
                data:{
                  startTime:this.state.time,
                  timeline:this.state.timeline,
                  budgetRange:this.state.budgetRange,
                  projectId:localStorage.getItem('projectId'),
                },
            })
            .then((resp)=>{
                this.setState({
                    edit:true
                })
                this.props.openPanel()
              //  console.log("about timeLine",resp);
            })
            .catch((err)=>{
                console.log("about timeLine  error",err)
            })
    }
  }
  renderRadioClass=(value)=>{
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
    handleRadioClick=(value)=>{
        this.setStateMethod('defaultValue','');
        this.setState({
            budgetRangeClass:false,
            defaultValue:value,
            budgetRange:value,
            defaultRange:'',
        
        })
      //  this.props.onclick(value)
    }
    
  render() {
      if(this.state.loading){
          return (
              <div>Loading....</div>
          )
      }
    return (
      <div>
        {/* {this.dropdownList('Expected start time','time',this.state.timeClass,this.state.timeList)}
        {this.dropdownList('Expected timeline','timeline',this.state.timelineClass,this.state.timeLineList)} */}
         
         <div className="input-spacing">
           <Selection
                                defaultValue={this.state.time}
                                value={this.state.time}
                              // onChange={(e) => { this.handleButtonClick(e) }}    
                                placeholder="Expected start time"
                                optionList={this.state.timeList}
                               // error={this.state.productTypeClass}
                                onclick={(value,key)=>{  
                                          this.setState({time:value,
                                                        edit:false,
                                                    });
                                                   }
                                }
                      /> 
                      </div>

         <div className="input-spacing">
                 <Selection
                                defaultValue={this.state.timeline}
                                value={this.state.timeline}
                              // onChange={(e) => { this.handleButtonClick(e) }}    
                                placeholder="Expected timeline"
                                optionList={this.state.timeLineList}
                               // error={this.state.productTypeClass}
                                onclick={(value,key)=>{  
                                    console.log('************',value);
                                          this.setState({timeline:value,edit:false,});
                                                   }
                                }
                      /> 
                      </div>
      

        <div className="input-spacing">
          <div className="form-label">
              Budget Range
          </div>
          <div className="subcomponent-spacing" style={{display:'flex',alignItems:'baseline'}} className="identify-yourself">
            <div style={{width:'11%'}}>
              <Selection
                  defaultValue="INR"
                  optionList={['INR','$','URO']}
                  onclick={(value,key)=>{if(value === 'Existing Product'){
                      this.setState({
                          productLinkVisiblity:'visible',
                          productType:'Existing Product'
                      });
                  }else{
                      this.setState({
                          productLinkVisiblity:'hidden',
                          productType:'Starting Afresh'
                      })
                  };console.log("value",this.state.productType)}}/>
            </div>
            <div style={{width:'21%'}}>
              <input 
                onKeyPress={(e)=>{numberOnly(e)}}
                value={this.state.defaultRange}
                className={this.state.budgetRangeClass ? "Error-input" : "simple-input"} 
                placeholder="Enter budget"
                onKeyPress={(event)=>{if(!(event.charCode>=48 && event.charCode<=57) ){event.preventDefault()}}}
                onChange={(e)=>{
                  this.setStateMethod('defaultRange',e.target.value);
                  this.setStateMethod('budgetRange',e.target.value)
                  this.setStateMethod('radioImageClass','radio-image')
                  this.setStateMethod('defaultValue','')
                }}/>
            </div>
            <div style={{marginLeft:'1%'}} className={this.state.radioImageClass}>
                <div className="radio-group-container" style={{display:'flex',height:'48px'}}>
                <div className={this.renderRadioClass("Later")} onClick={(e)=>{this.handleRadioClick("Later")}}>
                    <div className={this.renderRadioCircleClass("Later")}></div>
                    <div className={this.renderRadioTextClass("Later")}>Later</div>
                </div>
                <div>
                  <span className="or-copy">or</span>
                </div>
                <div className={this.renderRadioClass("I'm here for top quality")} onClick={(e)=>{this.handleRadioClick("I'm here for top quality")}}>
                    <div className={this.renderRadioCircleClass("I'm here for top quality")}></div>
                    <div className={this.renderRadioTextClass("I'm here for top quality")}>"I'm here for top quality"</div>
                </div>
                </div>
                {/* <RadioBoxComp 
                  radioList={['Part time', 'Full time']} 
                  middleValue='or'
                  onclick={(value)=>{console.log("value",value)}}/> */}
            </div>
            {/* <div>
              <span className="or-copy">or</span>
            </div>
            <div className={this.state.radioImageClass}>
                  {this.createRadio("I'm here for top quality")}
            </div> */}
          </div>
        </div>
        <button 
            disabled={this.state.edit}
             className={this.renderClass()}
              onClick={()=>this.goTo()}>
            <span className="button-title">
                <span>Done</span>
                <span><img src={require('../Images/arrow-right.svg')}/></span>
            </span>
        
             {/* <span className="button-title">DONE<span style={{marginLeft:'42px'}}><img  width='18px'height='16px' src={require('../Images/invalid-name.png')}/>  </span></span> */}
          </button>
      </div>
    )
  }
}
