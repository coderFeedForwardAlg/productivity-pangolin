import styled from '@emotion/styled';

export let Background = styled.div`
        text-align: center;
        // padding-top: 10%;
        background: linear-gradient(to left, ${props => props.colorL}  0%,  ${props => props.colorR} 100%);
        // background: ${props => props.color};
        background-size: cover;
        height: 100vh;
`;

export let Background2 = styled.div`
        text-align: center;
        padding-top: 10%;
        background: linear-gradient(to left, ${props => props.colorL}  0%,  ${props => props.colorR} 100%);
        // background: ${props => props.color};
        background-size: cover;
        height: 100vh;
`;