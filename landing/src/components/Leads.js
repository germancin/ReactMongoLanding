import React, {Component} from 'react';
import {Row, Grid, Col} from 'react-bootstrap';
import {getLeads, addLead, updateLead, deleteLeads} from '../actions';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Loading from './Loading';

class Leads extends Component {
    state={
        leads: this.props,
    };

    handleBeforeSaveCell = (rowObj) => {
        this.props.updateLead(rowObj);
    };

    handleOnDeleteRow = (leadId) => {
        console.log('onDeleteRow:::', leadId);
        this.props.deleteLeads(leadId);
    };

    renderShowsTotal = (start, to, total)=> {
        return (
            <div style={ { color: 'black', textAlign:'left' } }>
                From { start } to { to }, Total: { total }
            </div>
        );
    };

    render() {

        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [ {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: (this.props.leadsM)?this.props.leadsM.length:0
            } ], // you can change the dropdown list for size per page
            sizePerPage:6,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 5,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom',  // default is bottom, top and both is all available
            hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            onDeleteRow:this.handleOnDeleteRow, // This is the hook for delete
        };

        return (
            <LeadsContainer>

                <Grid>
                    {(this.props.fetching)? <Loading/> : ''}

                    {(this.props.leadsM && this.props.leadsM.length > 0 )
                            ?
                                <Row className={'notes-box'}>
                                    <Grid>
                                        <Row className="show-grid">
                                            <BootstrapTable className={''} data={this.props.leadsM}
                                                 multiColumnSearch={ true }
                                                 search={ true }
                                                 exportCSV={ true }
                                                 deleteRow={ true }
                                                 selectRow={ {mode:'checkbox', bgColor:'lightgrey'} }
                                                 pagination={ true }
                                                 options={ options }
                                                 cellEdit={
                                                     {
                                                         mode:'click',
                                                         blurToSave:true,
                                                         beforeSaveCell:this.handleBeforeSaveCell
                                                     }
                                                 }
                                                 striped hover
                                            >
                                                <TableHeaderColumn isKey hidden export={false} dataField='_id'>Id</TableHeaderColumn>
                                                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                                                <TableHeaderColumn dataField='lastname'>Last Name</TableHeaderColumn>
                                                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                                                <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
                                            </BootstrapTable>
                                        </Row>
                                    </Grid>
                                </Row>
                            :
                                <div className={"no-notes"}>
                                    You don't have  Leads yet. <br/>
                                </div>
                    }
                </Grid>
            </LeadsContainer>
        )}
}

const mapStateToProps = state => {
    const {leads_reducer} = state;
    return {
        leadsM: leads_reducer.leads,
        fetching: leads_reducer.fetching,
    }
};

export default connect(mapStateToProps, {getLeads, addLead, updateLead, deleteLeads})(Leads);


const LeadsContainer = styled.div`
    padding-top:15px;
        
    .no-notes {
        text-align:center;
        font-size: 20px;
        margin-top:20px;
    }

        
`;