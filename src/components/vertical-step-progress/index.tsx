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
    const current = !selectList ? currentStep + 1 : currentStep;
    return (
        <ProgressBarContainer position={position}>
            <Title>
                <TypoGraphy type="bold">{title}</TypoGraphy>
            </Title>
            {steps.map((step, index) => {
                const done = selectList
                    ? selectList.includes(index)
                    : index <= currentStep;

                const isBold = selectList ? true : current === index;

                return (
                    <VerticalStepListContainer
                        done={done}
                        key={step + index.toString()}
                        style={{
                            opacity: isBold ? '1' : '0.6',
                        }}
                    >
                        <Horizontal gap={23} alignItems="center">
                            {done ? (
                                <SucceedStep src={imgSuccess} alt={step.name} />
                            ) : (
                                <TodoStep />
                            )}
                            <StepContainer>
                                <TypoGraphy
                                    type={isBold ? 'bold' : 'middle'}
                                    style={{ color: done ? 'green' : 'black' }}
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
                                        type={isBold ? 'bold' : 'middle'}
                                        style={{
                                            fontSize: isBold ? '13px' : '10px',
                                            color: done ? 'green' : 'black',
                                        }}
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
