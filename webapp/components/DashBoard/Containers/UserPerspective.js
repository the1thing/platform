import React, { Component } from 'react';
import { Row, Col, FormGroup, Checkbox } from 'react-bootstrap';
import '../Styles/UserPerspective.scss';
import RadioBoxComp from '../Components/RadioBoxComp';

let linkcount = 0;
let inputcount = 0;
let TextInput = (props) => {
    return (
        <Row style={{ marginBottom: '24px' }}>
            <Col md={1} style={{ fontSize: '24px' }} className="about-link-textares">{props.no}.</Col>
            <Col md={11}>
                <div>
                    <input
                        className={props.className ? "Error-input" : "simple-input"}
                        placeholder={props.placeholder}
                        onChange={props.onChange} />
                </div>
            </Col>
        </Row>
    )
}
let CreateRadio = (props) => {
    return (
        <Checkbox inline onChange={props.onChange}>
            <span>{props.label}</span>
        </Checkbox>
    )
}
let LinkWithTextArea = (props) => {
    return (
        <Row style={{ marginBottom: '24px' }}>
            <Col md={1} style={{ fontSize: '24px' }} className="about-link-textares">{props.no}.</Col>
            <Col md={11}>
                <div>
                    <input onChange={props.onChangeTitile} className={props.linkClass ? "Error-link-input" : "link-input"} placeholder="http://product1.com" />
                    <textarea
                        className={props.linkClass ? "Error-link-textares" : "about-link-textares"}
                        rows={4} style={{ width: '100%' }}
                        onChange={props.onChangeContent}
                        placeholder="Why do you like this product?" />
                </div>
            </Col>
        </Row>
    )
}


