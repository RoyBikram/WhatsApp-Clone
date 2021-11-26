import React from 'react';
import './MessageOverview.scss';
import Avatar from '../../../commons/Avatar/Avatar';

function MessageOverview() {
    return (
        <div className="MessageOverview">
            <div className="ProfileContainer">
                <Avatar className='Avatar'></Avatar>
            </div>
            <div className="TextContainer">
                <div className="NameContainer">
                    <div className="Name">Arijt Das</div>
                    <div className="Time">Monday</div>
                </div>
                <div className="LastMessage">Last Message is this you cannot avoide this</div>
            </div>
        </div>
     );
}

export default MessageOverview;