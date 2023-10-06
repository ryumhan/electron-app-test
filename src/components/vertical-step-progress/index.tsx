import React from 'react';
import {
    CheckListContainer,
    ProgressBarContainer,
    StepContainer,
    SucceedStep,
    Title,
    TodoStep,
    VerticalStepListContainer,
} from './styled';
import { Horizontal, TypoGraphy } from '@/styled';
import { imgSuccess } from '@/assets';

interface Props {
    title: string;
    steps: { name: string; checklist: string[] }[];
    currentStep: number;
    selectList?: number[];
    position: 'left' | 'right';
}

function VerticalStepProgressBar({
    title,
    currentStep,
    steps,
    selectList,
    position,
}: Props) {
    return (
        <ProgressBarContainer position={position}>
            <Title>
                <TypoGraphy type="bold">{title}</TypoGraphy>
            </Title>
            {steps.map((step, index) => {
                const done = selectList
                    ? selectList.includes(index)
                    : index <= currentStep;

                return (
                    <VerticalStepListContainer
                        done={done}
                        key={step + index.toString()}
                    >
                        <Horizontal gap={23} alignItems="center">
                            {done ? (
                                <SucceedStep src={imgSuccess} alt={step.name} />
                            ) : (
                                <TodoStep />
                            )}
                            <StepContainer>
                                <TypoGraphy
                                    type="middle"
                                    style={{ color: done ? 'green' : '' }}
                                >
                                    {step.name}
                                </TypoGraphy>
                            </StepContainer>
                        </Horizontal>
                        <Horizontal
                            justifyContent="flex-end"
                            style={{ height: '100%' }}
                        >
                            <CheckListContainer gap={10}>
                                {step.checklist.map(elem => (
                                    <TypoGraphy
                                        key={elem}
                                        type="middle"
                                        style={{ color: done ? 'green' : '' }}
                                    >
                                        ✔ {elem}
                                    </TypoGraphy>
                                ))}
                            </CheckListContainer>
                        </Horizontal>
                    </VerticalStepListContainer>
                );
            })}
        </ProgressBarContainer>
    );
}

export default VerticalStepProgressBar;
