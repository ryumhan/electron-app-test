import Button from '@/components/button';
import LoadingPannel from '@/components/loadingPannel';
import { Horizontal } from '@/styled';
import {
    WebViewPannel,
    InspectionView,
    InspectionTitle,
} from '../inspection.styled';

import VerticalStepProgress from '../../../components/vertical-step-progress';
import useTopPannelData from './hook';
// import { useEffect, useState } from 'react';

interface Props {
    completeStepCallback: (value: boolean) => void;
}

function TopPannel({ completeStepCallback }: Props): React.ReactElement {
    const [
        loaded,
        pageSrc,
        checkList,
        svmElement,
        onLoadCallback,
        onSuccessCallback,
        timeOutCallback,
    ] = useTopPannelData({
        completeStepCallback,
    });

    // const [goToReady, setReady] = useState(false);

    return (
        <WebViewPannel>
            <VerticalStepProgress steps={checkList} currentStep={1} />
            <InspectionTitle>SVM Inspection</InspectionTitle>
            <InspectionView>
                {!loaded && (
                    <LoadingPannel
                        loaded={loaded}
                        message="Connecting SVM..."
                        timeOutCallback={timeOutCallback}
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
                    onClick={() => {}}
                    disable={false}
                />
            </Horizontal>
        </WebViewPannel>
    );
}

export default TopPannel;
