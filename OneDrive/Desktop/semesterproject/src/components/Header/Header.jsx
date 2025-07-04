import React from 'react'
import Button from '../Button.jsx'
import { useNavigate } from 'react-router-dom'
import Setting from '../Header/Setting.jsx';
import CreateRoom from './CreateRoom.jsx';
// import JoinRoom from './JoinRoom.jsx';
// import { getRoomClick } from "../../store/roomSlice.js"
import { setRoomClick } from '../../store/roomSlice.js';


import { useSelector, useDispatch } from 'react-redux';
// import { authReducer } from "../../store/authSlice.js"
import GitHubUser from "./Showgithub.jsx"
import '../../App.css';


function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginStatus = useSelector(state => state.auth.loginStatus);
    const roomClick = useSelector((state) => state.room.roomClick);

    const handleClick = (e) => {

        e.preventDefault();
        console.log(e)

        console.log("clicked")
        dispatch(setRoomClick(!roomClick))
    }


    return (

        <div className={`w-full h-24 bg-tertiary text-customWhite flex justify-between items-center`}>

            {/* Left */}
            <div className='flex flex-row gap-10 mx-5'>
                {/* Logo */}
                 {/* Logo */}
                 <div
                    className='font-black cursor-pointer code-room'
                    onClick={() => {
                        navigate("/");
                    }}>
                    Code Room
                </div>

                {/* Dynamic Login / Show Github */}
        {!loginStatus ? (
          <Button
            custom_class='w-40 py-2.5 rounded-md bg-primary text-white'
            buttonLabel={"Login"}
            handleClick={() => { navigate('/login'); }}
          />
        ) : (
          <GitHubUser username={userData.github} />
        )}
      </div>






            {/* Right */}

            <div className='flex flex-row gap-10 mx-5'>


                {/* Dynamic Room / if logged in*/}
                {!loginStatus ? "" : <div className='flex flex-col gap-2'>
                    <CreateRoom handleClick={handleClick} />

                </div >}


                {/* setting */}
                < div className='mt-4' >
                    <Setting />
                </div >


            </div >





        </div >
    )
}

export default Header