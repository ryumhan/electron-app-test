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

function BottomLeftPannel() {
    const navigate = useNavigate();
    const [
        open,
        heartPresentData,
        cameraPresentData,
        timeOver,
        timeOutCallback,
    ] = useBottomLeftData();

    return (
        <>
            <VerticalStepProgressBar
                steps={constants.COM_INSPECTION_STEP.map(elem => {
                    return { name: elem.name, checklist: elem.checkList };
                })}
                selectList={[1]}
                currentStep={0}
                position="right"
                title="통신 검사 항목"
            />
            <Vertical gap={20} style={{ width: '100%', height: '100%' }}>
                <InspectionView>
                    <InspectionTitle>WebSocket Test</InspectionTitle>
                    {open ? (
                        <Vertical style={{ height: '100%' }}>
                            <DataComPannel
                                timeOver={timeOver}
                                status="Interval"
                                data={
                                    heartPresentData
                                        ? [heartPresentData]
                                        : [
                                              {
                                                  key: 'NotifyHeartBeat',
                                                  value: undefined,
                                              },
                                          ]
                                }
                            />
                            <DataComPannel
                                timeOver={timeOver}
                                status="Interval"
                                data={
                                    cameraPresentData
                                        ? [cameraPresentData]
                                        : [
                                              {
                                                  key: 'NotifyCameraStatus',
                                                  value: undefined,
                                              },
                                          ]
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
                            onClick={() => {}}
                            disable={!open}
                        />
                        <Button
                            type="warning"
                            label="Fail"
                            onClick={() => navigate('/fail')}
                            disable={false}
                        />
                    </ButtonContainer>
                </InspectionView>
            </Vertical>
        </>
    );
}

export default BottomLeftPannel;
