import React, {Component} from 'react';
import { connect } from 'react-redux';
import {checkTokenStatus} from '../actions';

export default ComposedComponent => {
    class SecureRoute extends Component {
        componentWillMount() {
            this.props.checkTokenStatus();

            if (!this.props.userAuth) {
                this.props.history.push('/signin');
            }
        }

        render() {
            return (
                <div>
                    {this.props.userAuth ? (
                        <ComposedComponent {...this.props} />
                    ): null}
                </div>
            );
        }
    }

    const mapStateToProps = state => {
        const {users_reducer} = state;
        return {
            userAuth: users_reducer.user_auth,
        }
    };

    return connect(mapStateToProps, {checkTokenStatus})(SecureRoute);

};
