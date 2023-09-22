import styled from '@emotion/styled';
import { Vertical, Horizontal } from '@/styled';

const PANNEL_SIZE = 700;

export const PageContainer = styled(Vertical)`
    height: 100%;
    margin: auto;
`;

export const WebViewPannel = styled(Vertical)`
    width: ${PANNEL_SIZE}px;
    height: 500px;
    gap: 20px;
    margin: auto;
    display: inline-flex;
`;

export const BottomPannel = styled(Horizontal)`
    width: ${PANNEL_SIZE}px;
    height: 250px;
    gap: 20px;
    margin: auto;
`;

export const InspectionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InspectionView = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid gray;
    border-radius: 10px;
    background-color: transparent;
    overflow: hidden;
`;
