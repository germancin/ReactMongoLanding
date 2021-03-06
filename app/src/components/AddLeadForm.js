import React, {Component} from 'react';
import {FormGroup, FormControl, Row, Col, Grid, Button} from 'react-bootstrap';
import styled from 'styled-components';
import {addLead, getLeads} from '../actions'
import {connect} from 'react-redux';
import {isBrowser, isMobile} from 'react-device-detect';


class AddLeadForm extends Component {

    state = {
        name: '',
        lastname: '',
        email: '',
        phone: '',
        formErrors: {phone: '', email: ''},
        emailValid: false,
        phoneValid: false,
        formValid: false,
        deleting: false,
    };

    componentDidMount() {
        const el = document.querySelector(".register-btn");

        if(isMobile){
            el.addEventListener('touchstart', this.addLead, false);
        } else{
            el.addEventListener('click', this.addLead, false);
        }

        this.props.getLeads();
    }

    updateField = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let phoneValid = this.state.phoneValid;

        switch(name) {
            case 'phone':
                phoneValid = value.match(/^[0-9\-]+$/);
                fieldValidationErrors.phone = (phoneValid === null) ? ' Invalid format.' : '';

                if(value.length > 12) return false;

                if(phoneValid !== null && value.length <= 12 && !this.state.deleting) {

                    let formattedPhone = value.split('').map((char, i) => {

                                    if(value.length === 3 && i === 2) {
                                        return char + '-';
                                    } else if (value.length === 7 && i === 6) {
                                        return char + '-';
                                    }
                                    return char;

                                }).join('');

                    value = formattedPhone;
                }
                break;
            // case 'email':
            //     console.log('email',value);
            //     emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            //     fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            //     break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                       emailValid: emailValid,
                       phoneValid: phoneValid
        }, this.validateForm);

        this.setState({
            [name]: value
        });
    };

    onKeyDown = (e) => {
        if (e.keyCode === 8) {
            this.setState({deleting: true});
        }else{
            this.setState({deleting: false});
        }
    };

    validateForm() {
        // this.setState({formValid: this.state.emailValid && this.state.phoneValid});
        this.setState({formValid: this.state.phoneValid});
    }

    addLead = () => {
        this.props.addLead(this.state);
    };

    render() {
        return (
            <CreateNewLeadFormContainer>
                {(this.props.registered)? this.props.history.push('/') : ''}
                <Grid>
                    <Row className="form-title">
                        <Col md={12}>
                            <h1 className={'top-title'}>Registration</h1>
                            {/*<img src={'img/latina-logo.jpg'} className={'reg-logo'} />*/}
                        </Col>
                    </Row>

                    {(this.props.error.type === 'duplicate')
                        ?
                            <div className={"alert alert-danger"}>
                                The <strong> {this.props.error.field} </strong> seems to be duplicated.
                            </div>
                        :''
                    }

                    <Row>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={12} className={"col-up"}>
                                    <form className={'form'}>
                                        <FormGroup>
                                            <table className={"table-names"}>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <FormControl
                                                                type="text"
                                                                value={this.state.name}
                                                                placeholder="Name"
                                                                onChange={this.updateField}
                                                                name={"name"}
                                                            />
                                                        </td>
                                                        <td>
                                                            <FormControl
                                                                type="text"
                                                                value={this.state.lastname}
                                                                placeholder="Last Name"
                                                                onChange={this.updateField}
                                                                name={"lastname"}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br/>
                                            {this.state.formErrors.phone}
                                            <FormControl
                                                type="text"
                                                value={this.state.phone}
                                                placeholder="Phone"
                                                onKeyDown={this.onKeyDown}
                                                onChange={this.updateField}
                                                name={"phone"}
                                            />
                                            <br/>
                                            <FormControl
                                                type="text"
                                                value={this.state.email}
                                                placeholder="Email"
                                                onChange={this.updateField}
                                                name={"email"}
                                            />

                                            <div className={"btn-register"}>
                                                <FormControl
                                                    type="button"
                                                    className={"register-btn btn btn-primary btn-text btn-side"}
                                                    value="Register"
                                                    disabled={!this.state.formValid}
                                                />
                                            </div>
                                        </FormGroup>
                                    </form> <br/><br/>
                                </Col>
                            </Row>
                        </Grid>
                    </Row>
                </Grid>
            </CreateNewLeadFormContainer>

        )}

}

const mapStateToProps = state => {
    const {leads_reducer} = state;
    return {
        leadsM: leads_reducer.leads,
        saved: leads_reducer.saved,
        error: leads_reducer.error,
        registered: leads_reducer.registered,
    };
};

export default connect(mapStateToProps, {addLead, getLeads})(AddLeadForm);

const CreateNewLeadFormContainer = styled.div`
    text-align:left;

    input {
        border-radius: 5px;
        height:60px;
        font-size:20px;
    }
        
    .btn-register {
        text-align:left;
        margin-top:20px;
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
    
    .form-title {
        border:0px solid black;
        text-align:center;
        padding-top:0px;
    }
    
    .table-names {
        width:100%;
    }
    
    .reg-logo {
        width:350px;
        display:block;
        margin:auto;
    }

`;