import { PannelMessage, PannelContainer } from './readyPannel.styled';
import Button from '../button';

import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import statusAtom from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';

function ReadyPannel() {
    const navigate = useNavigate();
    // reset
    const resetOru = useResetRecoilState(statusAtom.oruIpAtom);
    const resetStatus = useResetRecoilState(statusAtom.statusAtom);
    const resetSVMReport = useResetRecoilState(inspectionAtom.svmReportAtom);
    const resetComReport = useResetRecoilState(inspectionAtom.comReportAtom);

    const handleNextInspection = () => {
        resetOru();
        resetStatus();
        resetComReport();
        resetSVMReport();

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
