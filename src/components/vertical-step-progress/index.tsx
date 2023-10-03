import React from 'react';
import { ProgressBarContainer, SucceedStep, TodoStep } from './styled';
import { Horizontal, TypoGraphy } from '@/styled';
import { imgSuccess } from '@/assets';

interface Props {
    steps: string[];
    currentStep: number;
}

function VerticalStepProgressBar({ steps, currentStep }: Props) {
    return (
        <ProgressBarContainer>
            {steps.map((step, index) => (
                <Horizontal gap={15}>
                    {index <= currentStep ? (
                        <SucceedStep src={imgSuccess} alt={step} />
                    ) : (
                        <TodoStep key={step + index.toString()} />
                    )}
                    <TypoGraphy>{step}</TypoGraphy>
                </Horizontal>
            ))}
        </ProgressBarContainer>
    );
}

export default VerticalStepProgressBar;
