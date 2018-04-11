import React, {Component} from 'react';
import styled from 'styled-components';
import AddLeadForm from './AddLeadForm';
import SavedLeadMessage from './SavedLeadMessage';
import {connect} from 'react-redux';

class Landing extends Component {
    render() {
        return (
            <LandingContainer>

                {
                    (!this.props.saved)
                    ?
                    <AddLeadForm/>
                    :
                    <SavedLeadMessage/>
                }

            </LandingContainer>
        )}
}

const mapStateToProps = state => {
    const {leads_reducer} = state;
    return {
        leadsM: leads_reducer.leads,
        saved: leads_reducer.saved,
    };
};

export default connect(mapStateToProps, {})(Landing);

const LandingContainer = styled.div`
        text-align:center;
`;