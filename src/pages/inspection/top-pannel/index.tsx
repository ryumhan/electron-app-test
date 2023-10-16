import Button from '@/components/button';
import LoadingPannel from '@/components/loadingPannel';
import {
    WebViewPannel,
    InspectionView,
    InspectionTitle,
    ButtonContainer,
    UndoContainer,
} from '../inspection.styled';

import VerticalStepProgress from '@/components/vertical-step-progress';
import useTopPannelData from './hook';
import { useNavigate } from 'react-router-dom';
import constants from '@/utils/constants';
import { useRecoilValue } from 'recoil';
import inspectionAtom from '@/atoms/inspection.atom';

function TopPannel(): React.ReactElement {
    const navigate = useNavigate();
    const handleFail = () => {
        navigate('/fail');
    };

    const [
        loaded,
        pageSrc,
        svmElement,
        onLoadCallback,
        onBackCallback,
        onSuccessCallback,
        timeOutCallback,
    ] = useTopPannelData();

    const currentStep = useRecoilValue(inspectionAtom.svmStepSelector);

    return (
        <WebViewPannel>
            <UndoContainer>
                <Button
                    type="normal"
                    label="Undo"
                    disable={false}
                    onClick={onBackCallback}
                />
            </UndoContainer>
            <VerticalStepProgress
                steps={constants.SVM_INSPECTION_STEP.map(elem => {
                    return { name: elem.name, checklist: elem.checkList };
                })}
                currentStep={currentStep}
                position="left"
                title="SVM 검사 항목"
            />
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
                <Button
                    type="primary"
                    label="Success"
                    onClick={onSuccessCallback}
                    disable={!loaded}
                />
                <Button
                    type="warning"
                    label="Fail"
                    onClick={handleFail}
                    disable={false}
                />
            </ButtonContainer>
        </WebViewPannel>
    );
}

export default TopPannel;
