import styled from '@emotion/styled';
import { ButtonColor } from './button.type';

interface ButtonProps {
    type: ButtonColor;
    disable: boolean;
}

export const ButtonBox = styled.div<ButtonProps>`
    width: 90px;
    height: 35px;
    border-radius: 10px;
    background-color: ${props => (props.disable ? '#666' : props.type)};
    display: flex;
    cursor: ${props => (props.disable ? 'not-allowed' : 'pointer')};
`;

export const ButtonLabel = styled.div`
    font-weight: 500;
    font-size: 14px;
    color: white;
    margin: auto;
`;
