// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import TeamButton from './components/team_button.jsx';

import TeamStore from 'stores/team_store.jsx';
import UserStore from 'stores/user_store.jsx';

import {sortTeamsByDisplayName} from 'utils/team_utils.jsx';
import * as Utils from 'utils/utils.jsx';

import $ from 'jquery';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {browserHistory} from 'react-router/es6';

import { basepath } from "../DashBoard/utils/constant";
import axios from "axios";

export default class TeamSidebar extends React.Component {
    static propTypes = {
        actions: PropTypes.shape({
            getTeams: PropTypes.func.isRequired
        }).isRequired
    }

    constructor(props) {
        super(props);

        this.getStateFromStores = this.getStateFromStores.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.setStyles = this.setStyles.bind(this);
        this.goToDashBoard = this.goToDashBoard.bind(this);
        this.getCookie=this.getCookie.bind(this);
        
        this.state = this.getStateFromStores();
    }

    getStateFromStores() {
        const teamMembers = TeamStore.getMyTeamMembers();
        const currentTeamId = TeamStore.getCurrentId();
        
        return {
            teams: TeamStore.getAll(),
            teamListings: TeamStore.getTeamListings(),
            teamMembers,
            currentTeamId,
            show: teamMembers && teamMembers.length > 0,
            isMobile: Utils.isMobile()
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        TeamStore.addChangeListener(this.onChange);
        TeamStore.addUnreadChangeListener(this.onChange);
        this.props.actions.getTeams(0, 200);
        this.setStyles();
        
    }
    
    
    componentWillMount() {
        let uId = this.getCookie("MMUSERID");
        // let url = basepath + "user/getUser/" + 'pwgy5iddnfnw9edp7mdb966tke'; // login bug
        let url = basepath + "user/getUser/" + uId;
        this.getUserType(url);
        
    }
    
    getUserType(_apiurl){
     return axios({
            method: "get",
            url: _apiurl
        }).then((response)=>{
            if(response.data.data==null){
                localStorage.setItem('dashVisibility',false);
            }
            else{
                localStorage.setItem('dashVisibility',true);
            }
        }
            ).catch((error)=>{
                console.log('error in dashboard button visibility', error);
            })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        TeamStore.removeChangeListener(this.onChange);
        TeamStore.removeUnreadChangeListener(this.onChange);
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.isMobile) {
            $('.team-wrapper').perfectScrollbar();
        }

        // reset the scrollbar upon switching teams
        if (this.state.currentTeam !== prevState.currentTeam) {
            this.refs.container.scrollTop = 0;
            if (!this.state.isMobile) {
                $('.team-wrapper').perfectScrollbar('update');
            }
        }
        
    }

    onChange() {
        this.setState(this.getStateFromStores());
        this.setStyles();
        
    }

    handleResize() {
        const teamMembers = this.state.teamMembers;
        this.setState({show: teamMembers && teamMembers.length > 1});
        this.setStyles();
    }

    setStyles() {
        const root = document.querySelector('#root');

        if (this.state.show) {
            root.classList.add('multi-teams');
        } else {
            root.classList.remove('multi-teams');
        }
    }
    goToDashBoard(){
        browserHistory.push('/dashboard');
        
    }
    getCookie = name => {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return value != null ? unescape(value[1]) : null;
      };

    render() {
        if (!this.state.show) {
            return null;
        }

        const myTeams = [];
        const isSystemAdmin = Utils.isSystemAdmin(UserStore.getCurrentUser().roles);
        const isAlreadyMember = new Map();
        let moreTeams = false;

        for (const index in this.state.teamMembers) {
            if (this.state.teamMembers.hasOwnProperty(index)) {
                const teamMember = this.state.teamMembers[index];
                if (teamMember.delete_at > 0) {
                    continue;
                }
                const teamId = teamMember.team_id;
                myTeams.push(Object.assign({
                    unread: teamMember.msg_count > 0,
                    mentions: teamMember.mention_count
                }, this.state.teams[teamId]));
                isAlreadyMember[teamId] = true;
            }
        }

        for (const id in this.state.teamListings) {
            if (this.state.teamListings.hasOwnProperty(id) && !isAlreadyMember[id]) {
                moreTeams = true;
                break;
            }
        }

        const teams = myTeams.
            sort(sortTeamsByDisplayName).
            map((team) => {
                return (
                    <TeamButton
                        key={'switch_team_' + team.name}
                        url={`/${team.name}`}
                        tip={team.display_name}
                        active={(window.location.href.includes("dashboard"))?false:(team.id === this.state.currentTeamId)}
                        isMobile={this.state.isMobile}
                        displayName={team.display_name}
                        unread={team.unread}
                        mentions={team.mentions}
                    />
                );
            });

        if (moreTeams) {
            teams.push(
                <TeamButton
                    btnClass='team-btn__add'
                    key='more_teams'
                    url='/select_team'
                    isMobile={this.state.isMobile}
                    tip={
                        <FormattedMessage
                            id='team_sidebar.join'
                            defaultMessage='Other teams you can join.'
                        />
                    }
                    content={<i className='fa fa-plus'/>}
                />
            );
        } else if (global.window.mm_config.EnableTeamCreation === 'true' || isSystemAdmin) {
            teams.push(
                <TeamButton
                    btnClass='team-btn__add'
                    key='more_teams'
                    url='/create_team'
                    isMobile={this.state.isMobile}
                    tip={
                        <FormattedMessage
                            id='navbar_dropdown.create'
                            defaultMessage='Create a New Team'
                        />
                    }
                    content={<i className='fa fa-plus'/>}
                />
            );
        }

        return (
            <div className='team-sidebar'>
                <div className='team-wrapper'>
                    <div className="dashboard-icon" 
                    style={{display:localStorage.getItem('dashVisibility') === 'true'?'block':'none'}}>
                        <a>
                         <div className="dashboard-btn" onClick={(e)=>this.goToDashBoard()}>
                            <div className="dashboard-btn-initials">d</div>
                         </div>
                        </a>
                    </div>
                    <div></div>
                    {teams}
                </div>
            </div>
        );
    }
}
