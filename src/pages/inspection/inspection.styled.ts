import styled from '@emotion/styled';
import { Vertical, Horizontal } from '@/styled';

export const PageContainer = styled(Vertical)`
    height: 100%;
    margin: auto;
    width: 56%;
    padding: 0 40px;
    background-color: #f0f0f0;
    position: relative;
    border: 1px solid gainsboro;
`;

export const PageHeader = styled(Horizontal)<{ complete: boolean }>`
    height: ${props => (props.complete ? '100%' : '40px')};
    width: 100%;
    z-index: 1000;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    opacity: ${props => (props.complete ? 0.8 : 0.5)};
    border-radius: 5px;
    transition: all 0.2s;
    :hover {
        height: 70px;
        opacity: 1;
    }
`;

export const HeaderFront = styled.div`
    display: flex;
    width: 50%;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
    font-weight: 500;
    /* padding: 0 50px; */
`;

export const HeaderBack = styled(Horizontal)`
    font-weight: 500;
    width: 50%;
    justify-content: center;
    /* padding: 0 50px; */
`;

export const ReloadButton = styled.div`
    width: 50px;
    height: 50px;
`;

export const WebViewPannel = styled(Vertical)`
    width: 100%;
    height: 60%;
    gap: 20px;
    margin: auto;
    display: inline-flex;
    position: relative;
`;

export const BottomPannel = styled(Horizontal)`
    width: 100%;
    height: 30%;
    gap: 20px;
    margin: auto;
    position: relative;
`;

export const InspectionTitle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    padding: 15px 0;
    position: absolute;
    z-index: 999;
`;

export const InspectionView = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid gray;
    border-radius: 10px;
    background-color: transparent;
    /* opacity: 0.2; */
    overflow: hidden;
    position: relative;
`;

export const ButtonContainer = styled(Horizontal)`
    position: absolute;
    bottom: 15px;
    right: 15px;
    gap: 5px;
    z-index: 10;
`;
