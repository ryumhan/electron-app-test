import styled from '@emotion/styled';
import { Vertical, Horizontal } from '@/styled';

export const PageContainer = styled(Vertical)`
    height: 100%;
    margin: auto;
    width: 54%;
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
        height: ${props => (props.complete ? '100%' : '100px')};
        opacity: 1;
        z-index: 100001;
    }
`;

export const HeaderFront = styled(Horizontal)`
    display: flex;
    width: 50%;
    flex-direction: row;
    justify-content: center;
    gap: 80px;
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
    display: flex;
    align-items: center;
    justify-content: start;
    font-weight: bold;
    padding: 15px 20px;
    position: absolute;
    z-index: 10;
    border-radius: 3px;
    opacity: 0.7;
`;

export const InspectionView = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid gray;
    border-radius: 10px;
    background-color: transparent;
    overflow: hidden;
    position: relative;
`;

export const InspectionFail = styled.div`
    width: 100%;
    height: 100%;
    border: 2px solid gray;
    border-radius: 10px;
    background-color: transparent;
    overflow: hidden;
    position: relative;
    display: flex;
`;

export const FailText = styled(Vertical)`
    margin: auto;
    color: red;
    align-items: center;
    gap: 10px;
`;

export const ButtonContainer = styled(Horizontal)`
    position: absolute;
    padding: 15px;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    justify-content: space-between;
`;

export const ToolBoxContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    z-index: 100000;
`;

export const IconContainer = styled.div`
    border-radius: 10px;
    background-color: gray;
    opacity: 0.5;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

export const FullscreenIcon = styled.img`
    width: 25px;
    height: 25px;
    object-fit: contain;
`;

export const RightPannelContainer = styled(Horizontal)`
    position: fixed;
    padding: 30px;
    left: 77%;
    bottom: 0;
    z-index: 10;
    gap: 20px;
`;
