import Button from '@/components/button';
import LoadingPannel from '@/components/loadingPannel';
import {
    WebViewPannel,
    InspectionView,
    InspectionTitle,
    ButtonContainer,
} from '../inspection.styled';

import useTopPannelData from './hook';
import { Vertical } from '@/styled';

function TopPannel(): React.ReactElement {
    const [
        loaded,
        pageSrc,
        svmElement,
        onLoadCallback,
        onBackCallback,
        onSuccessCallback,
        onFailedCallback,
        timeOutCallback,
    ] = useTopPannelData();

    return (
        <WebViewPannel>
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

            <ButtonContainer>
                <Vertical gap={10}>
                    <Button
                        type="normal"
                        label="Undo"
                        disable={false}
                        onClick={onBackCallback}
                    />

                    <Button
                        type="primary"
                        label="Success"
                        onClick={onSuccessCallback}
                        disable={!loaded}
                    />
                </Vertical>
                <Button
                    type="warning"
                    label="Fail"
                    onClick={onFailedCallback}
                    disable={false}
                />
            </ButtonContainer>
        </WebViewPannel>
    );
}

export default TopPannel;
