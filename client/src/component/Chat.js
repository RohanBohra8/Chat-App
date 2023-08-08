//in this component we are going to be sending messages and recieving messages throught socket io so we need to accept socket as a prop we created in app component  
import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({socket,username,room}) => {
    const [currentMessage,setCurretnMessage] = useState("");
    const [messageList,setMessageList] = useState([]);

    function handleCurrentMessage(event){
        setCurretnMessage(event.target.value);
    };

    // function handleKeyDown(event){
    //     if(event.Key === 'Enter'){
    //        handleCurrentMessage();
    //     } 
    // }

    const sendMessage = async() => {
        if(currentMessage !==""){
            const messageData = {
                room : room,
                sender : username,
                message : currentMessage,
                time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),  
            };

            await socket.emit("send_message",messageData);
            setMessageList((list)=> [...list, messageData]);
            setCurretnMessage("");
        }  
    };

    //useEffect will listen to any changes happining to our soocket 
  useEffect(()=> {
    socket.on("recieve_message", (data)=> {
        setMessageList((list)=> [...list, data])
    });
  },[socket]);



  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Chatter Box</p>
        </div>
        <div className='chat-body'>
        <ScrollToBottom className='message-container'>
        {
            messageList.map((i)=>(
                <div className='message' id={username === i.sender ? "you" : "other"}>
                    <div>
                        <div className='message-content'>
                        <p>{i.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id='time'>{i.time}</p>
                            <p id='author'>{i.sender}</p>
                        </div>
                    </div>
                </div>
            ))
        }
        </ScrollToBottom>    

        </div>
        <div className='chat-footer'>
            <input type='text' value={currentMessage} placeholder='type your message here..' onChange={handleCurrentMessage} ></input>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div> 
  );
}

export default Chat;