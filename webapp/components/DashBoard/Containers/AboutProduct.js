import React, { Component } from 'react';
import '../Styles/AboutProduct.css';
import { DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';
import { AddLink } from '../Components/AddLink';
import { Selection, SelectMultiple, SelectionBox, SelectMultipleBox } from '../Components/Selection';
import axios from 'axios';
import { basepath } from '../utils/constant'
import {validateUrl} from '../utils/Methods';

export default class AboutProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productType: '',
            productLink: '',
            domains: [],
            otherProduct: '',
            scopeDocument: [],
            productLinkVisiblity: 'hidden',
            productLinkVisiblityError:'hidden',
            productLinkErrorMessage:'',
            document: '',
            domainList: ['Social Network', 'Payments', 'News+Content', 'IoT Analytics', 'Chatbots',
                          'onDemand','Marketplace', 'Travel', 'Edu-tech', 'Fin-tech', 'Food-tech', 
                         'Health-tech', 'VR/AR', 'AI powered', 'Ecommerce', 'Others'],
            productNameClass: 'simple-input',
            productTypeClass: false,
            productLinkClass: 'simple-input',
            domainsClass: false,
            otherProductClass: 'simple-input',
            scopeDocumentClass: false,
            popupVisible: false,
            baseClass: 'arrow-div',
            linkColor:'#118bf3',
            toggleVisiblity: true,
            selectedValue: '',
            loading:false,

            //*************** Projects Details *******************//
            checkProjectId:'',
            apiMethode:'',
            apiLink:'',
            edit:true,
          
        }
    }
    componentWillMount = () => {
        this.getAllProjectsForWorkspace();
        this.getAboutProductData();
    }
    componentWillUpdate=()=>{
        
    }
    getAllProjectsForWorkspace = () => {
        console.log("checkin localstorage",localStorage.getItem('userId'))
        this.setState({loading:true});
        axios({
            method: 'get',
            url: basepath + 'project/getAllProjectsForWorkspace/' + localStorage.getItem('userId'),
        }).then((response) => {
            console.log('---------------------***********',response.data);
            if(response.data==null)
                {
                     this.setState({
                        checkProjectId:'',
                        apiMethode:'post',
                        productName:'',
                        productType:'',
                        productLink:'',
                        domains:[],
                        otherProduct:'',
                        scopeDocument:[],
                        apiLink:'project/addProjectFromWorkspace',
                        loading:false
                     })
                }
             else{
                 localStorage.setItem('projectId',response.data._id);
                  this.setState({
                       checkProjectId:response.data._id,
                        apiMethode:'put',
                        apiLink:'project/updateProject',
                        loading:false
                       });
                       this.getAboutProductData();
                    }
        }).catch((error) => {
            console.log('get project error', error.response);
            this.setState({loading:false})
        });
    }
    getAboutProductData=()=>{
        this.setState({
            loading:true,
        })
        axios({
            method: 'get',
            url: basepath + 'project/getProjectByIds/' + localStorage.getItem('projectId')+'?stage=1',
        }).then((response) => {
                       console.log('response of get about product&&&&&&&&&&', response)
            this.setState({
                productName: response.data.name,
                productType: response.data.projectType.projectType,
                productLink: response.data.projectType.link,
                domains: response.data.domain,
                otherProduct: response.data.similarProduct,
                scopeDocument: response.data.userDocumentLink,
                loading:false,
               })
               if(response.data.projectType.projectType === 'Existing Product'){
                   this.setStateMethod('productLinkVisiblity','visible')
               }
        }).catch((error) => {
            console.log('get project error stge 1', error.response);
            this.setState({
                loading:false
            })
        });
    }

    setStateMethod = (label, value) => {
        this.setState({
            [label]: value,
            edit:false
        })
    }
    postDataOfProduct = (listLink)=>{
        console.log('*******',this.state.apiMethode);
        axios({
            method: this.state.apiMethode,
            url: basepath + this.state.apiLink ,
            data: {
                projectName: this.state.productName,
                type: this.state.productType,
                link: this.state.productLink,
                userDocumentLink:listLink,
                domain: this.state.domains,
                similarProduct: this.state.otherProduct,
                userId: localStorage.getItem('userId'),
                userName: localStorage.getItem('userName'),
                projectId:localStorage.getItem('projectId'),
            },
        })
            .then((response) => {
                console.log('############123',response)
                this.setState({edit:true})
                if(this.state.apiMethode=='post')
                {
                  localStorage.setItem('projectId', response.data.data._id)
                 }
                 this.props.openPanel();
            })
            .catch((err) => {
                console.log("about priduct error", err)
            })
    }

    goTo = () => {
        
        if (!this.state.productName) {
           
            this.setStateMethod('productNameClass', 'Error-input')
        }
        else if (!this.state.productType) {
            this.setStateMethod('productTypeClass', true)
        }
        else if (this.state.productType === 'Existing Product' && !this.state.productLink) {
            this.setStateMethod('productLinkClass', 'Error-input')
        }
        else if (this.state.productType === 'Existing Product' && !validateUrl(this.state.productLink)) {
            this.setStateMethod('productLinkVisiblityError','visible')
        }
        else if (this.state.domains.length==0) {
            this.setStateMethod('domainsClass', true)
        }
        else if (!this.state.otherProduct) {
            this.setStateMethod('otherProductClass', 'Error-input')
        }
        else if (!this.state.scopeDocument[0]){
            this.setStateMethod('scopeDocumentClass', true)
        }
        else {
             if(this.state.document==''){
                let list=this.state.scopeDocument;
                 this.postDataOfProduct(list);
               }
           else if(validateUrl(this.state.document)){
                let list=this.state.scopeDocument;
                list=list.concat(this.state.document);
                this.postDataOfProduct(list);
               }
           
        }
        
    }
    renderClass = () => {
        
        if (this.state.productName && (this.state.productType === 'Starting Afresh'
                || (this.state.productType === 'Existing Product'
                    && this.state.productLink
                ))
            && (this.state.domains.length>0 || this.state.document)
            && this.state.otherProduct
        ) {
            return "Rectangle-4"
        }
        else {
            return "button-block-class"
        }
    }

    //new code for selection
    getSatgeOfProduct = (e) => {

        if (!this.state.popupVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        if (this.state.baseClass === 'rotate-div') {
            this.setState({
                baseClass: 'arrow-div',
            })
        } else {
            this.setState({
                baseClass: 'rotate-div',
            })
        }
        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible,
        }));

    }
    handleOutsideClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }

        this.getSatgeOfProduct(e);
    }
    handleListClick = (value, key) => {
        console.log("handle click", value, key)
        this.setState({
            selectedValue: value,
            toggleVisiblity: false,
        });
        this.getMenuListValue(value, key);
    }

    getMenuListValue = (value, key) => {
        if (value === 'Existing Product') {
            this.setStateMethod('productLinkVisiblity', 'visible')
            this.setStateMethod('productType', 'Existing Product')
        } else {
            this.setStateMethod('productLinkVisiblity', 'hidden')
            this.setStateMethod('productType', 'Starting Afresh')
        }
    
}


