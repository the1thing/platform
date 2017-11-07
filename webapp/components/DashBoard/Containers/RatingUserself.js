import React, { Component } from 'react';
import '../Styles/RatingUserself.css';
import { FormGroup, Checkbox, Row, Col } from 'react-bootstrap';
import RadioBoxCom from '../Components/RadioBoxComp';
import axios from 'axios';
import { basepath } from '../utils/constant';
let myStringList = ['Quality of design.','Ability to use tools.','Communication skills.',
'Project management.','Working in a team.','Leading a design team.'];
let myList = [];
let CreateRadio = (props) => {
    return (
        <Checkbox inline>
            <span>{props.label}</span>
        </Checkbox>
    )
}
let i=1;


export default class RatingUserself extends Component {
    constructor(props){
        super(props);
        this.state={
            designQuality:'',
            useToolQuality:'',
            commSkills:'',
            proManagement:'',
            teamWorking:'',
            leadingTeam:'',
            loading:false,
            error:['','hidden','hidden','hidden','hidden','hidden'],
            designQualityError:'hidden',
        }
    }
    componentWillMount = () => {
        setTimeout(()=>{ this.getRatingOfUserData()},6);
    }
    getRatingOfUserData=()=>{
        this.setState({loading:true});
        axios({
            method: 'get',
            url: basepath + 'designer/getDesignerDetailsByStage/'+localStorage.getItem('userId')+'?stage=4',
        }).then((response) => {
            this.setState({
                designQuality:response.data.about1thing,
                useToolQuality:response.data.rating.tools,
                commSkills:response.data.rating.communication,
                proManagement:response.data.rating.projectManagement,
                teamWorking:response.data.rating.workingWithTeam,
                leadingTeam:response.data.rating.teamLead,
                loading:false,
               })
        
        }).catch((error) => {
                    this.setState({loading:false});

        });
    }

    putRatingUserSelf=()=>{
        axios({
            method:'put',
            url:basepath+'designer/ratingYourselfFromWorkspace',
            data:{
                designerId:localStorage.getItem('userId'),
                about1thing:this.state.designQuality,
                rating: {
                        design:this.state.designQuality,
                        tools: this.state.useToolQuality,
                        communication:this.state.commSkills,
                        projectManagement:this.state.proManagement,
                        workingWithTeam:this.state.teamWorking,
                        teamLead:this.state.leadingTeam,
                       },
              },
        })
        .then((resp)=>{
            this.props.openPanel()
        })
        .catch((err)=>{
            console.log("about put rating  error",err)
        })
    }
   
