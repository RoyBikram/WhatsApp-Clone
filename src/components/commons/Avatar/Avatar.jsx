import React from 'react';
import './AvatarStyle.scss'


function Avatar({ImgUrl=null,AltText,Small}) {
    return (
        <div className={`Avatar ${Small ? 'SmallAvatar' : ''}`}>
            {
                (ImgUrl==null)?'':<img src={ImgUrl} alt={AltText} />
            }
        </div>
     );
}

export default Avatar;