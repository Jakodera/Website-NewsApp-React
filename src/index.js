import React, { Component, useEffect, history } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, NavItem, Navbar, Badge, Nav, Form, Modal, FormControl}from 'react-bootstrap';
import { HashRouter, BrowserRouter as Router, Link, NavLink, Route, useParams, Redirect, useHistory, withRouter } from "react-router-dom";
import Switch from "react-switch";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { IconContext } from "react-icons";
import { FaRegBookmark } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon,} from "react-share";
import Select from 'react-select';
import commentBox from 'commentbox.io';
import { browserHistory } from "react-router";


import hisotry from 'history';
import Detailed from './Detailed';
import World from './world';
import Politics from './politics';
import Business from './business';
import Technology from './technology';
import Sports from './sports';
import SelectedResult from "./SelectedResult";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const options = [
          // { label: "Alligators"},
          // { label: "Crocodiles"},
          // { label: "Sharks"},
          // { label: "Small crocodiles"},
          // { label: "Smallest crocodiles"},
          // { label: "Snakes"},
        ];

class App extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        selectedOption: null,
        loading: true,
        checked: true,
        isGuardian: true,
        redirect: false,
        data : Array(10),
         url:
          'https://nodeserver-env.eba-dtbeadtp.us-east-2.elasticbeanstalk.com/guardian',
        results: [],
        selectedResult: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    //this.clicktHandler = this.clickHandler.bind(this);
    //this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
        this.setState(prevState => {
            return {
                isGuardian: !prevState.isGuardian
            }
        })
    }

    search(){
        const history = useHistory();
    }

    handleSelectChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption.label);
        //this.props.history.push('/search?q=' + selectedOption.label);
    };

    handleSearchChange = async (event, { value }) => {
    try {
      const response = await fetch(
        `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${value}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "dfbb02ad361c4911a4931729123445ed"
          }
        }
      );
      const data = await response.json();
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map(result => ({ title: result.displayText, url: result.url }));
      this.setState({ results });
    } catch (error) {
      console.error(`Error fetching search ${value}`);
    }
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ selectedResult: result });

//    clickHandler = () => {
//     //   return <Redirect to="/RedirectPage"/>
//
//         //return  <Redirect  to="/RedirectPage/" />
//    this.setState({redirect:true});
//
//   }

//    state = {
//    data: [],
//  }

    componentDidMount() {
   // useEffect(() => {
        //const url ='https://nodeserver-env.eba-dtbeadtp.us-east-2.elasticbeanstalk.com/guardian'
        const url = 'https://content.guardianapis.com/search?api-key=ee45af7a-ea6c-49ca-8925-25269dab0e0d&section=(sport|business|technology|politics)&show-blocks=all'
        fetch(url)
            .then(result => result.json())
            .then(result => {
            this.setState({
                data: result.response.results,
                //data: result.results,
                error: false,
                loading: false
            })
        })
        .then((data) => {
                console.log('DidMount Success:', this.state.data);
            })
            .catch((error) => {
              console.error('DidMount Error:', error);
            });
        this.removeCommentBox = commentBox('5726633155624960-proj');

      //console.log(this.state.url)
//        const url =
//          'https://content.guardianapis.com/search?api-key=ee45af7a-ea6c-49ca-8925-25269dab0e0d&section=(sport|business|technology|politics)&shsow-blocks=all'
//        fetch(this.state.url)
//            .then(result => result.json())
//            .then(result => {
//            this.setState({
//                data: result.response.results,
//                //data: result.results,
//                error: false,
//            })
//          // console.log(result.response.results);
//          })
  //  });
//      console.log(this.state.isGuardian)
//      console.log(this.state.url)
//      console.log(this.state.data)
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    componentDidUpdate(previousProps, previousState) {
      //let { id } = useParams();
//        if (previousProps.data !== this.props.data){
//        if(this.state.isGuardian) {
//            const url = 'https://nodeserver-env.eba-dtbeadtp.us-east-2.elasticbeanstalk.com/guardian'
//        fetch(url)
//            .then(result => result.json())
//            .then(result => {
//            this.setState({
//                data: result.response.results,
//                //data: result.results,
//                error: false
//            })
//          })
//            .then((data) => {
//                console.log('Guardian Success:', data);
//            })
//            .catch((error) => {
//              console.error('Error:', error);
//            });
//        }

        if(!this.state.isGuardian) {
            const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=EEuZfMvMGqu7Ld2TEG23sQ030E4VhBU3'
            fetch(url)
                .then(result => result.json())
                .then(result => {
                this.setState({
                    //data: result.response.results,
                    data: result.results,
                    error: false
                })
            })
            .then((data) => {
                console.log(' DidUpdate NYT Success:', this.state.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            }
//        }
    }

//   componentWillReceiveProps(nextState){
//          if (this.state.isGuardian == nextState.isGuardian) {
//            this.setState(this.state.isGuardian = true);
//        }
//    }

     componentDidUnmount() {
   // useEffect(() => {

     }

    render() {
        const { selectedOption } = this.state;
//        const HomePage = () => {
//            return (
//                <div>
//                    {data.map((item, i) => {
//                        try {
//                            return(
//                                <div className="flex-container-column">
//                                    <div className="card-column">
//                                        <div className="flex-container">
//                                            <img className="small" src= {item.blocks.main.elements[0].assets[5].file}          alt="Avatar">
//                                            </img>
//                                            <div className="container">
//                                                <h6 key={i}><b>{item.webTitle}</b></h6>
//                                                <p className="truncate">{item.blocks.body[0].bodyTextSummary} </p>
//                                                <div className="date">{(item.webPublicationDate).split("T")[0]}
//                                                    <span className="section">{item.sectionId}</span>
//                                                </div>
//                                            </div>
//                                        </div>
//                                    </div>
//                                </div>
//                            )
//                        }
//                        catch {
//                            return(
//                                <div className="flex-container-column">
//                                    <div className="card-column">
//                                        <div className="flex-container">
//                                            <img className="small" src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" alt="Avatar">
//                                            </img>
//                                            <div className="container">
//                                                <h6 key={i}><b>{item.webTitle}</b></h6>
//                                                <p className="truncate">{item.blocks.body[0].bodyTextSummary} </p>
//                                                <div className="date">{(item.webPublicationDate).split("T")[0]}
//                                                    <span className="section">{item.sectionId}</span>
//                                                </div>
//                                            </div>
//                                        </div>
//                                    </div>
//                                </div>
//                            )
//
//                        }
//
//                    }
//                    )}
//                </div>
//            )
//
//        };
        const SearchPage = () => {
            return (
                <h3>Results</h3>
            );
        };

        const FavoritesPage = () => {
            return (
                <h3>Favorites</h3>
            );
        };

        const DetailedtPage = () => {
            console.log("hi")
            return (
                <div className="flex-container-column" >

                    <div className="card-column">
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
                                    <div className="commentbox" />
                                    </div>
                                </div>
                            </div>


            );
        };

        const HomePage = () => {
            const [show, setShow] = React.useState(false);
            const handleClose = () => setShow(false);
            const handleShow = (event) => {setShow(true);
                event.stopPropagation()
                event.preventDefault();
            }
            const history = useHistory();

            if(this.state.isGuardian) {
                console.log(this.state.isGuardian)
                return (
                    <div>

                    {this.state.loading ? <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <div className="d-flex justify-content-center sweet-loading" >
                            <BounceLoader color={"blue"} size={30} loading={this.state.loading}/>
                        </div>
                        <div className="d-flex justify-content-center">Loading</div>
                    </div>
                                    : <span></span>
                    }
                    {/*                    <div>
                        <div className="d-flex justify-content-center sweet-loading" >
                            <BounceLoader color={"blue"} size={30} loading={this.state.loading}/>
                        </div>
                        <div className="d-flex justify-content-center">Loading</div>
                    </div> */}


                    {this.state.data.slice(0, 10).map((item, i) => {
                        try {
                            return(

                                <div className="flex-container-column col-lg-12 col-xs-12" >
                                     <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                          <Modal.Title><h5>{item.webTitle}</h5></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="ModalBody">
                                            <div><h5>Share via</h5></div>
                                            <FacebookShareButton url={item.webUrl}>
                                                <FacebookIcon round={true} />
                                            </FacebookShareButton>       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <TwitterShareButton url={item.webUrl}>
                                                <TwitterIcon round={true} />
                                            </TwitterShareButton> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <EmailShareButton url={item.webUrl}>
                                                <EmailIcon round={true} />
                                            </EmailShareButton>
                                        </Modal.Body>
                                      </Modal>
                                  {/*<div className="card-column" onClick={() => history.push('/article?id=' + item.id)}> */}
                                  <a href={item.webUrl}>
                                    <div className="card-column">
                                        <div className="flex-container">
                                                <img className="small" src= {item.blocks.main.elements[0].assets[5].file}          alt="Avatar"></img>
                                            <div className="container">
                                                <h6><b>{item.webTitle}<MdShare onClick={handleShow} /></b></h6>
                                                <p className="truncate">{item.blocks.body[0].bodyTextSummary} </p>
                                                <div className="date">{(item.webPublicationDate).split("T")[0]}
                                                    <span className="section">
                                                        {(() => {
                                                            switch (item.sectionId) {
                                                                case "world":   return <span><Badge variant="primary"> {item.sectionId}</Badge></span>;
                                                                case "politics":   return <span><Badge variant="info"> {item.sectionId}</Badge></span>;
                                                                case "business":   return <span><Badge variant="secondary"> {item.sectionId}</Badge></span>;
                                                                case "technology":   return <span><Badge variant="success"> {item.sectionId}</Badge></span>;
                                                                case "sport":   return <span><Badge variant="warning"> {item.sectionId}s</Badge></span>;
                                                            }
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div></a>
                                </div>
                            )
                        }
                        catch {
                            return(
                                <div className="flex-container-column col-lg-12 col-xs-12" >
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                          <Modal.Title><h5>{item.webTitle}</h5></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="ModalBody">
                                            <div><h5>Share via</h5></div>
                                            <FacebookShareButton url={item.webUrl}>
                                                <FacebookIcon round={true} />
                                            </FacebookShareButton>       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <TwitterShareButton url={item.webUrl}>
                                                <TwitterIcon round={true} />
                                            </TwitterShareButton> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <EmailShareButton url={item.webUrl}>
                                                <EmailIcon round={true} />
                                            </EmailShareButton>
                                        </Modal.Body>
                                      </Modal>
                                      {/*<div className="card-column" onClick={() => history.push('/article?id=' + item.id)}> */}
                                      <a href={item.webUrl}>
                                        <div className="card-column">
                                        <div className="flex-container">
                                            <img className="small" src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" alt="Avatar">
                                            </img>
                                            <div className="container">
                                                <h6 key={i}><b>{item.webTitle}<MdShare onClick={handleShow}  /></b></h6>
                                                <p className="truncate">{item.blocks.body[0].bodyTextSummary} </p>
                                                <div className="date">{(item.webPublicationDate).split("T")[0]}
                                                    <span className="section">
                                                        {(() => {
                                                            switch (item.sectionId) {
                                                                case "world":   return <span><Badge variant="primary"> {item.sectionId}</Badge></span>;
                                                                case "politics":   return <span><Badge variant="info"> {item.sectionId}</Badge></span>;
                                                                case "business":   return <span><Badge variant="secondary"> {item.sectionId}</Badge></span>;
                                                                case "technology":   return <span><Badge variant="success"> {item.sectionId}</Badge></span>;
                                                                case "sport":   return <span><Badge variant="warning"> {item.sectionId}s</Badge></span>;
                                                            }
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div></a>
                                </div>
                            )

                        }

                    }
                    )}
                </div>
                )
            }

            if(!this.state.isGuardian)   {
                console.log(this.state.isGuardian)
                return (
                    <div>
                    {this.state.loading ? <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <div className="d-flex justify-content-center sweet-loading" >
                            <BounceLoader color={"blue"} size={30} loading={this.state.loading}/>
                        </div>
                        <div className="d-flex justify-content-center">Loading</div>
                    </div>
                                    : <span></span>
                    }
                    {this.state.data.slice(0, 10).map((item, i) => {
                     // console.log(this.state.data)
                     console.log("try")
                        try {
                            return(
                                <div className="flex-container-column" >
                                     <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                          <Modal.Title><h5>{item.title}</h5></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="ModalBody">
                                            <div><h5>Share via</h5></div>
                                            <FacebookIcon round={true} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <TwitterIcon round={true} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <EmailIcon round={true} />
                                        </Modal.Body>
                                      </Modal>
                                    <div className="card-column" onClick={() => history.push('/article?id=' + item.id)} >
                                        <div className="flex-container">
                                            <div>
                                            <img className="small" src= {item.multimedia[0].url} alt="Avatar">
                                            </img>
                                            </div>
                                            <div className="container">
                                                <h6 key={i}><b>{item.title}<MdShare onClick={handleShow} /></b></h6>

                                                <p className="truncate">{item.abstract} </p>
                                                <div className="date">{(item.published_date).split("T")[0]}
                                                    <span className="section">
                                                        {(() => {
                                                            switch (item.section) {
                                                                case "world":   return <span><Badge variant="primary"> {item.section}</Badge></span>;
                                                                case "politics":   return <span><Badge variant="info"> {item.section}</Badge></span>;
                                                                case "business":   return <span><Badge variant="secondary"> {item.section}</Badge></span>;
                                                                case "technology":   return <span><Badge variant="success"> {item.section}</Badge></span>;
                                                                case "sport":   return <span><Badge variant="warning"> {item.section}s</Badge></span>;
                                                                default:      return <span><Badge variant="danger"> {item.section}</Badge></span>;
                                                            }
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        catch {
                           // console.log(this.state.data)
                            console.log("catch")
                            return(
                                <div className="flex-container-column" >
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                          <Modal.Title><h5>{item.title}</h5></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="ModalBody">
                                            <div><h5>Share via</h5></div>
                                            <FacebookIcon round={true} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <TwitterIcon round={true} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <EmailIcon round={true} />
                                        </Modal.Body>
                                      </Modal>
                                    <div className="card-column" onClick={() => history.push('/article?id=' + item.id)}>
                                        <div className="flex-container">
                                            <img className="small" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" alt="Avatar">
                                            </img>
                                            <div className="container">
                                                <h6 key={i}><b>{item.title}<MdShare onClick={handleShow} /></b></h6>
                                                <p className="truncate">{item.abstract} </p>
                                                <div className="date">{(item.published_date)}
                                                    <span className="section">
                                                        {(() => {
                                                            switch (item.section) {
                                                                case "world":   return <span><Badge variant="primary"> {item.section}</Badge></span>;
                                                                case "politics":   return <span><Badge variant="info"> {item.section}</Badge></span>;
                                                                case "business":   return <span><Badge variant="secondary"> {item.section}</Badge></span>;
                                                                case "technology":   return <span><Badge variant="success"> {item.section}</Badge></span>;
                                                                case "sport":   return <span><Badge variant="warning"> {item.section}s</Badge></span>;
                                                                default:      return <span><Badge variant="danger"> {item.section}</Badge></span>;
                                                            }
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                    )};
                </div>
            )};
        };
//        function Child() {
//          // We can use the `useParams` hook here to access
//          // the dynamic pieces of the URL.
//          let { id } = useParams();
//            const url =
//                  'https://content.guardianapis.com/{id}?api-key=ee45af7a-ea6c-49ca-8925-25269dab0e0d&show-blocks=all'
//
//////             state = {
//////                data: [],
//////              }
//////
//////              // Code is invoked after the component is mounted/inserted into the DOM tree.
//////              componentDidMount() {
////
//////
//////                fetch(url)
//////                    .then(result => result.json())
//////                    .then(result => {
//////                    this.setState({
//////                        data: result.response.results,
//////                        error: false
//////                    })
//////                  // console.log(result.response.results);
//////                  })
//////              };
//////
////
////
////
//          return (
//
//            <div>
//              <h3>ID: "https://content.guardianapis.com/{id}?api-key=ee45af7a-ea6c-49ca-8925-25269dab0e0d&show-blocks=all" </h3>
//            </div>
//          );
//        }
// console.log(data)
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } //else if (!isLoaded) {
          //return <div>Loading...</div>;
        //}
        else {
            return (
                <div>
                    <HashRouter history={browserHistory}>
                        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className="gradient">
                            <Select options={options} placeholder="Enter Keyword..." className="select" value={selectedOption}
                                onChange={this.handleSelectChange}/>

                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            {/*
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            </Form>
                            */}
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/" href='/'activeClassName="selected">Home</Nav.Link>
                                <Nav.Link as={NavLink} to="/world" href='/world'>World</Nav.Link>
                                <Nav.Link as={NavLink} to="/politics" href='/politics'>Politics</Nav.Link>
                                <Nav.Link as={NavLink} to="/business" href='/business'>Business</Nav.Link>
                                <Nav.Link as={NavLink} to="/technology" href='/technology'>Technology</Nav.Link>
                                <Nav.Link as={NavLink} to="/sports" href='/sports'>Sports</Nav.Link>
                            </Nav>
                            <IconContext.Provider value={{ color: 'white', size: '18px' }}>
                                {/*<div className="bookmark">
                                    <NavLink to="/favorites" href='/favorites'> <FaRegBookmark /> </NavLink>
                                </div>*/}
                            </IconContext.Provider>
                            {/*<div className="switch">NYTimes</div>
                                <Switch
                                   // on="isGuardian" off="!isGuardian"
                                    checked={this.state.checked}
                                    onChange={this.handleChange}
                                    //onChange={this.componentDidMount}
                                    onColor="#1E90FF"
                                    onHandleColor="white"
                                    handleDiameter={20}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={20}
                                    width={48}
                                    className="react-switch"
                                    id="material-switch"
                                  />
                            <div className="switch">Guardian</div>*/}
                        </Navbar.Collapse>
                        </Navbar>
                        <switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/article" component={withRouter(Detailed)} />
                            <Route path="/search" component={withRouter(SearchPage)} />
                            <Route path="/favorites" component={withRouter(FavoritesPage)} />
                            <Route exact path="/world" component={World} />
                            <Route exact path="/politics" component={Politics} />
                            <Route exact path="/business" component={Business} />
                            <Route exact path="/technology" component={Technology} />
                            <Route exact path="/sports" component={Sports} />
                        </switch>
                    </HashRouter>
                </div>
            );
        }
    }
}
ReactDOM.render(
    <HashRouter>
    <App />
    </HashRouter>, document.getElementById('root'))
