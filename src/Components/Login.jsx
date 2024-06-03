import React, { useEffect, useState } from 'react'
import login from "../assets/login.png"
import logo from "../assets/Logo.png"
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { addUser, getAllUserDetails } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ insideRegister }) {
    const [userDetails, setUserDetails] = useState({
        username: "", password: ""
    })
    const [allUsers, setAllUsers] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        try {
            const result = await getAllUserDetails()
            if (result.status >= 200 && result.status < 300) {
                setAllUsers(result.data)
            } else {
                toast.error(result.response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegister = async () => {
        try {
            if (allUsers.some(users => users.username === userDetails.username)) {
                toast.error("Username already exists")
            } else if (userDetails.username.length > 0 && userDetails.password.length > 0) {
                const result = await addUser(userDetails)
                if (result.status >= 200 && result.status < 300) {
                    toast.success("Successfully registered, Please log in!!!")
                    setUserDetails({ username: "", password: "" })
                    navigate('/')
                } else {
                    toast.error(result.response.data)
                }
            } else {
                toast.error("Please fill the details completely!!")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleLogin = () => {
        if (allUsers.some(users => 
            users.username === userDetails.username && users.password === userDetails.password
        )) {
            sessionStorage.setItem("username",userDetails.username)
            sessionStorage.setItem("password",userDetails.password)
            navigate('/home')
        } else {
            toast.error("Invalid username or password!!")
        }
    }


    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "#141414" }} className='flex justify-center items-center'>
            <div className='container w-5/12 rounded-3xl' style={{backgroundColor:"#8d8d8d1c"}}>
                <div className='shadow-2xl scroll-p-0.5'>
                    <div className='grid grid-cols-1 '>
                        <div className="p-8 flex items-center flex-col">
                            <img width={"50%"} src={logo} alt="" />
                            <h5>
                                Sign {insideRegister ? "up" : "in"} to your Account
                            </h5>
                            <TextField value={userDetails.username} onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} style={{ marginTop: "45px", width: "65%" }} id="outlined-basic" label="username" variant="outlined" />
                            <TextField value={userDetails.password} onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} style={{ marginTop: "40px", width: "65%" }} id="outlined-basic" label="password" variant="outlined" />

                            {
                                insideRegister ?
                                    <div className="mt-6 flex items-center flex-col">
                                        <Button onClick={handleRegister} variant="contained">Register</Button>
                                        <p className='mt-6' style={{ fontSize: "14px" }}>Already have an Account? Click here to <Link to={'/'}>Login</Link></p>
                                    </div>
                                    :
                                    <div className="mt-6 flex items-center flex-col">
                                        <Button onClick={handleLogin} variant="contained">Login</Button>
                                        <p className='mt-6' style={{ fontSize: "14px" }}>New User? Click here to <Link to={'/register'}>Register</Link></p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
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
    )
}

export default Login
