import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Vertical } from '@/styled';

// Define a keyframe animation for spinning
const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

/* Define the animation */
const typing = keyframes`  
from {
  width: 0;
}
to {
  width: 100%; /* Full width of the text */
}`;

export const PannelContainer = styled(Vertical)`
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const FailedIcons = styled.img`
    width: 30px;
    height: 30px;
    object-fit: contain;
`;

export const LoadingIcons = styled.img`
    width: 24px;
    height: 24px;
    object-fit: contain;
    animation: ${spinner} 1s linear infinite; // Apply the spi
`;

export const LoadingPannelMessage = styled.span`
    height: 24px;
    overflow: hidden;
    white-space: nowrap;
    animation: ${typing} 4s steps(80, end) infinite;
    font-weight: 500;
    color: gray;
    text-align: center;
    font-size: 14px;
`;

export const PannelMessage = styled.span`
    height: 24px;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 500;
    color: red;
    text-align: center;
    font-size: 14px;
`;
