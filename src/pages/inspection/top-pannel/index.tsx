import Button from '@/components/button';
import LoadingPannel from '@/components/loadingPannel';
import { Horizontal } from '@/styled';
import {
    WebViewPannel,
    InspectionView,
    InspectionTitle,
} from '../inspection.styled';

import PannelDetail from './pannel-detail';
import useTopPannelData from './hook';

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
    return (
        <WebViewPannel>
            <PannelDetail checkList={checkList} />
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
                    onClick={() => window.location.reload()}
                    disable={false}
                />
            </Horizontal>
        </WebViewPannel>
    );
}

export default TopPannel;
