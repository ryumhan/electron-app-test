import React from 'react';
import { PannelMessage, PannelContainer } from './readyPannel.styled';
import Button from '../button';

function ReadyPannel() {
    return (
        <PannelContainer>
            <PannelMessage>
                ORU를 연결 확인후 검사를 진행해 주세요.
            </PannelMessage>
            <Button
                type="normal"
                label="다음"
                disable={false}
                onClick={() => {}}
            />
        </PannelContainer>
    );
}

export default ReadyPannel;
