import React, { Component } from 'react';
import './Styles/onboard_manifesto.scss';
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';
import {Row,Col,Grid} from 'react-bootstrap';
import TweetEmbed from 'react-tweet-embed';
 var tweet_count=0;

export default class OnboardManifesto extends Component {
  constructor(props){
    super(props);
    this.state={
         tweet_id:'918349091632963584',
         tweet_data:['918349091632963584','918349091632963588','918349091632963585',]

         }
  }
    render() {
     
        return (
            <div>
            <div >
               <div className="_heading">
                  1THING believes in ..  (The Manifesto)
                 </div> 
                 <div className="bold_border">
                     <div className="bold_border_content_top">
                    Everyone and everything has a purpose.
                   <div style={{marginTop:'8px'}}>
                    Did anybody ever consider the importance of one purposeful thing in our lives? 
                    We do a lot of things but do they all become the part of the story behind our life  satisfaction?
                   </div>
                    We are a ‘community of purpose’;
                    a group of people who believes in doing things in a purposeful and empathetic way.
                  
                    We believe things which are designed this way are always much more appealing to 
                    the soul and act as better absorbents to the mind. We admire the problem diggers,
                    the change seekers, the discoverers and ones with a purpose of bringing life to their designs.
                     <div  style={{marginTop:'8px'}}>
                     We believe that purpose is everything that matters in this life.
                     </div>
                    </div>
                    <div className="bold_border_content_bottom">
                      1THING is everything that nurtures/cultivates escalates that purpose.
                    </div>
                 </div>
                 <div className="backGr_Quotes">
                    <div className="quotes">
                       Happiness is when what you think, what you say, and what you do are in harmony.
                       <span >
                       <img className="img-circle" src={require('./Images/left-quote.svg')} />
                       <img className="img-circle" src={require('./Images/seagulls-401453_960_720.jpg')} />
                       <img className="img-circle" src={require('./Images/seagulls-401453_960_720.jpg')} />
                       <img className="img-circle" src={require('./Images/seagulls-401453_960_720.jpg')} />
                       <img className="img-circle" src={require('./Images/seagulls-401453_960_720.jpg')} />
                       <img className="img-circle" src={require('./Images/seagulls-401453_960_720.jpg')} />
                       <img className="img-circle" src={require('./Images/seagulls-401453_960_720.jpg')} />
                       <img className="img-circle" src={require('./Images/seagulls-401453_960_720.jpg')} />
                       </span>
                    </div>
                </div>
               
                
                  <div className="container-fluid1">
                    <div className="row">
                     
                      <div className="col-md-12">
                        <React_Bootstrap_Carousel
                          animation={true}
                          slideshowSpeed={7000}
                          leftIcon=''
                          rightIcon=''
                          className="carousel-fade"
                        >
                          <div style={{height:400}}>
                            <img
                              style={{width:"100%",height:"100%"}}
                              src="https://www.w3schools.com/bootstrap/la.jpg"
                            />
                            <div className="carousel-caption">
                              Image
                            </div>
                          </div>
                          <div style={{height:400,width:"100%",backgroundColor:"aqua"}}>
                            <video className="carousel-center" controls style={{width:"75%"}} height="250">
                              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
                            </video>
                            <div className="carousel-caption">
                              Video
                            </div>
                          </div>
                          <div style={{height:400,width:"100%",backgroundColor:"lightpink"}}>
                            <div className="carousel-center">
                              center Text
                            </div>
                            <div className="carousel-caption">
                              Text
                            </div>
                          </div>
                          <div style={{height:400,width:"100%",backgroundColor:"lightblue"}}>
                            <span>
                              text
                            </span>
                            <div className="carousel-caption">
                              Text
                            </div>
                          </div>
                          <div style={{height:400,width:"100%",backgroundColor:"lightblue"}}>
                            <div className="carousel-center">
                              <iframe
                                style={{width:500}}
                                height="250"
                                src="https://www.youtube.com/embed/MhkGQAoc7bc?showinfo=0"
                                frameBorder="0"
                                allowFullScreen
                              />
                            </div>
                            <div className="carousel-caption">
                              Youtube
                            </div>
                          </div>
                        </React_Bootstrap_Carousel>
                      </div>
                    
                    </div>
                  </div>
                  <div className="backGr_Quotes">
                    <div className="quotes">
                    Satisfaction lies in the effort, not in the attainment, full effort is full victory.
                    </div>
                 </div>
                 <div className="twitter_Mask">
                   <span className="tweet_box">
                     <span>
                         <TweetEmbed id={this.state.tweet_id} />
                         </span>
                         <span >
                          <img style={{cursor:'pointer'}} onClick={()=>{
                                             if(tweet_count<=10|| tweet_count<=1)
                                             {
                                              tweet_count=tweet_count+1;
                                              let  currId=tweet_count;
                                             }
                                             else{
                                               tweet_count=10-tweet_count;
                                               let currId=tweet_count;
                                             }
                                             this.setState({tweet_id:this.state.tweet_data[tweet_count]})
                                             }}
                                       width='24px' height='24px'  src={require('./Images/right-arrow.svg')}/>
                        </span>
                    </span>
                 </div>
                 </div>
                
                 </div>

        )
    }
}
