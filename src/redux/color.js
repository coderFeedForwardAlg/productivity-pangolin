import { createSlice } from '@reduxjs/toolkit';
  // button color, background right, background left, nav 
const purpleArr = ["blueviolet", "#8110a0", "#3beefe", "#A23ACA"]; 
const greenArr = ["#663300", "#003300", "#009900", "#004d00"];
const pinkArr = ["#990099",  "#e600ac", "#ff66b3", "#cc00cc" ];
const blueArr = ["#000099", "#0000b3", "#3333ff", "#000099"];

let initialState;
switch(localStorage.getItem("color")){
  case "green":
    initialState = {
      value: greenArr,
    }
    break;
  case "pink":
    initialState = {
      value: pinkArr,
    }
    break;
  case "blue":
    initialState = {
      value: blueArr,
    }
    break;
  default:
    initialState = {
      value: purpleArr,
    }
    break;
  
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
    },
    setColorPink: (state) => {
      state.value = pinkArr; 
    },
    setColorBlue: (state) => {
      state.value = blueArr; 
    }
  },
})

  export const { setColorPurple, setColorGreen, setColorPink, setColorBlue } = colorSlice.actions

export default colorSlice.reducer