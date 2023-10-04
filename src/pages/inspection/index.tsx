import React, { useEffect, useState } from 'react';
import LoadingPannel from '@/components/loadingPannel';
import useORUIP from '@/hooks/useORUIP';

import { Horizontal, TypoGraphy, Vertical } from '@/styled';

import BottomLeftPannel from './bottom-left-pannel';
import BottomRightPannel from './bottom-right-pannel';

import {
    BottomPannel,
    HeaderBack,
    HeaderFront,
    PageContainer,
    PageHeader,
} from './inspection.styled';

import TopPannel from './top-pannel';
import Button from '@/components/button';

import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';
import statusAtom from '@/atoms/status.atom';
import { useRecoilValue } from 'recoil';

function Inspection(): React.ReactElement {
    const navigate = useNavigate();

    const { oruIp, found, timeOutCallback } = useORUIP();

    const status = useRecoilValue(statusAtom.statusAtom);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        ipcRenderer.send('create-module', {});
    }, []);

    if (!found) {
        return (
            <LoadingPannel
                loaded={found}
                message="Finding ORU available..."
                timeOutCallback={() => {
                    timeOutCallback();
                    navigate('/ready');
                }}
            />
        );
    }

    return (
        <PageContainer>
            <PageHeader justifyContent="space-between" alignItems="center">
                <HeaderFront>
                    <TypoGraphy type="bold">Found:</TypoGraphy>
                    <TypoGraphy type="middle">{oruIp}</TypoGraphy>
                </HeaderFront>
                <HeaderBack gap={20}>
                    <Horizontal gap={10}>
                        <TypoGraphy type="bold">Test Result:</TypoGraphy>
                    </Horizontal>

                    <Button
                        type={complete ? 'primary' : 'normal'}
                        label={status}
                        disable={!complete}
                        onClick={() => navigate('/success')}
                    />
                </HeaderBack>
            </PageHeader>
            <Vertical style={{ height: '100%', paddingTop: '20px' }} gap={10}>
                {/* Top */}
                <TopPannel completeStepCallback={setComplete} />
                {/* Bottom */}
                <BottomPannel>
                    {/* Left */}
                    <BottomLeftPannel />
                    {/* Right */}
                    <BottomRightPannel />
                </BottomPannel>
            </Vertical>
        </PageContainer>
    );
}

export default Inspection;
