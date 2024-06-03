import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Create from './Components/Create'
import Edit from './Components/Edit'
import { useState } from 'react'
import Login from './Components/Login'
import Profile from './Components/Profile'

function App() {
  const [postDetails, setPostDetails] = useState({
    image: "", username: sessionStorage.getItem("username"), location: "", caption: ""
  })
  const [allPost, setAllPost] = useState([])


  return (
    <>
      <Routes>
        <Route element={<Home allPost={allPost} setAllPost={setAllPost}/>} path='/home'/>
        <Route element={<Create postDetails={postDetails} setPostDetails={setPostDetails}/>} path='/create'/>
        <Route element={<Edit postDetails={postDetails} setPostDetails={setPostDetails}/>} path='/edit'/>
        <Route element={<Login/>} path='/'/>
        <Route element={<Login insideRegister={true}/>} path='/register'/>
        <Route element={<Profile/>} path='/profile'/>
      </Routes>
    </>
  )
}

export default App