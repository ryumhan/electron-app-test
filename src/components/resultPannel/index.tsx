import {
    PannelMessage,
    PannelContainer,
    ResultImg,
} from './readyPannel.styled';
import Button from '../button';
import { imgFailed, imgSuccess } from '@/assets';
import { Horizontal, Vertical } from '@/styled';
import { useNavigate } from 'react-router-dom';
import useFileLogger from '@/hooks/useFileLogger';

interface Props {
    type: 'success' | 'fail';
}

function ResultPannel({ type }: Props) {
    const { createFileLogging } = useFileLogger();

    const navigate = useNavigate();

    const handleNext = () => {
        createFileLogging();
        navigate('/');
    };

    return (
        <PannelContainer>
            <Vertical gap={25} alignItems="center">
                {type === 'fail' ? (
                    <>
                        <ResultImg src={imgFailed} alt="result_failed" />
                        <PannelMessage>검사 결과 실패</PannelMessage>
                    </>
                ) : (
                    <>
                        <ResultImg src={imgSuccess} alt="result_success" />
                        <PannelMessage>검사 결과 성공</PannelMessage>
                    </>
                )}
            </Vertical>
            <Horizontal gap={20}>
                <Button
                    type="primary"
                    label="다음 검사 진행"
                    disable={false}
                    size="large"
                    onClick={handleNext}
                />
            </Horizontal>
            <Vertical />
        </PannelContainer>
    );
}

export default ResultPannel;
