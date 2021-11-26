import React from 'react';
import './SideSectionStyle.scss';
import Avatar from '../../commons/Avatar/Avatar';
import {ReactComponent as StatusIcon} from '../../../assets/icons/status.svg';
import {ReactComponent as MessageIcon} from '../../../assets/icons/message.svg';
import { ReactComponent as DotsIcon } from '../../../assets/icons/dots.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import MessageOverview from './message_overview/MessageOverview';

function SideSection() {
    return (
        <div className="SideSection">
            <div className="Header">
                <Avatar Small={true}></Avatar>
                <div className="HeaderButtonsContainer">
                    <div className="IconContainer">
                    <StatusIcon className="StatusIcon"></StatusIcon>
                    </div>
                    <div className="IconContainer">
                    <MessageIcon className="MessageIcon"></MessageIcon>
                    </div>
                    <div className="IconContainer">
                    <DotsIcon className="DotsIcon"></DotsIcon>
                    </div>
                </div>
            </div>
            <div className="Search">
                <div className="SearchContainer">
                    <SearchIcon className='SearchIcon'></SearchIcon>
                    <input type="text" className='SearchInput' placeholder='Search freands' />
                </div>
            </div>
            <div className="MessageOverviewList">
                <MessageOverview></MessageOverview>
            </div>
        </div>
     );
}

export default SideSection;
