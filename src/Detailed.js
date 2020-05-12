import React, { Component, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FormControl from 'react-bootstrap/FormControl';
import { BrowserRouter as Router, Route, Link, useParams, Redirect, useHistory, withRouter } from "react-router-dom";
import Switch from "react-switch";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import history from 'react';
import { IconContext } from "react-icons";
import { FaRegBookmark } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon,} from "react-share";
import Select from 'react-select';
import commentBox from 'commentbox.io';

import hisotry from 'history';


class Detailed extends React.Component {
    
      state = {
    data: [],
  }
      componentDidMount() {
    const url =
      'https://nodeserver-env.eba-dtbeadtp.us-east-2.elasticbeanstalk.com/guardian'

    fetch(url)
        .then(result => result.json())
        .then(result => {
        this.setState({
            data: result.response.results,
            error: false
        })
      // console.log(result.response.results);
      })
    //AMS
    this.removeCommentBox = commentBox('5736245560868864-proj');
    //localhost
    //this.removeCommentBox = commentBox('5726633155624960-proj');
  }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        console.log(this.state.data)
            return (
                <div className="flex-container-column" >                                         
                    <div className="card-column-detailed">
                        <div >
                            <div className="container">
                                <h3><i>Ventilator crisis lands Britain's manufacturers with greatest test</i></h3>
                                    <div className="detailedDate">{("2020-04-04T23:05:11Z").split("T")[0]} 
                                        <span className="share">
                                            <FacebookShareButton url={"https://www.theguardian.com/business/2020/apr/06/coronavirus-lockdown-to-hit-low-paid-young-and-women-hardest-warns-ifs"}> 
                                            <FacebookIcon round={true} size ={"30px"}/>
                                            </FacebookShareButton>       
                                            <TwitterShareButton url={"https://www.theguardian.com/business/2020/apr/06/coronavirus-lockdown-to-hit-low-paid-young-and-women-hardest-warns-ifs"}> 
                                            <TwitterIcon round={true} size ={"30px"} />
                                            </TwitterShareButton> 
                                            <EmailShareButton url={"https://www.theguardian.com/business/2020/apr/06/coronavirus-lockdown-to-hit-low-paid-young-and-women-hardest-warns-ifs"}> 
                                            <EmailIcon round={true} size ={"30px"}/>
                                            </EmailShareButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <IconContext.Provider value={{ color: 'red', size: '30px' }}>
                                            <FaRegBookmark />
                                            </IconContext.Provider> 
                                        </span>
                                    </div>
                                        <img src= {"https://media.guim.co.uk/5ad5151915cb3f40cf13c98b5311160efa59a9b0/0_0_6192_3715/6192..jpg"} alt="Avatar"  className="col-xs-12 col-sm-12 col-lg-12"></img>
                                        <p> 
                                            Keir Starmer has vowed to work with Boris Johnson “in the national interest” to guide Britain through the mounting coronavirus outbreak, after the prime minister published a letter urging leaders of opposition parties to “work together” with the government. In a phone call with the prime minister after being elected Labour leader, Starmer offered to work constructively with the prime minister and not provide “opposition for opposition’s sake”. However, with pandemic experts warning this weekend about the difficult route out of the lockdown, Starmer said he would “call out” the government over failings in its strategy. Starmer has agreed to meet the prime minister this week. Johnson remained in self-isolation on Saturday with a temperature after he contracted the virus. The pledge between the party leaders came as: • Numbers of daily new cases of Covid-19 dropped from 4,450 on Friday to a total of 3,735, leading to hopes that the disease’s spread could be levelling off. Total numbers of UK cases of the disease now stand at 41,903. An additional 708 people died. • It emerged that 212 patients in the Midlands have died after testing positive for coronavirus in the last 24 hours – more than London, which has been hit hardest so far, which had 127 deaths. • There were signs of a slight drop in public confidence in the government’s handling of the pandemic. An Opinium poll for the Observer found that approval of the government’s handling dropped from a net approval of +42% last week to +23% this week. • Michael Gove, the cabinet office minister, warned that there was evidence that the young were less compliant with social distancing orders, as he pleaded with the public to show “self-restraint” and follow the lockdown measures. • It was announced that the Queen will praise the nation for its “self-discipline” and “resolve” during the coronavirus pandemic in a rare televised address broadcast on Sunday.\nThe Cambridge University statistician, Sir David Speigelhalter, said the drop in the number of new cases gave grounds for optimism. “I am relieved. We should be seeing a flattening of the upward curve of new cases and these figures are entirely compatible with such a trend. We are beginning to see a levelling off of the disease’s spread,” he said. But as ministers plead with the public to stay home, there are concerns in Whitehall over maintaining the lockdown in the weeks ahead. One source said: “If numbers turn, front pages saying we’re winning the war, that will be tough. Broadly at the moment, no one is going outside. If that changes, it could change quickly.” There was also a warning from a leading pandemic expert that failings “ranging from lack of preparedness to complacency” meant that there was now no alternative to building immunity in the population, either through gradual infection or vaccination – which could be more than a year away. Francois Balloux, professor of computational systems biology and the director of the University College London genetics institute, said: “I personally, cannot see any viable alternative to ensuring immunity builds up in the population, through infection or vaccination. What is critical is to minimise hospital overload, to ensure mortality is kept as low as possible. There was a window of opportunity earlier in the Covid-19 pandemic, where it could have been controlled. We missed it, for various reasons, ranging from lack of preparedness to complacency. We should analyse our failings in the future, but now is not the time for blame.”\nA No 10 spokesperson responded: “As set out by the prime minister, we are working to a scientifically-led, step-by-step action plan – taking the right measures at the right time.” However, there is now an open debate in Whitehall and the scientific community about the best route out of the lockdown measures, which government advisers have suggested may need to be in place until the end of May. Professor Martin Hibberd, of the London School of Hygiene and Tropical Medicine, pointed to successful strategies employed in other countries. These have involved very large-scale testing and as much contact tracing as possible, to identify people with the virus. “This strategy was difficult to achieve at the beginning of the outbreak, because of logistic problems in testing at such a large scale and our lack of experience at large scale contact tracing,” Hibberd added. “However, we should now be able to overcome these problems.” Mark Woolhouse at Edinburgh University highlighted three key strategies for dealing with the epidemic. “Once lockdown has driven down the virus to low enough levels in the community we can go back to chasing down individual cases. At the same time we build more ICU capacity in the NHS so we can relax the lockdown without the health service being overwhelmed. And thirdly, we place new emphasis in shielding the vulnerable.” By contrast, John Edmunds, also of the London School of Hygiene and Tropical Medicine, argued that the only way to proceed was to continue with the lockdown policy for many months. “Testing on its own will not stop this epidemic,” he said. “If you want the NHS to cope then you will have to take extreme measures for a long time. There is no way out. We will have social distance for many months or hospitals will be overwhelmed. Mass testing, mass contact tracing and more technology are fine, but what we really need is a vaccine.”\nStarmer used his acceptance address to vow that the country could not go “back to business as usual” once the pandemic was under control. “This virus has exposed the fragility of our society. It’s lifted a curtain. Too many will have given too much. Some of us will have lost too much. We know in our hearts, things are going to have to change,” he said. Yesterday, Carrie Symonds, the prime minister’s pregnant partner, revealed she had spent a week in bed with the main symptoms of Covid-19, but said she was “on the mend”.
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="commentbox"  />
                                    {/*id={ARTICLE_ID}*/}
                            </div> 
                       
//                    <div>
//                        <div class="d-flex justify-content-center" >
//                            <BounceLoader color={"blue"} size={30}/>
//                        </div>
//                        <div class="d-flex justify-content-center">Loading</div>
//                    </div>
            ); 
        };
}
export default withRouter(Detailed);      