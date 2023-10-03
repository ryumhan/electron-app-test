import Button from '@/components/button';
import DataComPannel from '@/components/dataComPannel';
import LoadingPannel from '@/components/loadingPannel';
import { Vertical, Horizontal } from '@/styled';
import { InspectionTitle, InspectionView } from '../inspection.styled';
import useBottomLeftData from './hook';
import VerticalStepProgressBar from '@/components/vertical-step-progress';
import constants from '@/utils/constants';

function BottomLeftPannel() {
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
                steps={constants.COM_INSPECTION_STEP.map(elem => elem.name)}
                currentStep={0}
            />
            <Vertical gap={20} style={{ width: '100%', height: '100%' }}>
                <InspectionTitle>WebSocket Test</InspectionTitle>
                <InspectionView>
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
                </InspectionView>
                <Horizontal gap={10} justifyContent="flex-end">
                    <Button
                        type="primary"
                        label="Success"
                        onClick={() => {}}
                        disable={!open}
                    />
                    <Button
                        type="warning"
                        label="Fail"
                        onClick={() => alert('hi')}
                        disable={false}
                    />
                </Horizontal>
            </Vertical>
        </>
    );
}

export default BottomLeftPannel;
