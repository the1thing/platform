// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {postListScrollChange} from 'actions/global_actions.jsx';
import Reaction from 'components/post_view/reaction';
export default class ReactionListView extends React.PureComponent {
    static propTypes = {
        /**
         * The post to render reactions for
         */
        post: PropTypes.object.isRequired,

        /**
         * The reactions to render
         */
        reactions: PropTypes.arrayOf(PropTypes.object),

        /**
         * The emojis for the different reactions
         */
        emojis: PropTypes.object.isRequired,
        actions: PropTypes.shape({

            /**
             * Function to get reactions for a post
             */
            getReactionsForPost: PropTypes.func.isRequired
        })
    }

    componentDidMount() {
        if (this.props.post.has_reactions) {
            this.props.actions.getReactionsForPost(this.props.post.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.reactions !== prevProps.reactions) {
            postListScrollChange();
        }

    }

    render() {
        const reactionsByName = new Map();
        const emojiNames = [];

        for (const reaction of this.props.reactions) {
            const emojiName = reaction.emoji_name;

            if (reactionsByName.has(emojiName)) {
                reactionsByName.get(emojiName).push(reaction);
            } else {
                emojiNames.push(emojiName);
                reactionsByName.set(emojiName, [reaction]);
            }
        }

        const children = emojiNames.map((emojiName) => {
            return (
                <Reaction
                    key={emojiName}
                    post={this.props.post}
                    currentUserId={this.props.currentUserId}
                    emojiName={emojiName}
                    reactions={reactionsByName.get(emojiName) || []}
                    emojis={this.props.emojis}
                />
            );
        });

        return (
            <div className='post-reaction-list'>
                {children}
            </div>
        );
    }
}
