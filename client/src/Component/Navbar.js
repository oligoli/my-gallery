import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../App';



export default function Navbar() {
    const{state,dispatch} =React.useContext(UserContext);
    const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#ffeb3b' }}>
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{textDecoration:'none'}} to='/'>GALLERY</Link>
          </Typography>
          {
          state?
          <Link to='/login'> <Button variant='outlined'size="large" 
          onClick={( )=> {
            localStorage.clear();
            dispatch({type:'CLEAR'});
            navigate('/login');
          }} >Logout</Button></Link>:
          <Link to='/login'> <Button variant='outlined'size="large" >Login</Button></Link>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
