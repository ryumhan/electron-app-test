import Button from '@/components/button';
import LoadingPannel from '@/components/loadingPannel';
import {
    WebViewPannel,
    InspectionView,
    InspectionTitle,
    ButtonContainer,
    FullscreenIcon,
    IconContainer,
    ToolBoxContainer,
} from '../inspection.styled';

import useTopPannelData from './hook';
import { Vertical } from '@/styled';
import { ComponentProps, useState } from 'react';
import { imgFullscreen } from '@/assets';
import { ipcRenderer } from 'electron';
import { useRecoilValue } from 'recoil';
import statusAtom from '@/atoms/status.atom';

function TopPannel(): React.ReactElement {
    const [count, setCount] = useState(1);
    const [
        loaded,
        pageSrc,
        svmElement,
        fullScreen,
        setFullscreen,
        onLoadCallback,
        onBackCallback,
        onSuccessCallback,
        onFailedCallback,
        timeOutCallback,
    ] = useTopPannelData();

    const filePath = useRecoilValue(statusAtom.filePathSelector);

    const handleKeyDown: ComponentProps<'div'>['onKeyDown'] = event => {
        if (event.key === 'Escape' && fullScreen) setFullscreen();
    };

    const handleCapture = () => {
        if (!filePath) {
            alert('저장 경로를 설정하여 주세요');
            return;
        }

        ipcRenderer.send('capture-image', { filePath, count });
        setCount(count + 1);
    };

    return (
        <WebViewPannel>
            <InspectionTitle>SVM Inspection</InspectionTitle>
            <InspectionView
                tabIndex={-2}
                onKeyDown={handleKeyDown}
                style={
                    fullScreen
                        ? {
                              position: 'fixed',
                              top: '0',
                              left: '0',
                              width: '100%',
                              height: '100%',
                              zIndex: '99999',
                          }
                        : {}
                }
            >
                {!loaded && (
                    <LoadingPannel
                        loaded={loaded}
                        message="Connecting SVM..."
                        timeOutCallback={timeOutCallback}
                    />
                )}

                <ToolBoxContainer>
                    <Vertical gap={10}>
                        <Button
                            size="sm"
                            type="normal"
                            label="캡쳐"
                            disable={false}
                            onClick={handleCapture}
                        />
                        <IconContainer onClick={setFullscreen}>
                            <FullscreenIcon src={imgFullscreen} />
                        </IconContainer>
                    </Vertical>
                </ToolBoxContainer>
                <iframe
                    ref={svmElement}
                    title="svm-page"
                    src={pageSrc}
                    onLoad={onLoadCallback}
                    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
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
