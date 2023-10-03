import { Vertical } from '@/styled';
import styled from '@emotion/styled';

export const ProgressBarContainer = styled(Vertical)`
    position: absolute;
    width: 500px;
    background-color: #f0f0f0;
    transform: translateX(-100%);
    padding: 50px;
    gap: 15px;
`;

export const TodoStep = styled.div`
    width: 25px;
    height: 25px;
    background-color: 'gray';
    border-radius: 50%;
`;

export const SucceedStep = styled.img`
    width: 25px;
    height: 25px;
`;
