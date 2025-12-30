import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
export function ChatMessage({message, sender, time}){
  //const {message, image} = props;
  return (

    <div className={sender === "user" ? "chat-message-user" : "chat-message-robot"}>
      {sender === "robot" && 
      <img src={RobotProfileImage} width="50"/>}
      <div className="chat-message-text">
      {message}
      <div className="message-time-container">
        {dayjs(time).format('HH:mm')}
      </div>
      </div>
      {sender === "user" && 
      <img src={UserProfileImage} width="50"/>}
    </div>
  )
}