import styled from '@emotion/styled';
import { Vertical, Horizontal } from '@/styled';

const PANNEL_SIZE = 700;

export const PageContainer = styled(Vertical)`
    height: 100%;
    margin: auto;
    padding: 0 40px;
`;

export const PageHeader = styled(Horizontal)`
    width: 100%;
    height: 80px;
    margin-top: 20px;
    padding: 0 20px;
`;

export const HeaderFront = styled.div`
    font-weight: 500;
    width: 250px;
`;

export const HeaderBack = styled(Horizontal)`
    font-weight: 500;
`;

export const ReloadButton = styled.div`
    width: 50px;
    height: 50px;
`;

export const WebViewPannel = styled(Vertical)`
    width: ${PANNEL_SIZE}px;
    height: 500px;
    gap: 20px;
    margin: auto;
    display: inline-flex;
    position: relative;
`;

export const BottomPannel = styled(Horizontal)`
    width: ${PANNEL_SIZE}px;
    height: 300px;
    gap: 20px;
    margin: auto;
    position: relative;
`;

export const InspectionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

export const InspectionView = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid gray;
    border-radius: 10px;
    background-color: transparent;
    /* opacity: 0.2; */
    overflow: hidden;
`;
