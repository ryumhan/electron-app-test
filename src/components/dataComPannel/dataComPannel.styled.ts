import styled from '@emotion/styled';
import { Horizontal, Vertical } from '@/styled';

export const PannelContainer = styled(Vertical)`
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const DataKey = styled.div`
    width: 130px;
    font-weight: 500;
    font-size: 11px;
    color: gray;
    text-align: right;
`;

export const DataValue = styled.div`
    width: 130px;
    font-weight: normal;
    font-size: 10px;
    color: black;
    text-align: left;
`;

export const DataText = styled.span``;

export const FailurePannelContainer = styled.div`
    /* height: 100%; */
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

export const ValueContainer = styled(Horizontal)`
    width: 100%;
    gap: 5px;
`;
