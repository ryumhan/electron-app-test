import { PannelMessage, PannelContainer } from './readyPannel.styled';
import Button from '../button';

import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import statusAtom from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';
import CustomInput from '../custom-input';
import { Horizontal, TypoGraphy } from '@/styled';
import { ipcRenderer } from 'electron';

import dayjs from 'dayjs';
import * as fs from 'fs';

function ReadyPannel() {
    const navigate = useNavigate();
    // reset
    const resetOru = useResetRecoilState(statusAtom.oruIpAtom);

    const resetSVMReport = useResetRecoilState(inspectionAtom.svmReportAtom);
    const resetComReport = useResetRecoilState(inspectionAtom.comReportAtom);
    const setStartDate = useSetRecoilState(statusAtom.startDateSelector);

    const [filePath, setPath] = useRecoilState(statusAtom.filePathSelector);

    const selectDirectory = () => {
        ipcRenderer.send('open-directory-dialog');
        ipcRenderer.on('selected-directory', (_, path: string) => {
            const date = dayjs().format('YYYY_MM_DD');
            const newFolder = `${path}/${date}`;

            setPath(newFolder);
        });
    };

    const [sn, setSn] = useRecoilState(statusAtom.snAtom);

    const handleNextInspection = () => {
        if (!sn) {
            return;
        }

        if (!filePath) {
            alert('저장 경로를 설정하여 진행해 주세요.');
            return;
        }

        if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

        resetOru();

        resetSVMReport();
        resetComReport();

        navigate('/inspection');
        setStartDate(dayjs().format('YYYY_MM_DD_HH:mm'));
    };

    const onChange = (value: string) => {
        setSn(value);
        localStorage.setItem('sn', value);
    };

    return (
        <PannelContainer>
            <PannelMessage>
                다음 ORU 검사 대기 화면 입니다.
                <br />
                <TypoGraphy type="middle" style={{ color: 'red' }}>
                    ORU를 연결 확인 후 검사를 진행해 주세요.
                </TypoGraphy>
            </PannelMessage>
            <div style={{ width: '30%' }}>
                <CustomInput
                    defaultValue={sn}
                    name="SN"
                    type="text"
                    label="검사 진행할 모트렉스 SN를 입력해주세요"
                    style={{ width: '100%' }}
                    onChangeCallback={onChange}
                />
            </div>
            <Horizontal gap={15}>
                <Button
                    type="primary"
                    label="계속 진행"
                    disable={false}
                    onClick={handleNextInspection}
                />
                <Button
                    size="mid"
                    type={filePath ? 'normal' : 'warning'}
                    label={filePath ? '저장 경로 변경' : '저장 경로 설정'}
                    disable={false}
                    onClick={selectDirectory}
                />
            </Horizontal>
        </PannelContainer>
    );
}

export default ReadyPannel;
