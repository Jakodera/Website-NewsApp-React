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
class Sports extends Component {
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
          'https://nodeserver-env.eba-dtbeadtp.us-east-2.elasticbeanstalk.com/sports'
    };
    }

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    // const url =
    //   'https://nodeserver-env.eba-dtbeadtp.us-east-2.elasticbeanstalk.com/sports'

    const url =
    'https://content.guardianapis.com/sport?api-key=ee45af7a-ea6c-49ca-8925-25269dab0e0d&show-blocks=all'

    fetch(url)
        .then(result => result.json())
        .then(result => {
        this.setState({
            data: result.response.results,
            error: false,
            loading: false
        })
      // console.log(result.response.results);
      })
  }

  render() {
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
                    {this.state.data.map((item, i) => {
                        try {
                            return(
                                <div className="flex-container-column">
                                    <div className="card-column" onClick={() => this.props.history.push('/article?id=' + item.id)}>
                                        <div className="flex-container">
                                            <img className="small" src= {item.blocks.main.elements[0].assets[5].file}          alt="Avatar">
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
                                    </div>
                                </div>
                            )
                        }
                        catch {
                            return(
                                <div className="flex-container-column">
                                    <div className="card-column" onClick={() => this.props.history.push('/article?id=' + item.id)}>
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
                                    </div>
                                </div>
                            )

                        }

                    }
                    )}
                </div>
            )
;
  }
}

export default Sports;
