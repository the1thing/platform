import React, { Component } from 'react';
import '../Styles/Selection.css';
import { AddButton } from './AddLink';
import { Row, Col } from 'react-bootstrap';

export class Selection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false,
            baseClass: 'arrow-div',
            toggleVisiblity: true,
            selectedValue: '',
        };
    }

    componentWillMount = () => {
        if (this.props.placeholder && !this.props.defaultValue) {
            this.setState({
                toggleVisiblity: true,
            })
        } else {
            this.setState({
                selectedValue: this.props.defaultValue,
                toggleVisiblity: false,
            })
        }
    }

    handleClick = (e) => {
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

        this.handleClick(e);
    }
    handleListClick = (value, key) => {
        this.setState({
            selectedValue: value,
            toggleVisiblity: false,
        });
        this.props.onclick(value, key);
    }
    renderList = () => {
        return this.props.optionList.map((value, key) => {
            return <li key={key} className="list" onClick={(e) => this.handleListClick(value, key)}>
                {value}
            </li>
        })
    }

    render() {

        return (
            <div className="popover-container" onClick={(event)=>{this.props.disableClick?event.preventDefault():this.handleClick()}} ref={node => { this.node = node; }}>
                <div className={this.props.error ? "selection-error-placeholder" : "selection-placeholder"} style={{ display: this.state.toggleVisiblity ? 'block' : 'none' }}>{this.props.placeholder}</div>
                <div style={{ color: '#030303', display: this.state.toggleVisiblity ? 'none' : 'block' }}>{this.state.selectedValue}</div>
                <div className='arrow-container'>
                    <div className={this.state.baseClass}>
                        <div className='arrow-down-outer'></div>
                        <div className='arrow-down-inner'></div>
                    </div>
                </div>
                {this.state.popupVisible && (
                    <ul className="popover">
                        <li className="list" style={{cursor:'not-allowed',opacity:'0.3'}}>{this.props.placeholder}</li>
                        {this.renderList()}
                    </ul>
                )}
            </div>
        )
    }
}
export class SelectionBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false,
            baseClass: 'arrow-div',
            toggleVisiblity: true,
            selectedValue: '',
        };
    }

    componentWillMount = () => {
        if (this.props.placeholder) {
            this.setState({
                toggleVisiblity: true,
            })
        } else {
            this.setState({
                toggleVisiblity: false,
            })
        }
    }

    
    renderList = () => {
        return this.props.optionList.map((value, key) => {
            return <li className="list" 
                onClick={()=>this.props.handleListClick(value, key)}
                
                >
                {value}
            </li>
        })
    }

    render() {

        return (
            <div className="popover-container" 
            
                //onClick={this.handleClick} 
                onClick={this.props.handleClick} 
                //ref={node => { this.node = node; }}
                ref={this.props.refvalue}>
                <div className={this.props.error ? "selection-error-placeholder" : 
                    "selection-placeholder"} 
                    style={{ 
                        display: this.props.toggleVisiblity ? 'block' : 'none' }}
                >{this.props.placeholder}</div>
                <div style={{ color: '#030303', 
                        display: this.props.toggleVisiblity ? 'none' : 'block' }}
                >{this.props.selectedValue}</div>
                <div className='arrow-container'>
                    <div className={this.props.baseClass}>
                        <div className='arrow-down-outer'></div>
                        <div className='arrow-down-inner'></div>
                    </div>
                </div>
                {this.props.popupVisible && (
                    <ul className="popover">
                        {this.renderList()}
                    </ul>
                )}
            </div>
        )
    }
}

