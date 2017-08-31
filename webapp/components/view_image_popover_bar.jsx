// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {FormattedMessage} from 'react-intl';

import PropTypes from 'prop-types';

import React from 'react';

export default class ViewImagePopoverBar extends React.Component {
    render() {
        var publicLink = '';
        if (global.window.mm_config.EnablePublicLink === 'true') {
            publicLink = (
                <div>
                    <a
                        href='#'
                        className='public-link text'
                        data-title='Public Image'
                        onClick={this.props.onGetPublicLink}
                    >
                        <FormattedMessage
                            id='view_image_popover.publicLink'
                            defaultMessage='Get Public Link'
                        />
                    </a>
                    <span className='text'>{' | '}</span>
                </div>
            );
        }

        var footerClass = 'modal-button-bar';
        if (this.props.show) {
            footerClass += ' footer--show';
        }

        return (
            <div
                ref='imageFooter'
                className={footerClass}
            >
                <span className='pull-left text'>
                    <FormattedMessage
                        id='view_image_popover.file'
                        defaultMessage='File {count, number} of {total, number}'
                        values={{
                            count: (this.props.fileId + 1),
                            total: this.props.totalFiles
                        }}
                    />
                </span>
                <div className='image-links'>
                    <a
                        href={this.props.fileURL}
                        download={this.props.filename}
                        className='text download-image-button'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FormattedMessage
                            id='view_image_popover.download'
                            defaultMessage='Download'
                        />
                    </a>
                </div>
            </div>
        );
    }
}
ViewImagePopoverBar.defaultProps = {
    show: false,
    imgId: 0,
    totalFiles: 0,
    filename: '',
    fileURL: ''
};

ViewImagePopoverBar.propTypes = {
    show: PropTypes.bool.isRequired,
    fileId: PropTypes.number.isRequired,
    totalFiles: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    fileURL: PropTypes.string.isRequired,
    onGetPublicLink: PropTypes.func.isRequired
};
