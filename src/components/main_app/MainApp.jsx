import React from 'react';
import './MainAppStyle.scss'
import MessageSection from './message_section/MessageSection';
import SideSection from './side_section/SideSection';

function MainApp() {
    return (
        <div className="MainApp">
            <SideSection></SideSection>
            <MessageSection></MessageSection>
        </div>
     );
}

export default MainApp;