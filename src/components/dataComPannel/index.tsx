import React, { useMemo } from 'react';
import { Horizontal, TypoGraphy } from '@/styled';

import { LoadingPannelMessage } from '../loadingPannel/loadingPannel.styled';
import { DataKey, DataValue, PannelContainer } from './dataComPannel.styled';

interface Props {
    data:
        | { key: string; value: string }[]
        | { key: string; value: undefined }[];
    timeOver?: boolean;
}

function DataComPannel({ data, timeOver }: Props) {
    const ResultDataList = useMemo(() => {
        return data?.map((current, idx) => {
            return (
                <Horizontal gap={30} key={current.key + idx.toString()}>
                    <DataKey>
                        <TypoGraphy type="bold">{current.key}</TypoGraphy>
                    </DataKey>

                    {current.value ? (
                        <DataValue>
                            <TypoGraphy
                                type="bold"
                                style={{
                                    color:
                                        current.value === 'normal'
                                            ? 'green'
                                            : 'red',
                                }}
                            >
                                {current.value}
                            </TypoGraphy>
                        </DataValue>
                    ) : (
                        <Horizontal
                            justifyContent="center"
                            style={{ width: '50%', height: '11px' }}
                        >
                            <LoadingPannelMessage>
                                .........
                            </LoadingPannelMessage>
                        </Horizontal>
                    )}
                </Horizontal>
            );
        });
    }, [data, timeOver]);

    return <PannelContainer>{ResultDataList}</PannelContainer>;
}

export default DataComPannel;
