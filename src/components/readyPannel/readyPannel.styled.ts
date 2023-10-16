import { Vertical } from '@/styled';
import styled from '@emotion/styled';

export const PannelContainer = styled(Vertical)`
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const PannelMessage = styled.span`
    height: 44px;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 500;
    color: gray;
    text-align: center;
    font-size: 17px;
    line-height: normal;
`;
