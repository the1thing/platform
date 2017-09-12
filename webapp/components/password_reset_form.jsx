// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import ReactDOM from 'react-dom';
import * as Utils from 'utils/utils.jsx';
import Constants from 'utils/constants.jsx';

import {FormattedMessage} from 'react-intl';

import {resetPassword} from 'actions/user_actions.jsx';

import PropTypes from 'prop-types';

import React from 'react';

class PasswordResetForm extends React.Component {
    constructor(props) {
        super(props);

        this.handlePasswordReset = this.handlePasswordReset.bind(this);

        this.state = {};
    }
    handlePasswordReset(e) {
        e.preventDefault();

        const password = ReactDOM.findDOMNode(this.refs.password).value;
        if (!password || password.length < Constants.MIN_PASSWORD_LENGTH) {
            this.setState({
                error: (
                    <FormattedMessage
                        id='password_form.error'
                        defaultMessage='Please enter at least {chars} characters.'
                        values={{
                            chars: Constants.MIN_PASSWORD_LENGTH
                        }}
                    />
                )
            });
            return;
        }

        this.setState({
            error: null
        });

        resetPassword(
            this.props.location.query.token,
            password,
            () => {
                this.setState({error: null});
            },
            (err) => {
                this.setState({error: err.message});
            }
        );
    }
    render() {
        var error = null;
        if (this.state.error) {
            error = (
                <div className='form-group has-error'>
                    <label className='control-label'>
                        {this.state.error}
                    </label>
                </div>
            );
        }

        var formClass = 'form-group';
        if (error) {
            formClass += ' has-error';
        }

        return (
                <div className='wrap_585px'>
                    <div className='image-part-on-signin-page'>
                        <img src="https://s3.ap-south-1.amazonaws.com/1thing-logos/sign-in-graphic.svg"/>
                    </div>
                <div className='signup-team__container'>
                <div className='signin-title'>
                    <h2>
                        <FormattedMessage
                            id='password_form.title'
                            defaultMessage='Password Reset'
                        />
                    </h2>
                    </div>
                    <form onSubmit={this.handlePasswordReset}>
                        <div className='signup__content'>
                        <h4 className='color--light'>
                            <FormattedMessage
                                id='password_form.enter'
                                defaultMessage='Enter a new password for your {siteName} account.'
                                values={{
                                    siteName: global.window.mm_config.SiteName
                                }}
                            />
                            </h4>
                        </div>
                        <div className={formClass}>
                        <div className="user-password"></div>
                            <input
                                type='password'
                                className='form-control reset-password'
                                name='password'
                                ref='password'
                                placeholder={Utils.localizeMessage(
                                    'password_form.pwd',
                                    'Password'
                                )}
                                spellCheck='false'
                            />
                        </div>
                        {error}
                        <button
                            type='submit'
                            className='btn btn-primary'
                        >
                            <FormattedMessage
                                id='password_form.change'
                                defaultMessage='Change my password'
                            />
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

PasswordResetForm.defaultProps = {
};
PasswordResetForm.propTypes = {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default PasswordResetForm;