export class SelectContent extends Component {
    render() {
        return (
            <div className="subcomponent-spacing">
                <Row>
                    <Col md={1} className="form-label" style={{lineHeight:'48px'}}>{this.props.count}.</Col>
                    <Col md={11}>
                        <Selection 
                            optionList={this.props.optionList}
                            error={this.props.error}
                            placeholder={this.props.placeholder}
                            disableClick={this.props.disableClick}
                            defaultValue={this.props.defaultValue}
                            onclick={(value,key)=>this.props.onSelectionClick(value,key)} />
                        <textarea
                            rows={3}
                            readOnly={this.props.textAreaReadOnly}
                            value={this.props.textAreaDefaultValue}
                            className={this.props.error ? 'Error-link-textares' : 'about-link-textares'}  
                            style={{ width: '100%' }}
                            placeholder="Write all the modules in Social (if Social  is selected) you have worked upon. Ex - chronological feed about updates from friends/connections"
                            onChange={(e) => this.props.onTextAreaClick(e)} />
                    </Col>
                </Row>
            </div>
        )
    }
}


export class SelectMultiple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false,
            baseClass: 'arrow-div',
            toggleVisiblity: true,
            selectedList: [],
            containerClass: 'popover-container',
            optionList: [],
            mainContainer:'popover-container',
        };
    }
    count = 0;
    componentWillMount = () => {
        this.temp=this.props.optionList;
        // if(this.props.defaultValue.length>0){
        //     this.props.defaultValue.map((value1,key1)=>{
        //         this.temp.map((value2,key2)=>{
        //             if(value1 == value2)
        //             this.temp.splice(key2, 1)
        //         })
        //     })
        // }
        
        if (this.props.placeholder && this.props.defaultValue) {
            this.setState({
                toggleVisiblity: true,
                optionList: this.props.optionList,
               selectedList:this.props.defaultValue,
            })
        } else {
            this.setState({
                selectedValue: this.props.defaultValue,
                toggleVisiblity: false,
                optionList: this.props.optionList,
                selectedList:this.props.defaultValue
            });
            
        }
        if(this.props.defaultValue.length>0){
            this.props.defaultValue.map((value1,key1)=>{
                this.temp.map((value2,key2)=>{
                    if(value1 == value2)
                    this.temp.splice(key2, 1)
                })
            })
            this.setState({
                optionList:this.temp,
                toggleVisiblity:false,
                containerClass: 'popover-container change-width',
                mainContainer:'popover-container main-container-width',
            })
        }
        
    }

    handleClick = (e) => {
        if (!this.state.popupVisible && !this.props.defaultValue) {
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

        this.handleClick(e);
    }
    handleListClick = (value, key) => {
        this.state.optionList.splice(key, 1)
        let list = this.state.selectedList;
        list = list.concat(value);
        this.setState({
            containerClass: 'popover-container change-width',
            mainContainer:'popover-container main-container-width',
            selectedList: list,
            toggleVisiblity: false,
        });
        this.props.onclick(value, key);
    }

    handleRemoval = (value, key) => {
        //this.props.handleRemoval();
        let list = this.state.optionList;
        let removeList = this.state.selectedList;
        list = list.concat(value);
        removeList.splice(key, 1);
        this.props.handleRemoval(removeList);
        this.setState({
            optionList: list,
        });
        if (this.state.selectedList == '') {
            this.setState({
                toggleVisiblity: true,
                baseClass: 'arrow-div',
                containerClass: 'popover-container',
                mainContainer:'popover-container',
            })

        }
    }
    renderSelectedList = () => {
        // if(this.props.defaultValue.length>0){
        //     alert('greater');
        // }
        // else{
        //     alert('lower')
        // }
        
        return this.state.selectedList.map((value, key) => {
            return <div key={key} className="multiple-selection-button-container">
                <div className="multiple-selection-button">
                    <span>{value}</span>
                </div>
                <div className="cross-image" onClick={() => this.handleRemoval(value, key)}></div>
            </div>
        })
    }
    render() {
       
            let renderList = () => {
            return this.state.optionList.map((value, key) => {
                return <li className="list" key={key} onClick={(e) => this.handleListClick(value, key)}>
                    {value}
                </li>
            })
        }

        return (
            <div style={{ display: 'flex', flexWrap:'wrap', width: this.props.width}}>
                {this.renderSelectedList()}
                <div className={this.state.mainContainer} onClick={this.handleClick} ref={node => { this.node = node; }}>
                    <div className={this.state.containerClass}>
                        <div className={this.props.error ? "selection-error-placeholder" : "selection-placeholder"} style={{ display: this.state.toggleVisiblity ? 'block' : 'none' }}>{this.props.placeholder}</div>
                        <div style={{ color: '#030303', display: this.state.toggleVisiblity ? 'none' : 'block' }}></div>
                        <div className='arrow-container'>
                            <div className={this.state.baseClass}>
                                <div className='arrow-down-outer'></div>
                                <div className='arrow-down-inner'></div>
                            </div>
                        </div></div>
                    {this.state.popupVisible && (
                        <ul className="popover">
                            <li className="list" style={{cursor:'not-allowed',opacity:'0.3'}}>{this.props.placeholder}</li>
                            {renderList()}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

export class SelectMultipleBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multiSelectPopupVisible: false,
            baseClass: 'arrow-div',
            toggleVisiblity: true,
            selectedList: [],
            containerClass: 'popover-container',
            optionList: [],
        };
    }
    count = 0;
    componentWillMount = () => {
        if (this.props.placeholder) {
            this.setState({
                toggleVisiblity: true,
                optionList: this.props.optionList,
            })
        } else {
            this.setState({
                selectedValue: this.props.defaultValue,
                toggleVisiblity: false,
                optionList: this.props.optionList,
            })
        }
    }

    handleClick = (e) => {
        if (!this.state.multiSelectPopupVisible) {
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
            multiSelectPopupVisible: !prevState.multiSelectPopupVisible,
        }));
    }

    handleOutsideClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }

        this.handleClick(e);
    }
    handleListClick = (value, key) => {
        this.state.optionList.splice(key, 1)
        let list = this.state.selectedList;
        list = list.concat({
            value,
        })
        this.setState({
            containerClass: 'popover-container change-width',
            selectedList: list,
            toggleVisiblity: false,
        });
        this.props.onclick(value, key);
    }
    handleRemoval = (value, key) => {
    
        let list = this.state.optionList;
        let removeList = this.state.selectedList;
        list = list.concat(value);
        removeList.splice(key, 1);
        this.setState({
            optionList: list,
        });
        if (this.state.selectedList == '') {
            this.setState({
                toggleVisiblity: true,
                baseClass: 'arrow-div',
                containerClass: 'popover-container',
            })

        }
    }
    renderSelectedList = () => {
        return this.state.selectedList.map((value, key) => {
            return <div key={key} className="multiple-selection-button-container">
                <div className="multiple-selection-button">
                    <span>{value.value}</span>
                </div>
                <div className="cross-image" 
                    onClick={() =>this.props.handleRemoval()}></div>
            </div>
        })
    }
    render() {
        let renderList = () => {
            return this.state.optionList.map((value, key) => {
                return <li className="list" 
                    onClick={(e) => this.handleListClick(value, key)}>
                    {value}
                </li>
            })
        }

        return (
            <div style={{ display: '-webkit-box', width: this.props.width }}>
                {this.renderSelectedList()}
                <div className='popover-container' onClick={this.handleClick} ref={node => { this.node = node; }}>
                    <div className={this.state.containerClass}>
                        <div className={this.props.error ? "selection-error-placeholder" : "selection-placeholder"} style={{ display: this.state.toggleVisiblity ? 'block' : 'none' }}>{this.props.placeholder}</div>
                        <div style={{ color: '#030303', display: this.state.toggleVisiblity ? 'none' : 'block' }}></div>
                        <div className='arrow-container'>
                            <div className={this.state.baseClass}>
                                <div className='arrow-down-outer'></div>
                                <div className='arrow-down-inner'></div>
                            </div>
                        </div></div>
                    {this.state.multiSelectPopupVisible && (
                        <ul className="popover">
                            {renderList()}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}
