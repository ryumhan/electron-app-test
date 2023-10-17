import styled from '@emotion/styled';
import { ButtonColor } from './button.type';

interface ButtonProps {
    type: ButtonColor;
    disable: boolean;
    size: 'sm' | 'mid' | 'large';
}

export const ButtonBox = styled.div<ButtonProps>`
    width: ${props =>
        props.size === 'mid'
            ? '80px'
            : props.size === 'large'
            ? '120px'
            : '50px'};
    height: ${props =>
        props.size === 'mid'
            ? '30px'
            : props.size === 'large'
            ? '40px'
            : '20px'};
    border-radius: 10px;
    background-color: ${props => (props.disable ? '#666' : props.type)};
    display: flex;
    /* opacity: 0.7; */
    cursor: ${props => (props.disable ? 'not-allowed' : 'pointer')};
    :hover {
        opacity: 0.3;
        transition: ease 0.3s;
    }
`;

export const ButtonLabel = styled.div`
    font-weight: 500;
    font-size: 12px;
    color: white;
    margin: auto;
`;
