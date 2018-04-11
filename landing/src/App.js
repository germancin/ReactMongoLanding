import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import styled from 'styled-components';
import {connect} from 'react-redux';
import Leads from './components/Leads';


class App extends Component {
    render() {
        return (
            <AppContainer>
                <Router>
                    <div className="App">
                        <header className="App-header">

                            <ul className="nav nav-pills">
                                <li className="disabled">
                                    <a href="/">
                                        <h1 className="App-title">Pigeons</h1>
                                    </a>
                                </li>
                                <li className="enabled">
                                    <a href="/leads"> leads</a>
                                </li>
                            </ul>

                        </header>
                        <div className="App-intro">

                            <Route exact path="/" component={Leads}/>
                            <Route exact path="/leads" component={Leads}/>
                        </div>
                    </div>
                </Router>
            </AppContainer>
        );
    }
}

const mapStateToProps = state => {
    // const {notes_reducer, users_reducer} = state;
    // console.log(state);
    return {
        searching: "here",
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
`;
