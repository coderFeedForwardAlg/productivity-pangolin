import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { css } from '@emotion/css';


const MusicPlayButton = ({ icon1, icon2, text }) => {
    const [currentIcon, setCurrentIcon] = useState(icon1);
    const color = useSelector((state) => state.color.value);
    const handleClick = () => {
      setCurrentIcon(currentIcon === icon1 ? icon2 : icon1);
    };
    const text_ = text
  
    return (
        <button className={css`
        background-color: ${color[0]};
        font: roboto;
        font-size: 25px;
        height: fit-content;
        border: #0E0B16;
        box-shadow: #000000;
        border-style: solid;
        padding: 10px;
        border-radius: 12px;
        width: 100%;
        @media (min-width: 420px) {
            font-size: 30px;
        }
    `}
    onClick={handleClick}>
            <i className={currentIcon}  />
            {text_}
        </button>
        
    );
  };
  
  export default MusicPlayButton;
  
  