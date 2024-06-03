import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteProfileAPI } from '../Services/allAPI';
import { useNavigate } from 'react-router-dom';

function DropInProfile() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  

  const handleDelete = async (id) => {
    handleClose()
    try {
        const result = await deleteProfileAPI(id)
        if (result.status >= 200 && result.status < 300) {
            console.log(result);
            navigate('/')
        }
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div>
      <i className="fa-solid fa-chevron-down ms-2"  onClick={handleClick}></i>

      <Menu
        sx={{color:"grey"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>handleDelete(sessionStorage.getItem("id"))}>Delete Profile</MenuItem>
      </Menu>
    </div>
  )
}

export default DropInProfile
