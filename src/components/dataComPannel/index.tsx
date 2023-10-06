import React, { useMemo } from 'react';
import { Horizontal, TypoGraphy } from '@/styled';

import { LoadingPannelMessage } from '../loadingPannel/loadingPannel.styled';
import {
    DataKey,
    DataValue,
    PannelContainer,
    ValueContainer,
} from './dataComPannel.styled';

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
                <Horizontal
                    gap={40}
                    key={current.key + idx.toString()}
                    style={{
                        width: '100%',
                        // padding: '0 15px',
                    }}
                >
                    <DataKey>
                        <TypoGraphy type="bold">{current.key}</TypoGraphy>
                    </DataKey>
                    <ValueContainer>
                        {current.value ? (
                            <DataValue>
                                <TypoGraphy
                                    type="bold"
                                    style={{
                                        color:
                                            current.value === 'normal'
                                                ? 'green'
                                                : '',
                                    }}
                                >
                                    {current.value}
                                </TypoGraphy>
                            </DataValue>
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

    return <PannelContainer>{ResultDataList}</PannelContainer>;
}

export default DataComPannel;
