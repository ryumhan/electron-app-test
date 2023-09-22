import styled from '@emotion/styled';
import { ButtonColor } from './button.type';

interface ButtonProps {
    type: ButtonColor;
}

export const ButtonBox = styled.div<ButtonProps>`
    width: 100px;
    height: 40px;
    border-radius: 10px;
    background-color: ${props => props.type};
    cursor: pointer;
    display: flex;
`;

export const ButtonLabel = styled.div`
    font-weight: bold;
    color: white;
    margin: auto;
`;