    renderClass=()=>{
        if(this.state.designQuality && this.state.useToolQuality && this.state.commSkills
            && this.state.proManagement && this.state.teamWorking && this.state.leadingTeam
            && this.state.leadingTeam ){
                return "Rectangle-4"
            }
        else{
            return "button-block-class"
        }
    }
    renderMyList = (no) => {
            return (
            <div key={no} style={{overflow:'hidden'}} id={no}>
                <Row>
                    <Col md={1} className="form-label">{no}.</Col>
                    <Col md={11}>
                        <div className="form-label">
                            {myStringList[no]}
                        </div>
                    </Col>
                    <Col md={11} mdOffset={1}>
                        <div className="subcomponent-spacing">
                            <RadioBoxCom 
                                defaultValue={this.renderDefaultValue(no)}
                                radioList={['10 on 10','9 on 10','8 on 10','Less than 8']}
                                onclick={(value)=>{this.handleRadioClick(value,no)}}/>
                        </div>
                        <div style={{ visibility: this.state.error[no] }} className='display-error'>
                            Please identify yourself
                        </div>
                    </Col>
                </Row>
            </div>
            );
    }
    renderDefaultValue=(no)=>{
        switch(no){
            case '1': return this.state.useToolQuality;
            break;
            case '2':return this.state.commSkills;
            break;
            case '3':return this.state.proManagement;
            break;
            case '4':return this.state.teamWorking;
            break;
            case '5':return this.state.leadingTeam;
        }
    }
    handleRadioClick=(value,no)=>{
        switch(no){
            case '1':{
                        let temp=this.state.error;
                        temp[1]='hidden';
                        this.setState({
                            useToolQuality:value,
                            error:temp,
                        });
                    }
            break;
            case '2':{
                        let temp=this.state.error;
                        temp[2]='hidden';
                        this.setState({
                            commSkills:value,
                            error:temp,
                        });
                    }
            break;
            case '3':{
                        let temp=this.state.error;
                        temp[3]='hidden';
                        this.setState({
                            proManagement:value,
                            error:temp,
                        });
                    }
            break;
            case '4':{
                        let temp=this.state.error;
                        temp[4]='hidden';
                        this.setState({
                            teamWorking:value,
                            error:temp,
                        });
                    }
            break;
            case '5':{
                        let temp=this.state.error;
                        temp[5]='hidden';
                        this.setState({
                            leadingTeam:value,
                            error:temp,
                    });
                }
        }
    }
    goTo=()=>{
        if(this.state.useToolQuality == ''){
            let temp=this.state.error;
            temp[1]='visible';
            document.getElementById('1').scrollIntoView();
            this.setState({
                error:temp,
            })
        }
        else if(this.state.commSkills == ''){
            let temp=this.state.error;
            temp[2]='visible';
            document.getElementById('2').scrollIntoView();
            this.setState({
                error:temp,
            })
        }
        else if(this.state.proManagement == ''){
            let temp=this.state.error;
            temp[3]='visible';
            document.getElementById('3').scrollIntoView();
            this.setState({
                error:temp,
            })
        }
        else if(this.state.teamWorking == ''){
            let temp=this.state.error;
            temp[4]='visible';
            document.getElementById('4').scrollIntoView();
            this.setState({
                error:temp,
            })
        }
        else if(this.state.leadingTeam == ''){
            let temp=this.state.error;
            temp[5]='visible';
            document.getElementById('5').scrollIntoView();
            this.setState({
                error:temp,
            })
        }
        else if(this.state.designQuality == ''){
            document.getElementById('designQuality').scrollIntoView();
            this.setState({
                designQualityError:'visible',
            })
        }
        else{
            this.putRatingUserSelf();
        }
    }
    render() {
        if(this.state.loading){
            return ( <div>
                {/* loading ... */}
                </div>)
        }
        else return (
            <div>
                <div className="input-spacing-radio">
                    <div className="form-label">
                        Please rate yourself for each of the following attributes
                    </div>
                </div>
                <div className="input-spacing">
                    {this.renderMyList('1')}
                    {this.renderMyList('2')}
                    {this.renderMyList('3')}
                    {this.renderMyList('4')}
                    {this.renderMyList('5')}
                </div>
                   <div style={{overflow:'hidden'}} className="input-spacing">
                    <Row>
                        <Col md={1} className="form-label">
                            <img src={require('../Images/1-thing-fevikon.svg')}/>
                        </Col>
                        <Col md={11}>
                            <div className="form-label">
                                How did you learn about 1THING?
                            </div>
                        </Col>
                        <Col md={11} mdOffset={1} id='designQuality'>
                            <div className="subcomponent-spacing">
                                <RadioBoxCom 
                                    defaultValue={this.state.designQuality}
                                    radioList={['Instagram','Twitter','Google Search','Friends','Monochrome','Other']}
                                    onclick={(value)=>{
                                        this.setState({
                                            designQuality:value,
                                            designQualityError:'hidden',
                                        })
                                    }}/>
                            </div>
                            <div style={{ visibility: this.state.designQualityError }} className='display-error'>
                                Please identify yourself
                            </div>
                        </Col>
                    </Row>
                </div>   
                <button className={this.renderClass()} onClick={()=>{this.goTo()}}>
                    {/* <span className="button-title">NEXT</span> */}
                    <span className="button-title">
                        <span>Done</span>
                        <span><img src={require('../Images/arrow-right.svg')}/></span>
                    </span>
                
                </button>
            </div>
        )
    }
}
