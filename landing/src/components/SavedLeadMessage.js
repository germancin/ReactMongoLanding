import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

class SavedLeadMessage extends Component {
    render() {
        return (
            <SavedLeadMessageContainer>

                Thank You <br/>
                {this.props.leadsM.name}

            </SavedLeadMessageContainer>
        )}
}

const mapStateToProps = state => {
    const {leads_reducer} = state;
    return {
        leadsM: leads_reducer.leads,
    };
};

export default connect(mapStateToProps, {})(SavedLeadMessage);


const SavedLeadMessageContainer = styled.div`
        text-align:center;
        padding-top:4.5em;
        font-size:30px;
`;