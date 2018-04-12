import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import styled from 'styled-components';
import {connect} from 'react-redux';
import Leads from './components/Leads';
import Landing from './components/Landing';
import { slide as Menu } from 'react-burger-menu';

class App extends Component {
    render() {
        return (
            <AppContainer>
                <Router>
                    <div className="App">
                        <header className="App-header">

                            <Menu>
                                <Link className={'sideLink'} to={'/'}>Home</Link>
                                <Link className={'sideLink'} to={'/leads'}>Leads</Link>
                            </Menu>

                            <h1 className="App-title">Pigeons</h1>

                        </header>
                        <div className="App-intro">
                            <Route exact path="/" component={Landing}/>
                            <Route path="/leads" component={Leads}/>
                        </div>
                    </div>
                </Router>
            </AppContainer>
        );
    }
}

const mapStateToProps = state => {
    const {leads_reducer} = state;
    return {
        leadsM: leads_reducer.leads,
    };
};
export default connect(mapStateToProps, {})(App);

const AppContainer = styled.div`

    font-family: verdana;
    font-stretch: condensed;
        
        .top-bar-container{
            border:0px solid black;
            position:absolute;
            height:40px;
            margin-left:20%;
            top:15px;
            padding-left:22px;
        }
    
        .sidebar {
            border:1px solid #A0A0A0;
            background-color: #d8d8d8;
            padding:18px;
            text-align:center;
            font-weight: bold;


                .title-side{
                    text-align:left;
                    color:#4a4a4a;
                    font-size:40px;
                    line-height: 0.9em;
                    margin-bottom:30px;
                    font-stretch: condensed;
                }
        }
        
        .components-container{
            border:1px solid #C2C2C2;
            background-color: #f3f3f3;
            padding-top:60px;
            min-height: 750px;
        }
        
        .bm-burger-button {
            position: fixed;
            width: 36px;
            height: 30px;
            left: 36px;
            top: 12px;
        }
        
        /* Color/shape of burger icon bars */
        .bm-burger-bars {
          background: lightgrey;
        }
         
        /* Position and sizing of clickable cross button */
        .bm-cross-button {
          height: 24px;
          width: 24px;
        }
         
        /* Color/shape of close button cross */
        .bm-cross {
          background: #bdc3c7;
        }
         
        /* General sidebar styles */
        .bm-menu {
          background: #373a47;
          padding: 0;
          padding-top:15px;
          font-size: 1.15em;
        }
         
        /* Wrapper for item list */
        .bm-item-list {
          color: #b8b7ad;
          padding: 0.8em;
        }
         
        /* Styling of overlay */
        .bm-overlay {
          background: rgba(0, 0, 0, 0.3);
        }
        
        .sideLink {
            padding:10px;
            margin-top:5px;
            background: #222222;
            color:lightgrey;
        }
        .sideLink:hover {
                background: #222235;
                color:white;
                text-decoration:none;
            }
`;
