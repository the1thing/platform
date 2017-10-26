import React, { Component } from 'react';
import { FormGroup, Checkbox, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import { Selection, SelectContent } from '../Components/Selection';
import { AddButton } from '../Components/AddLink';
import CheckBoxComp from '../Components/CheckBoxComp';
import RadioBoxComp from '../Components/RadioBoxComp';
import { getCheckBoxValue } from '../utils/Methods';

let count = 1;

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
                'Mac App', 'Android wearable', 'VR/AR', 'Apple Watch']
        }
    }
    renderClass = () => {
        if (this.state.platforms[0] && this.state.domain && this.state.content) {
            return "Rectangle-4"
        }
        else {
            return "button-block-class"
        }
    }

    componentWillMount = () => {
        let list = this.state.selectionList;
        list = list.concat(
            <SelectContent
                key={count}
                placeholder="Select your preferred domain"
                count = {++count}
                onSelectionClick={(value, key) => {
                                this.setState({
                                    domain: value,
                                })
                            }}
                onTextAreaClick={(e)=>this.setState({
                                content: e.target.value,
                            })}/>
        );}
    setStateMethod = (label, value) => {
        this.setState({
            [label]: value,
        })
    }

    componentWillMount = () => {
        // this.renderSelectionList();
    }
    
    // componentWillUpdate(nextProps, nextState) {
    //      this.renderSelectionList();
    //      return true;
    // }
    
    renderSelectionList = ()=>{
        let list = this.state.selectionList;
        list = list.concat(
            <SelectContent
                placeholder="Select your preferred domain"
                count={++count}
                error={this.state.domainsClass}
                onSelectionClick={(value, key) => {
                    this.setState({
                        domain: value,
                        domainsClass: false,
                    })
                    {/* this.setStateMethod('domain',value)
                    this.setStateMethod('domainsClass',false) */}
                }}
                onTextAreaClick={(e) => this.setStateMethod('content', e.target.value)} />
        );
        this.setStateMethod('selectionList', list)
    }
    handleAddButton = (e) => {
        if (this.state.domain && this.state.content) {
            let list = this.state.selectionList;
            list = list.concat(
                <SelectContent
                    placeholder="Select your preferred domain"
                    count={++count}
                    error={this.state.domainsClass}
                    onSelectionClick={(value, key) => {
                        this.setStateMethod('domain', value)
                    //    this.setStateMethod('domainsClass', false)
                    }}
                    onTextAreaClick={(e) => this.setStateMethod('content', e.target.value)} />
            );
            let tempList=this.state.domains;
            tempList = tempList.concat({
                title:this.state.domain,
                content:this.state.content,
            });
            this.setStateMethod('selectionList',list)
            this.setStateMethod('domains',tempList)
            this.setStateMethod('domainsClass',false)
            this.setStateMethod('domain','')
            this.setStateMethod('content','')
            // this.setState({
            //     selectionList: list,
            //     domains:tempList,
            // })
            
        }
    }

    goTo = () => {
        console.log("uuuuuu", this.state.domains)
        if (!this.state.platforms[0]) {
            this.setStateMethod('platformsVisiblityError', 'visible')
        }
        else if (!this.state.content || !this.state.domain) {
            this.setStateMethod('domainsClass', true)
        }
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
                        checkboxOnClick={(e) => {
                            this.setStateMethod('platforms', getCheckBoxValue(e, this.state.platforms))
                            this.setStateMethod('platformsVisiblityError', 'hidden')
                        }} />
                )
            })
        )
    }

    render() 
    {
        return (
            <div>
                <div className="input-spacing-radio">
                    <div className="form-label">
                        Select your preferred platforms
                    </div>
                    <div className="subcomponent-spacing">
                        {this.renderCheckBox()}
                    </div>
                    <div style={{ visibility: this.state.platformsVisiblityError }} className='display-error'>
                        Please identify yourself
                    </div>
                </div>
                <div className="input-spacing">
                    <div className="form-label">
                        Select domain you worked upon
                    </div>
                    <div>
                        <SelectContent
                            defaultValue=''
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
                                this.setStateMethod('domainsClass',false)}} />
                    </div>
                    {this.state.selectionList}
                    <div>
                        <Row>
                            <Col md={1} style={{ padding: '0' }}>
                                <div style={{ paddingLeft: '16px' }}>
                                    <div>
                                        <AddButton
                                            disabledClass={this.state.domain && this.state.content ? false : true}
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
                <button className={this.renderClass()} onClick={() => this.goTo()}><span className="button-title">NEXT</span></button>
            </div>
        )
    }
}
