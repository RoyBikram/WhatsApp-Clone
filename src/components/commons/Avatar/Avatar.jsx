import React from 'react';
import './AvatarStyle.scss'

function Avatar({ImgUrl,AltText,Small}) {
    return (
        <div className={`Avatar ${Small?'SmallAvatar':''}`}>
            <img src={ImgUrl} alt={AltText} />
        </div>
     );
}

export default Avatar;