import React from 'react';
import './AvatarStyle.scss'

function Avatar({ImgUrl,AltText,Small}) {
    return (
        <div className={`Avatar ${Small?'SmallAvatar':''}`}>
            <img src='https://avatars.dicebear.com/api/adventurer/.svg' alt={AltText} />
        </div>
     );
}

export default Avatar;