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
import Politics from './politics';
import Business from './business';
import Technology from './technology';
import Sports from './sports';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class World extends Component {

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
          'https://nodeserver-env.eba-dtbeadtp.us-east-2.elasticbeanstalk.com/world'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
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

    componentDidMount() {
   // useEffect(() => {
          // const url =
          // 'https://nodeserver-env.eba-dtbeadtp.us-east-2.elasticbeanstalk.com/world'

          const url =
          'https://content.guardianapis.com/world?api-key=ee45af7a-ea6c-49ca-8925-25269dab0e0d&show-blocks=all'

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
    }

    componentDidUpdate(previousProps, previousState) {
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
    }

    render() {
        return(
            <div>
            {this.state.loading ? <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <div className="d-flex justify-content-center sweet-loading" >
                            <BounceLoader color={"blue"} size={30} loading={this.state.loading}/>
                        </div>
                        <div className="d-flex justify-content-center">Loading</div>
                    </div>
                                    : <span></span>
                    }
                {this.state.data.map((item, i) => {
                    try {
                        return(
                                <div className="flex-container-column col-lg-12 col-xs-12" >
                                {/*<div className="card-column" onClick={() => history.push('/article?id=' + item.id)}> */}
                                <a href={item.webUrl}>
                                  <div className="card-column">
                                        <div className="flex-container">
                                                <img className="small" src= {item.blocks.main.elements[0].assets[5].file}          alt="Avatar"></img>
                                            <div className="container">
                                                <h6><b>{item.webTitle}<MdShare /></b></h6>
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
                                <div className="flex-container-column" >

                                {/*<div className="card-column" onClick={() => history.push('/article?id=' + item.id)}> */}
                                <a href={item.webUrl}>
                                  <div className="card-column">
                                        <div className="flex-container">
                                            <img className="small" src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" alt="Avatar">
                                            </img>
                                            <div className="container">
                                                <h6 key={i}><b>{item.webTitle}<MdShare  /></b></h6>
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
                    try{
                        return(
                                <div className="flex-container-column">
                                    <div className="card-column">
                                        <div className="flex-container">
                                            <img className="small" src= {item.multimedia[0].url} alt="Avatar">
                                            </img>
                                            <div className="container">
                                                <h6 key={i}><b>{item.title}</b></h6>
                                                <p className="truncate">{item.abstract} </p>
                                                <div className="date">{(item.published_date).split("T")[0]}
                                                    <span className="section">{item.section}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    catch {
                            return(
                                <div className="flex-container-column">
                                    <div className="card-column">
                                        <div className="flex-container">
                                            <img className="small" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" alt="Avatar">
                                            </img>
                                            <div className="container">
                                                <h6 key={i}><b>{item.title}</b></h6>
                                                <p className="truncate">{item.abstract} </p>
                                                <div className="date">{(item.published_date)}
                                                    <span className="section">{item.section}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
    )}
}
export default World;
