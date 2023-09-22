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

function TopPannel(): React.ReactElement {
    const { oruIp } = useTargetOru();

    const [pageSrc, setPageSrc] = useState(utils.getHttpPage(oruIp, ''));
    const [token, setToken] = useState<string>('');

    const { data } = useHttpMessage<{ token: string }>({
        method: 'POST',
        oruIp,
        category: 'auth',
        body: { password: constants.PASSWORD },
    });

    const [
        loaded,
        svmElement,
        inspectTitle,
        onLoadCallback,
        onSuccessCallback,
        timeOutCallback,
    ] = useSVMState();

    const handlePageSrc = async () => {
        if (data) setToken(data.token);

        const target = utils.getHttpPage(oruIp, 'calibration');
        const src = await utils.getWebSrcUsingHeader(target, token);
        if (src) setPageSrc(src);
    };

    useEffect(() => {
        handlePageSrc();
    }, [data]);

    return (
        <WebViewPannel>
            <InspectionTitle>{inspectTitle}</InspectionTitle>
            <InspectionView>
                {!loaded && (
                    <LoadingPannel
                        loaded={loaded}
                        message="Connecting SVM..."
                        timeOutCallback={timeOutCallback}
                    />
                )}
                {svmElement.current && !!svmElement.current.src && (
                    <iframe
                        ref={svmElement}
                        title="svm"
                        src={pageSrc}
                        onLoad={onLoadCallback}
                        style={{
                            visibility:
                                pageSrc && loaded ? 'visible' : 'hidden',
                        }}
                    />
                )}
            </InspectionView>

            <Horizontal gap={10} justifyContent="flex-end">
                <Button
                    type="primary"
                    label="Success"
                    onClick={onSuccessCallback}
                />
                <Button
                    type="warning"
                    label="Fail"
                    onClick={() => window.location.reload()}
                />
            </Horizontal>
        </WebViewPannel>
    );
}

export default TopPannel;
