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
                    <DataKey>
                        <TypoGraphy type="bold">{current.key}</TypoGraphy>
                    </DataKey>
                    <ValueContainer>
                        {current.value ? (
                            <DataValue>
                                <TypoGraphy type="middle">
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

    return <PannelContainer gap={10}>{ResultDataList}</PannelContainer>;
}

export default DataComPannel;
