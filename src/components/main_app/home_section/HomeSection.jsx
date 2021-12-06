import React from 'react'
import './HomeSectionStyle.scss'
import WhatsAppIcon from "../../../assets/img/whatsapp.png";


function HomeSection() {
    return (
        <div className='HomeSection'>
            <img className="WhatsAppIcon" alt='WhatsApp icon' src={WhatsAppIcon} />
            <div className="AboutProject">HI, I am bikram. This is a whatsapp clone. <br /> Check out my portfolio.</div>
            <a href='https://protofio.netlify.app/' rel="noreferrer" target='_blank'>Click Here</a>
        </div>
    )
}

export default HomeSection
