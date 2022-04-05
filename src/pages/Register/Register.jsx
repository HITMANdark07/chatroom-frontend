import React from "react";
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './Register.module.css';

const Register = ({setName,gender,setGender}) => {
    const [userName, setUserName] = React.useState("");
    const submit = (e) => {
        e.preventDefault();
        setName(userName);
    }
    return(
        <div className={styles.page}>
            <form onSubmit={submit} className={styles.box}>
                <div className={styles.heading}>
                    <div className={styles.head}>
                    Enter Public Room
                    </div>
                    <div style={{cursor:'pointer'}}>  	
                    &#10060;
                    </div>
                </div>
                <input type="text" placeholder="Your UserName" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={styles.ip} />
                <FormControl fullWidth sx={{mt:2}}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Select Gender"
                    onChange={(e) =>{
                        setGender(e.target.value);
                    }}
                >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                </Select>
                </FormControl>
                <Button onClick={submit} style={{
                    marginTop:20
                }}  variant="contained">Join</Button>
            </form>
        </div>
    )
};

export default Register;