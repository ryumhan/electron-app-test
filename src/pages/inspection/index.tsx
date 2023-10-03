import { useEffect, useMemo, useState } from 'react';
import LoadingPannel from '@/components/loadingPannel';
import useORUIP from '@/hooks/useORUIP';
import { TargetContext } from '@/hooks/useTargetOruContext';
import { Vertical } from '@/styled';
import BottomLeftPannel from './bottom-left-pannel';

import BottomRightPannel from './bottom-right-pannel';
import {
    BottomPannel,
    HeaderBack,
    HeaderFront,
    PageContainer,
    PageHeader,
} from './inspection.styled';
// eslint-disable-next-line import/no-cycle
import TopPannel from './top-pannel';
import Button from '@/components/button';
// eslint-disable-next-line import/no-cycle
import ReadyPannel from '@/components/readyPannel';
import { ipcRenderer } from 'electron';

function Inspection(): React.ReactElement {
    const { oruIp, found, timeOutCallback } = useORUIP();
    const value = useMemo(() => ({ oruIp, fail: false }), [oruIp]);
    const [complete, setComplete] = useState(false);
    const [goToReady, setReady] = useState(false);
    // Only Test mode, skip Login page for development
    useEffect(() => {
        ipcRenderer.send('create-module', {});
    }, []);

    if (goToReady) return <ReadyPannel />;

    if (!found) {
        return (
            <LoadingPannel
                loaded={found}
                message="Finding ORU available..."
                timeOutCallback={() => {
                    timeOutCallback();
                    setReady(true);
                }}
            />
        );
    }

    return (
        <PageContainer>
            <TargetContext.Provider value={value}>
                <PageHeader justifyContent="space-between" alignItems="center">
                    <HeaderFront>Found: {oruIp}</HeaderFront>
                    <HeaderBack gap={20}>
                        Test Result: {value.fail ? value.fail : 'Progressing'}{' '}
                        <Button
                            type={complete ? 'primary' : 'normal'}
                            label="Complete"
                            disable={!complete}
                            onClick={() => setReady(true)}
                        />
                    </HeaderBack>
                </PageHeader>
                <Vertical style={{ height: '100%' }} gap={10}>
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
            </TargetContext.Provider>
        </PageContainer>
    );
}

export default Inspection;
