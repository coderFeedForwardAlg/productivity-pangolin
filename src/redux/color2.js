import { createSlice } from '@reduxjs/toolkit'
if(localStorage.getItem("color") == "purple"){
  const initialState = {
    value: "blueviolet",
  }
}
if(localStorage.getItem("color") == "green"){
  const initleState = {
    value: "green"
  }
}
if(localStorage.getItem("color") == "pink"){
  const initleState = {
    value: "pink"
  }
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