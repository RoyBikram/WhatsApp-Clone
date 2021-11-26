import React from 'react';
import './MessageSectionStyle.scss';
import Avatar from '../../commons/Avatar/Avatar';
import Message from './Message/Message';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as DotsIcon } from '../../../assets/icons/dots.svg';
import { ReactComponent as EmojiIcon } from '../../../assets/icons/emoji.svg';
import { ReactComponent as DocumentIcon } from '../../../assets/icons/document.svg';
import { ReactComponent as MicIcon } from '../../../assets/icons/mic.svg';
import { useState } from 'react';

function MessageSection() {
    const [input, setInput] = useState('');
    const HandelSubmit = (e) => {
        e.preventDefault()
        console.log(input);
        setInput('')
    }

    return (
        <div className="MessageSection">
            <div className="Header">
                <Avatar Small={true}></Avatar>
                <div className="Container">
                    <div className="TextContainer">
                        <div className="Name">Arijt Das</div>
                        <div className="LastSeen">7:50pm</div>
                    </div>
                    <div className="ButtonsContainer">
                        <div className="IconContainer">
                            <SearchIcon className="SearchIcon"></SearchIcon>
                        </div>
                        <div className="IconContainer">
                            <DotsIcon className="DotsIcon"></DotsIcon>
                        </div>
                    </div>
                </div>
            </div>
            <div className="MessageBody">
                <div className="MessageContainer">
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message OwnMessage={true} MessageText={'Hi, How are you'}></Message>
                    <Message MessageText={'Hi'}></Message>
                    <Message MessageText={'I am fine how you are'}></Message>
                </div>  
            </div>
            <div className="Footer">
                <div className="LeftButtonsContainer">
                    <div className="IconContainer">
                        <EmojiIcon className="EmojiIcon"></EmojiIcon>
                    </div>
                    <div className="IconContainer">
                        <DocumentIcon className="DocumentIcon"></DocumentIcon>
                    </div>
                </div>
                
                <form action=''>
                    <input value={input} onChange={
                        (e) => {
                            setInput(e.target.value)
                        }
                    } placeholder="Type a message" type="text" className="TypingAria" />
                    <button onClick={HandelSubmit} className="SubmitButton" type="submit"></button>
                </form>
                
                <div className="RightButtonsContainer">
                    <div className="IconContainer">
                            <MicIcon className="MicIcon"></MicIcon>
                        </div>
                </div>
            </div>
        </div>
     );
}

export default MessageSection;