import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import logo from '../assets/Logo.png'
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

function Navbar() {

    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(window.matchMedia('(max-width: 800px)').matches);

    return (
        <div className='fixed top-0 left-0 ' style={{ display: 'flex', height: '100vh', minHeight: '631px', backgroundColor: '#141414', width: "20%" }}>
            <Sidebar backgroundColor='#141414' onBackdropClick={() => setToggled(false)} toggled={toggled} customBreakPoint="800px" onBreakPoint={setBroken} transitionDuration={1000}>
                <div className='brand' style={{ padding: "34px 0 0 12px", marginBottom: "35px", }}>
                    <Link to={'/home'}>
                        <img width={"53%"} src={logo} alt="LOGO" />
                    </Link>    
                </div>
                <Menu>
                    <MenuItem className='mb-4' style={{ color: "#fff", fontWeight: "600", fontSize: "17px" }}>
                        <Link to={'/home'}>
                            <HomeIcon className='mb-2 me-1' sx={{ fontSize: "29px" }} /> Home
                        </Link>
                    </MenuItem>
                    <MenuItem className='mb-4' style={{ color: "#fff", fontWeight: "600", fontSize: "17px" }}>
                        <Link to={'/create'}>
                            <AddBoxIcon className='mb-2 me-1' sx={{ fontSize: "29px" }} /> Create
                        </Link>
                    </MenuItem>
                    <MenuItem className='mb-4' style={{ color: "#fff", fontWeight: "600", fontSize: "17px" }}>
                        <Link to={'/profile'}>
                            <AccountCircleIcon className='mb-2 me-1' sx={{ fontSize: "29px" }} /> Profile
                        </Link>
                    </MenuItem>
                    <MenuItem className='mb-4' style={{ color: "#fff", fontWeight: "600", fontSize: "17px" }}><SearchIcon className='mb-2 me-1' sx={{ fontSize: "29px" }} /> Search</MenuItem>
                    <MenuItem className='mb-4' style={{ color: "#fff", fontWeight: "600", fontSize: "17px" }}><InfoIcon className='mb-2 me-1' sx={{ fontSize: "29px" }} /> About</MenuItem>
                </Menu>
            </Sidebar>
            <main style={{ padding: 0 }}>
                <div>
                    {broken && (
                        <button className="sb-button" onClick={() => setToggled(!toggled)}>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Navbar