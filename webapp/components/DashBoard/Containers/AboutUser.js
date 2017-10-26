import React, { Component } from 'react';
import { FormGroup, Checkbox } from 'react-bootstrap';
import '../Styles/AboutUser.scss';
import CheckBoxComp from '../Components/CheckBoxComp';
import RadioBoxComp from '../Components/RadioBoxComp';
import { getCheckBoxValue } from '../utils/Methods';

export default class AboutUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkdinLink: '',
            workExperience: '',
            jobTiming: '',
            availability: '',
            checkboxArray: [],
            workExperienceClass: false,
            linkdinLinkClass: false,
            availabilityClass: false,
            idVisiblityError: 'hidden',
            jobTimingError: 'hidden',
            checkboxList: ['UI Designer', 'UX Designer', 'Graphics Designer', 'Branding', 'UX Writer',
                'Fron-end Devloper', 'Android Devloper', 'UX Writer']
        }
    }

    renderClass = () => {
        if (this.state.checkboxArray[0] && this.state.linkdinLink && this.state.workExperience
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
    goTo = () => {
        console.log("aaaaaaaaaaaaaaaaaa","1-->",this.state.linkdinLink,"2-->",this.state.workExperience,"3-->",this.state.jobTiming,"4-->",this.state.availability,"5-->",this.state.checkboxArray,"6-->",this.state.radioBoxTimeValue)
        if (!this.state.checkboxArray[0]) {
            this.setStateMethod('idVisiblityError', 'visible');
        }
        else if (!this.state.linkdinLink) {
            this.setStateMethod('linkdinLinkClass', true)
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

        }
    }
    renderCheckBox = () => {
        return (
            this.state.checkboxList.map((value, key) => {
                return (
                    <CheckBoxComp
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
        return (
            <div>about user
                {/* <div className="input-spacing-radio">
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
                <div className="input-spacing">
                    <input
                        className={this.state.linkdinLinkClass ? "Error-input" : "simple-input"}
                        placeholder="Paste your linkdin profile link"
                        onChange={(e) => this.setStateMethod('linkdinLink', e.target.value)} />
                </div>
                <div className="input-spacing">
                    <input
                        className={this.state.workExperienceClass ? "Error-input" : "simple-input"}
                        placeholder="Total work experience (in years)?"
                        onChange={(e) => this.setStateMethod('workExperience', e.target.value)} />
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
                <div className="input-spacing">
                    <input
                        className={this.state.availabilityClass ? "Error-input" : "simple-input"}
                        placeholder="Your availability in hours/week?"
                        onChange={(e)=>this.setStateMethod('availability',e.target.value)} />
                </div>
                <button className={this.renderClass()} onClick={() => this.goTo()}><span className="button-title">NEXT</span></button> */}
            </div>
        )
    }
}
