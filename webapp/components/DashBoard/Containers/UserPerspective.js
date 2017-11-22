import React, { Component } from 'react';
import { Row, Col, FormGroup, Checkbox } from 'react-bootstrap';
import '../Styles/UserPerspective.css';
import RadioBoxComp from '../Components/RadioBoxComp';
import {basepath} from '../utils/constant';
import {validateUrl} from '../utils/Methods';
import axios from 'axios';
import  {isEmpty} from '../utils/Methods'
import { connect } from "react-redux";
import {setPerspectiveAddUpdate,getAboutPerspectiveData} from '../Actions/AsyncActions';


let linkcount = 0;
let inputcount = 0;
let TextInput = (props) => {
    return (
        <Row style={{ marginBottom: '24px' }} id={props.id}>
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
        <Row style={{ marginBottom: '24px' }} id={props.id}>
            <Col md={1} style={{ fontSize: '24px' }} className="about-link-textares">{props.no}.</Col>
            <Col md={11}>
                <div>
                    <div style={{display:'flex'}}><input 
                      value={props.input_value} style={{color:props.color,width:'70%'}} onChange={props.onChangeTitile} className={props.linkClass ? "Error-link-input" : "link-input"} placeholder="http://product.com" />
                    <div style={{ display: props.visibility,lineHeight:'35px'}} className='display-error'>
                        Please Enter Valid URL
                    </div>
                    </div>
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


class UserPerspective extends Component {
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
            linkVisiblityError1:'none',
            linkColor1:'#0d65d8',
            linkVisiblityError2:'none',
            linkColor2:'#0d65d8',
            linkVisiblityError3:'none',
            linkColor3:'#0d65d8',
            userPersonalityVisiblityError:'',
            workSpaceVisiblityError: '',
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
        let url=basepath + 'designer/getDesignerDetailsByStage/'+this.props.perspectiveState.allProjectWorkspace._id+'?stage=3';
        this.props.getPerspectiveData(url);
    }
    
    componentWillReceiveProps(nextProps) {
        let temp=nextProps.perspectiveState.userPerspective;
        if(temp.work.product1 !== 'undefined')
        {
            let threeThing=temp.necessaryThing.things.split(',');
            this.setState({
                productTitle1:temp.work.product1,
                productContent1:temp.work.info1,
                productTitle2:temp.work.product2,
                productContent2:temp.work.info2,
                productTitle3:temp.work.product3,
                productContent3:temp.work.info3,
                workSpace: temp.workingPlace,
                necessaryThings1: threeThing[0],
                necessaryThings2: threeThing[1],
                necessaryThings3:threeThing[2],
                userPersonality:temp.necessaryThing.selected,
               })
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
        if (!this.state.productTitle1) {
            document.getElementById('product1').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('linkClass1', true)
        }
        else if(!validateUrl(this.state.productTitle1)){
            document.getElementById('product1').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('linkVisiblityError1','block')
        }
        else if(!this.state.productContent1){
            document.getElementById('product1').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('linkClass1',true)
        }
        else if (!this.state.productTitle2) {
            document.getElementById('product2').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('linkClass2', true)
        }
        else if(!validateUrl(this.state.productTitle2)){
            document.getElementById('product2').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('linkVisiblityError2','block')
        }
        else if(!this.state.productContent2){
            document.getElementById('product2').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('linkClass2',true)
        }
        else if (!this.state.productTitle3) {
            document.getElementById('product3').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('linkClass3', true)
        }
        else if(!validateUrl(this.state.productTitle3)){
            document.getElementById('product3').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('linkVisiblityError3','block')
        }
        else if(!this.state.productContent3){
            document.getElementById('product3').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('linkClass3',true)
        }
        else if (!this.state.workSpace) {
            document.getElementById('workSpace').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('workSpaceVisiblityError', 'radio-error')
        }
        else if (!this.state.necessaryThings1) {
            document.getElementById('thing1').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('necessaryThings1Class', true)
        }
        else if (!this.state.necessaryThings2) {
            document.getElementById('thing2').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('necessaryThings2Class', true)
        }
        else if (!this.state.necessaryThings3) {
            document.getElementById('thing3').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('necessaryThings3Class', true)
        }
        else if(!this.state.userPersonality){
            document.getElementById('userPersonality').scrollIntoView();
            window.scrollBy(0, -100); 
            this.setstateMethod('userPersonalityVisiblityError','radio-error')
        }
        else{
            this.setUserPerpectiveData()
        }
    }
    setUserPerpectiveData=()=>{
        let method='put';
        let url=basepath+'designer/addPerspectiveForWorkspace';
        let data={
            product1:this.state.productTitle1,
            info1:this.state.productContent1,
            product2:this.state.productTitle2,
            info2:this.state.productContent2,
            product3:this.state.productTitle3,
            info3:this.state.productContent3,
            workingPlace:this.state.workSpace,
            things:this.state.necessaryThings1+','+this.state.necessaryThings2+','+this.state.necessaryThings3,
            selected:this.state.userPersonality,
            designerId:this.props.perspectiveState.allProjectWorkspace._id,
        }
        let getDesignerUrl=_apiurl=basepath + 'designer/getDesignerDetailsByStage/'+this.props.perspectiveState.allProjectWorkspace._id+'?stage=1';
        let _apigeturl=basepath + 'designer/getDesignerDetailsByStage/'+this.props.perspectiveState.allProjectWorkspace._id+'?stage=3';
        this.props.perspectiveAddUpdate(method,url,data,_apigeturl);
    }
    render() {
        if(this.state.loader){
            return ( <div> 
                         {/* loading ... */}
                   </div>
                )
        }
        else 
        return (
            <div>
                <div className="input-spacing">
                    <div className="form-label">
                        Product(s) you admire the most
                    </div>
                    <div className="subcomponent-spacing" style={{ overflow: 'hidden' }}>
                        <LinkWithTextArea
                            id='product1'
                            input_value={this.state.productTitle1}
                            area_value={this.state.productContent1}
                            linkClass={this.state.linkClass1}
                            visibility={this.state.linkVisiblityError1}
                            no='1'
                            color={this.state.linkColor1}
                            onChangeTitile={(e) => {
                                this.setstateMethod('linkVisiblityError1','none')
                                this.setstateMethod('productTitle1', e.target.value)
                                this.setstateMethod('linkClass1', false)
                                if(validateUrl(e.target.value)){
                                    this.setstateMethod('linkColor1',' #0d65d8')
                                }
                                else{
                                    this.setstateMethod('linkColor1','#030303')
                                }
                            }}
                            onChangeContent={(e) => {
                                this.setstateMethod('productContent1', e.target.value)
                                this.setstateMethod('linkClass1', false)
                            }} />
                        
                        <LinkWithTextArea
                            id='product2'
                            input_value={this.state.productTitle2}
                            area_value={this.state.productContent2}
                            linkClass={this.state.linkClass2}
                            visibility={this.state.linkVisiblityError2}
                            no='2'
                            color={this.state.linkColor2}
                            onChangeTitile={(e) => {
                                this.setstateMethod('linkVisiblityError2','none')
                                this.setstateMethod('productTitle2', e.target.value)
                                this.setstateMethod('linkClass2', false)
                                if(validateUrl(e.target.value)){
                                    this.setstateMethod('linkColor2',' #0d65d8')
                                }
                                else{
                                    this.setstateMethod('linkColor2','#030303')
                                }
                            }}
                            onChangeContent={(e) => {
                                this.setstateMethod('productContent2', e.target.value)
                                this.setstateMethod('linkClass2', false)
                            }} />
                        <LinkWithTextArea
                            id='product3'
                            input_value={this.state.productTitle3}
                            area_value={this.state.productContent3}
                            linkClass={this.state.linkClass3}
                            visibility={this.state.linkVisiblityError3}
                            no='3'
                            color={this.state.linkColor3}
                            onChangeTitile={(e) => {
                                this.setstateMethod('linkVisiblityError3','none')
                                this.setstateMethod('productTitle3', e.target.value)
                                this.setstateMethod('linkClass3', false)
                                if(validateUrl(e.target.value)){
                                    this.setstateMethod('linkColor3',' #0d65d8')
                                }
                                else{
                                    this.setstateMethod('linkColor3','#030303')
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
                    <div className="subcomponent-spacing" id='workSpace'>
                        <div className={this.state.workSpaceVisiblityError}>
                            <RadioBoxComp 
                                defaultValue={this.state.workSpace}
                                radioList={['Coffee Shop','Co-Working Space','Personal Office']}
                                onclick={(value)=>{
                                    this.setstateMethod('workSpace', value)
                                    this.setstateMethod('workSpaceVisiblityError', '')
                                }}/>
                        </div>
                    </div>
                 
                </div>
                <div className="input-spacing">
                    <div className="form-label">
                        What three attributes are necessary for you to design?
                    </div>
                    <div className="subcomponent-spacing" style={{ overflow: 'hidden' }}>
                        <TextInput
                            id='thing1'
                           value={this.state.necessaryThings1}
                            no='1'
                            className={this.state.necessaryThings1Class}
                            placeholder='Communication'
                            onChange={(e) => { this.setstateMethod('necessaryThings1', e.target.value) }} />
                        <TextInput
                            id='thing2'
                           value={this.state.necessaryThings2}
                            no='2'
                            className={this.state.necessaryThings2Class}
                            placeholder='Clarity'
                            onChange={(e) => { this.setstateMethod('necessaryThings2', e.target.value) }} />
                        <TextInput
                            id='thing3'
                            value={this.state.necessaryThings3}
                            no='3'
                            className={this.state.necessaryThings3Class}
                            placeholder='Active Collaboration'
                            onChange={(e) => { this.setstateMethod('necessaryThings3', e.target.value) }} />
                    </div>
                </div>
                <div className="input-spacing-radio">
                    <div className="form-label" id='userPersonality'>
                        Choose one
                    </div>
                    <div className="subcomponent-spacing">
                        <div className={this.state.userPersonalityVisiblityError}>
                            <RadioBoxComp 
                                defaultValue={this.state.userPersonality}
                                radioList={['UI Designer','Different Projects','Freedom']}
                                onclick={(value)=>{
                                    this.setstateMethod('userPersonality', value)
                                    this.setstateMethod('userPersonalityVisiblityError', '')
                                }}/>
                        </div>
                    </div>
                </div>
                <button className={this.renderClass()} onClick={() => this.goTo()}>
                    <span className="button-title">
                        <span>SAVE</span>
                        <span><img src={require('../Images/arrow-down.svg')}/></span>
                    </span>
                
                </button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        perspectiveState:state.views.dashboard,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getPerspectiveData:(url)=>{
          dispatch(getAboutPerspectiveData(url))
        },
        perspectiveAddUpdate: (method,url,_apidata,_apigeturl,getDesignerUrl) => {
          dispatch(setPerspectiveAddUpdate(method,url,_apidata,_apigeturl,getDesignerUrl));
        }
      };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserPerspective);