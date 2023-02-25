import React,{useEffect,useState} from "react";
import { io } from "socket.io-client";
import './app.css'
const socket = io("http://localhost:5000");

function App() {
  const [message, setmessage] = useState('');
  const [chat, setchat] = useState([]);
  const changed = (e)=>{
    setmessage(e.target.value)
  }
  const submit = (e)=>{
    e.preventDefault();
    socket.emit("chat",{message});
    setmessage('');
  }

  useEffect(() => {
    socket.on("chat",(payload)=>{
      setchat([...chat,payload]);
    })
  })
  

  return (
    <>
      <div class="chat-container">
        <div class="messages">
          {console.log(chat)}
          {chat.map((elem,index)=>{
            return <li key={index}>{elem.message}</li>
          })}
        </div>
        <form class="input-container" onSubmit={submit}>
          <input type="text" 
                placeholder="Type your message..."
                value={message}
                onChange = {changed}
                name="message"/>
            <button type="submit">Send</button>
        </form>
      </div>

    </>
  );
}

export default App;
