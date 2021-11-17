import React, { useState } from 'react';
import { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setmessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setmessageList((list) => [...list, messageData]);
    }
  };
  useEffect(() => {
    socket.on('recieveMessage', (data) => {
      setmessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <>
      <div className='chat-window'>
        <div className='chat-header'>
          <p>Live Chat</p>
        </div>
        <div className='chat-body'>
          <ScrollToBottom className='message-container'>
            {messageList.map((msgContenet) => {
              return (
                <div
                  className='message'
                  id={username === msgContenet.author ? 'you' : 'other'}
                >
                  <div className='message-content'>
                    <p>{msgContenet.message}</p>
                  </div>
                  <div className='message-meta'>
                    <p id='time'>{msgContenet.time}</p>
                    <p id='author'>{msgContenet.author}</p>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className='chat-footer'>
          <input
            type='text'
            placeholder='Message Type Here'
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};
export default Chat;
