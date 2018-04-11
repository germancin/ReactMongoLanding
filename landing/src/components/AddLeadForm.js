import React, {Component} from 'react';
import {FormGroup, FormControl, Row, Col, Grid} from 'react-bootstrap';
import styled from 'styled-components';
import {addLead} from '../actions'
import {connect} from 'react-redux';

class AddLeadForm extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
    };

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
            <CreateNewNoteFormContainer>
                <Grid>
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
                                    <form>
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
                                            <div className={"btn-update"} >

                                                {/*<div onClick={() => {this.addLead()}} className={'btn-side create-new'}>*/}
                                                    {/*<div className={"btn btn-primary btn-text"}> Submit </div>*/}
                                                {/*</div>*/}

                                                <FormControl
                                                    type="button"
                                                    className={"btn btn-primary btn-text btn-side"}
                                                    value="Register"
                                                    onClick={() => {this.addLead()}}
                                                    onTouchStart={this.addLead}

                                                />

                                            </div>
                                        </FormGroup>
                                    </form>
                                </Col>
                            </Row>
                        </Grid>
                    </Row>

                </Grid>
            </CreateNewNoteFormContainer>

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

const CreateNewNoteFormContainer = styled.div`
    text-align:left;
    margin-top:10px;
    
    input{
        border-radius: 0px;
        width:55%
    }
    
    textarea{
        border-radius: 0px;
        height:300px;
    }

        .title-form {
            text-align:center;
            padding:0px;
        }
        
        .btn-update{
            text-align:center;
            margin-top:15px;
        }
        
        .create-new{
            width:35%
        }

`;