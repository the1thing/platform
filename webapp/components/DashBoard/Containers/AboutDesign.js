import React, { Component } from 'react';
import '../Styles/AboutDesign.css';
import { Row, Col, MenuItem, DropdownButton } from 'react-bootstrap';
import { Selection, SelectMultiple } from '../Components/Selection'
import { AddLink } from '../Components/AddLink';
import axios from 'axios';
import{ basepath} from '../utils/constant'
import {validateUrl} from '../utils/Methods';


// const dropdownList = (title,field,onclick)=>{
//   return (
//     <div className="input-spacing">
//       <Selection
//         placeholder={title}
//         optionList={['Existing Product','Start Afresh']}
//         onclick={(value,key)=>onclick}/>
//   </div>
//   );
// }
let DropdownList = (props) => {
    return (
        <div className="input-spacing">
            <Selection
                placeholder={props.placeholder}
                error={props.className}
                optionList={props.list}
                onclick={props.onChange} />
        </div>
    );
}

export default class AboutDesign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platforms: [],
            services: 'b',
            objective: '',
            domains: '',
            addLink: [],
            document: '',
            platformClass: false,
            servicesClass: false,
            objectiveClass: false,
            linkClass: false,
            designList: ['a', 'b'],
            objectiveList: ['New platform', 'Improve conversions', 'Improve engagement',
                'Improve retention', 'Improve overall experience', 'Improve aesthetics'],
            platformList: ['Mac App', 'Android wearable', 'Apple watch', 'VR',
                'Windows app', 'IOS app', 'Android app', 'Web app', 'Responsive web'],
            loading: false,
            edit: true,
            projectId: '',
            documentErrorVisiblity:false,
        }
    }
    // componentWillMount = () => {
    //    getAboutDesignData();
    //     //console.log("getting uuuuuuuuuuuuuu",localStorage.getItem('userName'));
    //     //console.log("getting uuuuuuuuuuuuuu",localStorage.getItem('userId'));
    //     // this.getAboutDesignData();
    // }
  
  componentWillMount = () => {
      this.getAboutDesignData()
    }
  getAboutDesignData=()=>{
    if(localStorage.getItem('projectId'))
    {
        this.setState({
            loading:true,
        })
     axios({
        method: 'get',
        url: basepath + 'project/getProjectByIds/' + localStorage.getItem('projectId') +'?stage=2',
        }).then((response) => {
        console.log("about design response",response)
        var _response=response.data;
        console.log('get about design response********', response.data);
        var _tempUserPropsal=response.data.userProposal;
        //designServices  designObjective
        this.setState({
             platforms: (_response.platform !=null )?_response.platform:[],
            services:_tempUserPropsal.designServices,
            objective:_tempUserPropsal.designObjective,
            addLink:(_tempUserPropsal.referenceLink!=null)?_tempUserPropsal.referenceLink:[],
            loading:false,
           })
           
      })
      .then((res)=>{
        console.log("design-----%%%%%%%%%-------->",this.state.platforms,this.state.services,this.state.objective,this.state.addLink)
        
        this.setState({
           
            platforms:this.state.platforms,
            services:this.state.services,
            addLink:this.state.addLink,
            objective:this.state.objective,
            loading:false,
        })
        console.log("design-----%%%%%%%%%-------->",this.state.platforms,this.state.services,this.state.objective,this.state.addLink)
        
      })
       .catch((error) => {
          console.log('get project error stage 2', error.response);
           this.setState({
             loading:false,
           })
        });
      }
     console.log("design-----%%%%%%%%%-------->",this.state.platforms,this.state.services,this.state.objective,this.state.addLink)
}

 renderClass = () => {
        if (this.state.platforms.length > 0
            && this.state.services
            && this.state.objective
            && (this.state.document || this.state.addLink.length > 0)) {
            return "Rectangle-4"
        }
    else{
        return "button-block-class"
    }
}
setStateMethod=(label,value)=>{
    this.setState({
        [label]:value,
        edit:false,
    });
}
goTo=()=>{
    console.log("platform--->",this.state.platforms)
    if(this.state.platforms.length==0){
        document.getElementById('platforms').scrollIntoView();
        window.scrollBy(0, -100); 
        this.setStateMethod('platformClass',true)
    }
    else if(!this.state.services){
        document.getElementById('services').scrollIntoView();
        window.scrollBy(0, -100); 
        this.setStateMethod('servicesClass',true)
    
    }
    else if(!this.state.objective){
        document.getElementById('objective').scrollIntoView();
        window.scrollBy(0, -100); 
        this.setStateMethod('objectiveClass',true)
    }
    else if(!this.state.addLink[0]){
        if(!this.state.document){
            this.setStateMethod('linkClass',true)
            document.getElementById('addLink').scrollIntoView();
            window.scrollBy(0, -100); 
        }
        else{
            if(validateUrl(this.state.document))
            {
                this.state.addLink.push(this.state.document)
                this.postAboutDesignData();
            }
            else{
                this.setStateMethod('documentErrorVisiblity',true)
                document.getElementById('addLink').scrollIntoView();
                window.scrollBy(0, -100); 
            }
        }
    }
    else{
        if(this.state.document){
            if(validateUrl(this.state.document))
            {
            this.state.addLink.push(this.state.document)
            this.postAboutDesignData();
            }
            else{
                this.setStateMethod('documentErrorVisiblity',true)
                document.getElementById('addLink').scrollIntoView();
                window.scrollBy(0, -100); 
            }
        }
        else
        {
            this.postAboutDesignData();
        }
       
      
     }
}
postAboutDesignData=(link_list)=>{
    axios({
        method:'put',
        url:basepath+'project/updateProjectFromWorkspace',
        data:{
            platform:this.state.platforms,
            designServices:this.state.services,
            designObjective:this.state.objective,
            referenceLink:this.state.addLink,
            projectId:localStorage.getItem('projectId'),
        },
    })
    .then((resp)=>{
        
        this.setState({
            edit:true,
        })
        this.props.openPanel();
        // window.location.reload();
        console.log("about design---------->",resp);
    })
    .catch((err)=>{
        console.log("about design  error",err)
    })
}

    render() {
        if (this.state.loading) {
            return <div>loading</div>
        }
        else return (
            <div>{console.log("design------------->",this.state.platforms,this.state.services,this.state.objective,this.state.addLink)}
                <div className="input-spacing platform-selection" id='platforms'>
                    {/********************* Select Multiple *****  */}

                    <SelectMultiple
                        width='100%'
                        placeholder="Platforms to design"
                        handleRemoval={(list) => { 
                            this.setStateMethod('edit', false) 
                            this.setStateMethod('platforms',list)
                            }}
                        defaultValue={this.state.platforms}
                        optionList={this.state.platformList}
                        error={this.state.platformClass}
                        onclick={(value, key) => {
                            let platform=[];
                            platform=this.state.platforms;
                            platform=platform.concat(value);
                            this.setStateMethod('platforms', platform)
                            this.setStateMethod('edit',false)
                        }} />
                </div>
                {/* ***************** selection dsign service  ***** */}
                <div style={{display:'none'}} className="input-spacing" id='services'>
                    <Selection
                        defaultValue={this.state.services}
                        value={this.state.services}
                        onChange={(e) => { this.handleButtonClick(e) }}
                        placeholder="Design Services"
                        optionList={this.state.designList}
                        error={this.state.servicesClass}
                        onclick={(value, key) => {
                            this.setState({
                                edit: false,
                                services: value,
                            });
                        }
                        }
                    />
                </div>
                {/* ***************** selection Design Objective  ***** */}
                <div className="input-spacing" id='objective'>
                    <Selection
                        defaultValue={this.state.objective}
                        value={this.state.objective}
                        // onChange={(e) => { this.handleButtonClick(e) }}    
                        placeholder="Design Objective"
                        optionList={this.state.objectiveList}
                        error={this.state.objectiveClass}
                        onclick={(value, key) => {
                            this.setState({
                                edit:false,
                                objective: value
                            });
                        }
                        }
                    />
                </div>
                {/* <AddLink
                
                error={this.state.scopeDocumentClass}
                placeholder="Link(s) to scope document, if any"
                onclick={(e) => {
                    
                    this.setStateMethod('document', e.target.value)
                }}
                addAnotherLink={(e) => {
                    let list = this.state.scopeDocument;
                    list = list.concat(this.state.document);
                    this.setStateMethod('scopeDocument', list)
                    this.setStateMethod('document', '')
                    this.setStateMethod('scopeDocumentClass', false)
                }} /> */}
                <AddLink
                    id='addLink'
                    defaultValue={this.state.addLink}
                    error={this.state.linkClass}
                    errorLink={this.state.documentErrorVisiblity}
                    placeholder='Link(s) to references (apps/sites you like)'
                    onclick={(e) => {
                        this.setState({document:e.target.value})
                        //if(validateUrl(e.target.value)){
                            this.setState({
                                edit:false,
                                documentErrorVisiblity:false,
                            })
                        // }
                        // else{
                        //     this.setState({
                        //         edit:true,
                        //     })
                        // }
                    }}
                    addAnotherLink={(e) => {
                        let list = this.state.addLink;
                        list = list.concat(this.state.document);
                        this.setStateMethod('addLink', list)
                        this.setStateMethod('document', '')
                        this.setStateMethod('linkClass', false)
                    }} />

                <button
                    disabled={this.state.edit}
                    onClick={() => this.goTo()}
                    className={this.renderClass()}>
                    <span className="button-title">
                        <span>NEXT</span>
                        <span><img src={require('../Images/arrow-down.svg')} /></span>
                    </span>

                    {/* <span className="button-title">DONE<span style={{marginLeft:'42px'}}><img  width='18px'height='16px' src={require('../Images/invalid-name.png')}/>  </span></span> */}
                </button>
            </div>
        )
    }
}