render() {
    if(this.state.loading)
    {
   return <div>loading</div>
    }
    else return (
        <div>
            <div className="input-spacing">
                <input
                    className={this.state.productNameClass}
                    placeholder="Product Name"
                    value={this.state.productName}
                    onChange={(e) => {
                        this.setStateMethod('edit',false)
                        this.setStateMethod('productName', e.target.value)
                    }} />
            </div>
            <div>
                <Row>
                    <Col md={6}>
                        <Selection
                                defaultValue={this.state.productType}
                                onChange={(e) => { this.handleButtonClick(e) }}  placeholder="Stage of your product"
                                optionList={['Existing Product','Start Afresh']}
                                error={this.state.productTypeClass}
                                onclick={(value,key)=>{
                                    this.setStateMethod('edit',false)
                                    if(value === 'Existing Product'){
                                        this.setStateMethod('productLinkVisiblity','visible')
                                        this.setStateMethod('productType','Existing Product')
                                    }
                                    else{
                                        this.setStateMethod('productLinkVisiblity','hidden')
                                        this.setStateMethod('productType','Starting Afresh')
                                    }
                                }
                                }
                              /> 
                    </Col>
                    <Col md={6} style={{ visibility: this.state.productLinkVisiblity }}>
                        <input
                        style={{lineHeight:'46px',color:this.state.linkColor}}
                        onChange={(e) => { this.handleButtonClick(e) }} 
                        placeholder="Paste the link of product"
                            className={this.state.productLinkClass}
                            value={this.state.productLink}
                            onChange={(e) => {
                                this.setStateMethod('edit',false)
                                this.setStateMethod('productLink', e.target.value)
                                if(validateUrl(e.target.value)){
                                    this.setStateMethod('linkColor',' #118bf3')
                                    this.setStateMethod('productLinkVisiblityError','hidden')
                                    this.setStateMethod('productLinkErrorMessage','Plaese Enter Valid URL')
                                }
                                else{
                                    this.setStateMethod('linkColor','#030303')
                                }
                            }} />
                    </Col>
                </Row>
            </div>
            <div style={{visibility:this.state.productLinkVisiblityError,marginBottom:'35px',marginLeft:'314px'}}>
                Please Enter Valid URL
            </div>
            <div className="input-spacing">
                 <SelectMultiple
                    handleRemoval={()=>{this.setStateMethod('edit',false)}}
                    placeholder="Select Domain"
                    defaultValue={this.state.domains}
                    optionList={this.state.domainList}
                    error={this.state.domainsClass}
                    onclick={(value, key) => {
                        let domain=[]
                        domain = this.state.domains;
                        domain = domain.concat( value );
                        this.setStateMethod('domains', domain)
                    }} />
            </div>
            <div className="input-spacing">
                <input
                    className={this.state.otherProductClass}
                    placeholder="Write similar products (India/Outside)"
                    onChange={(e) => {
                        this.setStateMethod('otherProduct', e.target.value)
                    }}
                    value={this.state.otherProduct}
                />
            </div>
            <AddLink
                defaultValue={this.state.scopeDocument}
                error={this.state.scopeDocumentClass}
                placeholder="Link(s) to scope document, if any"
                onclick={(e) => {
                    if(validateUrl(e.target.value)){
                       this.setStateMethod('document', e.target.value)
                     }
                }}
                clearDocument={()=>{this.setState({document:''})}}
                addAnotherLink={(e) => {
                    let list = this.state.scopeDocument;
                    list = list.concat(this.state.document);
                    this.setStateMethod('scopeDocument', list)
                    this.setStateMethod('document', '')
                    this.setStateMethod('scopeDocumentClass', false)
                }} />
            <button
                disabled={this.state.edit}
                className={this.renderClass()}
                onClick={() =>{ this.goTo()}}>
                <span className="button-title">
                    <span>NEXT</span>
                    <span><img src={require('../Images/arrow-down.svg')}/></span>
                </span>
            </button>
        </div>
       
    )
}
}
