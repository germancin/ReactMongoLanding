import React, {Component} from 'react';
import {Row, Grid} from 'react-bootstrap';
import {getLeads, addLead, updateLead, deleteLeads} from '../actions';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Leads extends Component {
    state={
        leads: this.props,
    };

    componentDidMount() {
        this.props.getLeads();
    }

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
                text: 'All', value: this.props.leadsM.length
            } ], // you can change the dropdown list for size per page
            sizePerPage: 15,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 5,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top',  // default is bottom, top and both is all available
            hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
            onDeleteRow:this.handleOnDeleteRow, // This is the hook for delete
        };

        return (
            <LeadsContainer>

                <Grid>
                    <Row className="show-grid">
                        <h3 className={'top-title'}>Leads</h3>
                    </Row>

                    {(this.props.leadsM.length > 0)
                            ?
                                <Row className={'notes-box'}>

                                    <BootstrapTable data={this.props.leadsM}
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
                                        <TableHeaderColumn isKey hidden dataField='_id'>Id</TableHeaderColumn>
                                        <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                                        <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>
                                    </BootstrapTable>

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
        // fetching: notes_reducer.fetching,
        // singleNote: notes_reducer.singleNote,
        // firstTime: notes_reducer.firstTime,
    }
};

export default connect(mapStateToProps, {getLeads, addLead, updateLead, deleteLeads})(Leads);


const LeadsContainer = styled.div`

        .notes-box{
            border:5px solid yellow:
            display: flex;
            justify-content: flex-start;
            padding-left:5px;
            padding-right:5px;
                
                .note-container{
                    flex-grow: 1;
                    flex-basis: 250px;
                    max-width: 250px;
                    position:relative;
                    // min-height:214px;
                    // max-height:214px;
                    border-radius: 5px;
                    
                    border:1px solid #A7A7A7;
                    color:#71595A;
                    margin:10px 10px 10px 10px;
                    padding:8px 18px 8px 18px;
                    background-color:#FFFFFF;
                    
                    display: flex;
                    flex-direction:column;  
                    justify-content:flex-end;   
                        
                        .note-img {
                            
                            .image{
                                width:50px;
                                height:50px;
                                border-radius: 100%;
                                position:absolute;
                                top:-20px;
                                right:0px;
                            }
                            .image:hover{
                                border:1px solid white;
                            }
                        }              
                
                        .note-title{
                            color:#4a4a4a;
                            font-weight:bold;
                            border-bottom:1px solid #AEAEAE;
                            width:100% !important;
                            margin-bottom: 5px;
                        }
                         
                        
                        .note-description{
                            overflow: hidden;
                            min-height:90px;
                            max-height:90px;
                            margin-bottom:15px;
                        }
                        
                        .note-tags{
                            border:0px solid black;
                            font-size:10px;
                            color:grey;
                            margin-bottom:5px;
                            
                                
                                .tags-label{
                                    text-align:left;
                                    font-weight:bold;
                                }
                                
                        }
                }
                .note-container:hover{
                    border: 1px solid rgb(86, 180, 239);
                    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px rgba(82, 168, 236, 0.6);
                }
        }
        
        .no-notes {
            text-align:center;
            font-size: 20px;
            margin-top:20px;
        }
        
`;