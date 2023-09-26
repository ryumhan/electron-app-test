import React, { useMemo } from 'react';
import { imgFailed, imgSuccess } from '@/assets';
import { Horizontal } from '@/styled';

import { LoadingPannelMessage } from '../loadingPannel/loadingPannel.styled';
import {
    DataKey,
    DataValue,
    PannelContainer,
    ComSignalIcon,
    ValueContainer,
} from './dataComPannel.styled';

interface Props {
    status: 'Normal' | 'Interval';
    data:
        | { key: string; value: string }[]
        | { key: string; value: undefined }[];
    timeOver?: boolean;
}

function DataComPannel({ data, status, timeOver }: Props) {
    const ResultDataList = useMemo(() => {
        return data?.map(current => {
            return (
                <Horizontal
                    gap={20}
                    key={current.key}
                    style={{
                        width: '100%',
                        padding: '0 20px',
                    }}
                    alignItems="center"
                >
                    <DataKey>{current.key}</DataKey>
                    <ValueContainer>
                        {current.value ? (
                            <>
                                <DataValue>{current.value}</DataValue>
                                {status === 'Interval' && (
                                    <ComSignalIcon
                                        src={timeOver ? imgFailed : imgSuccess}
                                    />
                                )}
                            </>
                        ) : (
                            <LoadingPannelMessage>
                                .........
                            </LoadingPannelMessage>
                        )}
                    </ValueContainer>
                </Horizontal>
            );
        });
    }, [data, timeOver]);

    return <PannelContainer gap={10}>{ResultDataList}</PannelContainer>;
}

export default DataComPannel;
