import React, { useState } from 'react';
import { PannelMessage, PannelContainer } from './readyPannel.styled';
import Button from '../button';
// eslint-disable-next-line import/no-cycle
import Inspection from '@/pages/inspection';

function ReadyPannel() {
    const [goNext, setNext] = useState(false);

    if (goNext) {
        return <Inspection />;
    }

    return (
        <PannelContainer>
            <PannelMessage>
                다음 ORU 검사 대기 화면 입니다.
                <br /> ORU를 연결 확인 후 검사를 진행해 주세요.
            </PannelMessage>
            <Button
                type="primary"
                label="계속 진행"
                disable={false}
                onClick={() => setNext(true)}
            />
        </PannelContainer>
    );
}

export default ReadyPannel;
