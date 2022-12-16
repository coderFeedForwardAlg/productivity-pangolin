import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    value: "blueviolet",
  }

  export const color2Slice = createSlice({
    name: 'color2',
    initialState,
    reducers: {
      setColor2: (state) => {
        if(state.value == "#8110a0"){
            state.value = "#248f24";
        }else{
            state.value = "#8110a0";
        }
        
      }
    },
  })

  export const { setColor2 } = color2Slice.actions

export default color2Slice.reducer