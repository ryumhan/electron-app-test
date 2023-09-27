import { Vertical } from '@/styled';
import styled from '@emotion/styled';

export const PannelContainer = styled(Vertical)`
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const PannelMessage = styled.span`
    height: 24px;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 500;
    color: gray;
    text-align: center;
    font-size: 14px;
`;
