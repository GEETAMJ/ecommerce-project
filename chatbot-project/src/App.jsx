import { useState } from 'react'
import { useEffect } from 'react'
import {Chatbot} from 'supersimpledev'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App()
{
  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique id': function() {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    });
  }, [])
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [
    {
      message: "hello chatbot",
      sender: "user",
      id: "id1",
      time: 1736127288920
    },
    {
      message: "Hello! How can I help you?",
      sender: "robot",
      id: "id2",
      time: 1736127288920
    }
  ]);
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages))
  }, [chatMessages])
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
