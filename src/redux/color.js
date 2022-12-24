import { createSlice } from '@reduxjs/toolkit';
  // button color, background right, background left, nav 
const purpleArr = ["blueviolet", "#8110a0", "#3beefe", "#A23ACA"]; 
const greenArr = ["#663300", "#003300", "#009900", "#004d00"];




const initialState = {
  value: purpleArr,
}

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColorPurple: (state) => {
      state.value = purpleArr; 
    },
    setColorGreen: (state) => {
      state.value = greenArr; 
    }
  },
})

  export const { setColorPurple, setColorGreen } = colorSlice.actions

export default colorSlice.reducer