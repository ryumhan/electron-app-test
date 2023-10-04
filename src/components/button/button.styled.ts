import styled from '@emotion/styled';
import { ButtonColor } from './button.type';

interface ButtonProps {
    type: ButtonColor;
    disable: boolean;
}

export const ButtonBox = styled.div<ButtonProps>`
    width: 80px;
    height: 30px;
    border-radius: 10px;
    background-color: ${props => (props.disable ? '#666' : props.type)};
    display: flex;
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
