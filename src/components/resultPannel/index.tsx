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
import { ipcRenderer } from 'electron';
import { useRecoilState } from 'recoil';
import statusAtom from '@/atoms/status.atom';

interface Props {
    type: 'success' | 'fail';
}

function ResultPannel({ type }: Props) {
    useFileLogger();

    const [filePath, setPath] = useRecoilState(statusAtom.filePathSelector);

    const navigate = useNavigate();

    const selectDirectory = () => {
        if (!filePath) ipcRenderer.send('open-directory-dialog');
        ipcRenderer.on('selected-directory', (_, path) => {
            setPath(path);
        });
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
                    label="다음 검사"
                    disable={false}
                    onClick={() => navigate('/ready')}
                />
                <Button
                    type="primary"
                    label="저장 경로 설정"
                    disable={false}
                    onClick={selectDirectory}
                />
            </Horizontal>
            <Vertical />
        </PannelContainer>
    );
}

export default ResultPannel;
