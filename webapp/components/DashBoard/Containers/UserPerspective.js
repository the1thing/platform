import React, { Component } from 'react';
import { Row, Col, FormGroup, Checkbox } from 'react-bootstrap';
import '../Styles/UserPerspective.scss';
import RadioBoxComp from '../Components/RadioBoxComp';
import {basepath} from '../utils/constant';
import {validateUrl} from '../utils/Methods';
import axios from 'axios';

let linkcount = 0;
let inputcount = 0;
let TextInput = (props) => {
    return (
        <Row style={{ marginBottom: '24px' }}>
            <Col md={1} style={{ fontSize: '24px' }} className="about-link-textares">{props.no}.</Col>
            <Col md={11}>
                <div>
                    <input
                        value={props.value}
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
                    <input 
                      value={props.input_value} style={{color:props.color}} onChange={props.onChangeTitile} className={props.linkClass ? "Error-link-input" : "link-input"} placeholder="http://product1.com" />
                    <textarea
                        value={props.area_value}
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
            productColor1:'#030303',
            productColor2:'#030303',
            productColor3:'#030303',
            loader:false,
        }
    }
    componentWillMount = () => {
        setTimeout(()=>{ this.getUserPerspectiveData()},6);
    }
    getUserPerspectiveData=()=>{
        this.setState({loader:true});
        axios({
            method: 'get',
            url: basepath + 'designer/getDesignerDetailsByStage/'+localStorage.getItem('userId')+'?stage=3',
        }).then((response) => {
            let threeThing=response.data.necessaryThing.things.split(',');
           console.log('response of get perspectiveeeeee', response)
            this.setState({
                productTitle1:response.data.work.product1,
                productContent1:response.data.work.info1,
                productTitle2:response.data.work.product2,
                productContent2:response.data.work.info2,
                productTitle3:response.data.work.product3,
                productContent3:response.data.work.info3,
                workSpace: response.data.workingPlace,
                necessaryThings1: threeThing[0],
                necessaryThings2: threeThing[1],
                necessaryThings3:threeThing[2],
                userPersonality:response.data.necessaryThing.selected,
                loader:false,
               })
        
        }).catch((error) => {
            console.log('get project error', error.response);
            this.setState({loader:false});
        });
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
        else{
            this.setUserPerpectiveData()
        }
    }
    setUserPerpectiveData=()=>{
        axios({
            method:'put',
            url:basepath+'designer/addPerspectiveForWorkspace',
            data:{
                product1:this.state.productTitle1,
                info1:this.state.productContent1,
                product2:this.state.productTitle2,
                info2:this.state.productContent2,
                product3:this.state.productTitle3,
                info3:this.state.productContent3,
                workingPlace:this.state.workSpace,
                things:this.state.necessaryThings1+','+this.state.necessaryThings2+','+this.state.necessaryThings3,
                selected:this.state.userPersonality,
                designerId:localStorage.getItem('userId'),
            }
        }).then((response)=>{
            this.props.openPanel()
            console.log("User Perspective Data---------->",response.data);
        }).catch((error)=>{
            console.log("User Perspective Error--------->",error)
        })
    }
    render() {
        if(this.state.loader){
            return <div>loading</div>
        }
        else 
        return (
            <div>
                <div className="input-spacing">
                    <div className="form-label">
                        Starting with your favorite prpducts & why?
                    </div>
                    <div className="subcomponent-spacing" style={{ overflow: 'hidden' }}>
                        <LinkWithTextArea
                            input_value={this.state.productTitle1}
                            area_value={this.state.productContent1}
                            linkClass={this.state.linkClass1}
                            no='1'
                            color={this.state.productColor1}
                            onChangeTitile={(e) => {
                                this.setstateMethod('productTitle1', e.target.value)
                                this.setstateMethod('linkClass1', false)
                                if(validateUrl(e.target.value)){
                                    this.setstateMethod('productColor1',' #0d65d8')
                                }
                                else{
                                    this.setstateMethod('productColor1','#030303')
                                }
                            }}
                            onChangeContent={(e) => {
                                this.setstateMethod('productContent1', e.target.value)
                                this.setstateMethod('linkClass1', false)
                            }} />
                        <LinkWithTextArea
                        input_value={this.state.productTitle2}
                        area_value={this.state.productContent2}
                            linkClass={this.state.linkClass2}
                            no='2'
                            color={this.state.productColor2}
                            onChangeTitile={(e) => {
                                this.setstateMethod('productTitle2', e.target.value)
                                this.setstateMethod('linkClass2', false)
                                if(validateUrl(e.target.value)){
                                    this.setstateMethod('productColor2',' #0d65d8')
                                }
                                else{
                                    this.setstateMethod('productColor2','#030303')
                                }
                            }}
                            onChangeContent={(e) => {
                                this.setstateMethod('productContent2', e.target.value)
                                this.setstateMethod('linkClass2', false)
                            }} />
                        <LinkWithTextArea
                        input_value={this.state.productTitle3}
                        area_value={this.state.productContent3}
                            linkClass={this.state.linkClass3}
                            no='3'
                            color={this.state.productColor3}
                            onChangeTitile={(e) => {
                                this.setstateMethod('productTitle3', e.target.value)
                                this.setstateMethod('linkClass3', false)
                                if(validateUrl(e.target.value)){
                                    this.setstateMethod('productColor3',' #0d65d8')
                                }
                                else{
                                    this.setstateMethod('productColor3','#030303')
                                }
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
                           value={this.state.necessaryThings1}
                            no='1'
                            className={this.state.necessaryThings1Class}
                            placeholder='Communication'
                            onChange={(e) => { this.setstateMethod('necessaryThings1', e.target.value) }} />
                        <TextInput
                           value={this.state.necessaryThings2}
                            no='2'
                            className={this.state.necessaryThings2Class}
                            placeholder='Clarity'
                            onChange={(e) => { this.setstateMethod('necessaryThings2', e.target.value) }} />
                        <TextInput
                           value={this.state.necessaryThings3}
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
                <button className={this.renderClass()} onClick={() => this.goTo()}>
                    {/* <span className="button-title">NEXT</span> */}
                    <span className="button-title">
                        <span>NEXT</span>
                        <span><img src={require('../Images/arrow-down.svg')}/></span>
                    </span>
                
                </button>
            </div>
        )
    }
}
