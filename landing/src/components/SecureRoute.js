import React, {Component} from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
    class SecureRoute extends Component {
        componentWillMount() {
            if (!sessionStorage.getItem('user')) {
                this.props.history.push('/signin');
            }
        }

        render() {
            return (
                <div>
                    {sessionStorage.getItem('user') ? (
                        <ComposedComponent {...this.props} />
                    ): null}
                </div>
            );
        }
    }

    return connect(null)(SecureRoute);

};
