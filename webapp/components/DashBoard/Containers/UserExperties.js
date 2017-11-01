import React, { Component } from 'react';
import { FormGroup, Checkbox, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import { Selection, SelectContent } from '../Components/Selection';
import { AddButton } from '../Components/AddLink';
import CheckBoxComp from '../Components/CheckBoxComp';
import RadioBoxComp from '../Components/RadioBoxComp';
import { getCheckBoxValue } from '../utils/Methods';
import { basepath } from '../utils/constant';
import '../Styles/UserExperties.css';
import axios from 'axios';

let count = 0;

export default class UserExperties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platforms: [],
            domains: [],
            domain: '',
            content: '',
            selectionList: [],
            domainsClass: false,
            platformsVisiblityError: 'hidden',
            checkboxList: ['Web App', 'Android App', 'iOS App', 'Responsive Web', 'Windows App',
                'Mac App', 'Android wearable', 'VR/AR', 'Apple Watch'],
            options: ['Ecommerce', 'Social Network', 'Payments', 'News + Content',
                'IoT Analytics', 'Chatbots', 'OnDemand', 'Marketplace', 'Travel', 'Edu-tech',
                'Food-tech', 'Fin-tech', 'VR/AR', 'Health-tech', 'AI powered', 'Others'],
            //*******************************************//
            domainArray: [{ name: '', info: '' }],
            loading: false,
            domainError: false
        }
    }
    renderClass = () => {


        if (this.state.platforms.length > 0 && (this.state.domainArray[0].name != '' && this.state.domainArray[0].info != '')) {
            return "Rectangle-4"
        }
        else {
            return "button-block-class"
        }
    }
    removeDuplicates = (myArr, prop) => {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }
    componentWillMount = () => {
        // let list = this.state.selectionList;
        // list = list.concat(
        //     <SelectContent
        //         key={count}
        //         placeholder="Select your preferred domain"
        //         count = {++count}
        //         onSelectionClick={(value, key) => {
        //                         this.setState({
        //                             domain: value,
        //                         })
        //                     }}
        //         onTextAreaClick={(e)=>this.setState({
        //                         content: e.target.value,
        //                     })}/>
        // );
        this.getExpertiseData();

    }
    setStateMethod = (label, value) => {
        this.setState({
            [label]: value,
        })
    }


    renderSelectionList = () => {
        return this.state.domainArray.map((value, key) => {
            return <div>
                <Row>
                    <Col md={1}><h4>{key + 1}.</h4></Col>
                    <Col md={11} style={{ marginTop: '-6px' }}>

                        <Selection
                            optionList={this.state.options}
                            defaultValue={this.state.domainArray[key].name}
                            onChange={(e) => { this.handleButtonClick(e) }}
                            placeholder="Select your preferred domain"
                            error={this.state.productTypeClass}
                            onclick={(value) => {
                                this.renderClass();
                                console.log(value);
                                this.state.domainArray[key].name = value;
                                this.setState({ domainArray: this.state.domainArray, domainError: false })
                            }
                            }
                        />
                        <textarea
                            rows={3}
                            value={this.state.domainArray[key].info}
                            className={'about-link-textares'}
                            style={{ width: '100%' }}
                            placeholder="Write all the modules in Social (if Social  is selected) you have worked upon. Ex - chronological feed about updates from friends/connections"
                            onChange={(event) => {
                                this.state.domainArray[key].info = event.target.value;
                                this.setState({ domainArray: this.state.domainArray, domainError: false });
                                this.renderClass();
                            }} />
                    </Col>
                </Row>

            </div>
        })
        // let list = this.state.selectionList;
        // list = list.concat(
        //     <SelectContent
        //         placeholder="Select your preferred domain"
        //         count={++count}
        //         error={this.state.domainsClass}
        //         onSelectionClick={(value, key) => {
        //             this.setState({
        //                 domain: value,
        //                 domainsClass: false,
        //             })
        //             {/* this.setStateMethod('domain',value)
        //             this.setStateMethod('domainsClass',false) */}
        //         }}
        //         onTextAreaClick={(e) => this.setStateMethod('content', e.target.value)} />
        // );
        // this.setStateMethod('selectionList', list)
    }
    handleAddButton = (e) => {
        let len = this.state.domainArray.length;
        if (this.state.domainArray[len - 1].name != '' && this.state.domainArray[len - 1].info != '') {
            this.state.domainArray.push({ name: '', info: '' });
            this.setState({ domainArray: this.state.domainArray })
        }
        // if (this.state.domain && this.state.content) {
        //     let list = this.state.selectionList;
        //     list = list.concat(
        //         <SelectContent
        //             placeholder="Select your preferred domain"
        //             count={++count}
        //             error={this.state.domainsClass}
        //             onSelectionClick={(value, key) => {
        //                 this.setStateMethod('domain', value)
        //             //    this.setStateMethod('domainsClass', false)
        //             }}
        //             onTextAreaClick={(e) => this.setStateMethod('content', e.target.value)} />
        //     );
        //     let tempList=this.state.domains;

        //     tempList = tempList.concat({
        //         name:this.state.domain,
        //         info:this.state.content,
        //     });
        //     this.setStateMethod('selectionList',list)
        //     this.setStateMethod('domains',tempList)
        //     this.setStateMethod('domainsClass',false)
        //     this.setStateMethod('domain','')
        //     this.setStateMethod('content','')

        // }
    }
    submitExpertise = () => {
        this.setState({ loading: true });
        let len = this.state.domainArray.length;
        if (this.state.domainArray[len - 1].name == '' && this.state.domainArray[len - 1].info == '') {
            this.state.domainArray.pop();
            this.setState({ domainArray: this.state.domainArray })
        }
        //  let filterarr=this.removeDuplicates(this.state.domainArray,'info');

        axios({
            method: 'put',
            url: basepath + 'designer/addExpertigeForWorkspace',
            data: {
                expertisePlatform: this.state.platforms,
                expertiseDomain: this.state.domainArray,
                designerId: localStorage.getItem('userId'),
            },
        })
            .then((response) => {
                this.setState({ loading: false });
                console.log('------>>', response);
            }) 
            .then((res)=>{
                this.props.openPanel()
            })
            .catch((err) => {
                console.log("about priduct error", err)
                this.setState({ loading: false });
            })

    }
    getExpertiseData = () => {
        this.setState({ loading: true });
        axios({
            method: 'get',
            url: basepath + 'designer/getDesignerDetailsByStage/' + localStorage.getItem('userId') + '?stage=2',
        }).then((response) => {
            console.log('=========>>>>> stage 2', response);
            this.setState({
                platforms: response.data.expertisePlatform,
                domainArray: (response.data == null || response.data.expertiseDomain.length > 0) ? response.data.expertiseDomain : [{ name: '', info: '' }],
                loading: false
            })
        }).catch((error) => {
            console.log('get project error', error.response);
            this.setState({ loading: false });
        });
    }

    goTo = () => {
        let len = this.state.domainArray.length;
        if (this.state.platforms.length == 0) {
            document.getElementById('platforms').scrollIntoView();
            this.setStateMethod('platformsVisiblityError', 'visible')
        }
        else if (this.state.domainArray[len - 1].name == '') {
            document.getElementById('domains').scrollIntoView();
            this.setState({
                domainError: true
            });
        }
        else if (this.state.domainArray[len - 1].info == '') {
            this.setState({
                domainError: true
            });
        }
        else {
            this.submitExpertise();
        }


        // if(this.state.domains.length>1)
        // {
        //     this.state.domains.spl
        // }
        // if(this.state.domain!=''){
        //     this.state.domains.push({
        //       name:this.state.domain,
        //       info:this.state.content,
        //     });
        //     this.setState({
        //         domains:this.state.domains,
        //     });
        // }

        // if (this.state.platforms.length<1) {
        //     this.setStateMethod('platformsVisiblityError', 'visible')
        // }
        // else if (!this.state.content || !this.state.domain) {
        //     this.setStateMethod('domainsClass', true)
        // }

        // else{
        //     this.submitExpertise();
        // }


    }
    setStateMethod = (label, value) => {
        this.setState({
            [label]: value,
        })
    }
    renderCheckBox = () => {
        return (
            this.state.checkboxList.map((value, key) => {
                return (
                    <CheckBoxComp
                        label={value}
                        isChecked={this.state.platforms.indexOf(value) >= 0}
                        toggle={this.state.platforms.indexOf(value) >= 0}
                        checkboxOnClick={(e) => {
                            this.renderClass();
                            this.setStateMethod('platforms', getCheckBoxValue(e, this.state.platforms))
                            this.setStateMethod('platformsVisiblityError', 'hidden')
                        }} />
                )
            })
        )
    }

    render() {
        if (this.state.loading) {
            return <div>loading ...</div>
        }
        else return (
            <div>
                <div className="input-spacing-radio">
                    <div className="form-label" id='platforms'>
                        Select your preferred platforms
                    </div>
                    <div className="subcomponent-spacing">
                        {this.renderCheckBox()}
                    </div>
                    <div style={{ visibility: this.state.platformsVisiblityError }} className='display-error'>
                        Please identify yourself
                    </div>
                </div>
                <div className="input-spacing selection-content">
                    <div className="form-label" id='domains'>
                        Select domain you worked upon
                    </div>
                    <div>
                        {this.renderSelectionList()}
                        {<p style={{ color: '#eb444c', marginLeft: '46px' }}>
                            {this.state.domainError ? 'Please Select All values' : ""}
                        </p>}
                        {/* {this.renderDomainArray()} */}
                        {/* <SelectContent
                            defaultValue=''
                           // textAreaDefaultValues={this.state.domains[0].content}
                            placeholder="Select your preferred domain"
                            count={1}
                            error={this.state.domainsClass}
                            onSelectionClick={(value, key) => {
                                this.setState({
                                    domain: value,
                                    domainsClass: false,
                                })
                            }}
                            onTextAreaClick={(e) =>{ 
                                this.setStateMethod('content', e.target.value);
                                this.setStateMethod('domainsClass',false)}} />  */}

                    </div>
                    {this.state.selectionList}
                    <div>
                        <Row>
                            <Col md={1} style={{ padding: '0' }}>
                                <div style={{ paddingLeft: '16px' }}>
                                    <div>
                                        <AddButton
                                            disabledClass={this.state.domainArray[this.state.domainArray.length - 1].name == '' || this.state.domainArray[this.state.domainArray.length - 1].info == '' ? true : false}
                                            onclick={(e) => { this.handleAddButton(e) }} />
                                    </div>
                                </div>
                            </Col>
                            <Col md={10} style={{ padding: '0', lineHeight: '40px', paddingLeft: '16px' }}>
                                <div className="add-button-content">
                                    Select another preferred domain
                                </div>

                            </Col>
                        </Row>
                    </div>
                </div>
                <button className={this.renderClass()}
                    onClick={() => this.goTo()}>
                    <span className="button-title">
                        <span>NEXT</span>
                        <span><img src={require('../Images/arrow-down.svg')} /></span>
                    </span>

                </button>
            </div>
        )
    }
}
