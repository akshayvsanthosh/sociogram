import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import userImage from '../assets/userImage.png'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deletePostAPI, getAllPostAPI } from '../Services/allAPI';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DropInProfile from './DropInProfile'

function Profile() {
    const [myPost, setMyPost] = useState([])
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [postToEdit, setPostToEdit] = useState(null)
    const [postDeleteStatus, setPostDeleteStatus] = useState("")

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const username = sessionStorage.getItem("username")
    const id = sessionStorage.getItem("id")

    useEffect(() => {
        if (sessionStorage.getItem("username")) {
            getAllPost()
        } else {
            toast.error("Please Login")
            setTimeout(() => {
                navigate("/")
            }, 500);
        }
    }, [postDeleteStatus])

    const getAllPost = async () => {
        try {
            const result = await getAllPostAPI()
            if (result.status >= 200 && result.status < 300) {
                setMyPost(result.data.filter(post => post.id === id))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/')
    }

    const postSettingsBttn = (id) => {
        console.log(id);
        handleOpen()
        setPostToEdit(id)
    }

    const handleDelete = async (id) => {
        try {
            const result = await deletePostAPI(id)
            if (result.status >= 200 && result.status < 300) {
                setPostDeleteStatus(result.data)
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
        handleClose()
    }


    return (
        <>
            <Navbar />
            <div style={{ float: "right", width: "80%", minHeight: "100vh", padding: "20px 8px 5px 0", backgroundColor: "#141414" }}>
                <div className='w-full flex justify-between' style={{ height: "40px" }}>
                    <div className='flex items-center'><h1 style={{ paddingLeft: "11px", fontSize: "20px" }}><AccountCircleIcon className='me-2' />{username}</h1><DropInProfile/></div>
                    <button onClick={handleLogout} className='pe-3'><LogoutIcon className='me-1' />Logout</button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-20">
                    {myPost?.length > 0 ?
                        myPost?.map(post => (
                            <div key={post?.id}>
                                <Card className='card1' sx={{ width: "100%", backgroundColor: "#2d2d2d" }}>
                                    <CardHeader
                                        className='text-start text-white'
                                        avatar={
                                            <Avatar>
                                                <img src={userImage} alt="" />
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon onClick={() => postSettingsBttn(post.id)} />
                                            </IconButton>
                                        }
                                        title={post?.username}
                                        subheader={post?.locations}
                                    />
                                    <CardMedia
                                        sx={{ height: "300px" }}
                                        component="img"
                                        image={post?.image}
                                        alt="Paella dish"
                                    />
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="add comment">
                                            <ModeCommentIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <SendIcon />
                                        </IconButton>
                                    </CardActions>

                                </Card>

                                <Modal
                                    // key={post?.id}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 400,
                                        bgcolor: '#2d2d2d',
                                        border: '2px solid #000',
                                        boxShadow: 24,
                                        p: 4,
                                    }}>
                                        <Typography id="modal-modal-description">
                                            <Link to={'/edit'} state={{ pId: postToEdit }}>Edit</Link>
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <Link onClick={() => handleDelete(postToEdit)}>Delete</Link>
                                        </Typography>
                                    </Box>
                                </Modal >
                            </div>
                        ))
                        :
                        <div className='w-full flex justify-center' style={{ height: "100vh" }}><p className='text-4xl text-red-600  decoration-8 text-center'>No Post Yet</p></div>
                    }
                </div>

            </div>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default Profile
