import { PannelMessage, PannelContainer } from './readyPannel.styled';
import Button from '../button';

import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import statusAtom from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';

function ReadyPannel() {
    const navigate = useNavigate();
    // reset
    const resetOru = useResetRecoilState(statusAtom.oruIpAtom);
    const resetStatus = useResetRecoilState(statusAtom.statusAtom);
    const [svmDefaultVal, resetSVMReport] = useRecoilState(
        inspectionAtom.svmReportAtom,
    );
    const [comDefaultVal, resetComReport] = useRecoilState(
        inspectionAtom.comReportAtom,
    );

    const startNewInspection = useSetRecoilState(inspectionAtom.rootReporter);

    const handleNextInspection = () => {
        resetOru();
        resetStatus();
        resetSVMReport(inspectionAtom.defaultSvm);
        resetComReport(inspectionAtom.defaultCom);

        startNewInspection(current =>
            current.concat([
                {
                    error: [''],
                    last_date: '',
                    svmReports: svmDefaultVal,
                    comReports: comDefaultVal,
                },
            ]),
        );
        navigate('/inspection');
    };

    return (
        <PannelContainer>
            <PannelMessage>
                다음 ORU 검사 대기 화면 입니다.
                <br /> ORU를 연결 확인 후 검사를 진행해 주세요.
            </PannelMessage>
            <Button
                type="primary"
                label="계속 진행"
                disable={false}
                onClick={handleNextInspection}
            />
        </PannelContainer>
    );
}

export default ReadyPannel;
