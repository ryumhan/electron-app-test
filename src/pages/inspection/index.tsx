import { useMemo } from 'react';
import LoadingPannel from '@/components/loadingPannel';
import useORUIP from '@/hooks/useORUIP';
import { TargetContext } from '@/hooks/useTargetOruContext';
import { Vertical } from '@/styled';
import BottomLeftPannel from './bottom-left-pannel';

import BottomRightPannel from './bottom-right-pannel';
import { BottomPannel, PageContainer } from './inspection.styled';
import TopPannel from './top-pannel';

function Inspection(): React.ReactElement {
    const { oruIp, found, timeOutCallback } = useORUIP();
    const value = useMemo(() => ({ oruIp }), [oruIp]);

    if (!found) {
        return (
            <LoadingPannel
                loaded={found}
                message="Finding ORU available..."
                timeOutCallback={timeOutCallback}
            />
        );
    }

    return (
        <PageContainer>
            <TargetContext.Provider value={value}>
                <Vertical style={{ height: '100%' }} gap={20}>
                    {/* Top */}
                    <TopPannel />
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
