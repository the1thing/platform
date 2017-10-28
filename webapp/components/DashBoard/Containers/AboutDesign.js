import React, { Component } from 'react';
import '../Styles/AboutDesign.scss';
import { Row, Col, MenuItem,DropdownButton} from 'react-bootstrap';
import { Selection, SelectMultiple} from '../Components/Selection'
import {AddLink } from '../Components/AddLink';
import axios from 'axios';
import{ basepath} from '../utils/constant'

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
let DropdownList = (props)=>{
  return (
    <div className="input-spacing">
      <Selection
        placeholder={props.placeholder}
        error={props.className}
        optionList={props.list}
        onclick={props.onChange}/>
  </div>
  );
}

export default class AboutDesign extends Component {
  constructor(props){
    super(props);
    this.state={
      platforms:[],
      services:'',
      objective:'',
      domains:'',
      addLink:[],
      document:'',
      platformClass:false,
      servicesClass:false,
      objectiveClass:false,
      linkClass:false,
      designList:['a','b'],
      objectiveList:['New platform','Improve conversions','Improve engagement',
      'Improve retention','Improve overall experience','Improve aesthetics'],
      platformList:['Mac App','Android wearable','Apple watch','VR',
      'Windows app','IOS app','Android app','Web app','Responsive web'],
      loading:false,
      edit:true,
    }
  }
  componentWillMount = () => {
    //console.log("getting uuuuuuuuuuuuuu",localStorage.getItem('userName'));
    //console.log("getting uuuuuuuuuuuuuu",localStorage.getItem('userId'));


    this.getAboutDesignData();
}
getAboutDesignData=()=>{
    
    if(localStorage.getItem("projectId"))
    {
        this.setState({
            loading:true,
        })
    axios({
        method: 'get',
        url: basepath + 'project/getProjectByIds/' + localStorage.getItem('projectId')+'?stage=2',
    }).then((response) => {
        var _response=response.data;
      //  console.log('get about design****', response.data);
        var _tempUserPropsal=_response.userProposal;
        //designServices  designObjective
        this.setState({
            platforms: (_response.platform)?_response.platform:[],
            services:_tempUserPropsal.designServices,
            objective:_tempUserPropsal.designObjective,
            addLink:_tempUserPropsal.referenceLink,
            loading:false,
           })

    }).catch((error) => {
        console.log('get project error stage 2', error.response);
        this.setState({
            loading:false
        })
    });
   }
}

  renderClass=()=>{
<<<<<<< HEAD
    if( this.state.platforms.length>0
        && this.state.services 
        && this.state.objective
        && (this.state.document || this.state.addLink.length>0) ){
=======
    if(
        this.state.platforms.length>0
        &&
         this.state.services 
        && this.state.objective
        && (this.state.document || this.state.addLink.length>0) 
    ){
>>>>>>> 24a2cfc269bc8cda861f402c1544f676b9570902
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
    console.log("data------->",'1-->',this.state.platforms,'2-->',this.state.services,'3-->',this.state.objective,'4-->',this.state.document,'5-->',this.state.addLink)
    if(this.state.platforms.length==0){
        this.setStateMethod('platformClass',true)
    }
    else if(!this.state.services){
        this.setStateMethod('servicesClass',true)
    
    }
    else if(!this.state.objective){
        this.setStateMethod('objectiveClass',true)
    }
    else if(!this.state.document && this.state.addLink.length==0){
        this.setStateMethod('linkClass',true)
    }
    else{
        if(this.state.document){
            this.state.addLink.push(this.state.document);
            this.setState({addLink:this.state.addLink});

        }
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
                this.props.openPanel()
                console.log("about design---------->",resp);
            })
            .catch((err)=>{
                console.log("about design  error",err)
            })
    }
        console.log('ddddddd',this.state.servicesClass)
}

  render() {
    if(this.state.loading)
    {
   return <div>loading</div>
    }
    else   return (
      <div>
        <div className="input-spacing">
          {/* <SelectMultiple
                    width='100%'
                    placeholder="Platforms to design"
                    optionList={this.state.platformList}
                    error={this.state.platformClass}
                    onclick={(value,key)=>{
                        let platform=this.state.platforms;
                        platform=platform.concat({value});
                        this.setStateMethod('platforms',platform)
                    }}/> */}
                       {/********************* Select Multiple *****  */}

                       <SelectMultiple
                       width='100%'
                       placeholder="Platforms to design"
                       defaultValue={this.state.platforms}
                       optionList={this.state.platformList}
                       error={this.state.platformClass}
                       onclick={(value, key) => {
                           console.log('---------------',value)
                           this.state.platforms.push(value);
                           //let platform = this.state.domains;
                           //platform = platform.concat( value );
                        //    this.setState({platforms:this.state.platforms});
                           this.setStateMethod('platforms', this.state.platforms)
                       }} />            
        </div>
        {/* <DropdownList 
            placeholder='Design Services '
            className={this.state.servicesClass}
            list={this.state.designList}
            onChange={(value,key)=>{
                this.setStateMethod('services',value)
            }}/> */}

           {/* ***************** selection dsign service  ***** */}
           <div className="input-spacing">
           <Selection
                                defaultValue={this.state.services}
                                value={this.state.services}
                               onChange={(e) => { this.handleButtonClick(e) }}    
                                placeholder="Design Services"
                                optionList={this.state.designList}
                               // error={this.state.productTypeClass}
                                onclick={(value,key)=>{ 
                                      this.setState({
                                                services:value,
                                                });
                                  }
                                }
                           /> 
                           </div>
        {/* <DropdownList 
            placeholder='Design Objective'
            className={this.state.objectiveClass}
            list={this.state.objectiveList}
            onChange={(value,key)=>{
                this.setStateMethod('objective',value)
            }}/> */}

            {/* ***************** selection Design Objective  ***** */}
            <div className="input-spacing">
           <Selection
                                defaultValue={this.state.objective}
                                value={this.state.objective}
                              // onChange={(e) => { this.handleButtonClick(e) }}    
                                placeholder="Design Objective"
                                optionList={this.state.objectiveList}
                               // error={this.state.productTypeClass}
                                onclick={(value,key)=>{   this.setState({
                                                                    objective:value
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
           defaultValue={this.state.addLink}
            error={this.state.linkClass}
            placeholder='Link(s) to references (apps/sites you like)'
            onclick={(e)=>{
                this.setStateMethod('document',e.target.value)
            }}
            addAnotherLink={(e)=>{
                let list=this.state.addLink;
                list=list.concat(this.state.document);
                this.setStateMethod('addLink',list)
                this.setStateMethod('document','')
                this.setStateMethod('linkClass',false)
                }}/>
        
          <button   
            disabled={this.state.edit}
            onClick={()=>this.goTo()}
            className={this.renderClass()}>
            <span className="button-title">
                <span>NEXT</span>
                <span><img src={require('../Images/arrow-down.svg')}/></span>
            </span>
                
             {/* <span className="button-title">DONE<span style={{marginLeft:'42px'}}><img  width='18px'height='16px' src={require('../Images/invalid-name.png')}/>  </span></span> */}
        </button>
      </div>
    )
  }
}
