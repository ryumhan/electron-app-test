import React, { useEffect, useState } from 'react';
import utils from '@/utils';
import Button from '@/components/button';
import LoadingPannel from '@/components/loadingPannel';
import useHttpMessage from '@/hooks/useHttpMessage';
import useSVMState from '@/hooks/useSVMState';
import { useTargetOru } from '@/hooks/useTargetOruContext';
import { Horizontal } from '@/styled';
import constants from '@/utils/constants';
import {
    WebViewPannel,
    InspectionView,
    InspectionTitle,
} from '../inspection.styled';
import PannelDetail from './pannel-detail';

interface Props {
    completeStepCallback: (value: boolean) => void;
}

function TopPannel({ completeStepCallback }: Props): React.ReactElement {
    const { oruIp } = useTargetOru();
    const [pageSrc, setPageSrc] = useState('');

    const { data } = useHttpMessage<{ result: { authtoken: string } }>({
        method: 'POST',
        oruIp,
        category: 'auth',
        body: { password: constants.PASSWORD },
    });

    const [
        loaded,
        svmElement,
        inspectTitle,
        checkList,
        onLoadCallback,
        onSuccessCallback,
        timeOutCallback,
    ] = useSVMState({ completeStepCallback });

    const handlePageSrc = async () => {
        if (!data?.result?.authtoken) return;

        const target = utils.getHttpPage(oruIp, 'calibration');
        const html = await utils.getWebSrcUsingHeader(
            target,
            data.result.authtoken,
        );

        if (html && svmElement.current) {
            completeStepCallback(true);
            setPageSrc('');
            svmElement.current.srcdoc = html;
        }
    };

    useEffect(() => {
        if (inspectTitle === 'Calibration') handlePageSrc();
    }, [data, inspectTitle]);

    return (
        <WebViewPannel>
            <PannelDetail checkList={[inspectTitle, ...checkList]} />
            <InspectionTitle>SVM Inspection</InspectionTitle>
            <InspectionView>
                {!loaded && (
                    <LoadingPannel
                        loaded={loaded}
                        message="Connecting SVM..."
                        timeOutCallback={() => {
                            timeOutCallback();
                            setPageSrc('');
                        }}
                    />
                )}

                <iframe
                    ref={svmElement}
                    title="svm-page"
                    src={pageSrc}
                    onLoad={onLoadCallback}
                    sandbox="allow-scripts allow-popups allow-same-origin"
                    style={{
                        visibility: loaded ? 'visible' : 'hidden',
                    }}
                />
            </InspectionView>

            <Horizontal gap={10} justifyContent="flex-end">
                <Button
                    type="primary"
                    label="Success"
                    onClick={onSuccessCallback}
                    disable={false}
                />
                <Button
                    type="warning"
                    label="Fail"
                    onClick={() => window.location.reload()}
                    disable={false}
                />
            </Horizontal>
        </WebViewPannel>
    );
}

export default TopPannel;
