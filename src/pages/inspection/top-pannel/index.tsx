/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
import { Horizontal, Vertical } from '@/styled';
import { ComponentProps } from 'react';
import { imgFullscreen } from '@/assets';
import html2canvas from 'html2canvas';
import fs from 'fs';
import { PNG } from 'pngjs';

function TopPannel(): React.ReactElement {
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

    const handleKeyDown: ComponentProps<'div'>['onKeyDown'] = event => {
        if (event.key === 'Escape' && fullScreen) setFullscreen();
    };

    const handleCapture = () => {
        const iframe = svmElement.current;

        if (!iframe) return;

        html2canvas(iframe).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            // 데이터 파싱
const imageData = imgData.replace(/^data:image\/\w+;base64,/, '');
const buffer = Buffer.from(imageData, 'base64');

// PNG 이미지 생성
const png = new PNG();
png.parse(buffer, (error, data) => {
  if (error) {
    console.error('PNG 변환 중 오류가 발생했습니다.', error);
  } else {
    fs.createWriteStream('image.png').write(data);
    console.log('이미지가 성공적으로 저장되었습니다.');
  }
        });
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
                    <Horizontal gap={20}>
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
                    </Horizontal>
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
