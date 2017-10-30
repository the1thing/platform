import React, { Component } from 'react';
import { FormGroup, Checkbox,OverlayTrigger,Tooltip,Button } from 'react-bootstrap';
import '../Styles/AboutUser.css';
import CheckBoxComp from '../Components/CheckBoxComp';
import RadioBoxComp from '../Components/RadioBoxComp';
import { getCheckBoxValue } from '../utils/Methods';
import {basepath} from '../utils/constant';
import {validateUrl, numberOnly} from '../utils/Methods';
import axios from 'axios';
import LoreamTooltip from '../Components/LoreamTooltip';

const tooltip = (
    <Tooltip id="tooltip">
        <div className='questionMarkToolTipDiv'>
        Your Linkedin profile adds authenticity to your account. 
        It further helps account managers start more contextual 
        conversations with you. We do not share your information 
        with anyone outside of 1THING.
        </div>
    </Tooltip>
  );
export default class AboutUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader:false,
            view:'hidden-me',
            linkdinLink: '',
            workExperience: '',
            jobTiming: '',
            availability: '',
            checkboxArray: [],
            workExperienceClass: false,
            linkdinLinkClass: false,
            linkdinErrorMessage:'',
            availabilityClass: false,
            linkdinLinkColor:'#0d65d8',
            idVisiblityError: 'hidden',
            jobTimingError: 'hidden',
            linkVisiblityError:'hidden',
            checkboxList: ['UI Designer', 'UX Designer', 'Graphics Designer', 'Branding',
                'Fron-end Devloper', 'Android Devloper', 'UX Writer']
        }
    }
    
    componentWillMount=()=> {
        setTimeout(()=>{this.getAboutUserData()},6)
    }
    getAboutUserData=()=>{
        this.setState({loader:true});
        axios({
            method: 'get',
            url: basepath + 'designer/getDesignerDetailsByStage/'+localStorage.getItem('userId')+'?stage=1',
           }).then((response) => {
           console.log('response of get about userrrrrrrrrrr', response)
            this.setState({
                linkdinLink:response.data.linkedinProfile,
                workExperience:response.data.workExperience,
                jobTiming:response.data.role,
                availability:response.data.hoursAvailable,
                checkboxArray: (response.data.profile!=null)?response.data.profile:[],
                loader:false,
               })
          }).catch((error) => {
            console.log('get project error', error);
            this.setState({loader:false})
          });
    }
    renderClass = () => {
        if (this.state.checkboxArray[0] && this.state.linkdinLink && validateUrl(this.state.linkdinLink) && this.state.workExperience
            && this.state.jobTiming && this.state.availability) {
            return "Rectangle-4"
        }
        else {
            return "button-block-class"
        }
    }
    setStateMethod = (label, value) => {
        this.setState({
            [label]: value,
        })
    }
    putAboutUser=()=>{
        axios({
            method:'put',
            url:basepath+'designer/addAboutYourself',
            data:{
                designerId:localStorage.getItem('userId'),
                profile:this.state.checkboxArray,
                linkedinProfile:this.state.linkdinLink,
                workExperience:this.state.workExperience,
                role:this.state.jobTiming,
                hoursAvailable:this.state.availability,
            },
        })
        .then((resp)=>{
            this.props.openPanel()
            console.log("about design---------->",resp);
        })
        .catch((err)=>{
            console.log("about design  error",err)
        })
    }
    goTo = () => {
        if (this.state.checkboxArray.length==0) {
            this.setStateMethod('idVisiblityError', 'visible');
        }
        else if (!this.state.linkdinLink) {
            this.setStateMethod('linkdinLinkClass', true)
            this.setStateMethod('linkVisiblityError','hidden')
        }
        else if(!validateUrl(this.state.linkdinLink)){
            this.setStateMethod('linkVisiblityError','visible')
        }
        else if (!this.state.workExperience) {
            this.setStateMethod('workExperienceClass', true)
        }
        else if (!this.state.jobTiming) {
            this.setStateMethod('jobTimingError', 'visible')
        }
        else if (!this.state.availability) {
            this.setStateMethod('availabilityClass', true)
        }
        else {
            this.putAboutUser();
        }
    }
    renderCheckBox = () => {
        return (
            this.state.checkboxList.map((value, key) => {
                return (
                    <CheckBoxComp
                        /* defaultValue={this.state.checkboxArray} */
                        isChecked={this.state.checkboxArray.indexOf(value)>=0}
                        toggle={this.state.checkboxArray.indexOf(value)>=0}
                        label={value}
                        checkboxOnClick={(e) => {
                            this.setStateMethod('checkboxArray', getCheckBoxValue(e, this.state.checkboxArray))
                            this.setStateMethod('idVisiblityError', 'hidden')
                        }} />
                 )
            })
        )
    }
    render() {
        if(this.state.loader){
          return <div>loading...</div>
        }
        else{
        return (
            <div>
                <div className="input-spacing-radio">
                    <div className="form-label">
                        You identify yourself as
                    </div>
                    <div className="subcomponent-spacing">
                        {this.renderCheckBox()}
                    </div>
                    <div style={{ visibility: this.state.idVisiblityError }} className='display-error'>
                        Please identify yourself
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <input
                        style={{color:this.state.linkdinLinkColor,width:'85%'}}
                        value={this.state.linkdinLink}
                        className={this.state.linkdinLinkClass ? "Error-input" : "simple-input"}
                        placeholder="Paste your linkdin profile link"
                        onChange={(e) => {
                                        this.setStateMethod('linkdinLink', e.target.value)
                                            if(validateUrl(e.target.value)){
                                                this.setStateMethod('linkdinLinkColor','#0d65d8')
                                                this.setStateMethod('linkVisiblityError','hidden')
                                            }
                                            else{
                                                this.setStateMethod('linkdinErrorMessage','Please enter valid URL')
                                                this.setStateMethod('linkdinLinkColor','#030303')
                                               // this.setStateMethod('linkVisiblityError','visible')
                                            }}} />
                    <div style={{height:'40px'}}>
                        <OverlayTrigger placement="top" overlay={tooltip}>
                            <div className="tooltip-image"></div>
                        </OverlayTrigger>
                    </div>
                </div>
                <div style={{marginBottom:'35px'}}>
                    <div style={{ visibility: this.state.linkVisiblityError }} className='display-error'>
                        Please Enter Valid I'D
                    </div>
                </div>
                <div className="input-spacing">
                    <input
                        onKeyPress={(e)=>numberOnly(e)}
                        value={this.state.workExperience}
                        className={this.state.workExperienceClass ? "Error-input" : "simple-input"}
                        placeholder="Total work experience (in years)?"
                        onChange={(e) =>this.setStateMethod('workExperience', e.target.value)}
                        />
                </div>
                <div className="input-spacing-radio">
                    <div className="form-label">You are here for?</div>
                    <div className="subcomponent-spacing">
                        <RadioBoxComp
                            defaultValue={this.state.jobTiming}
                            radioList={['Part time', 'Full time']} 
                            onclick={(e)=>{this.setStateMethod('jobTiming',e);this.setStateMethod('jobTimingError','hidden')}}/>
                    </div>
                    <div style={{ visibility: this.state.jobTimingError }} className='display-error'>
                        Please identify yourself
                    </div>
                </div>
                <div className="input-spacing" style={{display:'flex'}}>
                    <input
                        onKeyPress={(e)=>numberOnly(e)}
                        style={{width:'85%'}}
                        value={this.state.availability}
                        className={this.state.availabilityClass ? "Error-input" : "simple-input"}
                        placeholder="Your availability in hours/week?"
                        onChange={(e)=>this.setStateMethod('availability',e.target.value)} />
                    <div style={{height:'40px'}}>
                        <OverlayTrigger placement="top" overlay={tooltip}>
                            <div className="tooltip-image"></div>
                        </OverlayTrigger>
                    </div>
                </div>
                <button className={this.renderClass()} onClick={() => this.goTo()}>
                    <span className="button-title">
                        <span>NEXT</span>
                        <span><img src={require('../Images/arrow-down.svg')}/></span>
                    </span>
                </button>
            </div>
        )
    }
  } 
}
