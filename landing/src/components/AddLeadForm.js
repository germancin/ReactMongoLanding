import React, {Component} from 'react';
import {FormGroup, FormControl, Row, Col, Grid, Button} from 'react-bootstrap';
import styled from 'styled-components';
import {addLead} from '../actions'
import {connect} from 'react-redux';
import {isBrowser, isMobile} from 'react-device-detect';


class AddLeadForm extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
    };

    componentDidMount() {
        const el = document.querySelector(".register-btn");

        if(isMobile){
            el.addEventListener('touchstart', this.addLead, false);
        } else{
            el.addEventListener('click', this.addLead, false);
        }

    }

    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addLead = () => {
        this.props.addLead(this.state);

    };

    render() {
        return (
            <CreateNewLeadFormContainer>
                <Grid >
                    <Row className="show-grid">
                        <Col md={6} className={"col-up"}>
                            <h3 className={'top-title'}>Welcome</h3>
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
                                            <FormControl
                                                type="text"
                                                value={this.state.name}
                                                placeholder="Name"
                                                onChange={this.updateField}
                                                name={"name"}
                                            />
                                            <br/>
                                            <FormControl
                                                // componentClass="textarea"
                                                type="text"
                                                value={this.state.email}
                                                placeholder="Email"
                                                onChange={this.updateField}
                                                name={"email"}
                                            />
                                            <br/>
                                            <FormControl
                                                type="text"
                                                value={this.state.phone}
                                                placeholder="Phone"
                                                onChange={this.updateField}
                                                name={"phone"}
                                            />
                                            <div className={"btn-register"}>
                                                <FormControl
                                                    type="button"
                                                    className={"register-btn btn btn-primary btn-text btn-side"}
                                                    value="Register"
                                                />
                                            </div>
                                        </FormGroup>
                                    </form>
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
    };
};

export default connect(mapStateToProps, {addLead})(AddLeadForm);

const CreateNewLeadFormContainer = styled.div`
    text-align:left;
    margin-top:10px;
    
    input{
        border-radius: 5px;
    }
        
    .btn-register{
        text-align:left;
        margin-top:15px;
    }
    
    .form {
        border-radius: 5px;
        border:1px solid lightgrey;
        padding:15px;
        width:90%;
        margin:0 auto;
        box-shadow: 0px 0px 5px lightblue;
    }

`;