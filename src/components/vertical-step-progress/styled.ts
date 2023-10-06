import { Vertical } from '@/styled';
import styled from '@emotion/styled';

const stepCircleSize = '20px';
const gapSize = '10px';

export const ProgressBarContainer = styled(Vertical)<{ position: string }>`
    position: fixed;
    width: 22%;
    height: 100%;
    background-color: #f0f0f0;
    top: 0;
    left: ${props => (props.position === 'left' ? '0' : '')};
    right: ${props => (props.position === 'right' ? '0' : '')};
    padding: 30px 35px;
    margin-top: 25px;
    gap: ${gapSize};
`;

export const Title = styled.div`
    margin: auto;
    height: 30px;
`;

export const VerticalStepListContainer = styled(Vertical)<{ done: boolean }>`
    gap: 5px;
    position: relative;
    transition: all 0.3s;
    height: 100%;
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
        background-color: ${props => (props.done ? 'green' : 'gray')};
        transition: all 0.3s;
    }
`;

export const TodoStep = styled.div`
    width: ${stepCircleSize};
    height: ${stepCircleSize};
    background-color: gray;
    border-radius: 50%;
`;

export const SucceedStep = styled.img`
    width: ${stepCircleSize};
    height: ${stepCircleSize};
`;

export const StepContainer = styled(Vertical)`
    font-size: 13px;
`;

export const CheckListContainer = styled(Vertical)`
    justify-content: center;
    width: 85%;
    font-size: 10px;
    color: gray;
`;
