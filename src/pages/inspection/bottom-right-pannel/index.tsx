import React, { useMemo } from 'react';

import { Diagnostics } from '@/model';

import Button from '@/components/button';
import DataComPannel from '@/components/dataComPannel';
import LoadingPannel from '@/components/loadingPannel';
import useHttpMessage from '@/hooks/useHttpMessage';
import { useTargetOru } from '@/hooks/useTargetOruContext';
import { Vertical, Horizontal } from '@/styled';
import { InspectionTitle, InspectionView } from '../inspection.styled';

function BottomRightPannel() {
    const { oruIp } = useTargetOru();

    const { data, loading, timeOutCallback } = useHttpMessage<Diagnostics>({
        oruIp,
        category: 'diagnostics',
    });

    const oruData = useMemo(
        () => [
            { key: `ORU-Serial`, value: data?.oruInfo.serialNumber || '' },
            {
                key: `ORU-AvikusSerial`,
                value: data?.oruInfo.AvksSerial || '',
            },
        ],
        [data],
    );

    const ccuData = useMemo(
        () =>
            data?.ccuInfo
                .map((ccu, idx) => [
                    { key: `CCU${idx + 1}-Serial`, value: ccu.serialNumber },
                    {
                        key: `CCU${idx + 1}-AvikusSerial`,
                        value: ccu.AvksSerial,
                    },
                ])
                .reduce((prev, next) => prev.concat(prev, next)),
        [data],
    );

    return (
        <Vertical gap={20} style={{ width: '100%', height: '100%' }}>
            <InspectionTitle>HTTP Request Test</InspectionTitle>
            <InspectionView>
                {loading || !oruData || !ccuData ? (
                    <LoadingPannel
                        loaded={!!(ccuData && oruData)}
                        message="Connecting HttpServer..."
                        timeOutCallback={timeOutCallback}
                    />
                ) : (
                    <DataComPannel
                        status="Normal"
                        data={oruData.concat(ccuData)}
                    />
                )}
            </InspectionView>
            <Horizontal gap={10} justifyContent="flex-end">
                <Button
                    type="primary"
                    label="Success"
                    onClick={() => alert('hi')}
                    disable={loading}
                />
                <Button
                    type="warning"
                    label="Fail"
                    onClick={() => alert('hi')}
                    disable={loading}
                />
            </Horizontal>
        </Vertical>
    );
}

export default BottomRightPannel;
