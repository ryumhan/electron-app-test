import {
    PannelMessage,
    PannelContainer,
    ResultImg,
} from './readyPannel.styled';
import Button from '../button';
import { imgFailed, imgSuccess } from '@/assets';
import { TypoGraphy, Vertical } from '@/styled';
import { useNavigate } from 'react-router-dom';
import useFileLogger from '@/hooks/useFileLogger';
import { useRecoilValue } from 'recoil';
import inspectionAtom from '@/atoms/inspection.atom';

interface Props {
    type: 'success' | 'fail';
}

function ResultPannel({ type }: Props) {
    useFileLogger();

    const navigate = useNavigate();
    const failReport = useRecoilValue(inspectionAtom.failReportAtom);

    return (
        <PannelContainer>
            <Vertical gap={25} alignItems="center">
                {type === 'fail' ? (
                    <>
                        <ResultImg src={imgFailed} alt="result_failed" />
                        <PannelMessage>검사 결과 실패</PannelMessage>
                        {failReport.map(error =>
                            error ? (
                                <TypoGraphy
                                    type="normal"
                                    style={{ color: 'red' }}
                                >
                                    {error}
                                </TypoGraphy>
                            ) : null,
                        )}
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
