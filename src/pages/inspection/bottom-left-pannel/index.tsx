import React, { useMemo } from 'react';
import Button from '@/components/button';
import DataComPannel from '@/components/dataComPannel';
import LoadingPannel from '@/components/loadingPannel';
import { useTargetOru } from '@/hooks/useTargetOruContext';
import useWebSocketClient from '@/hooks/useWebSocketClient';
import { Vertical, Horizontal } from '@/styled';
import { InspectionTitle, InspectionView } from '../inspection.styled';
import { CameraStatus } from '@/model/webSocketMessage/cameraStatus';
import { HearBeat } from '@/model/webSocketMessage/heartbeat';

function BottomLeftPannel() {
    const { oruIp } = useTargetOru();
    const { open, data, timeOver, timeOutCallback } = useWebSocketClient({
        oruIp,
    });

    const heartPresentData = useMemo(() => {
        if (data?.method.includes('NotifyHeartBeat')) {
            const heartData = data as HearBeat;
            return {
                key: 'NotifyHeartBeat',
                value: `ccu-${heartData?.params?.CCU} oru-${heartData?.params?.ORU}`,
            };
        }
    }, [data]);

    const cameraPresentData = useMemo(() => {
        if (data?.method.includes('NotifyCameraStatus')) {
            const cameraData = data as CameraStatus;
            return {
                key: 'NotifyCameraStatus',
                value: `${cameraData?.params?.inputStatus.camList
                    .map((cam, idx) => `cam${idx + 1}: ${cam.status}`)
                    .join('')}`,
            };
        }
    }, [data]);

    return (
        <Vertical gap={20} style={{ width: '100%', height: '100%' }}>
            <InspectionTitle>WebSocket Test</InspectionTitle>
            <InspectionView>
                {open || !!data ? (
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
    );
}

export default BottomLeftPannel;
