import { Vertical } from '@/styled';
import styled from '@emotion/styled';

const stepCircleSize = '20px';
const gapSize = '30px';

export const ProgressBarContainer = styled(Vertical)<{ position: string }>`
    position: fixed;
    width: 23%;
    height: 100%;
    background-color: #f0f0f0;
    top: 0;
    left: ${props => (props.position === 'left' ? '0' : '')};
    right: ${props => (props.position === 'right' ? '0' : '')};
    padding: 30px 35px;
    margin-top: 25px;
    gap: ${gapSize};
    overflow-y: scroll;
`;

export const Title = styled.div`
    height: 20px;
`;

export const VerticalStepListContainer = styled(Vertical)<{ color: string }>`
    gap: 15px;
    position: relative;
    transition: all 0.3s;
    width: 100%;

    :after {
        content: '';
        z-index: -1;
        opacity: 0.5;
        width: 1.3px;
        height: 100%;
        position: absolute;
        padding-bottom: ${gapSize};
        transform: translateX(calc(10px - 1.3px)) translateY(${stepCircleSize});
        background-color: ${props => props.color};
        transition: all 0.3s;
    }
`;

export const TodoStep = styled.div`
    width: ${stepCircleSize};
    height: ${stepCircleSize};
    background-color: gray;
    border-radius: 50%;
`;

export const StepIcon = styled.img`
    width: ${stepCircleSize};
    height: ${stepCircleSize};
`;

export const StepContainer = styled(Vertical)`
    font-size: 13px;
`;

export const CheckListContainer = styled(Vertical)`
    justify-content: center;
    width: 85%;
    color: gray;
`;
