import {
    CheckListContainer,
    ProgressBarContainer,
    StepContainer,
    StepIcon,
    Title,
    TodoStep,
    VerticalStepListContainer,
} from './styled';
import { Horizontal, TypoGraphy } from '@/styled';
import { imgFailed, imgSuccess } from '@/assets';
import { InspectionData } from '@/atoms/inspection.atom';

interface Props {
    multiple: boolean;
    title: string;
    steps: { name: string; checklist: string[] }[];
    reportList: InspectionData[];
    currentStep: number;
    position: 'left' | 'right';
}

function VerticalStepProgressBar({
    multiple,
    title,
    currentStep,
    reportList,
    steps,
    position,
}: Props) {
    return (
        <ProgressBarContainer position={position}>
            <Title>
                <TypoGraphy type="bold">{title}</TypoGraphy>
            </Title>
            {steps.map((step, index) => {
                const isBold =
                    (currentStep + 1 === index && multiple) ||
                    position === 'right';
                const { result } = reportList[index];
                const color =
                    result === 'Progressing'
                        ? 'gray'
                        : result === 'Pass'
                        ? 'green'
                        : 'red';
                return (
                    <VerticalStepListContainer
                        color={color}
                        key={step + index.toString()}
                        style={{
                            opacity: isBold ? '1' : '0.4',
                        }}
                    >
                        <Horizontal gap={15} alignItems="center">
                            {result !== 'Progressing' ? (
                                <StepIcon
                                    src={
                                        result === 'Pass'
                                            ? imgSuccess
                                            : imgFailed
                                    }
                                    alt={step.name}
                                />
                            ) : (
                                <TodoStep />
                            )}
                            <StepContainer>
                                <TypoGraphy
                                    type={isBold ? 'bold' : 'middle'}
                                    style={{ color }}
                                >
                                    {step.name}
                                </TypoGraphy>
                            </StepContainer>
                        </Horizontal>
                        <Horizontal justifyContent="flex-end">
                            <CheckListContainer gap={10}>
                                {step.checklist.map(elem => (
                                    <TypoGraphy
                                        key={elem}
                                        type={isBold ? 'bold' : 'middle'}
                                        style={{
                                            fontSize: '10px',
                                            color,
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
