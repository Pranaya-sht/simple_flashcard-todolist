import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    roomClick: false,
    roomStatus: false,
    roomData: {},
    inputField: null
}


const roomSlice = createSlice({

    name: 'room',
    initialState,

    reducers: {

        enterRoom: (state, action) => {

            const { roomData, inputField } = action.payload
            state.roomStatus = true;
            state.roomData = roomData
        },

        setInputField: (state, action) => {

            const { inputField } = action.payload;
            state.inputField = inputField;
        },

        leaveRoom: (state, action) => {

            state.roomStatus = false;
            state.inputField = null;

        },

        setRoomClick: (state, action) => {

            console.log("payload", state.roomClick)
            state.roomClick = action.payload
            console.log("after payload", state.roomClick)
        },

        setRoomStatus: (state, action) => {

            console.log("before status payload", state.roomStatus)
            state.roomStatus = action.payload
            console.log("after status payload", state.roomStatus)

        },

        setRoomData: (state, action) => {


            console.log("Payload on room data", action.payload)
            console.log("before RoomData payload", state.roomData)

            state.roomData = {
                ...(state.roomData),
                ...(action.payload)
            };

            console.log("after Roomdata payload", state.roomData)

        }

    }

});

export default roomSlice.reducer;
export const { enterRoom, leaveRoom, setInputField, setRoomClick, setRoomStatus, setRoomData } = roomSlice.actions;
