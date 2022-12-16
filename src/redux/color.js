import { createSlice } from '@reduxjs/toolkit'
// button color, background right, background left, nav 
const arr = ["blueviolet", "#8110a0","#3beefe", "#A23ACA"]; 
const arr2 = ["#663300", "#003300","#009900", "#004d00"]
const initialState = {
    value: arr,
  }

  export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
      setColor: (state) => {
          // this may cous problems later!
        if(state.value[0] == "blueviolet"){
            state.value = arr2;
        }else{
            state.value = arr;
        }
        
      }
    },
  })

  export const { setColor } = colorSlice.actions

export default colorSlice.reducer