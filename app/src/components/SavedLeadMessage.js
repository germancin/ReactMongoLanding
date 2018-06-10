import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

class SavedLeadMessage extends Component {
    render() {
        return (
            <SavedLeadMessageContainer>

                Thank You <br/>
                {this.props.singleLead.name} <br/>
                Enjoy the event!

            </SavedLeadMessageContainer>
        )}
}

const mapStateToProps = state => {
    const {leads_reducer} = state;
    return {
        singleLead: leads_reducer.singleLead,
    };
};

export default connect(mapStateToProps, {})(SavedLeadMessage);


const SavedLeadMessageContainer = styled.div`
        text-align:center;
        padding-top:4.5em;
        font-size:30px;
`;