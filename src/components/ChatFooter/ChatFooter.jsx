import { Button } from '@mui/material';
import React from 'react';
import styles from './ChatFooter.module.css';

const ChatFooter = ({socket, user}) => {
    const [message, setMessage] = React.useState('');
    const sendMessage = (e) => {
        e.preventDefault();
        if(socket && user && message){
            socket.emit('global',{
                sender:user.id,
                sender_name:user.username,
                message:message,
                sender_avatar:user.avatar
            });
            setMessage('');
        }
    }
    return(
        <div className={styles.main}>
            <form onSubmit={sendMessage} className={styles.form}>
                <input type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Type Here...' className={styles.ip} />
                <Button variant="contained" size="medium" sx={{flexGrow:1, ml:2}} onClick={sendMessage}>Send</Button>
            </form>
        </div>
    )
};

export default ChatFooter;