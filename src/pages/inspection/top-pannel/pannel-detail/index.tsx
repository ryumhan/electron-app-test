import React from 'react';
import { DetailTitle, PannelDetailContainer } from '../../inspection.styled';

interface Props {
    checkList: string[];
}

function PannelDetail({ checkList }: Props) {
    return (
        <PannelDetailContainer gap={15}>
            <DetailTitle>Check List</DetailTitle>
            {checkList.map(element => (
                <li key={element.trim()}>{element}</li>
            ))}
        </PannelDetailContainer>
    );
}

export default PannelDetail;
