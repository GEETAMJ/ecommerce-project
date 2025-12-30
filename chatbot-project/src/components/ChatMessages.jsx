import { useEffect } from 'react'
import { useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import './ChatMessages.css'

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
          key = {chatMessage.id}
          time = {chatMessage.time}/>
      )
      })}
    </div>
  )
}

export default ChatMessages