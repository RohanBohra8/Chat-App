import './App.css';
import Chat from './component/Chat';
import io from 'socket.io-client';
import {useState} from 'react';
const socket = io.connect("https://chat-app-4tn5.onrender.com");//client socket is connected to server url
//http://localhost:3001
function App() {

  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("");
  const [showChat,setShowChat] = useState(false);

  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handleRoom(event) {
    setRoom(event.target.value);
  }

  const joinRoom = () => {
    //join room if there condtion met 
    if(username !=="" && room !=="" ){
      socket.emit("join_room",room)
      setShowChat(true);
    }
  };


  return (
    <div className="App">  
    { !showChat ?
      (
        <div className='joinChatContainer'>
        <h3>Join to chat</h3>
        <input type="text" placeholder="User Name" onChange={handleUsername}></input>
        <input type="text" placeholder="Room Id" onChange={handleRoom}></input> 
        <button onClick={joinRoom}>Join a Room</button>
        </div>
      )  
        :
      ( 
        <Chat socket={socket} username={username} room={room}></Chat>
      )
    }
    </div>
  );
}

export default App;
