import React, {Component} from 'react';
import styled from 'styled-components';
import {FormGroup, FormControl, Row, Col, Grid} from 'react-bootstrap';
import {signInUser, sideBarStatus} from '../actions';
import {connect} from 'react-redux';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    };

    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    signInUser = () => {
        this.props.signInUser(this.state);
    };

    render() {
        return (
            <SignInContainer>
            {(this.props.userName !== '') ? this.props.history.push('/leads') : ''}
                <Grid>
                    <Row className="form-title">
                        <Col md={12}>
                            <h1 className={'top-title'}>Sign In</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={12} className={"col-up"}>
                                    <form className={'form'}>
                                        <FormGroup>
                                            <table className={"signin-table"}>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <FormControl
                                                                type="email"
                                                                value={this.state.email}
                                                                placeholder="Email"
                                                                onChange={this.updateField}
                                                                name={"email"}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <FormControl
                                                                type="password"
                                                                value={this.state.password}
                                                                placeholder="Password"
                                                                onChange={this.updateField}
                                                                name={"password"}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className={"btn-update"}>

                                                                <FormControl
                                                                    type="button"
                                                                    className={"register-btn btn btn-primary btn-text btn-side"}
                                                                    value="Register"
                                                                    onClick={this.signInUser()}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </FormGroup>
                                    </form>
                                </Col>
                            </Row>
                        </Grid>
                    </Row>

                </Grid>
            </SignInContainer>
        )}
}

const mapStateToProps = state => {
    const {users_reducer} = state;
    return {
        userName: users_reducer.userName,
        user: users_reducer.user,
    }
};

export default connect(mapStateToProps, {signInUser, sideBarStatus})(SignIn);

const SignInContainer = styled.div`
    text-align:left;
    margin-top:10px;
    
    input{
        border-radius: 0px;
        width:100%
    }
    
    .form {
        border-radius: 5px;
        border:1px solid lightgrey;
        padding:15px;
        width:60%;
        margin:0 auto;
        box-shadow: 0px 0px 5px lightblue;
        background-color:white;
    }
    
    .signin-table {
        width:100%;
    }
    
    input {
        border-radius: 5px;
        height:60px;
        font-size:20px;
    }

    .form-title {
        border:0px solid black;
        text-align:center;
        padding-top:15px;
    }
    
    .btn-update{
        text-align:left;
        margin-top:15px;
    }


`;