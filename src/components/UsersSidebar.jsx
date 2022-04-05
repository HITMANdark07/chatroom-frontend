import React from 'react';
import styles from './UsersSidebar.module.css';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as _ from 'lodash';
import { API } from '../api.config';

const UserItem = ({user,currentUser}) => {
    return(
        <div className={styles.user}>
            <img src={user.avatar}
            className={styles.img}
            alt={user.username}
            />
            <div style={{fontWeight:'500', alignSelf:'center'}}>
                {user.username} {currentUser && currentUser.id===user.id && "(ME)"}
            </div>
        </div>
    )
}

const UsersSidebar = ({socket, user}) => {
    const [users, setUsers] = React.useState([]);
    const currentUser = user;
    React.useEffect(() => {
        fetch(`${API}/users`).then((response) => {
            response.json().then((data) => {
                setUsers(st => [...st,...data]);
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        })
    },[]);
    React.useEffect(() => {
        if(socket){
            socket.on('new_user', (data) => {
                setUsers(st => [...st,data]);
                console.log(data);
            })
        }
    },[socket]);
    React.useEffect(() => {
        if(socket){
            socket.on('user_disconnected',(id) => {
                let u = [...users];
                if(_.remove(u,{id:id})){
                    setUsers(u);
                }
            })
        }
    },[socket,users]);
    return(
        <div className={styles.sidebar}>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' >
                <Toolbar>
                <Typography variant="b" component="div" sx={{ flexGrow: 1 }}>
                    {users.length} ONLINE
                </Typography>
                </Toolbar>
            </AppBar>
            </Box>
            {
                users.map((user) => (
                    <UserItem key={user.id} currentUser={currentUser} user={user} />
                ))
            }
        </div>
    )
};

export default UsersSidebar;