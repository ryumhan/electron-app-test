import {
    PannelMessage,
    PannelContainer,
    ResultImg,
} from './readyPannel.styled';
import Button from '../button';
import { imgFailed, imgSuccess } from '@/assets';
import { Vertical } from '@/styled';
import { useNavigate } from 'react-router-dom';

interface Props {
    type: 'success' | 'fail';
}

function ResultPannel({ type }: Props) {
    const navigate = useNavigate();
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
            <Button
                type="primary"
                label="다음 검사"
                disable={false}
                onClick={() => navigate('/ready')}
            />
        </PannelContainer>
    );
}

export default ResultPannel;
