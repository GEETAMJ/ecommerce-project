import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import {Chatbot} from 'supersimpledev' 
import './App.css'
function ChatInput({chatMessages, setChatMessages})
{
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  function saveInputText(event) {
    setInputText(event.target.value);
  }
  function keyInputText(event){
    if(event.key === "Enter")
    {
      sendMessage()
    }
    else if(event.key === "Escape")
    {
      setInputText("")
    }
  }
    
    async function sendMessage(){
      // console.log(response)
      if(loading == true || inputText == "")
      {
        return;
      }
      setLoading(true);
      const tempInputtext = inputText
      setChatMessages([
        ...chatMessages,
        {
          message: inputText,
          sender: "user",
          id: crypto.randomUUID()
        },
        {
          message: "Loading...",
          sender: "robot",
          id: crypto.randomUUID()
        }
      ])
      setInputText("")
      const response = await Chatbot.getResponseAsync(tempInputtext)
      setChatMessages(chatMessages => [
        ...chatMessages.slice(0,-1),
        {
          message: response,
          sender: "robot",
          id: crypto.randomUUID()
        }
      ])
      setLoading(false);
  }
  return (
    <div
      className="chat-input-container"
    >
      <input 
        onChange={saveInputText}
        onKeyDown={keyInputText}
        placeholder="Send a message to chatbot" 
        size ="30"
        value={inputText}
        className="chat-input"
        />
      <button 
      className="send-button"
      onClick={sendMessage}
      >Send</button>
    </div>
  )
}

function ChatMessage({message, sender}){
  //const {message, image} = props;
  return (
    <div class={sender === "user" ? "chat-message-user" : "chat-message-robot"}>
      {sender === "robot" && 
      <img src="robot.png" width="50"/>}
      {message}
      {sender === "user" && 
      <img src="user.png" width="50"/>}
    </div>
  )
}

function ChatMessages({chatMessages}){
  const chatMessagesRef = useRef(null)
  useEffect(() => {
    console.log("Message added!")
    const chatMessagesContainerElem = chatMessagesRef.current;
    if(chatMessagesContainerElem)
    {
      chatMessagesContainerElem.scrollTop = chatMessagesContainerElem.scrollHeight; 
    }
    else
    {
      console.log("No reference!")
    }
  }, [chatMessages])
  return (
    <div
      className="chat-messages-container"
      ref={chatMessagesRef}
    >
      {chatMessages.map((chatMessage) => {
        return (
        <ChatMessage 
          message = {chatMessage.message} 
          sender = {chatMessage.sender} 
          key = {chatMessage.id}/>
      )
      })}
    </div>
  )
}
function App()
{
  const [chatMessages, setChatMessages] = useState([
    {
      message: "hello chatbot",
      sender: "user",
      id: "id1"
    },
    {
      message: "Hello! How can I help you?",
      sender: "robot",
      id: "id2"
    }
  ]);
  return (
    <div
      className="app-container"
    >
      {/*{ChatInput()}*/}
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
