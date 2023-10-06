import Button from '@/components/button';
import DataComPannel from '@/components/dataComPannel';
import LoadingPannel from '@/components/loadingPannel';
import { Vertical } from '@/styled';
import {
    ButtonContainer,
    InspectionTitle,
    InspectionView,
} from '../inspection.styled';
import useBottomLeftData from './hook';
import VerticalStepProgressBar from '@/components/vertical-step-progress';
import constants from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import inspectionAtom from '@/atoms/inspection.atom';

function BottomLeftPannel() {
    const navigate = useNavigate();
    const [
        open,
        heartPresentData,
        cameraPresentData,
        timeOver,
        timeOutCallback,
    ] = useBottomLeftData();

    const [comReport, setComReport] = useRecoilState(
        inspectionAtom.comSelector,
    );

    const failHandler = () => {
        setComReport(current => {
            return current.map((elem, idx) =>
                idx === 0 ? { name: elem.name, result: false } : elem,
            );
        });

        navigate('/fail');
    };

    const successandler = () => {
        setComReport(current => {
            return current.map((elem, idx) =>
                idx === 0 ? { name: elem.name, result: true } : elem,
            );
        });
    };

    return (
        <>
            <VerticalStepProgressBar
                steps={constants.COM_INSPECTION_STEP.map(elem => {
                    return { name: elem.name, checklist: elem.checkList };
                })}
                selectList={comReport
                    .map((elem, idx) => (elem.result ? idx : -1))
                    .filter(elem => elem !== -1)}
                currentStep={0}
                position="right"
                title="통신 검사 항목"
            />
            <Vertical gap={20} style={{ width: '100%', height: '100%' }}>
                <InspectionView>
                    <InspectionTitle>WebSocket Test</InspectionTitle>
                    {open ? (
                        <Vertical
                            style={{ height: '100%' }}
                            justifyContent="center"
                            gap={10}
                        >
                            <DataComPannel
                                timeOver={timeOver}
                                data={
                                    heartPresentData ||
                                    constants.DEFAULT_HEARTBEAT_DATA
                                }
                            />
                            <DataComPannel
                                timeOver={timeOver}
                                data={
                                    cameraPresentData ||
                                    constants.DEFAULT_CAMERA_DATA
                                }
                            />
                        </Vertical>
                    ) : (
                        <LoadingPannel
                            loaded={open}
                            message="Connecting WebSocket..."
                            timeOutCallback={timeOutCallback}
                        />
                    )}
                    <ButtonContainer>
                        <Button
                            type="primary"
                            label="Success"
                            onClick={successandler}
                            disable={!open}
                        />
                        <Button
                            type="warning"
                            label="Fail"
                            onClick={failHandler}
                            disable={false}
                        />
                    </ButtonContainer>
                </InspectionView>
            </Vertical>
        </>
    );
}

export default BottomLeftPannel;
