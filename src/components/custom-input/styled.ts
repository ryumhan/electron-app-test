import { GlobalColor } from '@/styled';
import styled from '@emotion/styled';

export const InputContainer = styled.div`
    display: inline-block;
    position: relative;
    height: 40px;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 14px;
    height: 40px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid gray;
`;

export const Label = styled.label<{ active: boolean }>`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 14px;
    color: #999;
    transition: all 0.3s ease;
    pointer-events: none;
    ${({ active }) =>
        active &&
        ` transform: translateY(-150%);
      font-size: 10px;
      color: #555;
    `}
`;

export const PasswordDisplayButton = styled.div`
    cursor: pointer;

    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 14px;
    color: ${GlobalColor.generalTone};
    transition: all 0.3s ease;
`;
