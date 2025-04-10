import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { Layers } from 'lucide-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";


function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(store => store.auth.user);
  console.log('User', user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async() => {
    try {
      const res = await axios.post('http://localhost:3000/auth/logout', {}, {withCredentials: true})
      dispatch(logout(res.data.user))
      navigate('/login');
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  const settings = [
  { label: 'Profile', path: '/profile' },
  { label: 'Job Application', path: '/add-job' },
  { label: 'Logout', onClick: () => handleLogout() }
];

  return (
    <AppBar position="static" sx={{backgroundColor: "black"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className='flex items-center justify-between'>
          <Link to={'/'} className="pl-2 text-2xl flex items-center">
            <Layers size={30} strokeWidth={'2.5px'} className="text-[#ff4081] transform -rotate-12" />
            <svg width="120" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fill="none">
              <text x="10" y="36" fontFamily="Arial, sans-serif" fontSize="38" fontWeight="bold" fill="#ff4081">STUDENT</text>
            </svg>
          </Link>
          {
            user ? (
              <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <p className='text-white font-xs'>Welcome {user.name}</p> */}
                <Typography sx={{ textAlign: 'center', color: "white", marginRight: "5px" }}>Welcome {user.name}</Typography>
                <Avatar alt="Remy Sharp" src={user.profile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ label, path, onClick }) => (
                <MenuItem key={label} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {path ? (
                      <Link to={path} className="text-black no-underline">
                        {label}
                      </Link>
                    ) : (
                      <button onClick={onClick} className="text-black w-full text-left">
                        {label}
                      </button>
                    )}
                  </Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
            ) : (
              <Link className="btn px-4 py-1.5 rounded-sm text-lg font-bold text-white hover:bg-white hover:text-black" to={'/login'}>Login</Link>
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
