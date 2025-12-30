import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs'
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages})
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
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        },
        {
          message: "Loading...",
          sender: "robot",
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ])
      setInputText("")
      const response = await Chatbot.getResponseAsync(tempInputtext)
      setChatMessages(chatMessages => [
        ...chatMessages.slice(0,-1),
        {
          message: response,
          sender: "robot",
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ])
      setLoading(false);
  }
  function clearMessages()
  {
    setChatMessages([])
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
      <button 
      className="clear-button"
      onClick={clearMessages}
      >Clear</button>
    </div>
  )
}