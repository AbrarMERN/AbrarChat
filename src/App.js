import { useState } from 'react';
import io from 'socket.io-client';
import './utils/index.css';
import Chat from './Component/ChatComp/Chat';
const socket = io.connect('http://localhost:5000');
function App() {
  const [username, setUsername] = useState('');
  const [room, setRomm] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
      console.log('Join Room ...', room);
    }
  };
  return (
    <div className='App'>
      {!showChat ? (
        <div className='joinChatContainer'>
          <input
            type='text'
            placeholder='User Id'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='text'
            placeholder='Room Id'
            onChange={(e) => setRomm(e.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
