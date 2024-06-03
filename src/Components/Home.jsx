import React, { useEffect } from 'react'
import userImage from '../assets/userImage.png'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllPostAPI } from '../Services/allAPI';
import { Grid } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home({ allPost, setAllPost }) {
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("username")) {
            getAllPost()
        } else {
            toast.error("Please Login")
            setTimeout(() => {
                navigate("/")
            }, 1000);
        }
    }, [])

    const getAllPost = async () => {
        try {
            const result = await getAllPostAPI()
            if (result.status >= 200 && result.status < 300) {
                setAllPost(result.data.reverse())
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
            {/* main whole container */}
            <div className='flex items-start justify-center' style={{ float: "right", width: "80%", minHeight: "100vh", padding: "20px 8px 5px 0", backgroundColor: "#141414" }}>
                {/* grid with row */}
                <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* 1st row for post details*/}
                    {
                        allPost?.length > 0 ?
                            allPost?.map(post => (
                                <Grid key={post?.id} item xs={12} className='justify-center flex' >
                                    <Card className='card1' sx={{ width: "70%", backgroundColor: "#2d2d2d" }}>
                                        <CardHeader
                                            className='text-start text-white'
                                            avatar={
                                                <Avatar>
                                                    <img src={userImage} alt="" />
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon/>
                                                </IconButton>
                                            }
                                            title={post?.username}
                                            subheader={post?.locations}
                                        />
                                        <CardMedia
                                            sx={{ maxHeight: "710px" }}
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
                                        <CardContent>
                                            <Typography variant="body2" >
                                                {post?.caption}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                            :
                            <div className='w-full flex justify-center' style={{ height: "100vh" }}><p className='text-4xl text-red-600  decoration-8 text-center'>No Post Yet</p></div>
                    }
                </Grid>

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
            </div>
        </>
    )
}

export default Home
