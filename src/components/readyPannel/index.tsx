import { PannelMessage, PannelContainer } from './readyPannel.styled';
import Button from '../button';

import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import statusAtom from '@/atoms/status.atom';
import inspectionAtom from '@/atoms/inspection.atom';
import CustomInput from '../custom-input';
import dayjs from 'dayjs';

function ReadyPannel() {
    const navigate = useNavigate();
    // reset
    const resetOru = useResetRecoilState(statusAtom.oruIpAtom);

    const resetSVMReport = useResetRecoilState(inspectionAtom.svmReportAtom);
    const resetComReport = useResetRecoilState(inspectionAtom.comReportAtom);
    const setStartDate = useSetRecoilState(statusAtom.startDateSelector);

    const [sn, setSn] = useRecoilState(statusAtom.snAtom);

    const handleNextInspection = () => {
        resetOru();

        resetSVMReport();
        resetComReport();

        navigate('/inspection');

        setStartDate(dayjs().format('YYYY_MM_DD_HH:mm'));
    };

    const onChange = (value: string) => setSn(value);

    return (
        <PannelContainer>
            <PannelMessage>
                다음 ORU 검사 대기 화면 입니다.
                <br /> ORU를 연결 확인 후 검사를 진행해 주세요.
            </PannelMessage>
            <div style={{ width: '30%' }}>
                <CustomInput
                    defaultValue={sn}
                    name="SN"
                    type="text"
                    label="SN를 입력해주세요"
                    style={{ width: '100%' }}
                    onChangeCallback={onChange}
                />
            </div>
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
