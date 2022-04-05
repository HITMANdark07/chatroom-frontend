import React from "react";
import styles from './Home.module.css';
import UsersSidebar from "../../components/UsersSidebar";
import AppBarPrimary from "../../components/AppBarPrimary";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import ChatFooter from "../../components/ChatFooter/ChatFooter";

const Home = ({socket, user}) => {

    return(
        <div className={styles.main}>
            <div className={styles.chatScreen}>
            <AppBarPrimary />
            <ChatScreen socket={socket} user={user}/>
            <ChatFooter socket={socket} user={user} />
            </div>
            <UsersSidebar socket={socket} user={user} />
        </div>
    )
};

export default Home;