import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import styled from 'styled-components';
import {connect} from 'react-redux';
import Leads from './components/Leads';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import { slide as Menu } from 'react-burger-menu';
import SecureRoute from './components/SecureRoute';
import {getLeads, logOut} from './actions';

class App extends Component {

    componentDidMount() {
        if(this.props.userAuth) {
            console.log('is login', this.props.userAuth);
        }else{
            console.log('is NOT login', this.props.userAuth);
        }
        this.props.getLeads();
    }

    handleLogOut = () => {
        this.props.logOut();

    };

    render() {
        return (
            <AppContainer>
                <Router>
                    <div className="App">
                        <header className="App-header">
                            <Menu isOpen={ false }>
                                    <Link className={'sideLink'} to={'/'}>Home</Link>
                                    <Link className={'sideLink'} to={'/leads'}>Leads</Link>
                                    {(!this.props.userAuth)
                                        ?
                                        <Link className={'sideLink'} to={'/signin'}>SignIn</Link>
                                        :
                                        <div className={'sideLink'} onClick={this.handleLogOut} >Logout</div>
                                    }

                            </Menu>
                        </header>
                        <div className="App-intro">
                            <Route exact path="/" component={Landing}/>
                            <Route path="/signin" component={SignIn}/>
                            <Route path="/leads"  component={SecureRoute(Leads)}/>
                        </div>
                    </div>
                </Router>
            </AppContainer>
        );
    }
}

const mapStateToProps = state => {
    const {leads_reducer, users_reducer} = state;
    return {
        leadsM: leads_reducer.leads,
        userAuth: users_reducer.user_auth,
    };
};
export default connect(mapStateToProps, {getLeads, logOut})(App);

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
                background: #222211;
                color:white;
                text-decoration:none;
            }
`;
