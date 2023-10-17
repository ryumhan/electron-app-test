import React, { useEffect } from 'react';
import LoadingPannel from '@/components/loadingPannel';
import useORUIP from '@/hooks/useORUIP';

import { Horizontal, TypoGraphy, Vertical } from '@/styled';

import BottomLeftPannel from './bottom-left-pannel';
import BottomRightPannel from './bottom-right-pannel';

import {
    BottomPannel,
    HeaderBack,
    HeaderFront,
    PageContainer,
    PageHeader,
    RightPannelContainer,
} from './inspection.styled';

import TopPannel from './top-pannel';
import Button from '@/components/button';

import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import inspectionAtom from '@/atoms/inspection.atom';
import constants from '@/utils/constants';
import VerticalStepProgress from '@/components/vertical-step-progress';
import VerticalStepProgressBar from '@/components/vertical-step-progress';
import statusAtom from '@/atoms/status.atom';

const { COM_INSPECTION_STEP } = constants;

function Inspection(): React.ReactElement {
    const navigate = useNavigate();

    const { oruIp, found, timeOutCallback } = useORUIP();

    const sn = useRecoilValue(statusAtom.snAtom);

    const status = useRecoilValue(inspectionAtom.statusSelector);
    const svmReport = useRecoilValue(inspectionAtom.svmReportAtom);
    const comReport = useRecoilValue(inspectionAtom.comReportAtom);
    const currentStep = useRecoilValue(inspectionAtom.svmStepSelector);

    const setPath = useSetRecoilState(statusAtom.filePathSelector);

    useEffect(() => {
        ipcRenderer.send('create-module', {});
    }, []);

    if (!found) {
        return (
            <LoadingPannel
                loaded={found}
                message="Finding ORU available..."
                timeOutCallback={() => {
                    timeOutCallback();
                    navigate('/ready');
                }}
            />
        );
    }

    const selectDirectory = () => {
        ipcRenderer.send('open-directory-dialog');
        ipcRenderer.on('selected-directory', (_, path) => {
            setPath(path);
        });
    };

    const buttonType =
        status === 'Pass'
            ? 'primary'
            : status === 'Failed'
            ? 'warning'
            : 'normal';

    const buttonCallback = () =>
        status === 'Pass' ? navigate('/success') : navigate('/fail');

    return (
        <PageContainer>
            <PageHeader
                justifyContent="space-between"
                alignItems="center"
                complete={status === 'Pass'}
            >
                <HeaderFront>
                    <Horizontal gap={10}>
                        <TypoGraphy type="bold">SN:</TypoGraphy>
                        <TypoGraphy type="bold" style={{ color: 'blue' }}>
                            {sn}
                        </TypoGraphy>
                    </Horizontal>
                    <Horizontal gap={10}>
                        <TypoGraphy type="bold">Target Oru:</TypoGraphy>
                        <TypoGraphy type="bold" style={{ color: 'blue' }}>
                            {oruIp}
                        </TypoGraphy>
                    </Horizontal>
                </HeaderFront>
                <HeaderBack gap={20}>
                    <Horizontal gap={10}>
                        <TypoGraphy type="bold">Test Result:</TypoGraphy>
                    </Horizontal>

                    <Button
                        type={buttonType}
                        label={status === 'Pass' ? 'Complete' : status}
                        disable={status === 'Progressing'}
                        onClick={buttonCallback}
                    />
                </HeaderBack>
            </PageHeader>
            <Vertical style={{ height: '100%', paddingTop: '20px' }} gap={10}>
                {/* left pannel */}
                <VerticalStepProgress
                    multiple
                    steps={constants.SVM_INSPECTION_STEP.map(elem => {
                        return { name: elem.name, checklist: elem.checkList };
                    })}
                    reportList={svmReport}
                    currentStep={currentStep}
                    position="left"
                    title="SVM 검사 항목"
                />

                {/* center pannel */}
                {/* Top */}
                <TopPannel />
                {/* Bottom */}
                <BottomPannel>
                    {/* Left */}
                    <BottomLeftPannel />
                    {/* Right */}
                    <BottomRightPannel />
                </BottomPannel>
                {/* center pannel */}

                {/* right pannel */}
                <VerticalStepProgressBar
                    multiple={false}
                    steps={COM_INSPECTION_STEP.map(elem => {
                        return { name: elem.name, checklist: elem.checkList };
                    })}
                    reportList={comReport}
                    currentStep={0}
                    position="right"
                    title="통신 검사 항목"
                />

                <RightPannelContainer>
                    <Button
                        type="normal"
                        label="저장 경로 설정"
                        disable={false}
                        onClick={selectDirectory}
                    />
                </RightPannelContainer>
            </Vertical>
        </PageContainer>
    );
}

export default Inspection;
