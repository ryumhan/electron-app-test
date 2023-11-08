import styled from '@emotion/styled';
import { Vertical } from '@/styled';

export const PannelContainer = styled(Vertical)`
    gap: 2px;
`;

export const DataKey = styled.div`
    width: 50%;
    text-align: right;
    font-weight: 500;
    font-size: 9px;
    color: gray;
    align-items: center;
    height: 11px;
`;

export const DataValue = styled.div`
    width: 50%;
    font-weight: normal;
    font-size: 9px;
    color: black;
    text-align: center;
    align-items: center;
    height: 11px;
`;

export const DataText = styled.span``;

export const FailurePannelContainer = styled.div`
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: fixed;
`;

export const ComSignalIcon = styled.img`
    width: 14px;
    height: 14px;
    object-fit: contain;
`;
