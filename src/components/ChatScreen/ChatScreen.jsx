import React from 'react';
import styles from './ChatScreen.module.css';

const ChatMessages = ({message}) => {
    return(
        <div className={styles.message}>
            <img src={message.sender_avatar} style={{
            width:30,
            height:30,
            alignSelf:'center',
            borderRadius:20,
            marginRight:8
            }} alt={message.sender_name} />
            <div className={styles.username}>{message.sender_name}: </div>
            <div>{message.message}</div>
        </div>
    )
}

const ChatScreen = ({socket}) => {

    const [messages , setMessages] = React.useState([]);
    React.useEffect(() => {
        if(socket){
            socket.on('global_message',(data) => {
                window.scrollTo({bottom:0})
                setMessages(msg => [...msg,data]);
            })
        }
    },[socket])

    return(
        <div className={styles.main}>
            {
                messages.map((message,i) => (
                    <ChatMessages key={i} message={message} />
                ))
            }
            
        </div>
    )
}

export default ChatScreen;