export default class UserPerspective extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productTitle1: '',
            productContent1: '',
            productTitle2: '',
            productContent2: '',
            productTitle3: '',
            productContent3: '',
            workSpace: '',
            necessaryThings1: '',
            necessaryThings2: '',
            necessaryThings3: '',
            userPersonality: '',
            linkClass1: false,
            linkClass2: false,
            linkClass3: false,
            userPersonalityVisiblityError:'hidden',
            workSpaceVisiblityError: 'hidden',
            necessaryThings1Class: false,
            necessaryThings2Class: false,
            necessaryThings3Class: false,
        }
    }
    renderClass = () => {
        if (this.state.productTitle1 && this.state.productContent1 && this.state.productTitle2
            && this.state.productContent2 && this.state.productTitle3 && this.state.productContent3
            && this.state.workSpace && this.state.necessaryThings1 && this.state.necessaryThings2
            && this.state.necessaryThings3 && this.state.userPersonality) {
            return "Rectangle-4"
        }
        else {
            return "button-block-class"
        }
    }
    setstateMethod = (label, value) => {
        this.setState({
            [label]: value,
        })
    }
    goTo = () => {
        console.log("--------->","1-->", this.state.productTitle1,this.state.productContent1,
        "2-->",this.state.productTitle2,this.state.productContent2,
        "3-->",this.state.productTitle3,this.state.productContent3,
        "4-->",this.state.workSpace,
        "5-->",this.state.necessaryThings1,
        "6-->",this.state.necessaryThings2,
        "7-->",this.state.necessaryThings3,
        "8-->",this.state.userPersonality
    )
        if (!this.state.productTitle1 || !this.state.productContent1) {
            this.setstateMethod('linkClass1', true)
        }
        else if (!this.state.productTitle2 || !this.state.productContent2) {
            this.setstateMethod('linkClass2', true)
        }
        else if (!this.state.productTitle3 || !this.state.productContent3) {
            this.setstateMethod('linkClass3', true)
        }
        else if (!this.state.workSpace) {
            this.setstateMethod('workSpaceVisiblityError', 'visible')
        }
        else if (!this.state.necessaryThings1) {
            this.setstateMethod('necessaryThings1Class', true)
        }
        else if (!this.state.necessaryThings2) {
            this.setstateMethod('necessaryThings2Class', true)
        }
        else if (!this.state.necessaryThings3) {
            this.setstateMethod('necessaryThings3Class', true)
        }
        else if(!this.state.userPersonality){
            this.setstateMethod('userPersonalityVisiblityError','visible')
        }
    }
    render() {
        return (
            <div>
                <div className="input-spacing">
                    <div className="form-label">
                        Starting with your favorite prpducts & why?
                    </div>
                    <div className="subcomponent-spacing" style={{ overflow: 'hidden' }}>
                        <LinkWithTextArea
                            linkClass={this.state.linkClass1}
                            no='1'
                            onChangeTitile={(e) => {
                                this.setstateMethod('productTitle1', e.target.value)
                                this.setstateMethod('linkClass1', false)
                            }}
                            onChangeContent={(e) => {
                                this.setstateMethod('productContent1', e.target.value)
                                this.setstateMethod('linkClass1', false)
                            }} />
                        <LinkWithTextArea
                            linkClass={this.state.linkClass2}
                            no='2'
                            onChangeTitile={(e) => {
                                this.setstateMethod('productTitle2', e.target.value)
                                this.setstateMethod('linkClass2', false)
                            }}
                            onChangeContent={(e) => {
                                this.setstateMethod('productContent2', e.target.value)
                                this.setstateMethod('linkClass2', false)
                            }} />
                        <LinkWithTextArea
                            linkClass={this.state.linkClass3}
                            no='3'
                            onChangeTitile={(e) => {
                                this.setstateMethod('productTitle3', e.target.value)
                                this.setstateMethod('linkClass3', false)
                            }}
                            onChangeContent={(e) => {
                                this.setstateMethod('productContent3', e.target.value)
                                this.setstateMethod('linkClass3', false)
                            }} />

                    </div>
                </div>
                <div className="input-spacing-radio">
                    <div className="form-label">
                        Where do you work from?
                    </div>
                    <div className="subcomponent-spacing">
                        <RadioBoxComp 
                            defaultValue={this.state.workSpace}
                            radioList={['UI Designer','Co-working space','Personal office']}
                            onclick={(value)=>{
                                this.setstateMethod('workSpace', value)
                                this.setstateMethod('workSpaceVisiblityError', 'hidden')
                            }}/>
                    </div>
                    <div style={{ visibility: this.state.workSpaceVisiblityError }} className='display-error'>
                        Please identify yourself
                    </div>
                </div>
                <div className="input-spacing">
                    <div className="form-label">
                        What three things are necessary for you to design? (besides tools)
                    </div>
                    <div className="subcomponent-spacing" style={{ overflow: 'hidden' }}>
                        <TextInput
                            no='1'
                            className={this.state.necessaryThings1Class}
                            placeholder='Communication'
                            onChange={(e) => { this.setstateMethod('necessaryThings1', e.target.value) }} />
                        <TextInput
                            no='2'
                            className={this.state.necessaryThings2Class}
                            placeholder='Clarity'
                            onChange={(e) => { this.setstateMethod('necessaryThings2', e.target.value) }} />
                        <TextInput
                            no='3'
                            className={this.state.necessaryThings3Class}
                            placeholder='Active Collaboration'
                            onChange={(e) => { this.setstateMethod('necessaryThings3', e.target.value) }} />
                    </div>
                </div>
                <div className="input-spacing-radio">
                    <div className="form-label">
                        Choose one over the other two
                    </div>
                    <div className="subcomponent-spacing">
                        <RadioBoxComp 
                            defaultValue={this.state.userPersonality}
                            radioList={['UI Designer','Different Projects','Freedom']}
                            onclick={(value)=>{
                                this.setstateMethod('userPersonality', value)
                                this.setstateMethod('userPersonalityVisiblityError', 'hidden')
                            }}/>
                    </div>
                    <div style={{ visibility: this.state.userPersonalityVisiblityError }} className='display-error'>
                        Please identify yourself
                    </div>
                </div>
                <button className={this.renderClass()} onClick={() => this.goTo()}><span className="button-title">NEXT</span></button>
            </div>
        )
    }
}
